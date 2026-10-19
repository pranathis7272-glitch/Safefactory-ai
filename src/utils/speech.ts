import { Language } from './translations';

export interface VoiceLocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  fallbackLang: string;
}

export const LANGUAGE_LOCALES: Record<Language, VoiceLocaleConfig> = {
  en: { code: 'en-IN', name: 'English', nativeName: 'English (India)', fallbackLang: 'en-US' },
  kn: { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ (Kannada)', fallbackLang: 'en-IN' },
  hi: { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी (Hindi)', fallbackLang: 'en-IN' },
  te: { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు (Telugu)', fallbackLang: 'en-IN' },
  ta: { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ் (Tamil)', fallbackLang: 'en-IN' },
  ml: { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം (Malayalam)', fallbackLang: 'en-IN' },
};

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentAudioElement: HTMLAudioElement | null = null;
let currentAudioBlobUrl: string | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices cache
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const updateVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      cachedVoices = [];
    }
  };
  updateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

export interface SpeakTextCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (errorMessage: string) => void;
}

/**
 * Fallback to browser SpeechSynthesis if audio element streaming fails
 */
function fallbackToSpeechSynthesis(
  cleanText: string,
  lang: Language,
  cbs: SpeakTextCallbacks
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    const errorMsg = 'Audio playback is not supported on this device.';
    if (cbs.onError) cbs.onError(errorMsg);
    if (cbs.onEnd) cbs.onEnd();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    currentUtterance = utterance;

    const targetConfig = LANGUAGE_LOCALES[lang] || LANGUAGE_LOCALES.en;
    utterance.lang = targetConfig.code;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    if (cachedVoices.length === 0) {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    }

    const langPrefix = targetConfig.code.split('-')[0].toLowerCase();
    const matchedVoice =
      cachedVoices.find((v) => v.lang.toLowerCase() === targetConfig.code.toLowerCase()) ||
      cachedVoices.find((v) => v.lang.toLowerCase().startsWith(langPrefix)) ||
      cachedVoices.find((v) => v.name.toLowerCase().includes(targetConfig.name.toLowerCase()));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      if (cbs.onStart) cbs.onStart();
    };

    utterance.onend = () => {
      currentUtterance = null;
      if (cbs.onEnd) cbs.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error event:', e);
      currentUtterance = null;
      const errorDetail =
        e.error === 'not-allowed'
          ? 'Audio playback was blocked by browser autoplay settings. Please click to play.'
          : e.error === 'canceled' || e.error === 'interrupted'
          ? 'Audio playback was cancelled.'
          : `Speech synthesis error (${e.error || 'unknown'}).`;
      if (cbs.onError) cbs.onError(errorDetail);
      if (cbs.onEnd) cbs.onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err: any) {
    currentUtterance = null;
    const msg = err?.message || 'Speech playback failed.';
    if (cbs.onError) cbs.onError(msg);
    if (cbs.onEnd) cbs.onEnd();
    return false;
  }
}

/**
 * Reads text aloud with genuine native audio in Kannada, Telugu, Tamil, Malayalam, Hindi, and English.
 * Uses real neural/formant audio streaming via /api/tts with browser speechSynthesis fallback.
 */
export function speakText(
  text: string,
  lang: Language,
  callbacks?: SpeakTextCallbacks | (() => void)
): boolean {
  const cbs: SpeakTextCallbacks =
    typeof callbacks === 'function' ? { onEnd: callbacks } : callbacks || {};

  // Cancel any currently playing speech or audio
  stopSpeaking();

  const cleanText = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[*_#`~[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    if (cbs.onEnd) cbs.onEnd();
    return true;
  }

  // Up to 2,000 characters cleanly fit in GET /api/tts.
  // For longer multi-paragraph texts, split into sentence chunks and chain playback via onended.
  const maxUrlTextLen = 2000;
  const chunks: string[] = [];
  if (cleanText.length <= maxUrlTextLen) {
    chunks.push(cleanText);
  } else {
    const sentences = cleanText.split(/([।\.\?\!\n;]+)/).filter(Boolean);
    let cur = '';
    for (const s of sentences) {
      if ((cur + s).length <= maxUrlTextLen) {
        cur += s;
      } else {
        if (cur.trim()) chunks.push(cur.trim());
        cur = s;
      }
    }
    if (cur.trim()) chunks.push(cur.trim());
  }

  let chunkIndex = 0;
  const audio = new Audio();
  currentAudioElement = audio;

  const playChunk = (index: number) => {
    if (index >= chunks.length) {
      currentAudioElement = null;
      if (cbs.onEnd) cbs.onEnd();
      return;
    }

    const chunkText = chunks[index];
    const audioUrl = `/api/tts?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(chunkText)}`;
    audio.src = audioUrl;

    audio.onplay = () => {
      if (index === 0 && cbs.onStart) cbs.onStart();
    };

    audio.onended = () => {
      chunkIndex++;
      if (chunkIndex < chunks.length) {
        playChunk(chunkIndex);
      } else {
        currentAudioElement = null;
        if (cbs.onEnd) cbs.onEnd();
      }
    };

    audio.onerror = (e) => {
      console.warn('Audio streaming error, falling back to speech synthesis:', e);
      currentAudioElement = null;
      fallbackToSpeechSynthesis(cleanText, lang, cbs);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((playErr) => {
        console.warn('audio.play() rejected, trying speech synthesis fallback:', playErr);
        currentAudioElement = null;
        fallbackToSpeechSynthesis(cleanText, lang, cbs);
      });
    }
  };

  try {
    playChunk(0);
    return true;
  } catch (err) {
    console.warn('Error starting speech playback:', err);
    return fallbackToSpeechSynthesis(cleanText, lang, cbs);
  }
}

export function stopSpeaking(): void {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {}
    currentAudioElement = null;
  }
  if (currentAudioBlobUrl) {
    try {
      URL.revokeObjectURL(currentAudioBlobUrl);
    } catch (e) {}
    currentAudioBlobUrl = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  currentUtterance = null;
}

export function isSpeaking(): boolean {
  if (currentAudioElement && !currentAudioElement.paused) {
    return true;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export interface SpeechRecognitionCallbacks {
  onStart?: () => void;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (errorMessage: string, rawError?: any) => void;
  onEnd?: () => void;
}

export interface SpeechController {
  stop: () => void;
  abort: () => void;
}

/**
 * Robust Speech-to-Text recognizing Kannada, English, Hindi, Telugu, Tamil, Malayalam.
 * Handles permission denial, unsupported browser, empty speech, and timeouts gracefully.
 */
export function startSpeechRecognition(
  lang: Language,
  callbacks: SpeechRecognitionCallbacks
): SpeechController {
  if (!isSpeechRecognitionSupported()) {
    const errorMsg =
      'Speech recognition is not supported in this browser. Please use Chrome, Edge, or enter text manually.';
    if (callbacks.onError) callbacks.onError(errorMsg, 'unsupported');
    if (callbacks.onEnd) callbacks.onEnd();
    return { stop: () => {}, abort: () => {} };
  }

  const SpeechRecognitionConstructor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  let recognition: any = null;
  let hasReceivedSpeech = false;
  let recognitionTimeoutId: any = null;

  try {
    recognition = new SpeechRecognitionConstructor();
  } catch (err: any) {
    if (callbacks.onError) {
      callbacks.onError('Could not create speech recognition instance: ' + err.message, 'constructor_failed');
    }
    if (callbacks.onEnd) callbacks.onEnd();
    return { stop: () => {}, abort: () => {} };
  }

  const locale = LANGUAGE_LOCALES[lang]?.code || 'en-IN';
  recognition.lang = locale;
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    hasReceivedSpeech = false;
    if (callbacks.onStart) callbacks.onStart();

    // 14-second recognition watchdog timeout to prevent hanging in listening mode
    recognitionTimeoutId = setTimeout(() => {
      if (!hasReceivedSpeech) {
        try {
          recognition.stop();
        } catch (e) {}
        if (callbacks.onError) {
          callbacks.onError('Listening timed out. No speech was heard. Please try again.', 'timeout');
        }
      }
    }, 14000);
  };

  recognition.onresult = (event: any) => {
    if (recognitionTimeoutId) {
      clearTimeout(recognitionTimeoutId);
      recognitionTimeoutId = null;
    }

    if (event.results && event.results.length > 0) {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0]?.transcript?.trim() || '';
      const isFinal = Boolean(lastResult.isFinal);

      if (transcript) {
        hasReceivedSpeech = true;
        callbacks.onResult(transcript, isFinal);
      }
    }
  };

  recognition.onerror = (event: any) => {
    if (recognitionTimeoutId) {
      clearTimeout(recognitionTimeoutId);
      recognitionTimeoutId = null;
    }

    const errCode = event.error || 'unknown';
    let userFriendlyMsg = 'Speech recognition encountered an issue.';

    switch (errCode) {
      case 'not-allowed':
      case 'permission-denied':
        userFriendlyMsg =
          'Microphone permission was denied. Please allow microphone access in your browser or device settings.';
        break;
      case 'no-speech':
        userFriendlyMsg =
          'No speech was detected. Please click the mic and speak clearly.';
        break;
      case 'audio-capture':
        userFriendlyMsg =
          'No microphone was detected on this device. Please connect a mic or type your note.';
        break;
      case 'network':
        userFriendlyMsg =
          'Network connection error during voice recognition. Please verify your connection.';
        break;
      case 'aborted':
        userFriendlyMsg = 'Voice recording was stopped.';
        break;
      case 'language-not-supported':
        userFriendlyMsg = `Language ${locale} is not supported by your browser's speech engine. Try English or typing.`;
        break;
      default:
        userFriendlyMsg = `Voice recognition error: ${errCode}.`;
        break;
    }

    // Only surface error if user didn't intentionally abort after speaking
    if (errCode !== 'aborted' || !hasReceivedSpeech) {
      if (callbacks.onError) callbacks.onError(userFriendlyMsg, errCode);
    }
  };

  recognition.onend = () => {
    if (recognitionTimeoutId) {
      clearTimeout(recognitionTimeoutId);
      recognitionTimeoutId = null;
    }
    if (callbacks.onEnd) callbacks.onEnd();
  };

  try {
    recognition.start();
  } catch (startErr: any) {
    if (recognitionTimeoutId) clearTimeout(recognitionTimeoutId);
    const msg =
      startErr.name === 'InvalidStateError'
        ? 'Microphone is already active.'
        : `Could not start microphone: ${startErr.message || startErr}`;
    if (callbacks.onError) callbacks.onError(msg, 'start_failed');
    if (callbacks.onEnd) callbacks.onEnd();
  }

  return {
    stop: () => {
      if (recognitionTimeoutId) clearTimeout(recognitionTimeoutId);
      try {
        recognition.stop();
      } catch (e) {}
    },
    abort: () => {
      if (recognitionTimeoutId) clearTimeout(recognitionTimeoutId);
      try {
        recognition.abort();
      } catch (e) {}
    },
  };
}

/**
 * Proactively requests microphone permission using getUserMedia so the browser permission modal opens.
 */
export async function requestMicrophonePermission(): Promise<{ granted: boolean; error?: string }> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return { granted: false, error: 'Audio capture device API is not supported in this browser.' };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Stop tracks immediately so we don't keep recording
    stream.getTracks().forEach((track) => track.stop());
    return { granted: true };
  } catch (err: any) {
    console.warn('Microphone permission request error:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      return {
        granted: false,
        error:
          'Microphone permission was denied. Please click the lock or camera/mic icon in the browser address bar to allow microphone access.',
      };
    }
    return { granted: false, error: err.message || 'Unable to access microphone.' };
  }
}

/**
 * Checks existing microphone permission state if supported.
 */
export async function checkMicrophonePermissionState(): Promise<'granted' | 'denied' | 'prompt' | 'unknown'> {
  if (typeof navigator !== 'undefined' && (navigator as any).permissions?.query) {
    try {
      const res = await (navigator as any).permissions.query({ name: 'microphone' });
      return res.state; // 'granted', 'denied', or 'prompt'
    } catch (e) {
      return 'unknown';
    }
  }
  return 'unknown';
}
