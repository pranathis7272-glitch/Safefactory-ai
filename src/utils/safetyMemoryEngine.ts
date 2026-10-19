import {
  IncidentRecord,
  CorrectiveAction,
  RecurrencePattern,
  RiskFormulaWeights,
  RiskExplanation,
  SeverityLevel,
  ZoneId,
  ShiftType,
} from '../types';
import { FACTORY_ZONES } from '../data/seedData';

export const DEFAULT_RISK_WEIGHTS: RiskFormulaWeights = {
  severityWeight: 0.40,
  recurrenceWeight: 0.35,
  exposureWeight: 0.25,
};

const SEVERITY_BASE_SCORES: Record<SeverityLevel, number> = {
  Critical: 95,
  High: 72,
  Medium: 45,
  Low: 20,
};

const HAZARD_TIER_SCORES: Record<string, number> = {
  Severe: 45,
  High: 35,
  Medium: 20,
  Low: 10,
};

export function calculateExplainableRiskScore(
  severity: SeverityLevel,
  recurrenceCount30d: number,
  zoneId: ZoneId,
  weights: RiskFormulaWeights = DEFAULT_RISK_WEIGHTS
): RiskExplanation {
  const zone = FACTORY_ZONES.find((z) => z.id === zoneId);
  const nominalHeadcount = zone ? zone.nominalHeadcount : 20;
  const hazardTier = zone ? zone.equipmentHazardTier : 'High';

  // Component 1: Base Severity (0-100)
  const baseSeverityScore = SEVERITY_BASE_SCORES[severity] || 40;

  // Component 2: Recurrence Factor (0-100)
  // 1 occurrence = 20, 2 = 45, 3 = 70, 4+ = 90-100
  const recurrenceScore = Math.min(100, Math.round(recurrenceCount30d * 24));

  // Component 3: Exposure Factor (0-100)
  // Combines worker density and equipment hazard tier
  const headcountContribution = Math.min(50, Math.round((nominalHeadcount / 30) * 50));
  const hazardContribution = HAZARD_TIER_SCORES[hazardTier] || 25;
  const exposureScore = Math.min(100, headcountContribution + hazardContribution);

  // Normalize weights to sum to 1.0 in case user adjusted them
  const totalWeight =
    (weights.severityWeight + weights.recurrenceWeight + weights.exposureWeight) || 1.0;
  const wS = weights.severityWeight / totalWeight;
  const wR = weights.recurrenceWeight / totalWeight;
  const wE = weights.exposureWeight / totalWeight;

  const weightedTotal = baseSeverityScore * wS + recurrenceScore * wR + exposureScore * wE;
  const finalScore = Math.min(100, Math.max(0, Math.round(weightedTotal)));

  let tier: SeverityLevel = 'Low';
  if (finalScore >= 75) tier = 'Critical';
  else if (finalScore >= 55) tier = 'High';
  else if (finalScore >= 35) tier = 'Medium';
  else tier = 'Low';

  const calculationBreakdown = `Score = (${baseSeverityScore} × ${wS.toFixed(2)}) + (${recurrenceScore} × ${wR.toFixed(2)}) + (${exposureScore} × ${wE.toFixed(2)}) = ${finalScore}/100`;

  let rationale = '';
  if (recurrenceCount30d >= 3) {
    rationale = `High recurrence frequency (${recurrenceCount30d} repeat events in 30 days) compounds the ${severity.toLowerCase()} severity baseline. High worker density (${nominalHeadcount} operators in ${zone?.name.split('—')[0].trim() || 'area'}) amplifies exposure.`;
  } else if (severity === 'Critical') {
    rationale = `Critical single-event potential in ${zone?.name.split('—')[0].trim() || 'area'} with ${hazardTier.toLowerCase()} machinery hazard profile, demanding immediate containment regardless of prior frequency.`;
  } else {
    rationale = `Moderate baseline safety risk. Isolated or low-recurrence event (${recurrenceCount30d} in 30 days) under standard supervisory oversight.`;
  }

  const contributingFactors = [
    {
      label: 'Severity Rating',
      value: `${severity} (${baseSeverityScore}/100)`,
      impact: (baseSeverityScore >= 70 ? 'High' : baseSeverityScore >= 40 ? 'Medium' : 'Low') as 'High' | 'Medium' | 'Low',
    },
    {
      label: '30-Day Recurrence',
      value: `${recurrenceCount30d} recorded events (${recurrenceScore}/100)`,
      impact: (recurrenceScore >= 60 ? 'High' : recurrenceScore >= 30 ? 'Medium' : 'Low') as 'High' | 'Medium' | 'Low',
    },
    {
      label: 'Zone Exposure & Machinery Tier',
      value: `${nominalHeadcount} workers • ${hazardTier} Hazard (${exposureScore}/100)`,
      impact: (exposureScore >= 60 ? 'High' : exposureScore >= 35 ? 'Medium' : 'Low') as 'High' | 'Medium' | 'Low',
    },
  ];

  return {
    baseSeverityScore,
    recurrenceScore,
    exposureScore,
    weightedTotal: Math.round(weightedTotal * 10) / 10,
    finalScore,
    tier,
    calculationBreakdown,
    rationale,
    contributingFactors,
  };
}

