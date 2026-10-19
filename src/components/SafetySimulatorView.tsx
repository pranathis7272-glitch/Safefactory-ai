import React, { useState } from 'react';
import { SimulationIntervention, ZoneId, RiskFormulaWeights } from '../types';
import { SIMULATION_INTERVENTIONS, FACTORY_ZONES } from '../data/seedData';
import { calculateExplainableRiskScore } from '../utils/safetyMemoryEngine';
import {
  FlaskConical,
  ArrowRight,
  TrendingDown,
  Info,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sliders,
} from 'lucide-react';

interface SafetySimulatorViewProps {
  weights: RiskFormulaWeights;
}

export const SafetySimulatorView: React.FC<SafetySimulatorViewProps> = ({ weights }) => {
  const [selectedInterventionId, setSelectedInterventionId] = useState<string>('INT-01');
  const [targetZoneId, setTargetZoneId] = useState<ZoneId>('ZONE_D');
  const [adherenceRate, setAdherenceRate] = useState<number>(85); // 85% adherence

  const intervention =
    SIMULATION_INTERVENTIONS.find((i) => i.id === selectedInterventionId) ||
    SIMULATION_INTERVENTIONS[0];

  const zone = FACTORY_ZONES.find((z) => z.id === targetZoneId) || FACTORY_ZONES[3];

  // Baseline scenario (e.g. Zone D with 4 repeat incidents)
  const baselineRecurrence = targetZoneId === 'ZONE_D' ? 4 : targetZoneId === 'ZONE_B' ? 2 : 1;
  const baselineSeverity = targetZoneId === 'ZONE_D' || targetZoneId === 'ZONE_B' ? 'High' : 'Medium';

  const baselineExplanation = calculateExplainableRiskScore(
    baselineSeverity,
    baselineRecurrence,
    targetZoneId,
    weights
  );

  // Simulated scenario
  // Effective mitigation scaled by adherence rate
  const adherenceFactor = adherenceRate / 100;
  const simulatedRecurrence = Math.max(
    0,
    Math.round(
      baselineRecurrence * (1 - intervention.recurrenceReductionFactor * adherenceFactor)
    )
  );

  const simulatedExplanation = calculateExplainableRiskScore(
    baselineSeverity,
    simulatedRecurrence,
    targetZoneId,
    weights
  );

  // Further reduce simulated score by exposure and severity mitigations
  const exposureDampened = Math.round(
    simulatedExplanation.exposureScore *
      (1 - intervention.exposureReductionFactor * adherenceFactor)
  );
  const severityDampened = Math.round(
    simulatedExplanation.baseSeverityScore *
      (1 - intervention.severityMitigationFactor * adherenceFactor)
  );

  const simulatedCompositeScore = Math.max(
    10,
    Math.round(
      severityDampened * weights.severityWeight +
        simulatedExplanation.recurrenceScore * weights.recurrenceWeight +
        exposureDampened * weights.exposureWeight
    )
  );

  let simulatedTier: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
  if (simulatedCompositeScore >= 75) simulatedTier = 'Critical';
  else if (simulatedCompositeScore >= 55) simulatedTier = 'High';
  else if (simulatedCompositeScore >= 35) simulatedTier = 'Medium';
  else simulatedTier = 'Low';

  const scoreDelta = baselineExplanation.finalScore - simulatedCompositeScore;
  const percentReduction = Math.round((scoreDelta / baselineExplanation.finalScore) * 100);

  return (
    <div className="space-y-6">
      {/* Header and Mandatory Hypothesis Disclaimer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                What-If Safety Intervention Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Model hypothetical engineering, administrative, and technological safety interventions to project
                their effect on the decision priority score under defined compliance assumptions.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Non-Prediction Label */}
        <div className="bg-amber-950/40 border border-amber-800/80 rounded-lg p-3 text-xs text-amber-200/90 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Mandatory Hypothesis Disclaimer:</strong> Hypothetical simulation — not a
            prediction of accident reduction. Simulated scores represent linear algorithmic sensitivity models under
            assumed compliance rates and do not guarantee physical hazard mitigation or regulatory immunity.
          </div>
        </div>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Intervention Selection & Assumption Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-teal-400" />
            Simulation Parameters &amp; Assumptions
          </h3>

          {/* Intervention Choice */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              1. Proposed Preventive Intervention:
            </label>
            <div className="space-y-2">
              {SIMULATION_INTERVENTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedInterventionId(item.id);
                    if (item.targetZoneId !== 'All Zones') {
                      setTargetZoneId(item.targetZoneId as ZoneId);
                    }
                    setAdherenceRate(item.defaultAdherenceRate);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    selectedInterventionId === item.id
                      ? 'bg-teal-950/50 border-teal-500/60 text-slate-100 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{item.title}</span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-teal-300">
                      {item.implementationCostTier}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Target Zone Selection */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300 block">2. Target Manufacturing Zone:</label>
            <select
              value={targetZoneId}
              onChange={(e) => setTargetZoneId(e.target.value as ZoneId)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
            >
              {FACTORY_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>

          {/* Adherence Slider */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-slate-300">3. Estimated Workforce Adherence Rate:</span>
              <span className="text-teal-400 font-mono text-sm">{adherenceRate}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="5"
              value={adherenceRate}
              onChange={(e) => setAdherenceRate(parseInt(e.target.value))}
              className="w-full accent-teal-400 bg-slate-950 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>40% (Partial Adoption)</span>
              <span>80% (Standard)</span>
              <span>100% (Strict Interlock)</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Intervention effectiveness scales directly with supervisor enforcement and worker compliance.
            </p>
          </div>
        </div>

        {/* Side-by-Side Before vs After Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Hypothetical Sensitivity Comparison:
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                  {zone.name.split('—')[0].trim()} — Intervention Impact
                </h3>
              </div>

              <span className="text-[11px] bg-slate-800 text-teal-300 px-2 py-1 rounded font-medium">
                {intervention.timeframeToEffect}
              </span>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Baseline Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400 uppercase">Baseline State</span>
                  <span
                    className={`font-mono px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      baselineExplanation.finalScore >= 75
                        ? 'bg-red-950 text-red-300'
                        : 'bg-amber-950 text-amber-300'
                    }`}
                  >
                    {baselineExplanation.tier}
                  </span>
                </div>

                <div className="text-3xl font-black text-slate-200">
                  {baselineExplanation.finalScore}
                  <span className="text-sm font-normal text-slate-500">/100</span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Recurrence (30d):</span>
                    <span className="font-mono text-slate-200 font-bold">{baselineRecurrence} events</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Severity Potential:</span>
                    <span className="font-mono text-slate-200">{baselineSeverity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zone Exposure:</span>
                    <span className="font-mono text-slate-200">{zone.nominalHeadcount} workers</span>
                  </div>
                </div>
              </div>

              {/* Simulated Post-Intervention Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/40 shadow-md space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-400 uppercase flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Simulated Projection
                  </span>
                  <span
                    className={`font-mono px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      simulatedTier === 'Low'
                        ? 'bg-teal-950 text-teal-300 border border-teal-800'
                        : simulatedTier === 'Medium'
                        ? 'bg-yellow-950 text-yellow-300 border border-yellow-800'
                        : 'bg-amber-950 text-amber-300'
                    }`}
                  >
                    {simulatedTier}
                  </span>
                </div>

                <div className="text-3xl font-black text-teal-400 flex items-baseline gap-2">
                  {simulatedCompositeScore}
                  <span className="text-sm font-normal text-slate-500">/100</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    -{percentReduction}% Score Drop
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Projected Recurrence:</span>
                    <span className="font-mono text-teal-300 font-bold">~{simulatedRecurrence} event(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recurrence Dampening:</span>
                    <span className="font-mono text-teal-300">
                      -{Math.round(intervention.recurrenceReductionFactor * adherenceFactor * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assumed Adherence:</span>
                    <span className="font-mono text-teal-300">{adherenceRate}% adoption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Narrative */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-slate-200 block">Hypothetical Engineering Assessment:</span>
              <p className="leading-relaxed text-slate-300">
                Deploying <strong>{intervention.title}</strong> at <strong>{adherenceRate}% adherence</strong> in{' '}
                <strong>{zone.name.split('—')[0].trim()}</strong> is projected to reduce the preliminary priority
                score from <strong>{baselineExplanation.finalScore} ({baselineExplanation.tier})</strong> to{' '}
                <strong>{simulatedCompositeScore} ({simulatedTier})</strong>. The primary driver is the suppression of
                unsupervised human omissions through automated turnstiles or systematic shift briefings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
