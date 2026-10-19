import React, { useState } from 'react';
import { SimpleSafetyProblem, ZoneId } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/speech';
import { processAndOptimizeImage } from '../utils/imageProcessor';
import {
  ClipboardCheck,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Check,
  X,
  Volume2,
  VolumeX,
  Clock,
  User,
  Calendar,
  Camera,
  Upload,
  Eye,
  ShieldCheck,
  Play,
  RotateCcw,
} from 'lucide-react';

interface SimpleFixProblemsProps {
  currentLang: Language;
  problems: SimpleSafetyProblem[];
  onBackToHome: () => void;
  onUpdateProblem: (updated: SimpleSafetyProblem) => void;
}

export const SimpleFixProblems: React.FC<SimpleFixProblemsProps> = ({
  currentLang,
  problems,
  onBackToHome,
  onUpdateProblem,
}) => {
  const t = TRANSLATIONS[currentLang];

  // Active filter tab: ALL | OPEN | IN_PROGRESS | COMPLETED
  const [activeTab, setActiveTab] = useState<'ALL' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'>('OPEN');

  // Modal states
  const [confirmingProblem, setConfirmingProblem] = useState<SimpleSafetyProblem | null>(null);
  const [assigningProblem, setAssigningProblem] = useState<SimpleSafetyProblem | null>(null);
  const [justFixedId, setJustFixedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Human Confirmation Form inputs
  const [verifierName, setVerifierName] = useState('Arjun Kumar');
  const [verifierRole, setVerifierRole] = useState('Shift Lead');
  const [hasCertified, setHasCertified] = useState(false);
  const [afterPhotoInput, setAfterPhotoInput] = useState<string | null>(null);
  const [followUpNotesInput, setFollowUpNotesInput] = useState('Inspected physically on site. Hazard eliminated.');

  // Role Assignment Form inputs
  const [selectedRole, setSelectedRole] = useState('Shift Lead');
  const [selectedDueDate, setSelectedDueDate] = useState('');

  // Counts
  const openCount = problems.filter((p) => p.status === 'Needs Fixing' && (p.actionStatus === 'Open' || !p.actionStatus)).length;
  const inProgressCount = problems.filter((p) => p.status === 'Needs Fixing' && p.actionStatus === 'In Progress').length;
  const completedCount = problems.filter((p) => p.status === 'Fixed').length;
  const totalCount = problems.length;

  // Filtered list
  const filteredProblems = problems.filter((p) => {
    if (activeTab === 'OPEN') return p.status === 'Needs Fixing' && (p.actionStatus === 'Open' || !p.actionStatus);
    if (activeTab === 'IN_PROGRESS') return p.status === 'Needs Fixing' && p.actionStatus === 'In Progress';
    if (activeTab === 'COMPLETED') return p.status === 'Fixed';
    return true; // ALL
  });

  // Start work -> Set to In Progress
  const handleStartWork = (problem: SimpleSafetyProblem) => {
    const updated: SimpleSafetyProblem = {
      ...problem,
      actionStatus: 'In Progress',
    };
    onUpdateProblem(updated);
  };

  // Open confirmation modal
  const handleOpenConfirmModal = (problem: SimpleSafetyProblem) => {
    setConfirmingProblem(problem);
    setHasCertified(false);
    setAfterPhotoInput(problem.afterPhotoUrl || null);
    setFollowUpNotesInput(`Physically re-inspected at ${problem.workArea}. All corrective actions completed.`);
  };

  // Complete problem after human verification
  const handleCompleteAction = () => {
    if (!confirmingProblem || !hasCertified) return;

    const todayStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const updated: SimpleSafetyProblem = {
      ...confirmingProblem,
      status: 'Fixed',
      actionStatus: 'Completed',
      fixedDate: todayStr,
      afterPhotoUrl: afterPhotoInput || confirmingProblem.afterPhotoUrl || 'data:image/svg+xml;base64,' + btoa('<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="#ecfdf5"/><text x="20" y="100" fill="#047857" font-weight="bold" font-family="sans-serif">✓ PPE COMPLIANT &amp; VERIFIED</text></svg>'),
      followUpResult: 'Satisfactory',
      followUpInspector: `${verifierName} (${verifierRole})`,
      followUpNotes: followUpNotesInput,
    };

    onUpdateProblem(updated);
    setJustFixedId(confirmingProblem.id);
    setConfirmingProblem(null);
    setTimeout(() => setJustFixedId(null), 5000);
  };

  // Save role & due date assignment
  const handleSaveAssignment = () => {
    if (!assigningProblem) return;
    const updated: SimpleSafetyProblem = {
      ...assigningProblem,
      responsibleRole: selectedRole,
      dueDate: selectedDueDate || assigningProblem.dueDate,
    };
    onUpdateProblem(updated);
    setAssigningProblem(null);
  };

  // After-photo file upload handler
  const handleUploadAfterPhoto = async (e: React.ChangeEvent<HTMLInputElement>, problemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const processed = await processAndOptimizeImage(file);
      setAfterPhotoInput(processed.dataUrl);
      const target = problems.find((p) => p.id === problemId);
      if (target) {
        onUpdateProblem({ ...target, afterPhotoUrl: processed.dataUrl });
      }
    } catch (err: any) {
      console.error('Failed to process after-photo:', err);
    } finally {
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  // Speech read-out
  const handleReadProblem = (p: SimpleSafetyProblem) => {
    if (speakingId === p.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    const script = `${p.workArea}. ${p.whatIsWrong}. Assigned role: ${p.responsibleRole || 'Shift Lead'}. Target due date: ${p.dueDate || 'Immediate'}. Status: ${p.status === 'Fixed' ? 'Fixed and audited' : p.actionStatus || 'Open'}. What to do: ${p.whatShouldWeDo}`;
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
          <ClipboardCheck className="w-6 h-6 text-emerald-600" />
          {t.fixTitle}
        </h2>
      </div>

      {/* FILTER TABS: All, Open, In Progress, Completed */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-3 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-black">
          <button
            onClick={() => setActiveTab('OPEN')}
            className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'OPEN'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>🔴 {t.tabOpenActions}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'OPEN' ? 'bg-rose-800 text-white' : 'bg-slate-200 text-slate-800'}`}>
              {openCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('IN_PROGRESS')}
            className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'IN_PROGRESS'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>⏳ {t.tabInProgress}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'IN_PROGRESS' ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-800'}`}>
              {inProgressCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('COMPLETED')}
            className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'COMPLETED'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>✓ {t.tabCompleted}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'COMPLETED' ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-800'}`}>
              {completedCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ALL')}
            className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>{t.tabAllActions}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'ALL' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-800'}`}>
              {totalCount}
            </span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {justFixedId && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-emerald-900 text-sm font-extrabold flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>{t.fixedSuccessMsg}</span>
        </div>
      )}

      {/* List of Problems / Corrective Actions */}
      <div className="space-y-5">
        {filteredProblems.length === 0 ? (
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-10 text-center space-y-3 shadow-xs">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-[#0f172a]">
              {activeTab === 'COMPLETED' ? 'No completed actions yet.' : t.noOpenProblems}
            </h3>
            <p className="text-xs text-slate-500">
              {activeTab === 'COMPLETED'
                ? 'When problems are verified and fixed, they will appear here.'
                : 'All open tasks are resolved or switched to in-progress.'}
            </p>
          </div>
        ) : (
          filteredProblems.map((problem) => {
            const isFixed = problem.status === 'Fixed';
            const isInProgress = problem.actionStatus === 'In Progress';
            const isThisSpeaking = speakingId === problem.id;

            return (
              <div
                key={problem.id}
                className={`bg-white border-2 rounded-3xl p-6 space-y-4 shadow-sm transition-all ${
                  isFixed
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isInProgress
                    ? 'border-amber-300'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header: Area, Category, Action Status Pill, Voice Button */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-base font-extrabold text-[#0f172a]">{problem.workArea}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{problem.date}</span>
                        <span>•</span>
                        <span className="font-mono">{problem.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReadProblem(problem)}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                        isThisSpeaking
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isThisSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
                    </button>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 ${
                        isFixed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-rose-50 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isFixed ? '✓ ' + t.statusFixed : isInProgress ? '⏳ ' + t.tabInProgress : '🔴 ' + t.tabOpenActions}
                    </span>
                  </div>
                </div>

                {/* What is Wrong & Why is this Risky */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 font-bold block">{t.whatIsWrong}</span>
                    <p className="text-[#0f172a] font-bold text-sm sm:text-base mt-0.5">
                      {problem.whatIsWrong}
                    </p>
                  </div>

                  {problem.whyIsThisRisky && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-0.5">
                      <span className="text-blue-900 font-bold block text-xs">
                        {t.whyIsThisRiskyLabel}
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

                {/* Responsible Role & Due Date Info Bar */}
                <div className="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>{t.roleLabel}:</span>
                      <strong className="text-blue-900 font-extrabold">{problem.responsibleRole || 'Shift Lead'}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.dueDateLabel}:</span>
                      <strong className="text-slate-900 font-extrabold">{problem.dueDate || '2026-10-25'}</strong>
                    </div>
                  </div>

                  {!isFixed && (
                    <button
                      onClick={() => {
                        setAssigningProblem(problem);
                        setSelectedRole(problem.responsibleRole || 'Shift Lead');
                        setSelectedDueDate(problem.dueDate || '2026-10-25');
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-blue-700 rounded-lg border border-slate-200 font-bold transition-colors text-[11px]"
                    >
                      Edit Role / Due Date ✎
                    </button>
                  )}
                </div>

                {/* BEFORE & AFTER PHOTO COMPARISON */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-extrabold text-[#0f172a] block">
                    {t.photoComparisonTitle}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Before Photo */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-center">
                      <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full inline-block">
                        {t.beforePhoto}
                      </span>
                      {problem.beforePhotoUrl || problem.photoPreview ? (
                        <div className="w-full h-32 rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center">
                          <img
                            src={problem.beforePhotoUrl || problem.photoPreview}
                            alt="Before Hazard"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-32 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center p-2 text-slate-500 text-[11px]">
                          <Camera className="w-6 h-6 text-slate-400 mb-1" />
                          <span>Initial inspection evidence</span>
                        </div>
                      )}
                    </div>

                    {/* After Photo */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-center">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                        {t.afterPhoto}
                      </span>
                      {problem.afterPhotoUrl ? (
                        <div className="w-full h-32 rounded-lg bg-emerald-950 overflow-hidden flex items-center justify-center border border-emerald-300">
                          <img
                            src={problem.afterPhotoUrl}
                            alt="After Fix"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-32 rounded-lg bg-emerald-50/50 border border-dashed border-emerald-200 flex flex-col items-center justify-center p-2 text-emerald-700 text-[11px]">
                          <Camera className="w-6 h-6 text-emerald-500 mb-1" />
                          <label className="cursor-pointer font-bold underline hover:text-emerald-900 mt-1">
                            {t.uploadAfterPhotoBtn}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleUploadAfterPhoto(e, problem.id)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* FOLLOW-UP AUDIT RESULT (Shown when Fixed) */}
                {isFixed && (
                  <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="font-extrabold text-emerald-950">
                        {t.followUpAuditTitle}: {t.followUpSatisfactory}
                      </span>
                    </div>
                    <p className="text-emerald-900">
                      {t.followUpAuditedBy}: <strong>{problem.followUpInspector || 'Safety Inspector'}</strong> on {problem.fixedDate || 'Today'}.
                    </p>
                    {problem.followUpNotes && (
                      <p className="text-emerald-800 italic text-[11px]">
                        "{problem.followUpNotes}"
                      </p>
                    )}
                  </div>
                )}

                {/* ACTION BUTTONS */}
                {!isFixed && (
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {/* If Open, offer Start Work */}
                    {!isInProgress && (
                      <button
                        onClick={() => handleStartWork(problem)}
                        className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        {t.btnStartAction}
                      </button>
                    )}

                    {/* Complete & Verify Fix (Requires Human Confirmation) */}
                    <button
                      onClick={() => handleOpenConfirmModal(problem)}
                      className="flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                    >
                      <Check className="w-5 h-5 stroke-[3]" />
                      {t.btnCompleteAction}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: HUMAN CONFIRMATION & VERIFICATION SIGN-OFF */}
      {confirmingProblem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-emerald-400 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl text-left animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0f172a]">
                    {t.humanConfirmTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.humanConfirmSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConfirmingProblem(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-950 block">Problem to close:</span>
              <p className="text-emerald-900 mt-0.5">"{confirmingProblem.whatIsWrong}" at {confirmingProblem.workArea}</p>
            </div>

            {/* Verifier Info Form */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  {t.verifierNameLabel}:
                </label>
                <input
                  type="text"
                  value={verifierName}
                  onChange={(e) => setVerifierName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Arjun Kumar"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  {t.verifierRoleLabel}:
                </label>
                <select
                  value={verifierRole}
                  onChange={(e) => setVerifierRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Shift Lead">{t.roleShiftLead}</option>
                  <option value="EHS Specialist">{t.roleEHS}</option>
                  <option value="Maintenance Tech">{t.roleMaintenance}</option>
                  <option value="Warehouse Logistics Mgr">{t.roleLogistics}</option>
                  <option value="Plant Operations Director">{t.roleOpsDirector}</option>
                </select>
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  Follow-up Inspection Notes:
                </label>
                <input
                  type="text"
                  value={followUpNotesInput}
                  onChange={(e) => setFollowUpNotesInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Upload After Photo Option */}
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  {t.afterPhoto}:
                </label>
                <div className="flex items-center gap-2">
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span>Upload Verification Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => setAfterPhotoInput(reader.result as string);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {afterPhotoInput && (
                    <span className="text-emerald-700 font-extrabold text-[11px] flex items-center gap-1">
                      ✓ Photo attached
                    </span>
                  )}
                </div>
              </div>

              {/* Required Human Certification Checkbox */}
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-2.5 mt-2">
                <input
                  type="checkbox"
                  id="certify-chk"
                  checked={hasCertified}
                  onChange={(e) => setHasCertified(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 mt-0.5 cursor-pointer"
                />
                <label htmlFor="certify-chk" className="text-amber-950 font-bold cursor-pointer select-none leading-relaxed">
                  {t.certifyCheckboxLabel}
                </label>
              </div>
            </div>

            {/* Confirm & Cancel Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCompleteAction}
                disabled={!hasCertified || !verifierName.trim()}
                className={`w-full py-3.5 px-6 font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all ${
                  hasCertified && verifierName.trim()
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                {t.btnConfirmDone}
              </button>

              <button
                onClick={() => setConfirmingProblem(null)}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ASSIGN RESPONSIBLE ROLE & DUE DATE */}
      {assigningProblem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-blue-400 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#0f172a]">
                Assign Role &amp; Target Due Date
              </h3>
              <button
                onClick={() => setAssigningProblem(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  {t.roleLabel}:
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="Shift Lead">{t.roleShiftLead}</option>
                  <option value="EHS Specialist">{t.roleEHS}</option>
                  <option value="Maintenance Tech">{t.roleMaintenance}</option>
                  <option value="Warehouse Logistics Mgr">{t.roleLogistics}</option>
                  <option value="Plant Operations Director">{t.roleOpsDirector}</option>
                </select>
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  {t.dueDateLabel}:
                </label>
                <input
                  type="date"
                  value={selectedDueDate}
                  onChange={(e) => setSelectedDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleSaveAssignment}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-xs transition-colors"
              >
                Save Assignment
              </button>
              <button
                onClick={() => setAssigningProblem(null)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
