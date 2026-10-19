import React from 'react';
import { IncidentRecord, CorrectiveAction, RecurrencePattern, ZoneId } from '../types';
import { FactoryZoneMap } from './FactoryZoneMap';
import { FACTORY_ZONES } from '../data/seedData';
import {
  ShieldAlert,
  ClipboardList,
  Repeat,
  AlertTriangle,
  TrendingUp,
  Brain,
  Camera,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  Database,
  RotateCcw,
} from 'lucide-react';

interface OverviewDashboardProps {
  incidents: IncidentRecord[];
  actions: CorrectiveAction[];
  patterns: RecurrencePattern[];
  selectedZone: ZoneId | 'ALL';
  onSelectZone: (zoneId: ZoneId | 'ALL') => void;
  onNavigateTab: (tab: string) => void;
  onResetSeedData: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  incidents,
  actions,
  patterns,
  selectedZone,
  onSelectZone,
  onNavigateTab,
  onResetSeedData,
}) => {
  const verifiedIncidents = incidents.filter((i) => i.verificationStatus === 'Verified Incident');
  const pendingIncidents = incidents.filter((i) => i.verificationStatus === 'Pending AI Review');
  const openActions = actions.filter((a) => a.status === 'Open' || a.status === 'In Progress');
  const overdueActions = actions.filter((a) => a.status === 'Overdue');

  // Compute zone risk scores dictionary for the map
  const zoneRiskScores = FACTORY_ZONES.reduce((acc, zone) => {
    const zonePatterns = patterns.filter((p) => p.zoneId === zone.id);
    const maxScore = zonePatterns.length > 0 ? Math.max(...zonePatterns.map((p) => p.calculatedRiskScore)) : 25;
    let tier = 'Low';
    if (maxScore >= 75) tier = 'Critical';
    else if (maxScore >= 55) tier = 'High';
    else if (maxScore >= 35) tier = 'Medium';

    acc[zone.id] = {
      score: maxScore,
      tier,
      activeIssues: zonePatterns.filter((p) => p.hasSufficientData).length,
    };
    return acc;
  }, {} as Record<ZoneId, { score: number; tier: string; activeIssues: number }>);

  // Peak risk zone
  const sortedZones = [...FACTORY_ZONES].sort(
    (a, b) => (zoneRiskScores[b.id]?.score || 0) - (zoneRiskScores[a.id]?.score || 0)
  );
  const peakZone = sortedZones[0];

  // Incidents count sample vs live
  const sampleCount = incidents.filter((i) => i.isSampleData).length;
  const liveCount = incidents.filter((i) => !i.isSampleData).length;

  return (
    <div className="space-y-6">
      {/* Sample vs Actual Data Indicator Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Data Source Environment:</strong> Blending <strong>{sampleCount} Seeded Demonstration Records</strong>{' '}
            (establishing historical baselines) with <strong>{liveCount} Live Audited Records</strong>.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500 font-mono">Storage: Browser Persistent Memory</span>
          <button
            onClick={onResetSeedData}
            className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Standard Demo State
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Verified Incidents</span>
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-100">{verifiedIncidents.length}</span>
            <span className="text-xs text-slate-400 ml-1">audited events</span>
          </div>
          <div className="text-[11px] text-teal-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>{pendingIncidents.length} Pending AI Review</span>
            <button
              onClick={() => onNavigateTab('safetyMemory')}
              className="text-slate-400 hover:text-slate-200 underline"
            >
              View Registry
            </button>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Active Recurrence Alerts</span>
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
              <Repeat className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-red-400">
              {patterns.filter((p) => p.hasSufficientData && p.recentCount30d >= 2).length}
            </span>
            <span className="text-xs text-slate-400 ml-1">repeat hazard zones</span>
          </div>
          <div className="text-[11px] text-amber-300 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Peak: Zone D Loading Dock</span>
            <button
              onClick={() => onNavigateTab('safetyMemory')}
              className="text-slate-400 hover:text-slate-200 underline"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Open Corrective Actions</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <ClipboardList className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-amber-400">{openActions.length}</span>
            <span className="text-xs text-slate-400 ml-1">in execution</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-red-400 font-semibold">{overdueActions.length} Overdue</span>
            <button
              onClick={() => onNavigateTab('actionTracker')}
              className="text-slate-400 hover:text-slate-200 underline"
            >
              Track Actions
            </button>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Decision Priority Index</span>
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-cyan-400">
              {zoneRiskScores[peakZone.id]?.score || 60}
              <span className="text-sm font-normal text-slate-500">/100</span>
            </span>
            <span className="text-xs text-amber-400 ml-2 font-bold uppercase">
              {zoneRiskScores[peakZone.id]?.tier} Tier
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Safety Scoring Model</span>
            <button
              onClick={() => onNavigateTab('riskPrioritization')}
              className="text-slate-400 hover:text-slate-200 underline"
            >
              Formula
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Factory Visual Topology Map */}
      <FactoryZoneMap
        selectedZone={selectedZone}
        onSelectZone={onSelectZone}
        zoneRiskScores={zoneRiskScores}
      />

      {/* Split Charts: Zone Risk Ranking + Recurrence Surge Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Zone Risk Prioritization Bar Chart (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Zone-Wise Decision Risk Score
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Calculated from severity potential, 30-day recurrence, and shift exposure.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('riskPrioritization')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              Tune Weights &rarr;
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {sortedZones.map((z) => {
              const data = zoneRiskScores[z.id];
              const score = data?.score || 20;
              const isSelected = selectedZone === z.id;

              return (
                <div
                  key={z.id}
                  onClick={() => onSelectZone(z.id)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/80 border-cyan-400 shadow'
                      : 'bg-slate-950/60 border-slate-850 hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200">{z.name}</span>
                    <span
                      className={`font-mono font-bold ${
                        score >= 75
                          ? 'text-red-400'
                          : score >= 55
                          ? 'text-amber-400'
                          : 'text-teal-400'
                      }`}
                    >
                      {score}/100 ({data?.tier})
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score >= 75
                          ? 'bg-gradient-to-r from-red-500 to-rose-600'
                          : score >= 55
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                          : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                      }`}
                      style={{ width: `${Math.max(5, score)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Recurrence Surge Trend Chart (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                <Repeat className="w-4 h-4 text-teal-400" />
                Safety Memory Recurrence Clusters
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Comparing recent 30-day frequency with earlier baseline period.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('safetyMemory')}
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              Open Engine &rarr;
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {patterns.slice(0, 4).map((pattern) => {
              const isSurge = pattern.rateChangePct > 0;
              return (
                <div
                  key={pattern.id}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800/90 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">
                      {pattern.zoneName.split('—')[0].trim()} • {pattern.category}
                    </span>
                    <span
                      className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                        isSurge
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSurge ? `+${pattern.rateChangePct}% surge` : 'Stable'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Recent 30 Days: <strong className="text-slate-200">{pattern.recentCount30d} events</strong>
                    </span>
                    <span>
                      Prior 30 Days Baseline: <strong className="text-slate-200">{pattern.earlierCount30d} events</strong>
                    </span>
                    <span className="text-teal-400 font-medium">Shift: {pattern.dominantShift.split('(')[0]}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                    "{pattern.evidenceExplanation}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Action Workflow Launchpad */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
          Direct Action Launchpad &amp; Workflow Loops
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigateTab('inspection')}
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-teal-500 rounded-xl text-left transition-all group"
          >
            <div className="p-2 w-fit bg-teal-500/10 text-teal-400 rounded-lg mb-2 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-300">
              Run AI Vision Audit
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Upload factory snapshot or use calibrated scenario to detect visible PPE and pass human verification gate.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('safetyMemory')}
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 rounded-xl text-left transition-all group"
          >
            <div className="p-2 w-fit bg-amber-500/10 text-amber-400 rounded-lg mb-2 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-slate-100 group-hover:text-amber-300">
              Explore Safety Memory
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review cross-shift recurrence correlations, examine mathematical evidence, and verify action feedback loops.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('simulator')}
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500 rounded-xl text-left transition-all group"
          >
            <div className="p-2 w-fit bg-cyan-500/10 text-cyan-400 rounded-lg mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-300">
              What-If Intervention Simulator
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test hypothetical barrier turnstiles, toolbox stand-downs, and floor demarcation under variable adherence.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
