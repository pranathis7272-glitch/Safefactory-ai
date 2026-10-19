import React, { useState } from 'react';
import { SimpleSafetyProblem, ZoneId } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText, stopSpeaking, LANGUAGE_LOCALES } from '../utils/speech';
import { FACTORY_ZONES } from '../data/seedData';
import {
  BarChart3,
  ArrowLeft,
  Printer,
  Download,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  Repeat,
  MapPin,
  Clock,
  Sparkles,
  Info,
  Sliders,
  ShieldAlert,
  Layers,
  FileSpreadsheet,
  AlertCircle,
  Headphones,
} from 'lucide-react';
import { IndusafeLogo } from './IndusafeLogo';

interface SimpleReportProps {
  currentLang: Language;
  problems: SimpleSafetyProblem[];
  onBackToHome: () => void;
}

export const SimpleReport: React.FC<SimpleReportProps> = ({
  currentLang,
  problems,
  onBackToHome,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [speaking, setSpeaking] = useState(false);
  const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing' | 'finished' | 'error'>('idle');
  const [audioErrorMsg, setAudioErrorMsg] = useState<string | null>(null);
  const [audioLang, setAudioLang] = useState<Language>(currentLang);

  const [selectedZoneMap, setSelectedZoneMap] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState(false);

  // What-If Simulator state
  const [simIntervention1, setSimIntervention1] = useState(false); // Turnstile in Zone D
  const [simIntervention2, setSimIntervention2] = useState(false); // Walkway Markings
  const [simIntervention3, setSimIntervention3] = useState(false); // RFID Guard Upgrade

  // Counts
  const totalFound = problems.length;
  const completedCount = problems.filter((p) => p.status === 'Fixed').length;
  const unresolvedCount = problems.filter((p) => p.status === 'Needs Fixing').length;
  const repeatedCount = problems.filter((p) => p.isRepeated).length;

  // Overdue actions: check due date
  const todayIso = new Date().toISOString().substring(0, 10);
  const overdueCount = problems.filter((p) => {
    if (p.status === 'Fixed') return false;
    if (!p.dueDate) return false;
    return p.dueDate < todayIso;
  }).length;

  const percentFixed = totalFound > 0 ? Math.round((completedCount / totalFound) * 100) : 100;

  // Zone incident breakdown for the Factory Map
  const zoneStats = FACTORY_ZONES.map((zone) => {
    const zoneProblems = problems.filter(
      (p) => p.zoneId === zone.id || p.workArea.toLowerCase().includes(zone.name.split('—')[0].toLowerCase().trim())
    );
    const openInZone = zoneProblems.filter((p) => p.status === 'Needs Fixing').length;
    const isRepeatedInZone = zoneProblems.some((p) => p.isRepeated);

    let riskTier: 'High' | 'Medium' | 'Low' = 'Low';
    if (openInZone >= 2 || isRepeatedInZone) riskTier = 'High';
    else if (openInZone === 1) riskTier = 'Medium';

    return {
      ...zone,
      total: zoneProblems.length,
      open: openInZone,
      isRepeated: isRepeatedInZone,
      riskTier,
      problems: zoneProblems,
    };
  });

  // What-If Simulator Calculation
  const baselineScore = Math.min(
    100,
    Math.round(unresolvedCount * 18 + repeatedCount * 15 + overdueCount * 10 + 20)
  );

  let reductionPoints = 0;
  if (simIntervention1) reductionPoints += 28;
  if (simIntervention2) reductionPoints += 18;
  if (simIntervention3) reductionPoints += 24;

  const simulatedScore = Math.max(10, baselineScore - reductionPoints);
  const netSavedScore = baselineScore - simulatedScore;

  // Downloadable CSV Export
  const handleDownloadCSV = () => {
    const headers = [
      'Problem ID',
      'Date',
      'Work Area',
      'Zone',
      'Category',
      'Hazard Type',
      'Severity',
      'Status',
      'Action Progress',
      'Responsible Role',
      'Due Date',
      'Fixed Date',
      'Is Repeated',
      'What Is Wrong',
      'What Should We Do',
      'Visual Evidence',
      'Record Type',
    ];

    const rows = problems.map((p) => [
      p.id,
      `"${p.date}"`,
      `"${p.workArea.replace(/"/g, '""')}"`,
      p.zoneId || 'Unassigned',
      `"${p.category}"`,
      `"${(p.hazardType || p.category).replace(/"/g, '""')}"`,
      p.howSerious,
      p.status,
      p.actionStatus,
      `"${(p.responsibleRole || 'Unassigned').replace(/"/g, '""')}"`,
      p.dueDate || 'N/A',
      p.fixedDate || 'N/A',
      p.isRepeated ? 'YES' : 'NO',
      `"${p.whatIsWrong.replace(/"/g, '""')}"`,
      `"${p.whatShouldWeDo.replace(/"/g, '""')}"`,
      `"${(p.visualEvidence || 'N/A').replace(/"/g, '""')}"`,
      p.isSampleData ? 'Demo Sample' : 'Live Incident',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `INDUSAFE-AI-Safety-Report-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  // Generate Report Script in chosen language
  const getReportSummaryScript = (lang: Language): string => {
    const langTrans = TRANSLATIONS[lang] || t;
    if (lang === 'kn') {
      return `ಇಂಡುಸೇಫ್ ಎಐ ಕೈಗಾರಿಕಾ ಸುರಕ್ಷತಾ ವರದಿ. ಒಟ್ಟು ಕಂಡುಬಂದ ಸಮಸ್ಯೆಗಳು ${totalFound}. ಇನ್ನೂ ಬಾಕಿ ಇರುವ ಸಮಸ್ಯೆಗಳು ${unresolvedCount}. ಸರಿಪಡಿಸಲಾದ ಸಮಸ್ಯೆಗಳು ${completedCount}. ಅವಧಿ ಮೀರಿದ ಕ್ರಮಗಳು ${overdueCount}. ಪುನರಾವರ್ತಿತ ಸಮಸ್ಯೆಗಳು ${repeatedCount}. ದಾಖಲಾದ ಸಮಸ್ಯೆಗಳಲ್ಲಿ ಶೇಕಡಾ ${percentFixed} ರಷ್ಟು ಯಶಸ್ವಿಯಾಗಿ ಸರಿಪಡಿಸಲಾಗಿದೆ.`;
    }
    if (lang === 'hi') {
      return `इंडुसेफ एआई औद्योगिक सुरक्षा रिपोर्ट। कुल मिली समस्याएं ${totalFound}। अभी भी लंबित समस्याएं ${unresolvedCount}। ठीक की गई समस्याएं ${completedCount}। अतिदेय कार्य ${overdueCount}। दोहराई गई समस्याएं ${repeatedCount}। दर्ज समस्याओं में से ${percentFixed} प्रतिशत का निवारण किया गया है।`;
    }
    if (lang === 'te') {
      return `ఇండుసేఫ్ ఏఐ భద్రతా నివేదిక. మొత్తం సమస్యలు ${totalFound}. పరిష్కరించాల్సినవి ${unresolvedCount}. పరిష్కరించబడినవి ${completedCount}. గడువు ముగిసినవి ${overdueCount}. పునరావృత సమస్యలు ${repeatedCount}. ${percentFixed} శాతం సమస్యలు విజయవంతంగా పరిష్కరించబడ్డాయి.`;
    }
    if (lang === 'ta') {
      return `இண்டுசேப் ஏஐ பாதுகாப்பு அறிக்கை. மொத்த சிக்கல்கள் ${totalFound}. நிலுவையில் உள்ளவை ${unresolvedCount}. சரிசெய்யப்பட்டவை ${completedCount}. காலாவதியானவை ${overdueCount}. மீண்டும் மீண்டும் வரும் சிக்கல்கள் ${repeatedCount}. ${percentFixed} சதவீத சிக்கல்கள் வெற்றிகரமாக சரிசெய்யப்பட்டுள்ளன.`;
    }
    if (lang === 'ml') {
      return `ഇൻഡുസേഫ് എഐ സുരക്ഷാ റിപ്പോർട്ട്. ആകെ കണ്ടെത്തിയ പ്രശ്നങ്ങൾ ${totalFound}. പരിഹരിക്കാനുള്ളവ ${unresolvedCount}. പരിഹരിച്ചവ ${completedCount}. കാലഹരണപ്പെട്ടവ ${overdueCount}. ആവർത്തിച്ചുള്ള പ്രശ്നങ്ങൾ ${repeatedCount}. ${percentFixed} ശതമാനം പ്രശ്നങ്ങളും വിജയകരമായി പരിഹരിച്ചു.`;
    }
    return `INDUSAFE AI Industrial Safety Intelligence Report. Total incidents found: ${totalFound}. Unresolved incidents: ${unresolvedCount}. Completed fixes: ${completedCount}. Overdue actions: ${overdueCount}. Recurring issues: ${repeatedCount}. ${percentFixed} percent of recorded safety issues have been fixed.`;
  };

  const handleReadReport = (overrideLang?: Language) => {
    const langToUse = overrideLang || audioLang;

    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      setAudioState('idle');
      return;
    }

    const script = getReportSummaryScript(langToUse);
    setAudioState('loading');
    setAudioErrorMsg(null);

    const success = speakText(script, langToUse, {
      onStart: () => {
        setSpeaking(true);
        setAudioState('playing');
      },
      onEnd: () => {
        setSpeaking(false);
        setAudioState('finished');
      },
      onError: (errMsg) => {
        console.warn('Audio playback error:', errMsg);
        setSpeaking(false);
        setAudioState('error');
        setAudioErrorMsg(errMsg);
      },
    });

    if (!success) {
      setSpeaking(false);
      setAudioState('error');
      setAudioErrorMsg(t.audioStateError);
    }
  };

  const handleReadSpecificProblem = (problem: SimpleSafetyProblem) => {
    stopSpeaking();
    setSpeaking(true);
    setAudioState('playing');

    const textToSpeak = `${problem.workArea}. ${problem.whatIsWrong}. ${t.whatShouldWeDo}: ${problem.whatShouldWeDo}. Status: ${problem.status}.`;
    speakText(textToSpeak, audioLang, {
      onStart: () => setSpeaking(true),
      onEnd: () => {
        setSpeaking(false);
        setAudioState('finished');
      },
      onError: (err) => {
        setSpeaking(false);
        setAudioState('error');
        setAudioErrorMsg(err);
      },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
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

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <span>{t.reportTitle}</span>
        </h2>
      </div>

      {/* Main Report Container */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-7 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Document Header & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <IndusafeLogo className="w-12 h-12 shrink-0 drop-shadow-xs" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
                  {t.appTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-tight">
                {t.platformSubtitle}
              </p>
              <p className="text-[11px] font-bold text-blue-700 tracking-wide mt-0.5">
                {t.tagline} • {t.reportSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap print:hidden">
            {/* Quick CSV Export */}
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t.btnDownloadCsv}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printReport}</span>
            </button>
          </div>
        </div>

        {/* DEDICATED CHECK REPORT & AUDIO READOUT CARD */}
        <div className="p-5 bg-blue-50/70 border-2 border-blue-200 rounded-3xl space-y-4 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-xl">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-blue-950">{t.checkReportAudioTitle}</h4>
                <p className="text-xs text-blue-800">
                  Select a language to listen to the verified safety summary aloud.
                </p>
              </div>
            </div>

            {/* Language Selector for Audio */}
            <div className="flex items-center gap-1 text-xs font-bold bg-white p-1 rounded-xl border border-blue-200 shadow-2xs">
              {(['kn', 'en', 'hi', 'te', 'ta', 'ml'] as Language[]).map((lKey) => (
                <button
                  key={lKey}
                  type="button"
                  onClick={() => {
                    setAudioLang(lKey);
                    if (speaking) {
                      stopSpeaking();
                      setSpeaking(false);
                      setAudioState('idle');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    audioLang === lKey
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {LANGUAGE_LOCALES[lKey]?.nativeName?.split(' ')[0] || lKey.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Action Player Control */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleReadReport(audioLang)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-xs transition-all ${
                speaking
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>
                {speaking
                  ? t.stopReading
                  : `${t.readThis} (${LANGUAGE_LOCALES[audioLang]?.nativeName || audioLang})`}
              </span>
            </button>

            {/* Audio State Feedback */}
            {audioState === 'loading' && (
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {t.audioStatePreparing}
              </span>
            )}
            {audioState === 'playing' && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                {t.audioStatePlaying} ({LANGUAGE_LOCALES[audioLang]?.nativeName || audioLang})...
              </span>
            )}
            {audioState === 'finished' && (
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t.audioStateFinished}
              </span>
            )}
            {audioState === 'error' && (
              <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                {audioErrorMsg || t.audioStateError}
              </span>
            )}
          </div>

          {/* Readable Text Alternative Box */}
          <div className="p-3.5 bg-white border border-blue-200 rounded-2xl text-xs space-y-1">
            <span className="font-extrabold text-blue-900 block">{t.readableTextAlternative}</span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {getReportSummaryScript(audioLang)}
            </p>
          </div>
        </div>

        {/* CSV Download Success Notice */}
        {downloadNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-extrabold text-emerald-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.downloadSuccessNotice}</span>
          </div>
        )}

        {/* 5 MAIN KPI METRICS: Total, Unresolved, Completed, Overdue, Recurring */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Total Found */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t.statTotalFound}
            </span>
            <div className="text-3xl font-black text-[#0f172a]">{totalFound}</div>
            <span className="text-[10px] text-slate-400">Recorded issues</span>
          </div>

          {/* Unresolved / Open */}
          <div className="bg-rose-50/70 p-4 rounded-2xl border-2 border-rose-200 text-center space-y-1">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
              {t.statUnresolvedCount}
            </span>
            <div className="text-3xl font-black text-rose-700">{unresolvedCount}</div>
            <span className="text-[10px] text-rose-700 font-bold">{t.statusNeedsFixing}</span>
          </div>

          {/* Completed Actions */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border-2 border-emerald-200 text-center space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              {t.statFixed}
            </span>
            <div className="text-3xl font-black text-emerald-700">{completedCount}</div>
            <span className="text-[10px] text-emerald-700 font-bold">{percentFixed}% {t.statusFixed}</span>
          </div>

          {/* Overdue Actions */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-200 text-center space-y-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              {t.statOverdueCount}
            </span>
            <div className="text-3xl font-black text-amber-700">{overdueCount}</div>
            <span className="text-[10px] text-amber-700 font-bold">Past target date</span>
          </div>

          {/* Recurring Issues Caught in Memory */}
          <div className="bg-purple-50/70 p-4 rounded-2xl border-2 border-purple-200 text-center space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">
              {t.statRepeatedCount}
            </span>
            <div className="text-3xl font-black text-purple-700">{repeatedCount}</div>
            <span className="text-[10px] text-purple-700 font-bold">{t.memoryTitle}</span>
          </div>
        </div>

        {/* Fix Completion Progress Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="text-slate-700">Corrective Action Resolution Rate:</span>
            <span className="text-emerald-700 font-black">{percentFixed}% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
              style={{ width: `${percentFixed}%` }}
            />
          </div>
        </div>

        {/* FACTORY-ZONE RISK BLUEPRINT MAP */}
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h4 className="text-base font-extrabold text-[#0f172a]">
                  {t.factoryZoneMapTitle}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.factoryZoneMapSubtitle} {t.clickZoneToView}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-black uppercase">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">● 0 Open (Safe)</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900">● 1 Open (Medium)</span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900">● 2+ Open (High Alert)</span>
            </div>
          </div>

          {/* Interactive Zone Blueprint Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {zoneStats.map((z) => {
              const isSelected = selectedZoneMap === z.id;
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => setSelectedZoneMap(isSelected ? null : z.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : z.riskTier === 'High'
                      ? 'border-rose-300 bg-rose-50/50 hover:bg-rose-50'
                      : z.riskTier === 'Medium'
                      ? 'border-amber-300 bg-amber-50/50 hover:bg-amber-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800">{z.code}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        z.riskTier === 'High'
                          ? 'bg-rose-200 text-rose-900'
                          : z.riskTier === 'Medium'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {z.riskTier} Risk
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{z.name}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
                    <span>Active: <strong>{z.open}</strong></span>
                    <span>Total: <strong>{z.total}</strong></span>
                    {z.isRepeated && (
                      <span className="text-rose-700 font-black flex items-center gap-0.5">
                        <Repeat className="w-3 h-3" /> Repeat
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail card for selected zone */}
          {selectedZoneMap && (
            <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">
                  Incidents in {zoneStats.find((z) => z.id === selectedZoneMap)?.name}:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedZoneMap(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Close
                </button>
              </div>

              {zoneStats.find((z) => z.id === selectedZoneMap)?.problems.length === 0 ? (
                <p className="text-xs text-slate-500">No safety incidents recorded in this zone.</p>
              ) : (
                <div className="space-y-2">
                  {zoneStats
                    .find((z) => z.id === selectedZoneMap)
                    ?.problems.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">{p.whatIsWrong}</p>
                          <p className="text-[10px] text-slate-500">{p.date} • {p.status}</p>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                            p.status === 'Fixed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* HYPOTHETICAL PREVENTIVE ACTION WHAT-IF SIMULATOR */}
        <div className="bg-purple-50/50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 border-b border-purple-200/60 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="text-base font-extrabold text-[#0f172a]">
                  {t.simulatorTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">{t.simulatorSubtitle}</p>
              </div>
            </div>
          </div>

          {/* Prominent Warning Disclaimer */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-[11px] font-bold text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{t.simulatorDisclaimer}</span>
          </div>

          {/* Toggle Switches for 3 Interventions */}
          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-3 bg-white border border-purple-200 rounded-2xl cursor-pointer hover:bg-purple-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={simIntervention1}
                  onChange={(e) => setSimIntervention1(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-xs font-bold text-slate-800">{t.interventionOption1}</span>
              </div>
              <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                -28 pts
              </span>
            </label>

            <label className="flex items-center justify-between p-3 bg-white border border-purple-200 rounded-2xl cursor-pointer hover:bg-purple-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={simIntervention2}
                  onChange={(e) => setSimIntervention2(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-xs font-bold text-slate-800">{t.interventionOption2}</span>
              </div>
              <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                -18 pts
              </span>
            </label>

            <label className="flex items-center justify-between p-3 bg-white border border-purple-200 rounded-2xl cursor-pointer hover:bg-purple-50/30 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={simIntervention3}
                  onChange={(e) => setSimIntervention3(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-xs font-bold text-slate-800">{t.interventionOption3}</span>
              </div>
              <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                -24 pts
              </span>
            </label>
          </div>

          {/* Simulator Impact Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-3.5 rounded-2xl border border-purple-200 text-center">
              <span className="text-[11px] text-slate-500 font-bold block">{t.baselineRiskLabel}</span>
              <span className="text-2xl font-black text-slate-800">{baselineScore} / 100</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-purple-200 text-center">
              <span className="text-[11px] text-slate-500 font-bold block">{t.simulatedRiskLabel}</span>
              <span className="text-2xl font-black text-purple-700">{simulatedScore} / 100</span>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-300 text-center">
              <span className="text-[11px] text-emerald-800 font-bold block">{t.riskReductionEstimate}</span>
              <span className="text-2xl font-black text-emerald-700">-{netSavedScore} pts</span>
            </div>
          </div>
        </div>

        {/* RECENT LIST OF INCIDENTS & AUDIO PLAYBACK */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-[#0f172a]">
              {t.recentListTitle} ({problems.length})
            </h4>
            <span className="text-[11px] text-slate-400">Click 🔊 on any item to hear details</span>
          </div>

          <div className="space-y-2">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`p-2 rounded-xl text-white shrink-0 ${
                      problem.status === 'Fixed' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {problem.status === 'Fixed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{problem.whatIsWrong}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {problem.workArea} • {problem.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      problem.status === 'Fixed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {problem.status}
                  </span>

                  {/* Individual Audio Listen Button */}
                  <button
                    type="button"
                    onClick={() => handleReadSpecificProblem(problem)}
                    title="Listen to this problem aloud"
                    className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 shadow-2xs transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
