import React, { useState } from 'react';
import { IncidentRecord, CorrectiveAction, RecurrencePattern, ZoneId } from '../types';
import { FACTORY_ZONES } from '../data/seedData';
import {
  Brain,
  Repeat,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Link2,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertOctagon,
  Eye,
} from 'lucide-react';

interface SafetyMemoryViewProps {
  incidents: IncidentRecord[];
  actions: CorrectiveAction[];
  patterns: RecurrencePattern[];
  onSelectAction: (actionId: string) => void;
  onOpenNewIncidentModal: () => void;
}

export const SafetyMemoryView: React.FC<SafetyMemoryViewProps> = ({
  incidents,
  actions,
  patterns,
  onSelectAction,
  onOpenNewIncidentModal,
}) => {
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<ZoneId | 'ALL'>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [selectedShiftFilter, setSelectedShiftFilter] = useState<string>('ALL');
  const [expandedPatternId, setExpandedPatternId] = useState<string | null>(
    patterns[0]?.id || null
  );

  const [activeIncidentModal, setActiveIncidentModal] = useState<IncidentRecord | null>(null);

  // Filtered patterns
  const filteredPatterns = patterns.filter((pat) => {
    if (selectedZoneFilter !== 'ALL' && pat.zoneId !== selectedZoneFilter) return false;
    if (selectedCategoryFilter !== 'ALL' && pat.category !== selectedCategoryFilter) return false;
    if (selectedShiftFilter !== 'ALL' && pat.dominantShift !== selectedShiftFilter) return false;
    return true;
  });

  // Filtered individual incident records
  const verifiedIncidents = incidents.filter(
    (inc) => inc.verificationStatus === 'Verified Incident'
  );

  const displayedIncidents = verifiedIncidents.filter((inc) => {
    if (selectedZoneFilter !== 'ALL' && inc.zoneId !== selectedZoneFilter) return false;
    if (selectedCategoryFilter !== 'ALL' && inc.category !== selectedCategoryFilter) return false;
    if (selectedShiftFilter !== 'ALL' && inc.shift !== selectedShiftFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Safety Memory Engine — Recurrence &amp; Prevention Loop
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  The central intelligence hub connecting verified incidents across zones and shifts, calculating
                  surge dynamics, explaining recurrence evidence, and tracking preventive corrective actions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewIncidentModal}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              + Log Verified Incident
            </button>
          </div>
        </div>

        {/* Global Memory Engine Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Active Recurrence Clusters</span>
            <span className="text-xl font-bold text-amber-400 mt-0.5 block">
              {patterns.filter((p) => p.hasSufficientData && p.recentCount30d >= 2).length} Zones Flagged
            </span>
            <span className="text-[10px] text-slate-500">Requires targeted containment</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Verified Historical Incidents</span>
            <span className="text-xl font-bold text-slate-100 mt-0.5 block">
              {verifiedIncidents.length} Records
            </span>
            <span className="text-[10px] text-teal-400">100% human-verified</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Peak Recurrence Zone</span>
            <span className="text-xl font-bold text-red-400 mt-0.5 block">
              Zone D (Loading Dock)
            </span>
            <span className="text-[10px] text-slate-500">4 events • Night Shift focus</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Action Loop Coverage</span>
            <span className="text-xl font-bold text-teal-400 mt-0.5 block">
              {Math.round(
                (patterns.filter((p) => p.activeCorrectiveActionId).length /
                  Math.max(1, patterns.filter((p) => p.hasSufficientData).length)) *
                  100
              )}
              % Linked
            </span>
            <span className="text-[10px] text-slate-500">Corrective actions assigned</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            Filter Memory by:
          </div>

          {/* Zone Selector */}
          <select
            value={selectedZoneFilter}
            onChange={(e) => setSelectedZoneFilter(e.target.value as ZoneId | 'ALL')}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="ALL">All Zones</option>
            {FACTORY_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name.split('—')[0].trim()}
              </option>
            ))}
          </select>

          {/* Category Selector */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="ALL">All Hazard Categories</option>
            <option value="PPE Non-compliance">PPE Non-compliance</option>
            <option value="Fall/Trip Hazard">Fall/Trip Hazard</option>
            <option value="Chemical/Spill">Chemical/Spill</option>
            <option value="Machine Guarding">Machine Guarding</option>
            <option value="Blocked Egress">Blocked Egress</option>
          </select>

          {/* Shift Selector */}
          <select
            value={selectedShiftFilter}
            onChange={(e) => setSelectedShiftFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="ALL">All Shifts</option>
            <option value="Morning (06:00 - 14:00)">Morning Shift</option>
            <option value="Afternoon (14:00 - 22:00)">Afternoon Shift</option>
            <option value="Night (22:00 - 06:00)">Night Shift (Graveyard)</option>
          </select>
        </div>

        {(selectedZoneFilter !== 'ALL' ||
          selectedCategoryFilter !== 'ALL' ||
          selectedShiftFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSelectedZoneFilter('ALL');
              setSelectedCategoryFilter('ALL');
              setSelectedShiftFilter('ALL');
            }}
            className="text-slate-400 hover:text-slate-200 underline text-xs"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Recurrence Patterns Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Correlated Risk Patterns &amp; Recurrence Alerts
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {filteredPatterns.length} pattern cluster{filteredPatterns.length === 1 ? '' : 's'} identified
          </span>
        </div>

        {filteredPatterns.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
            No recurring pattern clusters match the active filters.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatterns.map((pattern) => {
              const isExpanded = expandedPatternId === pattern.id;
              const linkedAction = actions.find((a) => a.id === pattern.activeCorrectiveActionId);
              const isCritical = pattern.calculatedRiskScore >= 75;

              return (
                <div
                  key={pattern.id}
                  className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${
                    isCritical
                      ? 'border-red-500/40 shadow-lg shadow-red-950/20'
                      : pattern.calculatedRiskScore >= 55
                      ? 'border-amber-500/40'
                      : 'border-slate-800'
                  }`}
                >
                  {/* Pattern Header Card */}
                  <div
                    onClick={() => setExpandedPatternId(isExpanded ? null : pattern.id)}
                    className="p-4 cursor-pointer hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                          isCritical
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        <AlertOctagon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-slate-100">{pattern.zoneName}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium border border-slate-700">
                            {pattern.category}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                              isCritical
                                ? 'bg-red-950 text-red-300 border border-red-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            Score: {pattern.calculatedRiskScore}/100 ({pattern.riskTier})
                          </span>
                        </div>

                        {/* Shift and Surge Tagline */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-teal-400" />
                            Shift Dominance: <strong>{pattern.dominantShift}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                            30-Day Trend: <strong>{pattern.recentCount30d} events</strong> (earlier baseline: {pattern.earlierCount30d})
                            {pattern.rateChangePct > 0 && (
                              <span className="text-red-400 font-bold ml-1">+{pattern.rateChangePct}% surge</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      {linkedAction ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAction(linkedAction.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Link2 className="w-3.5 h-3.5" />
                          Linked Action: {linkedAction.id} ({linkedAction.status})
                        </button>
                      ) : (
                        <span className="text-xs text-amber-400/80 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                          ⚠️ No Action Assigned
                        </span>
                      )}

                      <ChevronRight
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-90 text-teal-400' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Recurrence Explanation & Evidence Breakdown */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-4 text-xs">
                      {/* Evidence Rationale Box */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5">
                        <span className="text-slate-300 font-bold block mb-1 flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5 text-teal-400" />
                          Safety Memory Evidence Analysis:
                        </span>
                        <p className="text-slate-300 leading-relaxed font-mono text-[11.5px]">
                          {pattern.evidenceExplanation}
                        </p>
                      </div>

                      {/* Correlated Verified Incidents Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                            Linked Verified Incident Records ({pattern.incidentIds.length}):
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Click any incident to view detailed findings
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {pattern.incidentIds.map((id) => {
                            const inc = incidents.find((i) => i.id === id);
                            if (!inc) return null;
                            return (
                              <div
                                key={inc.id}
                                onClick={() => setActiveIncidentModal(inc)}
                                className="p-3 bg-slate-900 border border-slate-800 hover:border-teal-500/60 rounded-lg cursor-pointer transition-colors group flex items-start justify-between gap-3"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-teal-400 font-semibold text-[11px]">
                                      {inc.id}
                                    </span>
                                    <span className="text-[10px] text-slate-400">{inc.date.split(' ')[0]}</span>
                                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
                                      {inc.shift.split('(')[0].trim()}
                                    </span>
                                  </div>
                                  <div className="text-slate-200 font-medium text-xs group-hover:text-cyan-300 transition-colors">
                                    {inc.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 line-clamp-1">
                                    {inc.visualEvidence}
                                  </div>
                                </div>
                                <Eye className="w-4 h-4 text-slate-500 group-hover:text-teal-400 shrink-0 mt-1" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Verified Incidents Master Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Verified Incident History Registry
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Audited records entering the Safety Memory Engine. Uncertain detections are isolated until reviewed.
            </p>
          </div>
          <span className="text-xs text-slate-400">{displayedIncidents.length} Records Shown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                <th className="p-2.5">Incident ID</th>
                <th className="p-2.5">Date &amp; Shift</th>
                <th className="p-2.5">Zone</th>
                <th className="p-2.5">Hazard Category</th>
                <th className="p-2.5">Severity</th>
                <th className="p-2.5">Action Status</th>
                <th className="p-2.5">Reviewed By</th>
                <th className="p-2.5 text-right">Inspection Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {displayedIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setActiveIncidentModal(inc)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-2.5 font-mono text-teal-400 font-semibold">{inc.id}</td>
                  <td className="p-2.5 text-slate-300">
                    <div>{inc.date}</div>
                    <div className="text-[10px] text-slate-500">{inc.shift.split('(')[0]}</div>
                  </td>
                  <td className="p-2.5 text-slate-200 font-medium">
                    {inc.zoneName.split('—')[0].trim()}
                  </td>
                  <td className="p-2.5 text-slate-300">{inc.category}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inc.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : inc.severity === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : inc.severity === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        inc.correctiveActionStatus === 'Action Completed' ||
                        inc.correctiveActionStatus === 'Follow-up Verified'
                          ? 'bg-teal-950 text-teal-300 border border-teal-800'
                          : inc.correctiveActionStatus === 'Action In Progress'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {inc.correctiveActionStatus}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-400 text-[11px]">
                    {inc.reviewedBy || 'EHS Safety Team'}
                  </td>
                  <td className="p-2.5 text-right">
                    <button className="text-teal-400 hover:text-teal-300 text-xs font-semibold">
                      Inspect &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Detail Modal */}
      {activeIncidentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-teal-400 font-bold text-sm">
                    {activeIncidentModal.id}
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {activeIncidentModal.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 mt-1">{activeIncidentModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveIncidentModal(null)}
                className="text-slate-400 hover:text-slate-200 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Zone</span>
                <span className="font-semibold text-slate-200">{activeIncidentModal.zoneName}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Timestamp &amp; Shift</span>
                <span className="font-semibold text-slate-200">
                  {activeIncidentModal.date} ({activeIncidentModal.shift.split('(')[0]})
                </span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Severity</span>
                <span className="font-bold text-amber-400">{activeIncidentModal.severity}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Action Status</span>
                <span className="font-bold text-teal-400">
                  {activeIncidentModal.correctiveActionStatus}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-300 block mb-1">Visual Evidence:</span>
                <p className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200 font-mono text-[11px]">
                  {activeIncidentModal.visualEvidence}
                </p>
              </div>

              {activeIncidentModal.uncertaintyNotes && (
                <div>
                  <span className="font-semibold text-slate-300 block mb-1">Uncertainty Notes:</span>
                  <p className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-400 text-[11px]">
                    {activeIncidentModal.uncertaintyNotes}
                  </p>
                </div>
              )}

              {activeIncidentModal.recommendation && (
                <div>
                  <span className="font-semibold text-slate-300 block mb-1">Recommendation:</span>
                  <p className="bg-teal-950/30 p-2.5 rounded border border-teal-900/60 text-teal-300 text-[11px]">
                    💡 {activeIncidentModal.recommendation}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500">
                Verified by {activeIncidentModal.reviewedBy || 'Safety Officer'}
              </span>
              <button
                onClick={() => setActiveIncidentModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
