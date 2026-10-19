import React, { useState } from 'react';
import { RiskFormulaWeights, ZoneId, SeverityLevel, RecurrencePattern } from '../types';
import { FACTORY_ZONES } from '../data/seedData';
import { calculateExplainableRiskScore, DEFAULT_RISK_WEIGHTS } from '../utils/safetyMemoryEngine';
import {
  Sliders,
  Calculator,
  ShieldAlert,
  Info,
  RotateCcw,
  Sparkles,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface RiskPrioritizationViewProps {
  weights: RiskFormulaWeights;
  onUpdateWeights: (newWeights: RiskFormulaWeights) => void;
  patterns: RecurrencePattern[];
}

export const RiskPrioritizationView: React.FC<RiskPrioritizationViewProps> = ({
  weights,
  onUpdateWeights,
  patterns,
}) => {
  const [selectedZoneDetail, setSelectedZoneDetail] = useState<ZoneId>('ZONE_D');

  const handleSliderChange = (
    field: 'severityWeight' | 'recurrenceWeight' | 'exposureWeight',
    val: number
  ) => {
    onUpdateWeights({
      ...weights,
      [field]: val,
    });
  };

  const handleResetWeights = () => {
    onUpdateWeights(DEFAULT_RISK_WEIGHTS);
  };

  // Compute breakdown for each zone
  const zoneBreakdowns = FACTORY_ZONES.map((zone) => {
    // Find highest recurrence or peak severity
    const matchingPatterns = patterns.filter((p) => p.zoneId === zone.id);
    const total30d = matchingPatterns.reduce((acc, p) => acc + p.recentCount30d, 0);

    let peakSeverity: SeverityLevel = 'Low';
    if (matchingPatterns.some((p) => p.riskTier === 'Critical')) peakSeverity = 'Critical';
    else if (matchingPatterns.some((p) => p.riskTier === 'High')) peakSeverity = 'High';
    else if (matchingPatterns.some((p) => p.riskTier === 'Medium')) peakSeverity = 'Medium';
    else if (zone.equipmentHazardTier === 'Severe') peakSeverity = 'High';

    const explanation = calculateExplainableRiskScore(peakSeverity, total30d, zone.id, weights);

    return {
      zone,
      total30d,
      peakSeverity,
      explanation,
    };
  }).sort((a, b) => b.explanation.finalScore - a.explanation.finalScore);

  const activeZoneData =
    zoneBreakdowns.find((z) => z.zone.id === selectedZoneDetail) || zoneBreakdowns[0];

  return (
    <div className="space-y-6">
      {/* Header with Mandatory Prototype Disclaimer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Explainable Risk Prioritization Engine
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Transparent multi-factor decision support. Review formula weights, mathematical deductions, and
                contextual rationales behind every assigned safety tier.
              </p>
            </div>
          </div>

          <button
            onClick={handleResetWeights}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            Reset Calibrated Weights
          </button>
        </div>

        {/* Standard Disclaimer */}
        <div className="bg-amber-950/40 border border-amber-800/80 rounded-lg p-3 text-xs text-amber-200/90 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Safety Intelligence Notice:</strong> The calculated risk scores
            are algorithmic prioritization aids to assist safety engineers in triaging facility interventions. They do
            <em>not</em> constitute a certified industrial safety standard (such as ISO 45001 or OSHA 1910) and must be
            validated by licensed EHS personnel.
          </div>
        </div>
      </div>

      {/* Weights Configurator & Formula Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-400" />
              Configurable Factor Weights
            </h3>
            <span className="text-[11px] text-teal-400 font-mono">
              Total Weight: {(weights.severityWeight + weights.recurrenceWeight + weights.exposureWeight).toFixed(2)}
            </span>
          </div>

          {/* Severity Weight */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Severity Factor (Ws):</span>
              <span className="text-teal-400 font-mono">
                {Math.round(weights.severityWeight * 100)}% ({weights.severityWeight.toFixed(2)})
              </span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.80"
              step="0.05"
              value={weights.severityWeight}
              onChange={(e) => handleSliderChange('severityWeight', parseFloat(e.target.value))}
              className="w-full accent-teal-400 bg-slate-950 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              Weight given to inherent hazard potential (Critical = 95, High = 72, Medium = 45).
            </p>
          </div>

          {/* Recurrence Weight */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800/80">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Recurrence Frequency (Wr):</span>
              <span className="text-amber-400 font-mono">
                {Math.round(weights.recurrenceWeight * 100)}% ({weights.recurrenceWeight.toFixed(2)})
              </span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.80"
              step="0.05"
              value={weights.recurrenceWeight}
              onChange={(e) => handleSliderChange('recurrenceWeight', parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-950 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              Weight penalizing repeat occurrences in the same zone within the 30-day window.
            </p>
          </div>

          {/* Exposure Weight */}
          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-800/80">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Exposure &amp; Machinery (We):</span>
              <span className="text-cyan-400 font-mono">
                {Math.round(weights.exposureWeight * 100)}% ({weights.exposureWeight.toFixed(2)})
              </span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.80"
              step="0.05"
              value={weights.exposureWeight}
              onChange={(e) => handleSliderChange('exposureWeight', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              Weight scaling with shift worker density and equipment hazard tier (plasma, forklifts, presses).
            </p>
          </div>

          {/* Formula Display Box */}
          <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-[10px] text-slate-500 uppercase block mb-1 font-sans font-bold">
              Active Linear Scoring Model
            </span>
            <div className="text-teal-300 font-bold">
              Risk Score = (S × {weights.severityWeight.toFixed(2)}) + (R × {weights.recurrenceWeight.toFixed(2)}) + (E × {weights.exposureWeight.toFixed(2)})
            </div>
          </div>
        </div>

        {/* Explainable Detail for Selected Zone (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Zone Deep-Dive Explanation:
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-0.5">
                {activeZoneData.zone.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                  activeZoneData.explanation.finalScore >= 75
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : activeZoneData.explanation.finalScore >= 55
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                }`}
              >
                Score: {activeZoneData.explanation.finalScore}/100 ({activeZoneData.explanation.tier})
              </span>
            </div>
          </div>

          {/* Calculation Step-by-Step */}
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Step-by-Step Mathematical Calculation:
            </span>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900 p-2.5 rounded border border-slate-800">
              {activeZoneData.explanation.calculationBreakdown}
            </div>
          </div>

          {/* Contributing Factors Table */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-300 block uppercase text-[11px] tracking-wide">
              Input Factor Contributions:
            </span>
            <div className="space-y-2">
              {activeZoneData.explanation.contributingFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-slate-200 block">{factor.label}</span>
                    <span className="text-[11px] text-slate-400">{factor.value}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      factor.impact === 'High'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : factor.impact === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-teal-950 text-teal-300 border border-teal-800'
                    }`}
                  >
                    {factor.impact} Impact
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Analytical Rationale */}
          <div className="p-3 bg-teal-950/20 border border-teal-900/60 rounded-lg text-xs text-slate-300">
            <span className="text-teal-400 font-bold block mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Prioritization Rationale:
            </span>
            <p className="leading-relaxed">{activeZoneData.explanation.rationale}</p>
          </div>
        </div>
      </div>

      {/* Comparative Priority Ranking Across All Zones */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              Facility Zone Priority Ranking (Live Updated)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked dynamically by the calibrated decision formula. Select any zone to inspect calculation parameters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {zoneBreakdowns.map((item, index) => {
            const isSelected = item.zone.id === selectedZoneDetail;
            const isCritical = item.explanation.finalScore >= 75;
            const isHigh = item.explanation.finalScore >= 55;

            return (
              <div
                key={item.zone.id}
                onClick={() => setSelectedZoneDetail(item.zone.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                    : 'bg-slate-950 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-500 font-bold">#{index + 1} Priority</span>
                  <span
                    className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                      isCritical
                        ? 'bg-red-950 text-red-300'
                        : isHigh
                        ? 'bg-amber-950 text-amber-300'
                        : 'bg-teal-950 text-teal-300'
                    }`}
                  >
                    {item.explanation.tier}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-200 mb-1">
                  {item.zone.name.split('—')[0].trim()}
                </div>
                <div className="text-[11px] text-slate-400 mb-3">{item.zone.activityType}</div>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400">Score</span>
                  <span
                    className={`text-xl font-black ${
                      isCritical ? 'text-red-400' : isHigh ? 'text-amber-400' : 'text-teal-400'
                    }`}
                  >
                    {item.explanation.finalScore}
                    <span className="text-xs font-normal text-slate-500">/100</span>
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 mt-1">
                  {item.total30d} repeat events (30d)
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