export function extractRecurrencePatterns(
  incidents: IncidentRecord[],
  actions: CorrectiveAction[],
  weights: RiskFormulaWeights = DEFAULT_RISK_WEIGHTS
): RecurrencePattern[] {
  // Only verified incidents enter the Safety Memory Engine
  const verifiedIncidents = incidents.filter((inc) => inc.verificationStatus === 'Verified Incident');

  // Key by zoneId + '::' + category
  const clusters: Record<string, IncidentRecord[]> = {};

  verifiedIncidents.forEach((inc) => {
    const key = `${inc.zoneId}::${inc.category}`;
    if (!clusters[key]) {
      clusters[key] = [];
    }
    clusters[key].push(inc);
  });

  const patterns: RecurrencePattern[] = [];
  const now = new Date('2026-10-14T23:59:59'); // Anchor date for realistic simulation
  const msInDay = 86400000;

  Object.entries(clusters).forEach(([key, clusterIncidents]) => {
    const [zoneIdStr, category] = key.split('::') as [ZoneId, any];
    const zone = FACTORY_ZONES.find((z) => z.id === zoneIdStr);
    const zoneName = zone ? zone.name : zoneIdStr;

    // Filter by date ranges: recent 30 days vs earlier 30 days (day 31-60)
    let recent30d = 0;
    let earlier30d = 0;
    const shiftTally: Record<string, number> = {};

    clusterIncidents.forEach((inc) => {
      const incDate = new Date(inc.date.replace(' ', 'T'));
      const diffDays = Math.max(0, (now.getTime() - incDate.getTime()) / msInDay);

      if (diffDays <= 30) {
        recent30d++;
      } else if (diffDays <= 60) {
        earlier30d++;
      }

      shiftTally[inc.shift] = (shiftTally[inc.shift] || 0) + 1;
    });

    // Dominant shift detection
    let dominantShift: ShiftType | 'Mixed Shifts' = 'Mixed Shifts';
    let maxShiftCount = 0;
    Object.entries(shiftTally).forEach(([shift, count]) => {
      if (count > maxShiftCount) {
        maxShiftCount = count;
        if (count / clusterIncidents.length >= 0.6) {
          dominantShift = shift as ShiftType;
        }
      }
    });

    const hasSufficientData = clusterIncidents.length >= 2;
    let rateChangePct = 0;
    if (earlier30d === 0) {
      rateChangePct = recent30d > 0 ? recent30d * 100 : 0;
    } else {
      rateChangePct = Math.round(((recent30d - earlier30d) / earlier30d) * 100);
    }

    // Maximum severity in this cluster
    const severities = clusterIncidents.map((i) => i.severity);
    let peakSeverity: SeverityLevel = 'Low';
    if (severities.includes('Critical')) peakSeverity = 'Critical';
    else if (severities.includes('High')) peakSeverity = 'High';
    else if (severities.includes('Medium')) peakSeverity = 'Medium';

    const riskExplanation = calculateExplainableRiskScore(
      peakSeverity,
      recent30d,
      zoneIdStr,
      weights
    );

    // Check if an active corrective action is linked
    const linkedAction = actions.find(
      (a) =>
        a.zoneId === zoneIdStr &&
        (a.status === 'Open' || a.status === 'In Progress') &&
        a.linkedIncidentIds.some((id) => clusterIncidents.some((ci) => ci.id === id))
    );

    let evidenceExplanation = '';
    if (!hasSufficientData) {
      evidenceExplanation = `Single verified occurrence recorded (${clusterIncidents[0].date.split(' ')[0]}). Insufficient historical baseline to establish recurrence pattern. Minimum 2 verified events required for memory correlation.`;
    } else {
      const shiftNote =
        dominantShift !== 'Mixed Shifts'
          ? `strongly concentrated in ${dominantShift}`
          : 'distributed across multiple shifts';
      evidenceExplanation = `${recent30d} incidents in the last 30 days (${clusterIncidents.length} all-time), ${shiftNote}. ${
        rateChangePct > 0 ? `Activity trend is elevated (+${rateChangePct}% vs previous 30-day baseline).` : 'Frequency is stable or decelerating.'
      } Common visual finding: ${clusterIncidents[0].visualEvidence.substring(0, 95)}...`;
    }

    patterns.push({
      id: `PAT-${zoneIdStr}-${category.substring(0, 4).toUpperCase()}`,
      zoneId: zoneIdStr,
      zoneName,
      category,
      totalIncidents: clusterIncidents.length,
      recentCount30d: recent30d,
      earlierCount30d: earlier30d,
      rateChangePct,
      dominantShift,
      incidentIds: clusterIncidents.map((i) => i.id),
      activeCorrectiveActionId: linkedAction ? linkedAction.id : undefined,
      evidenceExplanation,
      hasSufficientData,
      calculatedRiskScore: riskExplanation.finalScore,
      riskTier: riskExplanation.tier,
    });
  });

  // Sort: High risk first, then highest recent occurrences
  return patterns.sort((a, b) => b.calculatedRiskScore - a.calculatedRiskScore);
}

