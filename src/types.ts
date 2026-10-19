export type ZoneId = 'ZONE_A' | 'ZONE_B' | 'ZONE_C' | 'ZONE_D' | 'ZONE_E';

export interface ZoneInfo {
  id: ZoneId;
  name: string;
  code: string;
  description: string;
  activityType: string;
  nominalHeadcount: number;
  equipmentHazardTier: 'Low' | 'Medium' | 'High' | 'Severe';
  coordinates: { x: number; y: number; width: number; height: number }; // for factory map
}

export type ShiftType = 'Morning (06:00 - 14:00)' | 'Afternoon (14:00 - 22:00)' | 'Night (22:00 - 06:00)';

export type IncidentCategory =
  | 'PPE Non-compliance'
  | 'Fall/Trip Hazard'
  | 'Chemical/Spill'
  | 'Machine Guarding'
  | 'Blocked Egress'
  | 'Housekeeping'
  | 'Flood/Water Intrusion'
  | 'Landslide/Erosion'
  | 'Structural Hazard';

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type VerificationStatus =
  | 'Pending AI Review'
  | 'Verified Incident'
  | 'Rejected (False Positive)';

export type ActionStatus = 'Open' | 'In Progress' | 'Completed' | 'Overdue';

export type SimpleStatus = 'SAFE' | 'PROBLEM' | 'UNCLEAR';

export interface SimpleSafetyProblem {
  id: string;
  date: string;
  workArea: string;
  zoneId?: ZoneId;
  category: IncidentCategory;
  categoryKey?: string;
  hazardType?: string;
  disasterCategory?: string;
  confidence?: string;
  whatIsWrong: string;
  howSerious: 'High' | 'Medium' | 'Low' | 'None';
  whyIsThisRisky: string;
  whatShouldWeDo: string;
  riskGuidance?: string;
  recommendedNextSteps?: string;
  voiceTranscript?: string;
  visualEvidence?: string;
  uncertaintyNotes?: string;
  status: 'Needs Fixing' | 'Fixed';
  actionStatus: 'Open' | 'In Progress' | 'Completed';
  responsibleRole?: string;
  dueDate?: string;
  fixedDate?: string;
  isRepeated: boolean;
  repeatCount?: number;
  isSampleData: boolean;
  workerCount?: number;
  helmetsCount?: number;
  vestsCount?: number;
  unclearReason?: string;
  photoPreview?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  humanReviewStatus: 'Pending Review' | 'Verified' | 'Rejected';
  reviewedBy?: string;
  followUpResult?: 'Satisfactory' | 'Needs Escalation';
  followUpInspector?: string;
  followUpNotes?: string;
}

export interface IncidentRecord {
  id: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD HH:mm
  zoneId: ZoneId;
  zoneName: string;
  shift: ShiftType;
  category: IncidentCategory;
  severity: SeverityLevel;
  verificationStatus: VerificationStatus;
  correctiveActionStatus: 'None Required' | 'Action Pending' | 'Action In Progress' | 'Action Completed' | 'Follow-up Verified';
  linkedActionId?: string;
  visualEvidence: string;
  uncertaintyNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  source: 'AI Vision Audit' | 'Manual Inspection' | 'Shift Lead Report';
  isSampleData: boolean;
  workerCount?: number;
  helmetsDetected?: number;
  vestsDetected?: number;
  imageUrl?: string;
  recommendation?: string;
}

export interface CorrectiveAction {
  id: string;
  title: string;
  description: string;
  zoneId: ZoneId;
  zoneName: string;
  linkedIncidentIds: string[];
  responsibleRole:
    | 'EHS Specialist'
    | 'Shift Lead'
    | 'Maintenance Tech'
    | 'Warehouse Logistics Mgr'
    | 'Plant Operations Director';
  assigneeName: string;
  dueDate: string; // YYYY-MM-DD
  priority: SeverityLevel;
  status: ActionStatus;
  createdAt: string;
  completedAt?: string;
  followUpDate?: string;
  followUpInspector?: string;
  followUpFindings?: string;
  followUpStatus?: 'Pending Inspection' | 'Satisfactory' | 'Needs Escalation';
  isSampleData: boolean;
}

export interface RecurrencePattern {
  id: string;
  zoneId: ZoneId;
  zoneName: string;
  category: IncidentCategory;
  totalIncidents: number;
  recentCount30d: number;
  earlierCount30d: number;
  rateChangePct: number;
  dominantShift: ShiftType | 'Mixed Shifts';
  incidentIds: string[];
  activeCorrectiveActionId?: string;
  evidenceExplanation: string;
  hasSufficientData: boolean;
  calculatedRiskScore: number;
  riskTier: SeverityLevel;
}

export interface RiskFormulaWeights {
  severityWeight: number; // e.g. 0.40
  recurrenceWeight: number; // e.g. 0.35
  exposureWeight: number; // e.g. 0.25
}

export interface RiskExplanation {
  baseSeverityScore: number;
  recurrenceScore: number;
  exposureScore: number;
  weightedTotal: number;
  finalScore: number; // 0 - 100
  tier: SeverityLevel;
  calculationBreakdown: string;
  rationale: string;
  contributingFactors: {
    label: string;
    value: string | number;
    impact: 'High' | 'Medium' | 'Low';
  }[];
}

export interface SimulationIntervention {
  id: string;
  title: string;
  description: string;
  targetCategory: IncidentCategory | 'All Categories';
  targetZoneId: ZoneId | 'All Zones';
  recurrenceReductionFactor: number; // e.g. 0.50 (50% reduction)
  exposureReductionFactor: number; // e.g. 0.30 (30% reduction)
  severityMitigationFactor: number; // e.g. 0.15 (15% reduction)
  defaultAdherenceRate: number; // 0 - 100%
  implementationCostTier: 'Low ($)' | 'Medium ($$)' | 'High ($$$)';
  timeframeToEffect: string;
}
