import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import {
  Camera,
  AlertTriangle,
  ClipboardCheck,
  BarChart3,
  Volume2,
  VolumeX,
  Brain,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { IndusafeLogo } from './IndusafeLogo';

interface SimpleHomeProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onNavigate: (tab: 'home' | 'check' | 'problems' | 'fix' | 'report') => void;
  openProblemsCount: number;
  totalProblemsCount: number;
  fixedProblemsCount: number;
  repeatedCount: number;
}

export const SimpleHome: React.FC<SimpleHomeProps> = ({
  currentLang,
  onSelectLang,
  onNavigate,
  openProblemsCount,
  totalProblemsCount,
  fixedProblemsCount,
  repeatedCount,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [speaking, setSpeaking] = useState(false);
  const [showMemoryDetails, setShowMemoryDetails] = useState(false);

  const handleReadAloud = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }

    const script = `${t.welcomeGreeting}. ${t.welcomeSubheading}. 1. ${t.cardCheckSafetyTitle}: ${t.cardCheckSafetyDesc}. 2. ${t.cardSafetyProblemsTitle}: ${t.cardSafetyProblemsDesc}. 3. ${t.cardFixProblemsTitle}: ${t.cardFixProblemsDesc}. 4. ${t.cardSafetyReportTitle}: ${t.cardSafetyReportDesc}. ${t.memoryTitle}: ${t.memoryDesc}`;

    setSpeaking(true);
    speakText(script, currentLang, () => setSpeaking(false));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 py-2">
      {/* Welcome Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-3">
        {/* Language & Voice bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Language / ಭಾಷೆ:
            </span>
            <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
              <button
                type="button"
                onClick={() => onSelectLang('en')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('kn')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'kn'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'hi'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('te')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'te'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('ta')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'ta'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('ml')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'ml'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>

          {/* Voice Aloud Button */}
          <button
            onClick={handleReadAloud}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border shadow-sm transition-all active:scale-95 ${
              speaking
                ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-300'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
            }`}
          >
            {speaking ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-600" />
                {t.stopReading}
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-blue-600" />
                {t.readThis}
              </>
            )}
          </button>
        </div>

        {/* Welcome Branding & Logo */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-center mb-1">
            <IndusafeLogo className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-xs" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                {t.appTitle}
              </h2>
            </div>

            <p className="text-sm sm:text-base font-extrabold text-slate-700 tracking-tight">
              {t.platformSubtitle}
            </p>

            <p className="text-xs sm:text-sm font-bold text-blue-700 tracking-wide">
              {t.tagline}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 max-w-md mx-auto">
            <p className="text-base sm:text-lg text-[#0f172a] font-extrabold">
              {t.welcomeGreeting}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t.welcomeSubheading}
            </p>
          </div>
        </div>
      </div>

      {/* EXACTLY FOUR LARGE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {/* CARD 1: CHECK SAFETY (Blue Accent) */}
        <button
          onClick={() => onNavigate('check')}
          className="group relative bg-blue-50/70 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-500 rounded-3xl p-6 sm:p-7 text-left transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] flex flex-col justify-between min-h-[175px]"
        >
          <div className="flex items-start justify-between w-full">
            <div className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-sm group-hover:scale-105 transition-transform">
              <Camera className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-xs">
              Option 1
            </span>
          </div>

          <div className="mt-4 space-y-1.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight group-hover:text-blue-700 transition-colors">
              {t.cardCheckSafetyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {t.cardCheckSafetyDesc}
            </p>
          </div>
        </button>

        {/* CARD 2: SAFETY PROBLEMS (Soft Red Accent) */}
        <button
          onClick={() => onNavigate('problems')}
          className="group relative bg-rose-50/70 hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-400 rounded-3xl p-6 sm:p-7 text-left transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] flex flex-col justify-between min-h-[175px]"
        >
          <div className="flex items-start justify-between w-full">
            <div className="p-3.5 bg-rose-600 text-white rounded-2xl shadow-sm group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-white px-3 py-1 rounded-full border border-rose-200 shadow-xs">
              {openProblemsCount} {t.statusNeedsFixing}
            </span>
          </div>

          <div className="mt-4 space-y-1.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight group-hover:text-rose-700 transition-colors">
              {t.cardSafetyProblemsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {t.cardSafetyProblemsDesc}
            </p>
          </div>
        </button>

        {/* CARD 3: FIX PROBLEMS (Light Green Accent) */}
        <button
          onClick={() => onNavigate('fix')}
          className="group relative bg-emerald-50/70 hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 rounded-3xl p-6 sm:p-7 text-left transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] flex flex-col justify-between min-h-[175px]"
        >
          <div className="flex items-start justify-between w-full">
            <div className="p-3.5 bg-emerald-600 text-white rounded-2xl shadow-sm group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
              {openProblemsCount} To Fix
            </span>
          </div>

          <div className="mt-4 space-y-1.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight group-hover:text-emerald-700 transition-colors">
              {t.cardFixProblemsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {t.cardFixProblemsDesc}
            </p>
          </div>
        </button>

        {/* CARD 4: SAFETY REPORT (Light Purple Accent) */}
        <button
          onClick={() => onNavigate('report')}
          className="group relative bg-purple-50/70 hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-3xl p-6 sm:p-7 text-left transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] flex flex-col justify-between min-h-[175px]"
        >
          <div className="flex items-start justify-between w-full">
            <div className="p-3.5 bg-purple-600 text-white rounded-2xl shadow-sm group-hover:scale-105 transition-transform">
              <BarChart3 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-white px-3 py-1 rounded-full border border-purple-200 shadow-xs">
              {fixedProblemsCount} Fixed
            </span>
          </div>

          <div className="mt-4 space-y-1.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight group-hover:text-purple-700 transition-colors">
              {t.cardSafetyReportTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {t.cardSafetyReportDesc}
            </p>
          </div>
        </button>
      </div>

      {/* SLIM SECTION: SMART SAFETY MEMORY (CORE INNOVATION) */}
      <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-[#0f172a]">
                  {t.memoryTitle}
                </h4>
                <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Core Innovation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                {t.memoryDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowMemoryDetails(!showMemoryDetails)}
            className="self-end sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            {showMemoryDetails ? t.memoryHideBtn : t.memoryDetailsBtn}
          </button>
        </div>

        {/* Expandable Memory Explanations */}
        {showMemoryDetails && (
          <div className="pt-3 border-t border-slate-100 space-y-3 text-xs sm:text-sm animate-in fade-in duration-200">
            {/* Active Recurrence Alert */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-900 block">
                  Repeated Issue Memory:
                </span>
                <p className="text-amber-800 font-medium">
                  {t.memoryInsightRepeat}
                </p>
              </div>
            </div>

            {/* Why is this prioritized? */}
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
              <span className="font-bold text-blue-900 block flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" />
                {t.memoryWhyRiskTitle}
              </span>
              <p className="text-slate-700">
                {t.memoryWhyRiskDesc}
              </p>
            </div>

            {/* Active Preventive Action */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t.memoryActionTitle}
              </span>
              <p className="text-emerald-800">
                {t.memoryActionDesc}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              {t.memoryNoRepeatNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