// Convert incidents to CSV format for download
export function exportIncidentsToCSV(incidents: IncidentRecord[]): string {
  const headers = [
    'Incident ID',
    'Date & Time',
    'Zone Code',
    'Zone Name',
    'Shift',
    'Category',
    'Severity',
    'Verification Status',
    'Corrective Action Status',
    'Linked Action ID',
    'Workers Detected',
    'Helmets Detected',
    'Vests Detected',
    'Visual Evidence',
    'Uncertainty Notes',
    'Reviewed By',
    'Data Source',
    'Is Demo Sample',
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const rows = incidents.map((inc) => [
    inc.id,
    inc.date,
    inc.zoneId,
    inc.zoneName,
    inc.shift,
    inc.category,
    inc.severity,
    inc.verificationStatus,
    inc.correctiveActionStatus,
    inc.linkedActionId || 'N/A',
    inc.workerCount ?? 'N/A',
    inc.helmetsDetected ?? 'N/A',
    inc.vestsDetected ?? 'N/A',
    inc.visualEvidence,
    inc.uncertaintyNotes || 'None',
    inc.reviewedBy || 'Pending Review',
    inc.source,
    inc.isSampleData ? 'SAMPLE_DATA' : 'LIVE_VERIFIED',
  ]);

  return [headers.map(escapeCSV).join(','), ...rows.map((r) => r.map(escapeCSV).join(','))].join('\n');
}
