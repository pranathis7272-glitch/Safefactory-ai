import React, { useState } from 'react';
import { SimpleSafetyProblem, IncidentCategory, ZoneId } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import { FACTORY_ZONES } from '../data/seedData';
import {
  AlertTriangle,
  ArrowLeft,
  Volume2,
  VolumeX,
  CheckCircle2,
  MapPin,
  Search,
  Filter,
  Brain,
  ChevronDown,
  ChevronUp,
  Layers,
  Info,
  Clock,
  Eye,
  Check,
} from 'lucide-react';

interface SimpleSafetyProblemsProps {
  currentLang: Language;
  problems: SimpleSafetyProblem[];
  onBackToHome: () => void;
  onGoToFix: () => void;
}

export const SimpleSafetyProblems: React.FC<SimpleSafetyProblemsProps> = ({
  currentLang,
  problems,
  onBackToHome,
  onGoToFix,
}) => {
  const t = TRANSLATIONS[currentLang];

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'FIXED'>('ALL');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Safety Memory Engine: Selected recurrence cluster to show supporting records
  const [activeRecurrenceDetailsId, setActiveRecurrenceDetailsId] = useState<string | null>('ZONE_D');

  // Safety Memory Engine calculation: Group verified problems by workArea / zone and category
  const recurrenceClusters = React.useMemo(() => {
    const verifiedOnly = problems.filter((p) => p.humanReviewStatus !== 'Rejected');
    const map: Record<string, { zoneName: string; zoneId?: ZoneId; category: string; records: SimpleSafetyProblem[] }> = {};

    verifiedOnly.forEach((p) => {
      const key = `${p.workArea}::${p.category || 'PPE Non-compliance'}`;
      if (!map[key]) {
        map[key] = {
          zoneName: p.workArea,
          zoneId: p.zoneId,
          category: p.category || 'PPE Non-compliance',
          records: [],
        };
      }
      map[key].records.push(p);
    });

    // Only clusters with at least 2 verified records represent recurrence!
    return Object.values(map).filter((cluster) => cluster.records.length >= 2);
  }, [problems]);

  // Filtered problems list
  const filteredProblems = problems.filter((p) => {
    if (statusFilter === 'OPEN' && p.status !== 'Needs Fixing') return false;
    if (statusFilter === 'FIXED' && p.status !== 'Fixed') return false;
    if (selectedZone !== 'ALL' && p.zoneId !== selectedZone && !p.workArea.toLowerCase().includes(selectedZone.toLowerCase())) return false;
    if (selectedSeverity !== 'ALL' && p.howSerious !== selectedSeverity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.whatIsWrong.toLowerCase().includes(q) ||
        p.workArea.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.whyIsThisRisky && p.whyIsThisRisky.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleReadProblem = (p: SimpleSafetyProblem) => {
    if (speakingId === p.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    const script = `${t.areaLabel}: ${p.workArea}. ${t.whatIsWrong}: ${p.whatIsWrong}. ${
      p.whyIsThisRisky ? `Why is this risky? ${p.whyIsThisRisky}` : ''
    }. ${p.isRepeated ? t.repeatedProblemAlert : ''}. ${t.whatShouldWeDo}: ${p.whatShouldWeDo}. Status: ${
      p.status === 'Fixed' ? t.statusFixed : t.statusNeedsFixing
    }.`;

    setSpeakingId(p.id);
    speakText(script, currentLang, () => setSpeakingId(null));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      {/* Back and Title Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.homeBtn}
        </button>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-rose-600" />
          {t.problemsTitle}
        </h2>
      </div>

      {/* SAFETY MEMORY ENGINE: REPEATED CONFIRMED INCIDENTS BANNER */}
      {recurrenceClusters.length > 0 && (
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-amber-950">
                  Safety Memory Engine: Repeated Problems Found
                </h3>
                <p className="text-xs text-amber-800">
                  Memory correlations with at least 2 verified records. Click to view supporting history.
                </p>
              </div>
            </div>
            <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              {recurrenceClusters.length} Recurrence Area{recurrenceClusters.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Recurrence cards */}
          <div className="space-y-2.5 pt-1">
            {recurrenceClusters.map((cluster, idx) => {
              const isSelected = activeRecurrenceDetailsId === (cluster.zoneId || cluster.zoneName);
              return (
                <div
                  key={idx}
                  className="bg-amber-50/60 border border-amber-200 rounded-2xl p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-[#0f172a]">
                        ⚠️ {cluster.zoneName}
                      </span>
                      <span className="text-xs text-amber-900 font-semibold ml-2">
                        • {cluster.category}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setActiveRecurrenceDetailsId(isSelected ? null : (cluster.zoneId || cluster.zoneName))
                      }
                      className="text-xs font-bold text-amber-900 hover:text-amber-950 underline flex items-center gap-1"
                    >
                      {cluster.records.length} Supporting Records {isSelected ? '▴' : '▾'}
                    </button>
                  </div>

                  <p className="text-xs text-amber-900">
                    This location has experienced <strong>{cluster.records.length} repeated incidents</strong> in
                    history. The Safety Memory Engine connects these events to prevent chronic hazard resurgence.
                  </p>

                  {/* Supporting Records List */}
                  {isSelected && (
                    <div className="pt-2 border-t border-amber-200 space-y-1.5 animate-in fade-in duration-200">
                      <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider block">
                        Supporting Event Records:
                      </span>
                      {cluster.records.map((rec) => (
                        <div
                          key={rec.id}
                          className="bg-white p-2.5 rounded-xl border border-amber-200 text-xs flex items-center justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-[#0f172a]">{rec.id}:</span>{' '}
                            <span className="text-slate-700">{rec.whatIsWrong}</span>
                            <div className="text-[10px] text-slate-500">{rec.date}</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 ${
                              rec.status === 'Fixed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {rec.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-5 space-y-3 shadow-xs">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search problems, areas, or hazard descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">🔴 Needs Fixing</option>
            <option value="FIXED">🟢 Fixed</option>
          </select>

          {/* Zone filter */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800"
          >
            <option value="ALL">All Work Areas</option>
            {FACTORY_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name.split('—')[0].trim()}
              </option>
            ))}
          </select>

          {/* Severity filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800"
          >
            <option value="ALL">All Severities</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedZone('ALL');
              setSelectedSeverity('ALL');
              setStatusFilter('ALL');
            }}
            className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-bold text-center"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Problems Cards List */}
      <div className="space-y-4">
        {filteredProblems.length === 0 ? (
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-10 text-center text-slate-500 text-sm font-medium">
            {t.noProblemsFound}
          </div>
        ) : (
          filteredProblems.map((problem) => {
            const isFixed = problem.status === 'Fixed';
            const isThisSpeaking = speakingId === problem.id;

            return (
              <div
                key={problem.id}
                className={`bg-white border-2 rounded-3xl p-6 space-y-3.5 transition-all shadow-sm ${
                  isFixed
                    ? 'border-emerald-200'
                    : problem.isRepeated
                    ? 'border-amber-400 ring-2 ring-amber-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header: Area, Date, Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-base font-extrabold text-[#0f172a]">
                        {problem.workArea}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{problem.date}</span>
                        <span>•</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {problem.category}
                        </span>
                        <span>•</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {problem.isSampleData ? t.sampleDataBadge : t.liveDataBadge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read Aloud Button */}
                    <button
                      onClick={() => handleReadProblem(problem)}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                        isThisSpeaking
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isThisSpeaking ? (
                        <>
                          <VolumeX className="w-4 h-4 text-rose-600" />
                          <span className="hidden sm:inline">{t.stopReading}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-blue-600" />
                          <span className="hidden sm:inline">{t.readThis}</span>
                        </>
                      )}
                    </button>

                    {/* Status Pill */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        isFixed
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isFixed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      {isFixed ? t.statusFixed : t.statusNeedsFixing}
                    </span>
                  </div>
                </div>

                {/* Repeated Problem Alert */}
                {problem.isRepeated && !isFixed && (
                  <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-950 text-xs sm:text-sm font-extrabold flex items-center gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span>{t.repeatedProblemAlert}</span>
                      <span className="text-[11px] text-amber-800 block font-normal">
                        Safety Memory logged {problem.repeatCount || 3} previous events in this zone.
                      </span>
                    </div>
                  </div>
                )}

                {/* Problem Info */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 font-bold block">{t.whatIsWrong}</span>
                    <p className="text-[#0f172a] font-bold text-sm sm:text-base mt-0.5">
                      {problem.whatIsWrong}
                    </p>
                  </div>

                  {/* Why is this risky? */}
                  {problem.whyIsThisRisky && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-0.5">
                      <span className="text-blue-900 font-bold block text-xs">
                        Why is this risky?
                      </span>
                      <p className="text-slate-800 font-medium text-xs">
                        {problem.whyIsThisRisky}
                      </p>
                    </div>
                  )}

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-blue-700 font-bold block text-xs">{t.whatShouldWeDo}:</span>
                    <p className="text-slate-700 font-medium text-xs sm:text-sm mt-0.5">
                      {problem.whatShouldWeDo}
                    </p>
                  </div>
                </div>

                {/* Additional Metadata: Role, Due Date, Action Status, Review Gate */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>
                      Action Role: <strong className="text-blue-900">{problem.responsibleRole || 'Shift Lead'}</strong>
                    </span>
                    {problem.dueDate && (
                      <span>
                        Due Date: <strong className="text-slate-800">{problem.dueDate}</strong>
                      </span>
                    )}
                    <span>
                      Action Status:{' '}
                      <strong className={problem.status === 'Fixed' ? 'text-emerald-700' : problem.actionStatus === 'In Progress' ? 'text-amber-700' : 'text-rose-700'}>
                        {problem.status === 'Fixed' ? 'Completed' : problem.actionStatus || 'Open'}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>
                      Review:{' '}
                      <strong className="text-blue-700">
                        {problem.humanReviewStatus || 'Verified'}
                      </strong>
                    </span>
                    {isFixed && (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✓ Audit: {problem.followUpResult || 'Satisfactory'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Button to go to Fix Screen */}
      <div className="pt-2">
        <button
          onClick={onGoToFix}
          className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {t.cardFixProblemsTitle} &rarr;
        </button>
      </div>
    </div>
  );
};
