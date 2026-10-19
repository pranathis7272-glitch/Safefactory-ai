import React, { useState } from 'react';
import { CorrectiveAction, ActionStatus, SeverityLevel, ZoneId } from '../types';
import { FACTORY_ZONES } from '../data/seedData';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  UserCheck,
  ShieldCheck,
  Calendar,
  Filter,
  Check,
  Eye,
  FileCheck2,
  Info,
} from 'lucide-react';

interface ActionTrackerViewProps {
  actions: CorrectiveAction[];
  onUpdateAction: (action: CorrectiveAction) => void;
  onCreateAction: (action: CorrectiveAction) => void;
  highlightedActionId?: string | null;
}

export const ActionTrackerView: React.FC<ActionTrackerViewProps> = ({
  actions,
  onUpdateAction,
  onCreateAction,
  highlightedActionId,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [zoneFilter, setZoneFilter] = useState<string>('ALL');

  // Modals
  const [isCreatingAction, setIsCreatingAction] = useState(false);
  const [completingAction, setCompletingAction] = useState<CorrectiveAction | null>(null);

  // New Action Form State
  const [newActionForm, setNewActionForm] = useState<{
    title: string;
    description: string;
    zoneId: ZoneId;
    responsibleRole: CorrectiveAction['responsibleRole'];
    assigneeName: string;
    dueDate: string;
    priority: SeverityLevel;
  }>({
    title: '',
    description: '',
    zoneId: 'ZONE_D',
    responsibleRole: 'Warehouse Logistics Mgr',
    assigneeName: 'Derrick Vance',
    dueDate: '2026-10-25',
    priority: 'High',
  });

  // Complete / Follow-up Form State
  const [completionForm, setCompletionForm] = useState({
    inspectorName: 'Marcus Vance (EHS Specialist)',
    followUpDate: '2026-10-18',
    findings: 'Physical walkthrough and optical log inspection verified full compliance. No unvested personnel detected.',
    outcome: 'Satisfactory' as 'Satisfactory' | 'Needs Escalation',
  });

  const filteredActions = actions.filter((act) => {
    if (statusFilter !== 'ALL' && act.status !== statusFilter) return false;
    if (zoneFilter !== 'ALL' && act.zoneId !== zoneFilter) return false;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionForm.title || !newActionForm.description) return;

    const zoneObj = FACTORY_ZONES.find((z) => z.id === newActionForm.zoneId);
    const newId = `ACT-${Math.floor(100 + Math.random() * 900)}`;

    const created: CorrectiveAction = {
      id: newId,
      title: newActionForm.title,
      description: newActionForm.description,
      zoneId: newActionForm.zoneId,
      zoneName: zoneObj?.name || 'General Factory Zone',
      linkedIncidentIds: [],
      responsibleRole: newActionForm.responsibleRole,
      assigneeName: newActionForm.assigneeName,
      dueDate: newActionForm.dueDate,
      priority: newActionForm.priority,
      status: 'Open',
      createdAt: new Date().toISOString().substring(0, 10),
      isSampleData: false,
    };

    onCreateAction(created);
    setIsCreatingAction(false);
    setNewActionForm({
      title: '',
      description: '',
      zoneId: 'ZONE_D',
      responsibleRole: 'Shift Lead',
      assigneeName: '',
      dueDate: '2026-10-25',
      priority: 'High',
    });
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completingAction) return;

    const updated: CorrectiveAction = {
      ...completingAction,
      status: 'Completed',
      completedAt: new Date().toISOString().substring(0, 10),
      followUpDate: completionForm.followUpDate,
      followUpInspector: completionForm.inspectorName,
      followUpFindings: completionForm.findings,
      followUpStatus: completionForm.outcome,
    };

    onUpdateAction(updated);
    setCompletingAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice with Critical Risk Persistence Disclosure */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Prevention Action Tracker &amp; Verification Loop
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assign corrective engineering controls, track accountable roles, and record post-completion
                  follow-up verification inspections to prevent hazard resurgence.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCreatingAction(true)}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition-all self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            New Corrective Action
          </button>
        </div>

        {/* Hazard Elimination Fallacy Disclosure */}
        <div className="bg-cyan-950/30 border border-cyan-800/60 rounded-lg p-3 text-xs text-cyan-200/90 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300">Continuous Assurance Doctrine:</strong> Marking a corrective action
            "Completed" does <em>not</em> prove that an underlying systemic risk has been eliminated. The Safety Memory
            Engine maintains long-term recurrence tracking and requires documented follow-up reviews.
          </div>
        </div>
      </div>

      {/* Filter and Status Tally Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setStatusFilter('ALL')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'ALL'
              ? 'bg-slate-800 border-teal-500 text-slate-100'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-[11px] block font-medium">All Corrective Actions</span>
          <span className="text-xl font-bold text-slate-100 mt-0.5 block">{actions.length}</span>
        </div>

        <div
          onClick={() => setStatusFilter('In Progress')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'In Progress'
              ? 'bg-amber-950/60 border-amber-500 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-[11px] block font-medium">In Progress (Active)</span>
          <span className="text-xl font-bold text-amber-400 mt-0.5 block">
            {actions.filter((a) => a.status === 'In Progress').length}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('Completed')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'Completed'
              ? 'bg-teal-950/60 border-teal-500 text-teal-200'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-[11px] block font-medium">Completed &amp; Verified</span>
          <span className="text-xl font-bold text-teal-400 mt-0.5 block">
            {actions.filter((a) => a.status === 'Completed').length}
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('Open')}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'Open'
              ? 'bg-slate-800 border-cyan-500 text-cyan-200'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-[11px] block font-medium">Pending Assignment</span>
          <span className="text-xl font-bold text-cyan-400 mt-0.5 block">
            {actions.filter((a) => a.status === 'Open').length}
          </span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter Zone:
          </span>
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="ALL">All Manufacturing Zones</option>
            {FACTORY_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name.split('—')[0].trim()}
              </option>
            ))}
          </select>
        </div>

        {(statusFilter !== 'ALL' || zoneFilter !== 'ALL') && (
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setZoneFilter('ALL');
            }}
            className="text-slate-400 hover:text-slate-200 underline text-xs"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Actions Cards / List */}
      <div className="space-y-4">
        {filteredActions.map((action) => {
          const isHighlighted = highlightedActionId === action.id;
          const isComplete = action.status === 'Completed';

          return (
            <div
              key={action.id}
              className={`bg-slate-900 border rounded-xl p-5 transition-all ${
                isHighlighted
                  ? 'border-teal-400 ring-2 ring-teal-400/40 shadow-xl'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-teal-400 font-bold text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {action.id}
                  </span>
                  <span className="font-bold text-sm text-slate-100">{action.title}</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {action.zoneName.split('—')[0].trim()}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      action.priority === 'Critical'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : action.priority === 'High'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}
                  >
                    {action.priority} Priority
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      isComplete
                        ? 'bg-teal-950 text-teal-300 border border-teal-800'
                        : action.status === 'In Progress'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {action.status}
                  </span>

                  {!isComplete && (
                    <button
                      onClick={() => setCompletingAction(action)}
                      className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Complete &amp; Record Follow-up
                    </button>
                  )}
                </div>
              </div>

              {/* Action Description */}
              <p className="text-xs text-slate-300 my-3 leading-relaxed">
                {action.description}
              </p>

              {/* Accountability & Due Dates */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Responsible Role</span>
                  <span className="font-semibold text-slate-200">{action.responsibleRole}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Designated Lead</span>
                  <span className="font-semibold text-slate-200">{action.assigneeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Target Due Date</span>
                  <span className="font-mono text-amber-400 font-semibold">{action.dueDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Linked Recurrence Incidents</span>
                  <span className="font-mono text-teal-400 font-semibold">
                    {action.linkedIncidentIds.length} Linked Events
                  </span>
                </div>
              </div>

              {/* Follow-up Verification Details if Completed */}
              {isComplete && action.followUpInspector && (
                <div className="mt-3 p-3 bg-teal-950/25 border border-teal-900/60 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-teal-300 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      Documented Follow-up Verification Audit:
                    </span>
                    <span className="text-[10px] font-mono text-teal-400">
                      Inspected: {action.followUpDate} • Status: {action.followUpStatus}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-mono">
                    "{action.followUpFindings}" — Verified by {action.followUpInspector}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Create Corrective Action */}
      {isCreatingAction && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                Initiate Safety Corrective Action
              </h3>
              <button
                onClick={() => setIsCreatingAction(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Action Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Install optical barrier turnstile at dock entrance"
                  value={newActionForm.title}
                  onChange={(e) => setNewActionForm({ ...newActionForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Zone:</label>
                <select
                  value={newActionForm.zoneId}
                  onChange={(e) => setNewActionForm({ ...newActionForm, zoneId: e.target.value as ZoneId })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                >
                  {FACTORY_ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Responsible Role:</label>
                  <select
                    value={newActionForm.responsibleRole}
                    onChange={(e) =>
                      setNewActionForm({
                        ...newActionForm,
                        responsibleRole: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                  >
                    <option value="Warehouse Logistics Mgr">Warehouse Logistics Mgr</option>
                    <option value="Shift Lead">Shift Lead</option>
                    <option value="EHS Specialist">EHS Specialist</option>
                    <option value="Maintenance Tech">Maintenance Tech</option>
                    <option value="Plant Operations Director">Plant Operations Director</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Assignee Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Derrick Vance"
                    value={newActionForm.assigneeName}
                    onChange={(e) => setNewActionForm({ ...newActionForm, assigneeName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Priority:</label>
                  <select
                    value={newActionForm.priority}
                    onChange={(e) =>
                      setNewActionForm({ ...newActionForm, priority: e.target.value as SeverityLevel })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Target Due Date:</label>
                  <input
                    type="date"
                    required
                    value={newActionForm.dueDate}
                    onChange={(e) => setNewActionForm({ ...newActionForm, dueDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Action Description &amp; Scope:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the engineering or administrative control steps to be implemented..."
                  value={newActionForm.description}
                  onChange={(e) => setNewActionForm({ ...newActionForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingAction(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded"
                >
                  Create Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Complete Action & Record Follow-up Review */}
      {completingAction && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Record Completion &amp; Follow-up Verification
                </h3>
                <span className="text-[11px] text-teal-400 font-mono mt-0.5 block">
                  {completingAction.id} — {completingAction.title}
                </span>
              </div>
              <button
                onClick={() => setCompletingAction(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-950/30 border border-amber-800/60 p-2.5 rounded text-xs text-amber-200/90">
              ⚠️ Completing this action marks the implementation step. Record the follow-up audit inspector and observations to maintain the memory verification feedback loop.
            </div>

            <form onSubmit={handleCompleteSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Follow-up Inspector:</label>
                  <input
                    type="text"
                    required
                    value={completionForm.inspectorName}
                    onChange={(e) =>
                      setCompletionForm({ ...completionForm, inspectorName: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Verification Date:</label>
                  <input
                    type="date"
                    required
                    value={completionForm.followUpDate}
                    onChange={(e) =>
                      setCompletionForm({ ...completionForm, followUpDate: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Audit Observations &amp; Evidence:</label>
                <textarea
                  rows={3}
                  required
                  value={completionForm.findings}
                  onChange={(e) => setCompletionForm({ ...completionForm, findings: e.target.value })}
                  placeholder="Record what was inspected (e.g. spot-checked 12 workers, zero high-vis infractions recorded)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Verification Outcome:</label>
                <select
                  value={completionForm.outcome}
                  onChange={(e) =>
                    setCompletionForm({
                      ...completionForm,
                      outcome: e.target.value as 'Satisfactory' | 'Needs Escalation',
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
                >
                  <option value="Satisfactory">Satisfactory (Control effective)</option>
                  <option value="Needs Escalation">Needs Escalation (Partial recurrence observed)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCompletingAction(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded"
                >
                  Save Verification Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
