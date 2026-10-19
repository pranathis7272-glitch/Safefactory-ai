import React, { useState, useEffect, useRef } from 'react';
import { SimpleSafetyProblem, SimpleStatus, IncidentCategory, ZoneId } from '../types';
import { Language, TRANSLATIONS, getTranslation } from '../utils/translations';
import {
  speakText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
  requestMicrophonePermission,
  checkMicrophonePermissionState,
  LANGUAGE_LOCALES,
  SpeechController,
} from '../utils/speech';
import { INSPECTION_IMAGE_PRESETS, FACTORY_ZONES } from '../data/seedData';
import { processAndOptimizeImage } from '../utils/imageProcessor';
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Volume2,
  VolumeX,
  ArrowLeft,
  Sparkles,
  Info,
  RefreshCw,
  Save,
  Check,
  Mic,
  MicOff,
  UserCheck,
  X,
  FileEdit,
  Eye,
  ShieldAlert,
  Waves,
  Mountain,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

interface SimpleCheckSafetyProps {
  currentLang: Language;
  onBackToHome: () => void;
  onSaveProblem: (problem: SimpleSafetyProblem) => void;
}

export const SimpleCheckSafety: React.FC<SimpleCheckSafetyProps> = ({
  currentLang,
  onBackToHome,
  onSaveProblem,
}) => {
  const t = getTranslation(currentLang);
  const baseTranscriptRef = useRef<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-loading-dock');
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [customImageMime, setCustomImageMime] = useState<string>('image/jpeg');
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    name: string;
    size: string;
    width?: number;
    height?: number;
  } | null>(null);

  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    simpleStatus: SimpleStatus;
    hazardType?: string;
    disasterCategory?: string;
    confidence?: string;
    whatIsWrong: string;
    whereSeen: string;
    howSerious: 'High' | 'Medium' | 'Low' | 'None';
    whyIsThisRisky: string;
    whatShouldWeDo: string;
    riskGuidance?: string;
    recommendedNextSteps?: string;
    visualEvidence: string;
    uncertaintyNotes: string;
    isUnclear: boolean;
    workerCount?: number;
    helmetsCount?: number;
    vestsCount?: number;
    category?: IncidentCategory;
  } | null>(null);

  // Store last analyzed image for beforePhotoUrl
  const [lastAnalyzedImage, setLastAnalyzedImage] = useState<string | null>(null);

  // Human verification edit state
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [editForm, setEditForm] = useState<{
    whatIsWrong: string;
    whereSeen: string;
    howSerious: 'High' | 'Medium' | 'Low';
    zoneId: ZoneId;
    category: IncidentCategory;
    responsibleRole: string;
    dueDate: string;
    hazardType?: string;
    confidence?: string;
  }>({
    whatIsWrong: '',
    whereSeen: 'Loading Area Door 3',
    howSerious: 'High',
    zoneId: 'ZONE_D',
    category: 'PPE Non-compliance',
    responsibleRole: 'Shift Lead',
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString().substring(0, 10),
  });

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [isSpeakingResult, setIsSpeakingResult] = useState(false);
  const [audioFeedbackMsg, setAudioFeedbackMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rejectionNotice, setRejectionNotice] = useState<string | null>(null);

  // Speak-to-Report mic state
  const [isListening, setIsListening] = useState(false);
  const [speechLang, setSpeechLang] = useState<Language>(currentLang);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [micStatusMsg, setMicStatusMsg] = useState<string | null>(null);
  const [micErrorMsg, setMicErrorMsg] = useState<string | null>(null);
  const [micActiveController, setMicActiveController] = useState<SpeechController | null>(null);
  const [micPermissionState, setMicPermissionState] = useState<'unknown' | 'prompt' | 'granted' | 'denied'>('unknown');

  // Check microphone permission state on mount
  useEffect(() => {
    checkMicrophonePermissionState().then((state) => {
      setMicPermissionState(state);
    });
  }, []);

  // Sync speech language when app language changes
  useEffect(() => {
    setSpeechLang(currentLang);
  }, [currentLang]);

  // Clean up mic and speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (micActiveController) {
        try {
          micActiveController.stop();
        } catch (e) {}
      }
    };
  }, [micActiveController]);

  const handleRequestMicPermission = async () => {
    setMicErrorMsg(null);
    setMicStatusMsg('Requesting microphone permission from browser...');
    const result = await requestMicrophonePermission();
    if (result.granted) {
      setMicPermissionState('granted');
      setMicStatusMsg('✓ Microphone permission granted! Ready to record voice reports.');
    } else {
      setMicPermissionState('denied');
      setMicStatusMsg(null);
      setMicErrorMsg(result.error || 'Microphone permission was denied.');
    }
  };

  const getPresetBase64 = (svg: string): Promise<{ base64: string; mime: string }> => {
    return new Promise((resolve) => {
      try {
        const img = new Image();
        const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, 640, 400);
              ctx.drawImage(img, 0, 0, 640, 400);
              const dataUrl = canvas.toDataURL('image/png');
              URL.revokeObjectURL(url);
              resolve({ base64: dataUrl, mime: 'image/png' });
              return;
            }
          } catch (e) {}
          URL.revokeObjectURL(url);
          resolve({
            base64: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))),
            mime: 'image/svg+xml',
          });
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve({
            base64: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))),
            mime: 'image/svg+xml',
          });
        };
        img.src = url;
      } catch (err) {
        resolve({
          base64: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))),
          mime: 'image/svg+xml',
        });
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsReadingFile(true);
    setErrorMessage(null);
    setRejectionNotice(null);

    try {
      const processed = await processAndOptimizeImage(file);
      setCustomImageBase64(processed.dataUrl);
      setCustomImageMime(processed.mimeType);
      setUploadedFileInfo({
        name: processed.fileName,
        size: processed.fileSizeFormatted,
        width: processed.width,
        height: processed.height,
      });
      setSelectedPresetId('custom');
      setLastAnalyzedImage(processed.dataUrl);
      setResult(null);
      setHasConfirmed(false);
    } catch (err: any) {
      console.error('File processing error:', err);
      setErrorMessage(err.message || 'Failed to read image file. Please try another photo.');
    } finally {
      setIsReadingFile(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleToggleSpeakToReport = async () => {
    setMicErrorMsg(null);
    setRejectionNotice(null);

    if (isListening && micActiveController) {
      micActiveController.stop();
      setIsListening(false);
      setMicStatusMsg(null);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setMicErrorMsg(
        'Speech recognition is not supported in this browser. Please use Chrome, Edge, or type your report notes manually in the box below.'
      );
      return;
    }

    // Explicitly prompt for mic permission via getUserMedia if not known to be granted
    if (micPermissionState !== 'granted') {
      const perm = await requestMicrophonePermission();
      if (!perm.granted) {
        setMicPermissionState('denied');
        setMicErrorMsg(
          perm.error ||
            'Microphone permission was denied. Please allow microphone access in your browser to speak your report.'
        );
        return;
      }
      setMicPermissionState('granted');
    }

    // Prime base transcript so interim speech doesn't duplicate
    baseTranscriptRef.current = isEditingReview ? editForm.whatIsWrong : (result?.whatIsWrong || '');
    setIsListening(true);
    setMicStatusMsg(`Listening in ${LANGUAGE_LOCALES[speechLang]?.nativeName || 'English'}... Speak now.`);

    const controller = startSpeechRecognition(speechLang, {
      onStart: () => {
        setIsListening(true);
      },
      onResult: (transcript, isFinal) => {
        setVoiceTranscript(transcript);
        setMicErrorMsg(null);

        // Smoothly update form field without duplicating interim words
        const currentBase = baseTranscriptRef.current;
        const combined = currentBase ? `${currentBase} ${transcript}` : transcript;

        setEditForm((prev) => ({
          ...prev,
          whatIsWrong: combined,
        }));

        if (isFinal) {
          baseTranscriptRef.current = combined;
          setMicStatusMsg(`✓ Recorded: "${transcript}"`);
        }
      },
      onError: (msg) => {
        console.warn('Speech recognition error:', msg);
        setIsListening(false);
        setMicErrorMsg(msg);
        setMicStatusMsg(null);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    setMicActiveController(controller);
  };

  const handleCheckPhoto = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsChecking(true);
    setErrorMessage(null);
    setResult(null);
    setHasConfirmed(false);
    setIsEditingReview(false);
    setRejectionNotice(null);
    setAudioFeedbackMsg(null);
    stopSpeaking();
    setIsSpeakingResult(false);

    try {
      let imagePayload = customImageBase64;
      let mime = customImageMime;

      if (!imagePayload) {
        const preset = INSPECTION_IMAGE_PRESETS.find((p) => p.id === selectedPresetId);
        if (preset) {
          const raster = await getPresetBase64(preset.svgContent);
          imagePayload = raster.base64;
          mime = raster.mime;
        }
      }

      if (!imagePayload) {
        throw new Error('Please select an example photo or upload your own image before checking.');
      }

      setLastAnalyzedImage(imagePayload);

      const activePreset = INSPECTION_IMAGE_PRESETS.find((p) => p.id === selectedPresetId);
      const zoneName = activePreset?.zoneName || 'Factory Floor';
      const zoneId = activePreset?.zoneId || 'ZONE_D';

      // Call API with safe content-type verification
      const res = await fetch('/api/check-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imagePayload,
          mimeType: mime,
          userZone: zoneName,
          hazardHint: activePreset?.name || '',
        }),
      });

      // Safely read response text first to prevent "Unexpected token '<'" errors
      const contentType = res.headers.get('content-type') || '';
      const rawText = await res.text();

      let data: any = {};
      if (contentType.includes('application/json')) {
        try {
          data = JSON.parse(rawText);
        } catch (jsonErr) {
          console.error('Failed to parse server JSON:', rawText.substring(0, 300));
          throw new Error('Server returned an invalid JSON response format. Please try again.');
        }
      } else {
        console.error('Non-JSON response from server:', rawText.substring(0, 300));
        throw new Error(`Server returned non-JSON response (${res.status}). Please try again.`);
      }

      if (!res.ok) {
        throw new Error(data.error || data.details || `Server returned error (${res.status}).`);
      }

      // Determine simpleStatus
      let status: SimpleStatus = 'SAFE';
      if (data.isUnclear || data.simpleStatus === 'UNCLEAR') {
        status = 'UNCLEAR';
      } else if (
        data.simpleStatus === 'PROBLEM' ||
        data.hasViolation ||
        (data.helmetsCount !== undefined && data.workerCount !== undefined && data.helmetsCount < data.workerCount) ||
        (data.vestsCount !== undefined && data.workerCount !== undefined && data.vestsCount < data.workerCount)
      ) {
        status = 'PROBLEM';
      }

      // Map disaster categories
      let matchedCategory: IncidentCategory = 'PPE Non-compliance';
      if (data.disasterCategory === 'Flood' || (data.hazardType && data.hazardType.toLowerCase().includes('flood'))) {
        matchedCategory = 'Flood/Water Intrusion';
      } else if (
        data.disasterCategory === 'Landslide' ||
        data.disasterCategory === 'Coastal Erosion' ||
        (data.hazardType && (data.hazardType.toLowerCase().includes('landslide') || data.hazardType.toLowerCase().includes('erosion')))
      ) {
        matchedCategory = 'Landslide/Erosion';
      } else if (data.disasterCategory === 'Chemical' || data.disasterCategory === 'Blocked Egress') {
        matchedCategory = 'Blocked Egress';
      }

      const whatWrong =
        data.whatIsWrong ||
        (status === 'SAFE'
          ? 'No safety problems or hazards observed in this photo.'
          : 'Safety problem observed.');

      const whyRisky =
        data.whyIsThisRisky ||
        'Working in proximity to industrial machinery or environmental hazards without safety precautions creates severe risk of injury or structural damage.';

      const visualEv =
        data.visualEvidence ||
        'Visual evaluation completed from uploaded photo frame.';

      const uncert =
        data.uncertaintyNotes ||
        'Visual evaluation restricted to visible frame. Snapshot does not replace continuous physical inspection.';

      setResult({
        simpleStatus: status,
        hazardType: data.hazardType || 'Visual Safety Check',
        disasterCategory: data.disasterCategory,
        confidence: data.confidence || 'High Confidence',
        whatIsWrong: whatWrong,
        whereSeen: data.whereSeen || zoneName,
        howSerious: (data.howSerious as any) || (status === 'PROBLEM' ? 'High' : 'None'),
        whyIsThisRisky: whyRisky,
        whatShouldWeDo:
          data.whatShouldWeDo ||
          (status === 'SAFE'
            ? 'Continue work following standard safety rules.'
            : 'Alert the supervisor and address the condition immediately.'),
        riskGuidance: data.riskGuidance,
        recommendedNextSteps: data.recommendedNextSteps,
        visualEvidence: visualEv,
        uncertaintyNotes: uncert,
        isUnclear: Boolean(data.isUnclear),
        workerCount: data.workerCount ?? 0,
        helmetsCount: data.helmetsCount ?? 0,
        vestsCount: data.vestsCount ?? 0,
        category: matchedCategory,
      });

      setEditForm({
        whatIsWrong: whatWrong,
        whereSeen: data.whereSeen || zoneName,
        howSerious: (data.howSerious as any) || 'High',
        zoneId: zoneId,
        category: matchedCategory,
        responsibleRole: 'Shift Lead',
        dueDate: new Date(Date.now() + 5 * 86400000).toISOString().substring(0, 10),
        hazardType: data.hazardType,
        confidence: data.confidence,
      });
    } catch (err: any) {
      console.error('Check photo error:', err);
      setErrorMessage(err.message || 'Something went wrong while checking the photo. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleReadResult = () => {
    if (isSpeakingResult) {
      stopSpeaking();
      setIsSpeakingResult(false);
      setAudioFeedbackMsg(null);
      return;
    }

    if (!result) return;

    let textToSpeak = '';
    if (result.simpleStatus === 'SAFE') {
      textToSpeak = `${t.verdictSafe}. ${result.whatIsWrong}. ${t.whatShouldWeDo}: ${result.whatShouldWeDo}`;
    } else if (result.simpleStatus === 'PROBLEM') {
      textToSpeak = `${t.verdictProblem}! ${t.whatIsWrong}: ${result.whatIsWrong}. ${t.whyIsThisRiskyLabel}: ${result.whyIsThisRisky}. ${t.whereSeen}: ${result.whereSeen}. ${t.howSerious}: ${result.howSerious}. ${t.whatShouldWeDo}: ${result.whatShouldWeDo}`;
    } else {
      textToSpeak = `${t.verdictUnclear}. ${t.unclearAdvice}`;
    }

    setIsSpeakingResult(true);
    setAudioFeedbackMsg(`${t.audioStatePlaying} (${LANGUAGE_LOCALES[currentLang]?.nativeName || currentLang})...`);

    speakText(textToSpeak, currentLang, {
      onStart: () => {
        setIsSpeakingResult(true);
      },
      onEnd: () => {
        setIsSpeakingResult(false);
        setAudioFeedbackMsg(t.audioStateFinished);
      },
      onError: (errMsg) => {
        console.warn('Audio TTS error:', errMsg);
        setIsSpeakingResult(false);
        setAudioFeedbackMsg(`${t.audioStateError}`);
      },
    });
  };

  // Human Verification Step
  const handleHumanVerify = (decision: 'CONFIRM' | 'REJECT') => {
    if (!result) return;

    if (decision === 'REJECT') {
      setRejectionNotice(t.rejectionNoticeText);
      setResult(null);
      return;
    }

    const finalWhatWrong = isEditingReview ? editForm.whatIsWrong : result.whatIsWrong;
    const finalWhereSeen = isEditingReview ? editForm.whereSeen : result.whereSeen;
    const finalSerious = isEditingReview ? editForm.howSerious : result.howSerious;

    const newProblem: SimpleSafetyProblem = {
      id: `PRB-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      workArea: finalWhereSeen,
      zoneId: editForm.zoneId,
      category: editForm.category,
      categoryKey: editForm.category.toUpperCase().replace(/[\s\/]+/g, '_'),
      hazardType: result.hazardType,
      disasterCategory: result.disasterCategory,
      confidence: result.confidence,
      whatIsWrong: finalWhatWrong,
      howSerious: finalSerious,
      whyIsThisRisky: result.whyIsThisRisky,
      whatShouldWeDo: result.whatShouldWeDo,
      riskGuidance: result.riskGuidance,
      recommendedNextSteps: result.recommendedNextSteps,
      voiceTranscript: voiceTranscript || undefined,
      visualEvidence: result.visualEvidence,
      uncertaintyNotes: result.uncertaintyNotes,
      status: 'Needs Fixing',
      actionStatus: 'Open',
      responsibleRole: editForm.responsibleRole || 'Shift Lead',
      dueDate: editForm.dueDate || new Date(Date.now() + 5 * 86400000).toISOString().substring(0, 10),
      isRepeated:
        finalWhereSeen.toLowerCase().includes('loading') ||
        finalWhatWrong.toLowerCase().includes('helmet') ||
        finalWhatWrong.toLowerCase().includes('flood'),
      repeatCount: 3,
      isSampleData: false,
      workerCount: result.workerCount,
      helmetsCount: result.helmetsCount,
      vestsCount: result.vestsCount,
      beforePhotoUrl: lastAnalyzedImage || undefined,
      photoPreview: lastAnalyzedImage || undefined,
      humanReviewStatus: 'Verified',
      reviewedBy: 'Safety Officer On-Duty',
    };

    onSaveProblem(newProblem);
    setHasConfirmed(true);
    setIsEditingReview(false);
  };

  const currentPreset = INSPECTION_IMAGE_PRESETS.find((p) => p.id === selectedPresetId);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      {/* Back and Title Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToHome}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.homeBtn}</span>
        </button>

        <div className="text-right">
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">{t.checkTitle}</h2>
          <span className="text-xs font-semibold text-slate-500">{t.step1Of3}</span>
        </div>
      </div>

      {/* Rejection / False Alarm Alert Banner */}
      {rejectionNotice && (
        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-sm font-semibold text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{rejectionNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setRejectionNotice(null)}
            className="p-1 hover:bg-amber-200 rounded-lg text-amber-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 1: PHOTO SELECTION */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {t.step1}
          </span>
          <p className="text-sm font-bold text-slate-800 mt-1">{t.pickPhotoPrompt}</p>
        </div>

        {/* Preset Selector Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>{t.choosePreset}</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSPECTION_IMAGE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id && !customImageBase64;
              const isDisaster = preset.id.includes('flood') || preset.id.includes('landslide') || preset.id.includes('coastal');

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setCustomImageBase64(null);
                    setUploadedFileInfo(null);
                    setResult(null);
                    setHasConfirmed(false);
                    setErrorMessage(null);
                    setRejectionNotice(null);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isDisaster
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {preset.id.includes('flood') ? (
                      <Waves className="w-4 h-4" />
                    ) : preset.id.includes('landslide') ? (
                      <Mountain className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-snug">{preset.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{preset.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Upload Box */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" />
              <span>{t.orUploadOwn}</span>
            </span>
            {customImageBase64 && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {t.photoLoadedSuccess}
              </span>
            )}
          </label>

          {/* Hidden File Input with e.target.value reset */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = '';
            }}
            className="hidden"
          />

          {isReadingFile ? (
            <div className="border-2 border-dashed border-blue-400 bg-blue-50/70 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2 animate-pulse">
              <RefreshCw className="w-7 h-7 text-blue-600 animate-spin" />
              <span className="text-xs font-bold text-blue-900">{t.loadingOptimizingPhoto}</span>
              <span className="text-[11px] text-blue-600">Decoding and optimizing high-res photo...</span>
            </div>
          ) : customImageBase64 ? (
            <div className="border-2 border-emerald-300 bg-emerald-50/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 transition-all">
              <div className="relative w-28 h-20 sm:w-36 sm:h-24 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-emerald-200 shadow-xs flex items-center justify-center">
                <img
                  src={customImageBase64}
                  alt="Uploaded safety inspection"
                  className="w-full h-full object-contain"
                  onError={() =>
                    setErrorMessage('The uploaded image format could not be decoded. Please select a JPEG or PNG photo.')
                  }
                />
              </div>
              <div className="flex-1 text-center sm:text-left min-w-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t.photoLoadedSuccess}
                </span>
                <p className="text-xs font-black text-slate-900 truncate">
                  {uploadedFileInfo?.name || 'Custom Camera Photo'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {uploadedFileInfo?.size ? `${uploadedFileInfo.size} • ` : ''}
                  {uploadedFileInfo?.width && uploadedFileInfo?.height ? `${uploadedFileInfo.width}×${uploadedFileInfo.height}px • ` : ''}
                  Active Target for Check Photo
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.changePhotoBtn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomImageBase64(null);
                      setUploadedFileInfo(null);
                      setSelectedPresetId('preset-loading-dock');
                      setLastAnalyzedImage(null);
                    }}
                    className="px-3 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5 text-rose-500" />
                    <span>{t.removePhotoBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/30 rounded-2xl p-5 text-center cursor-pointer flex flex-col items-center justify-center gap-2 transition-all group"
            >
              <div className="p-3 bg-white group-hover:bg-blue-100 rounded-full text-blue-600 transition-colors shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">
                {t.clickToUpload}
              </span>
              <span className="text-[11px] text-slate-400">{t.cameraSupports}</span>
            </button>
          )}
        </div>

        {/* Speak-to-Report Multi-Language Panel */}
        <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#0f172a] flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-blue-600" />
                {t.speakToReportTitle}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                (Kannada, English, Hindi, Telugu, Tamil, Malayalam)
              </span>
            </div>

            {/* Language Selector for Speech */}
            <div className="flex items-center gap-1 text-[11px] font-bold">
              {(['kn', 'en', 'hi', 'te', 'ta', 'ml'] as Language[]).map((langKey) => (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => setSpeechLang(langKey)}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    speechLang === langKey
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {LANGUAGE_LOCALES[langKey]?.nativeName?.split(' ')[0] || langKey.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleToggleSpeakToReport}
              className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-xs ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>{t.stopListeningBtn}</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>{t.speakToReportBtn} ({LANGUAGE_LOCALES[speechLang]?.nativeName || speechLang})</span>
                </>
              )}
            </button>

            {/* Mic Permission Status / Request Button */}
            {micPermissionState === 'granted' ? (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.micAllowed}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleRequestMicPermission}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 hover:border-slate-400 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                title="Click to prompt browser for microphone permission"
              >
                <Mic className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.giveMicPermission}</span>
              </button>
            )}

            {isListening && (
              <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                {micStatusMsg || t.listeningStatus}
              </span>
            )}

            {!isListening && micStatusMsg && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                {micStatusMsg}
              </span>
            )}
          </div>

          {/* Error Banner for Speech */}
          {micErrorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{micErrorMsg}</p>
                <p className="text-[11px] text-rose-600 mt-1">{t.typeNotesFallback}</p>
              </div>
            </div>
          )}

          {/* Transcript / Manual Input fallback */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">{t.spokenNotesLabel}</label>
            <textarea
              rows={2}
              value={voiceTranscript}
              onChange={(e) => {
                setVoiceTranscript(e.target.value);
                setEditForm((prev) => ({ ...prev, whatIsWrong: e.target.value }));
              }}
              placeholder={t.spokenNotesPlaceholder}
              className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Active Analysis Frame Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              {customImageBase64 ? (
                <span className="text-blue-700 font-black">
                  📸 Active Frame: {uploadedFileInfo?.name || 'Uploaded Photo'}
                </span>
              ) : (
                <span>Active Frame: {currentPreset?.name || 'Scenario Preview'}</span>
              )}
            </span>
            {customImageBase64 && (
              <button
                type="button"
                onClick={() => {
                  setCustomImageBase64(null);
                  setUploadedFileInfo(null);
                  setSelectedPresetId('preset-loading-dock');
                  setLastAnalyzedImage(null);
                }}
                className="text-[11px] text-slate-400 hover:text-rose-600 underline font-semibold transition-colors"
              >
                {t.removePhotoBtn}
              </button>
            )}
          </div>

          <div className="relative aspect-[16/10] max-h-[300px] bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-300 flex items-center justify-center shadow-inner">
            {customImageBase64 ? (
              <img
                src={customImageBase64}
                alt="Custom upload"
                className="w-full h-full object-contain"
                onError={() => {
                  setErrorMessage('The image could not be loaded into the preview canvas. Please try selecting a different photo.');
                }}
              />
            ) : currentPreset ? (
              <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: currentPreset.svgContent }} />
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                <span>No image selected for preview.</span>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: CHECK PHOTO BUTTON */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleCheckPhoto}
            disabled={isChecking}
            className={`w-full py-4 px-6 rounded-2xl text-base sm:text-lg font-black flex items-center justify-center gap-3 shadow-md transition-all active:scale-[0.99] ${
              isChecking
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
            }`}
          >
            {isChecking ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>{t.checkingPhoto}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>{t.checkPhotoBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message if API fails */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl text-xs sm:text-sm font-bold text-rose-800 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p>{errorMessage}</p>
              <button
                type="button"
                onClick={handleCheckPhoto}
                className="mt-2 text-xs font-black underline text-rose-700 hover:text-rose-900"
              >
                {t.tryCheckingAgain}
              </button>
            </div>
          </div>
        )}

        {/* Scope Disclaimer */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{t.photoDisclaimer}</span>
        </div>
      </div>

      {/* Step 3: SIMPLE RESULTS */}
      {result && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {t.step3}
              </span>
              <span className="text-xs font-extrabold text-blue-600">{result.hazardType}</span>
            </div>

            {/* Read Result Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReadResult}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border shadow-xs transition-all ${
                  isSpeakingResult
                    ? 'bg-rose-50 text-rose-700 border-rose-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isSpeakingResult ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
                <span>{isSpeakingResult ? t.stopReading : `${t.readThis} (${LANGUAGE_LOCALES[currentLang]?.nativeName || currentLang})`}</span>
              </button>
            </div>
          </div>

          {/* Audio Feedback Message */}
          {audioFeedbackMsg && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{audioFeedbackMsg}</span>
            </div>
          )}

          {/* Analyzed Image Snapshot */}
          {(lastAnalyzedImage || customImageBase64) && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-32 h-24 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-300 shadow-xs flex items-center justify-center">
                <img
                  src={lastAnalyzedImage || customImageBase64 || ''}
                  alt="Analyzed Evidence Frame"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs space-y-1 min-w-0 text-center sm:text-left flex-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md inline-block">
                  {t.analyzedPhotoSnapshot}
                </span>
                <p className="font-bold text-slate-900 truncate">
                  {uploadedFileInfo?.name || (currentPreset ? currentPreset.name : 'Target Workplace Photo')}
                </p>
                <p className="text-[11px] text-slate-500">
                  {result.whereSeen} • Analyzed by Gemini AI Vision
                </p>
              </div>
            </div>
          )}

          {/* THREE VERDICTS: GREEN / RED / YELLOW */}
          <div
            className={`p-6 rounded-3xl border-2 flex items-center gap-4 ${
              result.simpleStatus === 'SAFE'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : result.simpleStatus === 'PROBLEM'
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div
              className={`p-3 rounded-2xl text-white ${
                result.simpleStatus === 'SAFE'
                  ? 'bg-emerald-600'
                  : result.simpleStatus === 'PROBLEM'
                  ? 'bg-rose-600'
                  : 'bg-amber-600'
              }`}
            >
              {result.simpleStatus === 'SAFE' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : result.simpleStatus === 'PROBLEM' ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <HelpCircle className="w-8 h-8" />
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-black">
                {result.simpleStatus === 'SAFE'
                  ? t.verdictSafe
                  : result.simpleStatus === 'PROBLEM'
                  ? t.verdictProblem
                  : t.verdictUnclear}
              </h3>
              <p className="text-xs sm:text-sm font-semibold opacity-90 mt-0.5">
                {result.simpleStatus === 'SAFE'
                  ? 'No visible hazard or safety violation observed in this frame.'
                  : result.simpleStatus === 'PROBLEM'
                  ? 'Safety attention or immediate corrective intervention required.'
                  : t.unclearAdvice}
              </p>
            </div>
          </div>

          {/* Confidence and Category Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {result.hazardType && (
              <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg font-bold border border-slate-200">
                {result.hazardType}
              </span>
            )}
            {result.confidence && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold border border-blue-200">
                {result.confidence}
              </span>
            )}
          </div>

          {/* 4 SIMPLE QUESTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. What is wrong? */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
                {t.whatIsWrong}
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {result.whatIsWrong}
              </p>
            </div>

            {/* 2. Where was it seen? */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
                {t.whereSeen}
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {result.whereSeen}
              </p>
            </div>

            {/* 3. How serious is it? */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wide">
                {t.howSerious}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${
                    result.howSerious === 'High'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : result.howSerious === 'Medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : result.howSerious === 'Low'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {result.howSerious === 'High'
                    ? t.highRisk
                    : result.howSerious === 'Medium'
                    ? t.mediumRisk
                    : result.howSerious === 'Low'
                    ? t.lowRisk
                    : 'None (Safe)'}
                </span>
              </div>
            </div>

            {/* 4. Why is this risky? */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                {t.whyIsThisRiskyLabel}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                {result.whyIsThisRisky}
              </p>
            </div>
          </div>

          {/* 5. What should we do? */}
          <div className="p-4 sm:p-5 bg-blue-50/80 border-2 border-blue-200 rounded-2xl space-y-1.5">
            <span className="text-xs font-black text-blue-800 uppercase tracking-wide">
              {t.whatShouldWeDo}
            </span>
            <p className="text-sm sm:text-base font-extrabold text-blue-950 leading-relaxed">
              {result.whatShouldWeDo}
            </p>
          </div>

          {/* Risk Guidance & Recommended Next Steps */}
          {(result.riskGuidance || result.recommendedNextSteps) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {result.riskGuidance && (
                <div>
                  <span className="font-black text-slate-700 block mb-1">{t.riskGuidanceLabel}:</span>
                  <p className="text-slate-600">{result.riskGuidance}</p>
                </div>
              )}
              {result.recommendedNextSteps && (
                <div>
                  <span className="font-black text-slate-700 block mb-1">{t.nextStepsLabel}:</span>
                  <p className="text-slate-600">{result.recommendedNextSteps}</p>
                </div>
              )}
            </div>
          )}

          {/* Visual Evidence & Uncertainty */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div>
              <span className="font-black text-slate-700 block">{t.visualEvidenceLabel}</span>
              <p className="text-slate-600 mt-0.5">{result.visualEvidence}</p>
            </div>
            {result.uncertaintyNotes && (
              <div>
                <span className="font-black text-slate-700 block">{t.visualLimitationsLabel}</span>
                <p className="text-slate-500 mt-0.5 italic">{result.uncertaintyNotes}</p>
              </div>
            )}
          </div>

          {/* HUMAN VERIFICATION & EDIT MODAL / DRAWER */}
          {result.simpleStatus === 'PROBLEM' && (
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  {t.humanVerificationHeader}
                </span>

                <button
                  type="button"
                  onClick={() => setIsEditingReview(!isEditingReview)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>{isEditingReview ? t.doneEditing : t.editDetailsBeforeSaving}</span>
                </button>
              </div>

              {/* Editable Fields */}
              {isEditingReview && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.problemDescLabel}</label>
                    <input
                      type="text"
                      value={editForm.whatIsWrong}
                      onChange={(e) => setEditForm({ ...editForm, whatIsWrong: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.workAreaLabel}</label>
                      <input
                        type="text"
                        value={editForm.whereSeen}
                        onChange={(e) => setEditForm({ ...editForm, whereSeen: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.severityLevelLabel}</label>
                      <select
                        value={editForm.howSerious}
                        onChange={(e) => setEditForm({ ...editForm, howSerious: e.target.value as any })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                      >
                        <option value="High">{t.highRisk}</option>
                        <option value="Medium">{t.mediumRisk}</option>
                        <option value="Low">{t.lowRisk}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.roleLabel}:</label>
                      <select
                        value={editForm.responsibleRole}
                        onChange={(e) => setEditForm({ ...editForm, responsibleRole: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                      >
                        <option value="EHS Specialist">{t.roleEHS}</option>
                        <option value="Shift Lead">{t.roleShiftLead}</option>
                        <option value="Maintenance Tech">{t.roleMaintenance}</option>
                        <option value="Logistics Manager">{t.roleLogistics}</option>
                        <option value="Operations Director">{t.roleOpsDirector}</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.dueDateLabel}:</label>
                      <input
                        type="date"
                        value={editForm.dueDate}
                        onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium"
                      >
                      </input>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Confirm vs Reject */}
              {!hasConfirmed ? (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleHumanVerify('CONFIRM')}
                    className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <Check className="w-5 h-5" />
                    <span>{t.confirmAndAddProblem}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHumanVerify('REJECT')}
                    className="py-3 px-5 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <X className="w-5 h-5 text-rose-500" />
                    <span>{t.rejectFalseAlarm}</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-900 font-bold text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t.problemSavedSuccess}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
