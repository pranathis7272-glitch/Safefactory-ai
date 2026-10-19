import { ZoneInfo, IncidentRecord, CorrectiveAction, SimulationIntervention, SimpleSafetyProblem } from '../types';

export const FACTORY_ZONES: ZoneInfo[] = [
  {
    id: 'ZONE_A',
    name: 'Zone A — Heavy Fabrication & Cutting',
    code: 'SEC-FAB-01',
    description: 'Structural steel cutting, plasma torches, overhead gantry cranes, and welding bays.',
    activityType: 'Hot Work & Metal Fabrication',
    nominalHeadcount: 24,
    equipmentHazardTier: 'High',
    coordinates: { x: 20, y: 30, width: 220, height: 160 },
  },
  {
    id: 'ZONE_B',
    name: 'Zone B — Chemical Bay & Surface Treatment',
    code: 'SEC-CHM-02',
    description: 'Degreasing tanks, passivation dip baths, chemical dispensing, and eyewash stations.',
    activityType: 'Chemical Handling & Dipping',
    nominalHeadcount: 14,
    equipmentHazardTier: 'Severe',
    coordinates: { x: 270, y: 30, width: 220, height: 160 },
  },
  {
    id: 'ZONE_C',
    name: 'Zone C — Robotic Assembly & Sub-Line',
    code: 'SEC-ASM-03',
    description: 'Automated 6-axis robotic arms, indexing carousels, and component feeder stations.',
    activityType: 'Automated Assembly',
    nominalHeadcount: 18,
    equipmentHazardTier: 'Medium',
    coordinates: { x: 520, y: 30, width: 220, height: 160 },
  },
  {
    id: 'ZONE_D',
    name: 'Zone D — Logistics & Forklift Loading Dock',
    code: 'SEC-LOG-04',
    description: 'High-traffic bay doors, counterbalanced forklift lanes, heavy pallet staging, and ramp.',
    activityType: 'Material Handling & Freight',
    nominalHeadcount: 28,
    equipmentHazardTier: 'High',
    coordinates: { x: 140, y: 220, width: 330, height: 170 },
  },
  {
    id: 'ZONE_E',
    name: 'Zone E — Stamping Press & Tooling Dies',
    code: 'SEC-PRS-05',
    description: 'Hydraulic presses, die handling, metal sheet stamping, and scrap collection conveyors.',
    activityType: 'Heavy Stamping & Pressing',
    nominalHeadcount: 16,
    equipmentHazardTier: 'High',
    coordinates: { x: 500, y: 220, width: 240, height: 170 },
  },
];

export const INITIAL_INCIDENTS: IncidentRecord[] = [
  // Repeated pattern in Zone D (Night Shift PPE Non-compliance)
  {
    id: 'INC-2026-0412',
    title: 'Loading Bay 3: Unvested personnel during trailer unloading',
    date: '2026-10-12 23:45',
    zoneId: 'ZONE_D',
    zoneName: 'Zone D — Logistics & Forklift Loading Dock',
    shift: 'Night (22:00 - 06:00)',
    category: 'PPE Non-compliance',
    severity: 'High',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action In Progress',
    linkedActionId: 'ACT-104',
    visualEvidence: 'Two logistics contractors observed inside active dock door #3 without Class 2 high-vis vests while forklift FL-09 was operating 4 meters away.',
    uncertaintyNotes: 'Forklift operator had clear line of sight, but ambient lighting at exterior ramp was measured below 100 lux.',
    reviewedBy: 'Marcus Vance (Senior EHS Officer)',
    reviewedAt: '2026-10-13 08:30',
    source: 'AI Vision Audit',
    isSampleData: true,
    workerCount: 3,
    helmetsDetected: 2,
    vestsDetected: 1,
    recommendation: 'Enforce turnstile interlock; prohibit freight doors from unlocking until vest verification confirmed.',
  },
  {
    id: 'INC-2026-0398',
    title: 'Forklift Travel Lane: Worker unhelmeted beneath high pallet rack',
    date: '2026-10-08 02:15',
    zoneId: 'ZONE_D',
    zoneName: 'Zone D — Logistics & Forklift Loading Dock',
    shift: 'Night (22:00 - 06:00)',
    category: 'PPE Non-compliance',
    severity: 'Critical',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action In Progress',
    linkedActionId: 'ACT-104',
    visualEvidence: 'Warehouse order picker working beneath level 4 pallet storage without hardhat while adjacent mast was raising 850kg cargo.',
    uncertaintyNotes: 'Worker temporarily removed helmet due to heat complaint; helmet rested on forklift bumper.',
    reviewedBy: 'Marcus Vance (Senior EHS Officer)',
    reviewedAt: '2026-10-08 07:15',
    source: 'Manual Inspection',
    isSampleData: true,
    workerCount: 1,
    helmetsDetected: 0,
    vestsDetected: 1,
    recommendation: 'Mandatory suspension of work when operating under overhead loads without Type II industrial helmets.',
  },
  {
    id: 'INC-2026-0382',
    title: 'Dock Ramp East: Contractor spotter missing reflective gear',
    date: '2026-10-01 22:30',
    zoneId: 'ZONE_D',
    zoneName: 'Zone D — Logistics & Forklift Loading Dock',
    shift: 'Night (22:00 - 06:00)',
    category: 'PPE Non-compliance',
    severity: 'High',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action In Progress',
    linkedActionId: 'ACT-104',
    visualEvidence: 'Contract driver guiding reversing flatbed trailer wearing dark navy jacket with zero retro-reflective trim.',
    uncertaintyNotes: 'Driver stated reflective vest was inside cab; site escort failed to stop activity before ramp entry.',
    reviewedBy: 'Elena Chen (Plant Safety Director)',
    reviewedAt: '2026-10-02 09:00',
    source: 'Shift Lead Report',
    isSampleData: true,
    workerCount: 2,
    helmetsDetected: 1,
    vestsDetected: 0,
    recommendation: 'Issue high-vis loaner vests at guardhouse gate prior to issuing vehicle gate passes.',
  },
  {
    id: 'INC-2026-0351',
    title: 'Pallet Staging Lane 2: Missing head protection during overhead rigging',
    date: '2026-09-22 01:20',
    zoneId: 'ZONE_D',
    zoneName: 'Zone D — Logistics & Forklift Loading Dock',
    shift: 'Night (22:00 - 06:00)',
    category: 'PPE Non-compliance',
    severity: 'High',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action In Progress',
    linkedActionId: 'ACT-104',
    visualEvidence: 'Material handler handling stretch-wrap machine without safety helmet under suspended crane hoist.',
    uncertaintyNotes: 'Overhead crane was idle but suspended hook was within 2 meters of head height.',
    reviewedBy: 'Marcus Vance (Senior EHS Officer)',
    reviewedAt: '2026-09-22 08:00',
    source: 'AI Vision Audit',
    isSampleData: true,
    workerCount: 2,
    helmetsDetected: 1,
    vestsDetected: 2,
    recommendation: 'Conduct emergency night-shift stand-down on overhead hazard perimeter protocol.',
  },

  // Zone B - Chemical Bay Incidents
  {
    id: 'INC-2026-0409',
    title: 'Dip Tank Acid Wash: Pallet stack obstructing safety eyewash',
    date: '2026-10-10 14:15',
    zoneId: 'ZONE_B',
    zoneName: 'Zone B — Chemical Bay & Surface Treatment',
    shift: 'Afternoon (14:00 - 22:00)',
    category: 'Blocked Egress',
    severity: 'Critical',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action Completed',
    linkedActionId: 'ACT-098',
    visualEvidence: 'Wooden chemical pallet containing 4 carboys of sulfuric acid staged directly within the 36-inch clearance arc of Eyewash EW-02.',
    uncertaintyNotes: 'Pallet was tagged for disposal; driver left it unattended during shift handover.',
    reviewedBy: 'Elena Chen (Plant Safety Director)',
    reviewedAt: '2026-10-10 16:00',
    source: 'AI Vision Audit',
    isSampleData: true,
    workerCount: 0,
    recommendation: 'Repaint 36-inch yellow diagonal no-storage buffer box and install proximity audible beacon.',
  },
  {
    id: 'INC-2026-0365',
    title: 'Rinse Tank 4: Chemical splash apron left unfastened',
    date: '2026-09-27 10:30',
    zoneId: 'ZONE_B',
    zoneName: 'Zone B — Chemical Bay & Surface Treatment',
    shift: 'Morning (06:00 - 14:00)',
    category: 'PPE Non-compliance',
    severity: 'Medium',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action Completed',
    linkedActionId: 'ACT-089',
    visualEvidence: 'Operator dipping wire basket of parts with chemical rubber apron hanging loosely from neck strap without waist tie fastened.',
    uncertaintyNotes: 'Goggles and nitrile gauntlets were properly worn; splash shield was partially deployed.',
    reviewedBy: 'Marcus Vance (Senior EHS Officer)',
    reviewedAt: '2026-09-27 13:10',
    source: 'Shift Lead Report',
    isSampleData: true,
    workerCount: 1,
    helmetsDetected: 1,
    vestsDetected: 0,
    recommendation: 'Replace tie-back aprons with rapid magnetic clip aprons.',
  },

  // Zone A - Fabrication Incidents
  {
    id: 'INC-2026-0401',
    title: 'Plasma Table 2: Hot work spark flash screen omitted',
    date: '2026-10-06 11:20',
    zoneId: 'ZONE_A',
    zoneName: 'Zone A — Heavy Fabrication & Cutting',
    shift: 'Morning (06:00 - 14:00)',
    category: 'Machine Guarding',
    severity: 'High',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Action In Progress',
    linkedActionId: 'ACT-102',
    visualEvidence: 'High-amperage plasma arc cutting without amber UV flash curtain drawn across adjacent walkway.',
    uncertaintyNotes: 'Passersby had safety glasses with side shields but not shade 5 cutting lenses.',
    reviewedBy: 'Elena Chen (Plant Safety Director)',
    reviewedAt: '2026-10-06 14:00',
    source: 'Manual Inspection',
    isSampleData: true,
    workerCount: 3,
    helmetsDetected: 3,
    vestsDetected: 3,
    recommendation: 'Install magnetic interlock on torch power that prevents arc strike until curtain contact is closed.',
  },
  {
    id: 'INC-2026-0370',
    title: 'Welding Bay 6: Air hose coiled across primary pedestrian aisle',
    date: '2026-09-29 15:40',
    zoneId: 'ZONE_A',
    zoneName: 'Zone A — Heavy Fabrication & Cutting',
    shift: 'Afternoon (14:00 - 22:00)',
    category: 'Fall/Trip Hazard',
    severity: 'Low',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Follow-up Verified',
    linkedActionId: 'ACT-092',
    visualEvidence: '3/8" pneumatic hose stretched across walkway at 3-inch elevation between column 14 and grinding booth.',
    uncertaintyNotes: 'Pneumatic line was actively powering portable grinder; worker relocated within 5 minutes.',
    reviewedBy: 'Marcus Vance (Senior EHS Officer)',
    reviewedAt: '2026-09-30 08:30',
    source: 'AI Vision Audit',
    isSampleData: true,
    workerCount: 2,
    helmetsDetected: 2,
    vestsDetected: 2,
    recommendation: 'Mount overhead spring-loaded hose reels at every secondary column.',
  },

  // Zone E - Stamping Press
  {
    id: 'INC-2026-0391',
    title: 'Press Line 300T: Light curtain bypass key left inserted',
    date: '2026-10-04 18:25',
    zoneId: 'ZONE_E',
    zoneName: 'Zone E — Stamping Press & Tooling Dies',
    shift: 'Afternoon (14:00 - 22:00)',
    category: 'Machine Guarding',
    severity: 'Critical',
    verificationStatus: 'Verified Incident',
    correctiveActionStatus: 'Follow-up Verified',
    linkedActionId: 'ACT-099',
    visualEvidence: 'Maintenance supervisor bypass key left in selector switch while automated cycle ran in continuous mode.',
    uncertaintyNotes: 'No personnel were within point of operation, but perimeter safety distance was compromised.',
    reviewedBy: 'Elena Chen (Plant Safety Director)',
    reviewedAt: '2026-10-04 19:00',
    source: 'Manual Inspection',
    isSampleData: true,
    workerCount: 1,
    helmetsDetected: 1,
    vestsDetected: 1,
    recommendation: 'Replace mechanical bypass key with 15-minute auto-timeout RFID supervisor badge token.',
  },

  // Seeded Pending AI Review for Human-in-the-loop demonstration
  {
    id: 'INC-2026-0420-DRAFT',
    title: 'AI Audit Draft: Suspected helmet omission at South Gantry',
    date: '2026-10-14 20:10',
    zoneId: 'ZONE_A',
    zoneName: 'Zone A — Heavy Fabrication & Cutting',
    shift: 'Afternoon (14:00 - 22:00)',
    category: 'PPE Non-compliance',
    severity: 'Medium',
    verificationStatus: 'Pending AI Review',
    correctiveActionStatus: 'Action Pending',
    visualEvidence: 'Subject observed 12m from camera wearing blue baseball cap or beanie beneath crane runway; hardhat rim not detected.',
    uncertaintyNotes: 'Low contrast due to overhead sodium vapor glare. Angle obscures crest of head. Needs human confirmation.',
    source: 'AI Vision Audit',
    isSampleData: true,
    workerCount: 2,
    helmetsDetected: 1,
    vestsDetected: 2,
    recommendation: 'Verify with Bay 4 lead whether worker was in designated hardhat-required zone or exterior non-overhead area.',
  },
  {
    id: 'INC-2026-0421-DRAFT',
    title: 'AI Audit Draft: Spill indicator near degreasing drum line',
    date: '2026-10-14 21:05',
    zoneId: 'ZONE_B',
    zoneName: 'Zone B — Chemical Bay & Surface Treatment',
    shift: 'Night (22:00 - 06:00)',
    category: 'Chemical/Spill',
    severity: 'High',
    verificationStatus: 'Pending AI Review',
    correctiveActionStatus: 'Action Pending',
    visualEvidence: 'Reflective surface pool observed adjacent to 55-gallon drum bung valve; approximately 1m diameter sheen on epoxy floor.',
    uncertaintyNotes: 'Could be water from recent floor scrub or solvent leak. Camera resolution insufficient to detect chemical vapor or coloration.',
    source: 'AI Vision Audit',
    isSampleData: true,
    workerCount: 0,
    helmetsDetected: 0,
    vestsDetected: 0,
    recommendation: 'Dispatch area spill team with pH test strip and neutralizer immediately before solvent evaporates.',
  },
];

export const INITIAL_ACTIONS: CorrectiveAction[] = [
  {
    id: 'ACT-104',
    title: 'Night Shift PPE Enforcement & Gate Barrier Interlock',
    description:
      'Address chronic night-shift PPE non-compliance in Zone D (4 repeat infractions within 30 days). Implement mandatory high-vis scan at dock gates, replace damaged loaner hardhats, and require shift leads to log spot-checks at 23:00 and 03:00.',
    zoneId: 'ZONE_D',
    zoneName: 'Zone D — Logistics & Forklift Loading Dock',
    linkedIncidentIds: ['INC-2026-0412', 'INC-2026-0398', 'INC-2026-0382', 'INC-2026-0351'],
    responsibleRole: 'Warehouse Logistics Mgr',
    assigneeName: 'Derrick Vance (Logistics Operations)',
    dueDate: '2026-10-20',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-02',
    followUpDate: '2026-10-22',
    followUpInspector: 'Marcus Vance (EHS Specialist)',
    followUpStatus: 'Pending Inspection',
    isSampleData: true,
  },
  {
    id: 'ACT-102',
    title: 'Plasma Arc Interlock & Amber Flash Screen Installation',
    description:
      'Fit automatic magnetic closure contacts to plasma cutter tables in Zone A to extinguish torch pilot arc if protective welding curtain is breached by pedestrians.',
    zoneId: 'ZONE_A',
    zoneName: 'Zone A — Heavy Fabrication & Cutting',
    linkedIncidentIds: ['INC-2026-0401'],
    responsibleRole: 'Maintenance Tech',
    assigneeName: 'Carlos Rivera (Lead Maintenance)',
    dueDate: '2026-10-18',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-06',
    followUpDate: '2026-10-19',
    followUpInspector: 'Elena Chen (Safety Director)',
    followUpStatus: 'Pending Inspection',
    isSampleData: true,
  },
  {
    id: 'ACT-098',
    title: 'Eyewash Station EW-02 Floor Demarcation & Optical Alarm',
    description:
      'Repaint 36-inch high-visibility yellow hatched no-storage clearance zone around Chemical Bay eyewash. Install overhead optical beam sensor that trips an audible warning if pallets are left in zone for > 60 seconds.',
    zoneId: 'ZONE_B',
    zoneName: 'Zone B — Chemical Bay & Surface Treatment',
    linkedIncidentIds: ['INC-2026-0409'],
    responsibleRole: 'EHS Specialist',
    assigneeName: 'Sarah Jenkins (Chemical Safety Lead)',
    dueDate: '2026-10-12',
    priority: 'Critical',
    status: 'Completed',
    createdAt: '2026-10-10',
    completedAt: '2026-10-12 17:00',
    followUpDate: '2026-10-13',
    followUpInspector: 'Elena Chen (Safety Director)',
    followUpFindings: 'Optical alarm tested with 5-minute obstacle. Beacon activated at 60s, clear unobstructed access restored.',
    followUpStatus: 'Satisfactory',
    isSampleData: true,
  },
  {
    id: 'ACT-099',
    title: 'Hydraulic Press Bypass Interlock Protocol Upgrade',
    description:
      'Remove physical master keys from Press 300T keyway. Replace with timed supervisor RFID access card reader requiring biometric re-authentication every 15 minutes during die-setting.',
    zoneId: 'ZONE_E',
    zoneName: 'Zone E — Stamping Press & Tooling Dies',
    linkedIncidentIds: ['INC-2026-0391'],
    responsibleRole: 'Plant Operations Director',
    assigneeName: 'Thomas Wright (Tooling Supt.)',
    dueDate: '2026-10-08',
    priority: 'Critical',
    status: 'Completed',
    createdAt: '2026-10-04',
    completedAt: '2026-10-07 14:30',
    followUpDate: '2026-10-09',
    followUpInspector: 'Marcus Vance (EHS Specialist)',
    followUpFindings: 'RFID scanner operational. Key cylinder permanently blanked. Verified press locks down if card removed.',
    followUpStatus: 'Satisfactory',
    isSampleData: true,
  },
  {
    id: 'ACT-092',
    title: 'Bay 6 Overhead Retractable Pneumatic Reels',
    description:
      'Procure and install 4 heavy-duty overhead spring-loaded air hose reels to eliminate trip hazards across fabrication transit corridors.',
    zoneId: 'ZONE_A',
    zoneName: 'Zone A — Heavy Fabrication & Cutting',
    linkedIncidentIds: ['INC-2026-0370'],
    responsibleRole: 'Maintenance Tech',
    assigneeName: 'Carlos Rivera',
    dueDate: '2026-10-05',
    priority: 'Low',
    status: 'Completed',
    createdAt: '2026-09-30',
    completedAt: '2026-10-03 11:00',
    followUpDate: '2026-10-04',
    followUpInspector: 'Marcus Vance',
    followUpFindings: 'All reels installed; zero hose floor crossings observed in 3 consecutive walkthrough audits.',
    followUpStatus: 'Satisfactory',
    isSampleData: true,
  },
];

export const SIMULATION_INTERVENTIONS: SimulationIntervention[] = [
  {
    id: 'INT-01',
    title: 'Automated PPE Turnstile & Vision Badge Gate',
    description:
      'Install an automated optical turnstile barrier at loading dock entrances that scans for high-vis vest and hardhat presence before unlocking pedestrian passage.',
    targetCategory: 'PPE Non-compliance',
    targetZoneId: 'ZONE_D',
    recurrenceReductionFactor: 0.65, // 65% reduction in repeat non-compliance
    exposureReductionFactor: 0.40,
    severityMitigationFactor: 0.15,
    defaultAdherenceRate: 90,
    implementationCostTier: 'Medium ($$)',
    timeframeToEffect: '2 Weeks (Hardware installation & card mapping)',
  },
  {
    id: 'INT-02',
    title: 'Targeted Shift-3 Toolbox Stand-Down & Coaching',
    description:
      'Mandate daily 8-minute peer safety coaching at start of Graveyard shift focused specifically on forklift blindspots, pedestrian high-vis, and helmet discipline.',
    targetCategory: 'PPE Non-compliance',
    targetZoneId: 'ZONE_D',
    recurrenceReductionFactor: 0.35,
    exposureReductionFactor: 0.20,
    severityMitigationFactor: 0.10,
    defaultAdherenceRate: 80,
    implementationCostTier: 'Low ($)',
    timeframeToEffect: 'Immediate (Next shift cycle)',
  },
  {
    id: 'INT-03',
    title: 'Chemical Bay Laser Perimeter & Optical Alarm',
    description:
      'Install ceiling-mounted LIDAR clearance zone scanning around eyewashes and emergency shower pods with immediate siren trigger when obstructed.',
    targetCategory: 'Blocked Egress',
    targetZoneId: 'ZONE_B',
    recurrenceReductionFactor: 0.75,
    exposureReductionFactor: 0.50,
    severityMitigationFactor: 0.25,
    defaultAdherenceRate: 95,
    implementationCostTier: 'Medium ($$)',
    timeframeToEffect: '3 Weeks',
  },
  {
    id: 'INT-04',
    title: 'Facility-wide High-Vis Floor Marking & Pedestrian Corridors',
    description:
      'Complete epoxy resurfacing of transit paths with luminous green pedestrian walkways and red hazard swing zones around forklifts and cranes.',
    targetCategory: 'Fall/Trip Hazard',
    targetZoneId: 'All Zones',
    recurrenceReductionFactor: 0.45,
    exposureReductionFactor: 0.35,
    severityMitigationFactor: 0.20,
    defaultAdherenceRate: 85,
    implementationCostTier: 'High ($$$)',
    timeframeToEffect: '1 Month',
  },
];

// Presets for AI Safety Inspection image testing
export const INSPECTION_IMAGE_PRESETS = [
  {
    id: 'preset-loading-dock',
    name: 'Loading Dock #3 — Night Shift Offload (Missing High-Vis)',
    zoneId: 'ZONE_D' as const,
    zoneName: 'Zone D — Logistics & Forklift Loading Dock',
    shift: 'Night (22:00 - 06:00)' as const,
    description: 'Cargo bay trailer staging with forklift in proximity, dark clothing observed.',
    // Clean SVG Data URI representation of an industrial loading dock photo
    svgContent: `
      <svg width="640" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#131826;font-family:sans-serif;">
        <defs>
          <linearGradient id="bayLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <linearGradient id="amberLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="url(#bayLight)"/>
        <!-- Dock door frame -->
        <rect x="50" y="40" width="300" height="340" fill="#1e293b" stroke="#475569" stroke-width="4"/>
        <rect x="70" y="60" width="260" height="300" fill="#090d16"/>
        <!-- Yellow hazard lines on dock edge -->
        <rect x="0" y="370" width="640" height="50" fill="#111827"/>
        <line x1="0" y1="375" x2="640" y2="375" stroke="#facc15" stroke-width="10" stroke-dasharray="25 15"/>
        <!-- Forklift silhouette in background -->
        <rect x="420" y="190" width="160" height="150" rx="8" fill="#eab308" opacity="0.9"/>
        <rect x="390" y="150" width="35" height="190" fill="#1f2937"/>
        <rect x="360" y="300" width="50" height="20" fill="#374151"/>
        <circle cx="445" cy="340" r="22" fill="#000" stroke="#6b7280" stroke-width="4"/>
        <circle cx="550" cy="340" r="22" fill="#000" stroke="#6b7280" stroke-width="4"/>
        <rect x="450" y="170" width="10" height="20" fill="#f97316"/>
        <text x="445" y="240" fill="#000" font-weight="bold" font-size="14">FL-09</text>
        <!-- Worker 1: Standing in dock door, dark clothes, NO VEST, NO HELMET -->
        <circle cx="160" cy="200" r="14" fill="#d97706"/> <!-- Head/Face -->
        <!-- Dark jacket (NO HIGH VIS) -->
        <path d="M140 216 L180 216 L175 285 L145 285 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <line x1="150" y1="285" x2="148" y2="340" stroke="#0f172a" stroke-width="8"/>
        <line x1="170" y1="285" x2="172" y2="340" stroke="#0f172a" stroke-width="8"/>
        <text x="110" y="180" fill="#ef4444" font-weight="bold" font-size="12">⚠️ UNVESTED WORKER</text>
        <rect x="125" y="190" width="70" height="155" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 4"/>
        <!-- Worker 2: Compliant forklift driver -->
        <circle cx="465" cy="210" r="11" fill="#fcd34d"/>
        <!-- Yellow Hardhat -->
        <path d="M452 205 Q465 192 478 205 Z" fill="#facc15"/>
        <!-- High-vis vest -->
        <rect x="455" y="222" width="22" height="30" fill="#22c55e"/>
        <!-- Overlay Badges -->
        <rect x="20" y="20" width="190" height="32" rx="4" fill="#000" opacity="0.75"/>
        <text x="30" y="42" fill="#38bdf8" font-size="12" font-weight="600">ZONE D DOCK 3 • CAMERA 04</text>
        <rect x="470" y="20" width="150" height="32" rx="4" fill="#000" opacity="0.75"/>
        <text x="480" y="42" fill="#94a3b8" font-size="11">2026-10-14 23:18:04</text>
      </svg>
    `,
  },
  {
    id: 'preset-chemical-bay',
    name: 'Chemical Bay — Degreasing Station & Eyewash Corridor',
    zoneId: 'ZONE_B' as const,
    zoneName: 'Zone B — Chemical Bay & Surface Treatment',
    shift: 'Morning (06:00 - 14:00)' as const,
    description: 'Acid rinse immersion tanks with PPE compliant operator and unobstructed eyewash.',
    svgContent: `
      <svg width="640" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#0c192c;font-family:sans-serif;">
        <rect width="640" height="420" fill="#081426"/>
        <!-- Chemical tanks -->
        <rect x="40" y="140" width="260" height="200" fill="#1e3a5f" stroke="#0284c7" stroke-width="3" rx="6"/>
        <rect x="60" y="160" width="220" height="160" fill="#0284c7" opacity="0.3"/>
        <text x="90" y="200" fill="#38bdf8" font-weight="bold" font-size="16">DIP TANK 02 (ACID)</text>
        <text x="90" y="225" fill="#facc15" font-size="12">⚠️ PPE MANDATORY: GOGGLES &amp; APRON</text>
        <!-- Eyewash station -->
        <rect x="360" y="150" width="80" height="140" fill="#047857" rx="4"/>
        <circle cx="400" cy="180" r="22" fill="#10b981"/>
        <text x="365" y="240" fill="#fff" font-size="11" font-weight="bold">EYEWASH</text>
        <rect x="340" y="295" width="120" height="40" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="6 3"/>
        <text x="345" y="320" fill="#22c55e" font-size="10">36" CLEAR PASSAGE</text>
        <!-- Worker compliant with PPE -->
        <circle cx="210" cy="180" r="13" fill="#fcd34d"/>
        <!-- White hardhat -->
        <path d="M195 175 Q210 162 225 175 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Goggles -->
        <rect x="202" y="177" width="16" height="6" rx="2" fill="#0284c7"/>
        <!-- Chemical apron -->
        <path d="M192 195 L228 195 L224 275 L196 275 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
        <rect x="180" y="160" width="60" height="130" fill="none" stroke="#10b981" stroke-width="2"/>
        <text x="175" y="150" fill="#10b981" font-weight="bold" font-size="11">✓ PPE COMPLIANT</text>
        <!-- Overhead labels -->
        <rect x="20" y="20" width="220" height="32" rx="4" fill="#000" opacity="0.8"/>
        <text x="30" y="42" fill="#38bdf8" font-size="12" font-weight="600">ZONE B CHEMICAL • CAM 02</text>
      </svg>
    `,
  },
  {
    id: 'preset-fabrication-aisle',
    name: 'Fabrication Shop — Walking Aisle & Gantry Crane View',
    zoneId: 'ZONE_A' as const,
    zoneName: 'Zone A — Heavy Fabrication & Cutting',
    shift: 'Afternoon (14:00 - 22:00)' as const,
    description: 'High ceiling fabrication bay with overhead crane and marked pedestrian aisle.',
    svgContent: `
      <svg width="640" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;font-family:sans-serif;">
        <rect width="640" height="420" fill="#0f172a"/>
        <!-- Steel girders -->
        <rect x="30" y="0" width="30" height="420" fill="#334155"/>
        <rect x="580" y="0" width="30" height="420" fill="#334155"/>
        <rect x="0" y="60" width="640" height="25" fill="#475569"/>
        <!-- Overhead crane bridge -->
        <rect x="200" y="45" width="240" height="45" fill="#eab308" rx="4"/>
        <text x="240" y="75" fill="#000" font-weight="bold" font-size="14">GANTRY CRANE 10-TON</text>
        <!-- Walkway line -->
        <line x1="120" y1="420" x2="300" y2="180" stroke="#facc15" stroke-width="4"/>
        <line x1="280" y1="420" x2="380" y2="180" stroke="#facc15" stroke-width="4"/>
        <text x="160" y="380" fill="#facc15" font-size="12" font-weight="600">PEDESTRIAN WALKWAY</text>
        <!-- Worker 1: In Walkway, compliant -->
        <circle cx="210" cy="250" r="10" fill="#fed7aa"/>
        <path d="M200 246 Q210 236 220 246 Z" fill="#ffffff"/>
        <rect x="202" y="260" width="16" height="24" fill="#22c55e"/>
        <!-- Worker 2: Near welding booth, spark shields active -->
        <rect x="420" y="200" width="140" height="160" fill="#b45309" opacity="0.6" stroke="#f59e0b" stroke-width="2"/>
        <text x="430" y="230" fill="#fef08a" font-size="11">HOT WORK BOOTH</text>
        <circle cx="480" cy="270" r="10" fill="#fed7aa"/>
        <path d="M470 266 Q480 256 490 266 Z" fill="#facc15"/>
        <rect x="20" y="20" width="210" height="32" rx="4" fill="#000" opacity="0.8"/>
        <text x="30" y="42" fill="#38bdf8" font-size="12" font-weight="600">ZONE A FABRICATION • CAM 01</text>
      </svg>
    `,
  },
  {
    id: 'preset-corridor-flood',
    name: 'Factory Corridor — Drainage Flooding Hazard',
    zoneId: 'ZONE_C' as const,
    zoneName: 'Zone C — Electrical & Substation Gallery',
    shift: 'Morning (06:00 - 14:00)' as const,
    description: 'Severe stormwater drainage backup with water pooling across main corridor and approaching live electrical cabinets.',
    svgContent: `
      <svg width="640" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#091e3a;font-family:sans-serif;">
        <defs>
          <linearGradient id="floodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#0369a1" stop-opacity="0.95"/>
          </linearGradient>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="#0f172a"/>
        <!-- Wall -->
        <rect x="0" y="0" width="640" height="230" fill="url(#wallGrad)"/>
        <!-- Electrical Cabinets -->
        <rect x="80" y="60" width="130" height="170" fill="#475569" stroke="#94a3b8" stroke-width="2" rx="4"/>
        <rect x="100" y="80" width="90" height="40" fill="#1e293b"/>
        <text x="110" y="105" fill="#f87171" font-size="12" font-weight="bold">⚡ 415V MAIN</text>
        <rect x="230" y="80" width="100" height="150" fill="#475569" stroke="#94a3b8" stroke-width="2" rx="4"/>
        <text x="245" y="110" fill="#facc15" font-size="11" font-weight="bold">PANEL B-1</text>
        <!-- Flooded floor surface -->
        <rect x="0" y="230" width="640" height="190" fill="url(#floodGrad)"/>
        <!-- Water ripples & reflection -->
        <ellipse cx="200" cy="300" rx="140" ry="14" fill="#38bdf8" opacity="0.3"/>
        <ellipse cx="440" cy="340" rx="160" ry="16" fill="#38bdf8" opacity="0.25"/>
        <ellipse cx="320" cy="370" rx="180" ry="18" fill="#38bdf8" opacity="0.35"/>
        <line x1="0" y1="230" x2="640" y2="230" stroke="#38bdf8" stroke-width="3"/>
        <!-- Drainage Grate Submerged -->
        <rect x="370" y="270" width="90" height="45" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
        <line x1="390" y1="270" x2="390" y2="315" stroke="#94a3b8" stroke-width="2"/>
        <line x1="415" y1="270" x2="415" y2="315" stroke="#94a3b8" stroke-width="2"/>
        <line x1="440" y1="270" x2="440" y2="315" stroke="#94a3b8" stroke-width="2"/>
        <!-- Warning Tag -->
        <rect x="340" y="240" width="160" height="24" rx="4" fill="#ef4444"/>
        <text x="350" y="256" fill="#ffffff" font-size="11" font-weight="bold">⚠️ DRAINAGE BACKUP</text>
        <!-- Overlay Badges -->
        <rect x="20" y="20" width="220" height="32" rx="4" fill="#000" opacity="0.8"/>
        <text x="30" y="42" fill="#38bdf8" font-size="12" font-weight="600">ZONE C CORRIDOR • CAM 03</text>
        <rect x="440" y="20" width="180" height="32" rx="4" fill="#ef4444" opacity="0.9"/>
        <text x="450" y="42" fill="#ffffff" font-size="12" font-weight="bold">FLOOD DISASTER HAZARD</text>
      </svg>
    `,
  },
  {
    id: 'preset-perimeter-landslide',
    name: 'Plant Perimeter — Slope Landslide & Soil Failure',
    zoneId: 'ZONE_E' as const,
    zoneName: 'Zone E — Perimeter Retaining Wall & Yard',
    shift: 'Morning (06:00 - 14:00)' as const,
    description: 'Hillside embankment slope failure and mudslide breaching facility perimeter wall after heavy rainfall.',
    svgContent: `
      <svg width="640" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#1c1917;font-family:sans-serif;">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#64748b"/>
          </linearGradient>
          <linearGradient id="mudGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#78350f"/>
            <stop offset="50%" stop-color="#92400e"/>
            <stop offset="100%" stop-color="#451a03"/>
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="url(#skyGrad)"/>
        <!-- Distant Hill Slope -->
        <path d="M0 80 Q200 40 400 90 T640 60 L640 420 L0 420 Z" fill="#292524"/>
        <!-- Landslide mud mass flow -->
        <path d="M180 80 Q290 140 220 220 Q160 280 280 340 L450 380 L520 260 Q460 170 380 90 Z" fill="url(#mudGrad)"/>
        <!-- Broken Masonry Boundary Wall -->
        <rect x="0" y="260" width="180" height="70" fill="#57534e" stroke="#78716c" stroke-width="2"/>
        <!-- Displaced/broken wall segment -->
        <polygon points="180,260 250,285 240,345 175,320" fill="#44403c" stroke="#ef4444" stroke-width="2"/>
        <rect x="420" y="260" width="220" height="70" fill="#57534e" stroke="#78716c" stroke-width="2"/>
        <!-- Fence posts buckled -->
        <line x1="60" y1="260" x2="60" y2="190" stroke="#a8a29e" stroke-width="3"/>
        <line x1="120" y1="260" x2="120" y2="190" stroke="#a8a29e" stroke-width="3"/>
        <line x1="180" y1="260" x2="210" y2="210" stroke="#ef4444" stroke-width="4"/>
        <line x1="240" y1="290" x2="280" y2="250" stroke="#ef4444" stroke-width="4"/>
        <!-- Soil mud spread over yard road -->
        <ellipse cx="320" cy="350" rx="140" ry="40" fill="#78350f" opacity="0.9"/>
        <text x="230" y="355" fill="#fef08a" font-size="12" font-weight="bold">⚠️ SOIL SLIPPAGE 4M PENETRATION</text>
        <!-- Overlay Badges -->
        <rect x="20" y="20" width="230" height="32" rx="4" fill="#000" opacity="0.8"/>
        <text x="30" y="42" fill="#facc15" font-size="12" font-weight="600">ZONE E PERIMETER • CAM 08</text>
        <rect x="430" y="20" width="190" height="32" rx="4" fill="#b91c1c" opacity="0.95"/>
        <text x="440" y="42" fill="#ffffff" font-size="12" font-weight="bold">LANDSLIDE DISASTER HAZARD</text>
      </svg>
    `,
  },
  {
    id: 'preset-coastal-erosion',
    name: 'Discharge Canal — Coastal Erosion & Embankment Washout',
    zoneId: 'ZONE_E' as const,
    zoneName: 'Zone E — Effluent Canal & Shore Revetment',
    shift: 'Afternoon (14:00 - 22:00)' as const,
    description: 'High discharge tidal surge undermining canal concrete revetment and creating severe structural road voids.',
    svgContent: `
      <svg width="640" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#082f49;font-family:sans-serif;">
        <defs>
          <linearGradient id="waterFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0369a1"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
        </defs>
        <rect width="640" height="420" fill="#0c4a6e"/>
        <!-- Concrete Service Road Slab (Left) -->
        <polygon points="0,0 280,0 210,420 0,420" fill="#475569"/>
        <!-- Undercut Void Cave (Eroded cavity beneath slab) -->
        <path d="M190 140 Q240 210 170 280 Q130 330 190 380 L230 420 L270 320 Q290 220 280 140 Z" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
        <text x="120" y="240" fill="#ef4444" font-size="12" font-weight="bold">⚠️ 1.2M EROSION CAVITY</text>
        <text x="110" y="260" fill="#fca5a5" font-size="10">SLAB VOID - NO VEHICLE ENTRY</text>
        <!-- Canal Fast Flowing Water -->
        <polygon points="280,0 640,0 640,420 210,420" fill="url(#waterFlow)"/>
        <!-- Swirling eddies / turbulent wake -->
        <path d="M300 80 Q360 120 320 160 Q280 200 350 240" fill="none" stroke="#e0f2fe" stroke-width="3" opacity="0.6"/>
        <path d="M420 120 Q500 180 440 240 Q400 300 480 360" fill="none" stroke="#e0f2fe" stroke-width="4" opacity="0.5"/>
        <!-- Boulders scattered in water -->
        <circle cx="340" cy="310" r="16" fill="#334155"/>
        <circle cx="370" cy="330" r="12" fill="#1e293b"/>
        <circle cx="390" cy="280" r="14" fill="#334155"/>
        <!-- Overlay Badges -->
        <rect x="20" y="20" width="220" height="32" rx="4" fill="#000" opacity="0.8"/>
        <text x="30" y="42" fill="#38bdf8" font-size="12" font-weight="600">ZONE E CANAL • CAM 11</text>
        <rect x="420" y="20" width="200" height="32" rx="4" fill="#b91c1c" opacity="0.95"/>
        <text x="430" y="42" fill="#ffffff" font-size="12" font-weight="bold">COASTAL EROSION HAZARD</text>
      </svg>
    `,
  },
];

const getPresetDataUrl = (id: string): string => {
  const p = INSPECTION_IMAGE_PRESETS.find((x) => x.id === id);
  return p ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(p.svgContent.trim())}` : '';
};

export const INITIAL_SIMPLE_PROBLEMS: SimpleSafetyProblem[] = [
  {
    id: 'PRB-001',
    date: '12 Oct 2026, 11:45 PM',
    workArea: 'Loading Area Door 3',
    zoneId: 'ZONE_D',
    category: 'PPE Non-compliance',
    categoryKey: 'HELMET_VEST',
    whatIsWrong: 'Worker inside loading trailer door without a high-visibility vest or safety helmet.',
    howSerious: 'High',
    whyIsThisRisky: 'In the loading bay, forklifts reverse quickly with blind spots. Without a reflective vest and helmet, a driver may not see the worker in time, causing fatal impact.',
    whatShouldWeDo: 'Ask the worker to wear a safety helmet and high-visibility vest before continuing work.',
    visualEvidence: 'One worker observed wearing dark blue jacket standing 3 meters behind trailer door 3 near active forklift path.',
    uncertaintyNotes: 'Forklift FL-09 had warning beeper on; ramp floodlight had partial shadow.',
    status: 'Needs Fixing',
    actionStatus: 'In Progress',
    responsibleRole: 'Warehouse Logistics Mgr',
    dueDate: '2026-10-20',
    isRepeated: true,
    repeatCount: 4,
    isSampleData: true,
    workerCount: 2,
    helmetsCount: 1,
    vestsCount: 0,
    beforePhotoUrl: getPresetDataUrl('preset-loading-dock'),
    photoPreview: getPresetDataUrl('preset-loading-dock'),
    humanReviewStatus: 'Verified',
    reviewedBy: 'Marcus Vance (Safety Officer)',
  },
  {
    id: 'PRB-002',
    date: '10 Oct 2026, 02:15 PM',
    workArea: 'Chemical Tank Bay',
    zoneId: 'ZONE_B',
    category: 'Blocked Egress',
    categoryKey: 'BLOCKED_EYEWASH',
    whatIsWrong: 'Wooden pallets were placed directly in front of the emergency eyewash station.',
    howSerious: 'High',
    whyIsThisRisky: 'If acid splashes into an operator’s eyes, every second counts. A blocked eyewash delays flushing, which can cause permanent blindness within 30 seconds.',
    whatShouldWeDo: 'Move pallets immediately to keep emergency eyewash pathway completely clear.',
    visualEvidence: 'Stack of 4 empty wooden pallets resting within the 36-inch yellow floor clearance box.',
    uncertaintyNotes: 'Pallets were tagged for disposal; station water pressure was tested and normal.',
    status: 'Fixed',
    actionStatus: 'Completed',
    responsibleRole: 'EHS Specialist',
    dueDate: '2026-10-12',
    fixedDate: '11 Oct 2026',
    isRepeated: false,
    isSampleData: true,
    workerCount: 0,
    helmetsCount: 0,
    vestsCount: 0,
    beforePhotoUrl: getPresetDataUrl('preset-chemical-bay'),
    photoPreview: getPresetDataUrl('preset-chemical-bay'),
    humanReviewStatus: 'Verified',
    reviewedBy: 'Elena Chen (Plant Director)',
    followUpResult: 'Satisfactory',
    followUpInspector: 'Sarah Jenkins (Chemical Safety Lead)',
    followUpNotes: 'Pallets relocated to exterior pad; 36-inch clearance confirmed completely open.',
  },
  {
    id: 'PRB-003',
    date: '08 Oct 2026, 02:15 AM',
    workArea: 'Loading Area Door 3',
    zoneId: 'ZONE_D',
    category: 'PPE Non-compliance',
    categoryKey: 'HELMET_VEST',
    whatIsWrong: 'Worker under high pallet rack without a hardhat while lifting heavy cargo.',
    howSerious: 'High',
    whyIsThisRisky: 'Cargo pallets elevated 4 meters above head height can drop cartons or wooden splinters. Working beneath loads without a helmet can cause severe head trauma.',
    whatShouldWeDo: 'Put on safety hardhat before working under overhead racks.',
    visualEvidence: 'Warehouse order picker standing beneath pallet bay 14 without hardhat.',
    uncertaintyNotes: 'Operator removed hardhat momentarily due to heat; hardhat was resting on forklift.',
    status: 'Needs Fixing',
    actionStatus: 'In Progress',
    responsibleRole: 'Shift Lead',
    dueDate: '2026-10-18',
    isRepeated: true,
    repeatCount: 4,
    isSampleData: true,
    workerCount: 1,
    helmetsCount: 0,
    vestsCount: 1,
    beforePhotoUrl: getPresetDataUrl('preset-loading-dock'),
    photoPreview: getPresetDataUrl('preset-loading-dock'),
    humanReviewStatus: 'Verified',
    reviewedBy: 'Marcus Vance (Safety Officer)',
  },
  {
    id: 'PRB-004',
    date: '06 Oct 2026, 11:20 AM',
    workArea: 'Welding Bay',
    zoneId: 'ZONE_A',
    category: 'Machine Guarding',
    categoryKey: 'HOT_WORK_SCREEN',
    whatIsWrong: 'Welding spark curtain was left open toward the pedestrian walkway.',
    howSerious: 'Medium',
    whyIsThisRisky: 'Intense ultraviolet welding arc radiation causes painful "arc eye" flash burns to workers walking down the aisle without dark shade lenses.',
    whatShouldWeDo: 'Pull protective flash curtain closed before striking arc.',
    visualEvidence: 'Amber tinted UV curtain retracted by 1.5 meters while plasma torch was sparking.',
    uncertaintyNotes: 'Pedestrians wore standard safety spectacles with side shields.',
    status: 'Fixed',
    actionStatus: 'Completed',
    responsibleRole: 'Maintenance Tech',
    dueDate: '2026-10-07',
    fixedDate: '07 Oct 2026',
    isRepeated: false,
    isSampleData: true,
    workerCount: 3,
    helmetsCount: 3,
    vestsCount: 3,
    beforePhotoUrl: getPresetDataUrl('preset-fabrication-aisle'),
    photoPreview: getPresetDataUrl('preset-fabrication-aisle'),
    humanReviewStatus: 'Verified',
    reviewedBy: 'Elena Chen (Plant Director)',
    followUpResult: 'Satisfactory',
    followUpInspector: 'Carlos Rivera (Lead Maintenance)',
    followUpNotes: 'Magnetic latch installed on curtain track; torch power cuts out if curtain opens.',
  },
  {
    id: 'PRB-005',
    date: '04 Oct 2026, 06:25 PM',
    workArea: 'Stamping Press 300T',
    zoneId: 'ZONE_E',
    category: 'Machine Guarding',
    categoryKey: 'MACHINE_GUARD',
    whatIsWrong: 'Emergency light curtain safety key left in override position.',
    howSerious: 'High',
    whyIsThisRisky: 'The hydraulic press exerts 300 tons of force. Bypassing optical safety guards allows stroke cycling while hands may be in the die pinch zone, causing catastrophic amputations.',
    whatShouldWeDo: 'Remove bypass key and set machine guard to automatic safety stop.',
    visualEvidence: 'Yellow selector key inserted and rotated 90 degrees in bypass cylinder.',
    uncertaintyNotes: 'Automated continuous feed was running; no personnel were within 2 meters.',
    status: 'Fixed',
    actionStatus: 'Completed',
    responsibleRole: 'Plant Operations Director',
    dueDate: '2026-10-05',
    fixedDate: '05 Oct 2026',
    isRepeated: false,
    isSampleData: true,
    workerCount: 1,
    helmetsCount: 1,
    vestsCount: 1,
    beforePhotoUrl: getPresetDataUrl('preset-corridor-flood'),
    photoPreview: getPresetDataUrl('preset-corridor-flood'),
    humanReviewStatus: 'Verified',
    reviewedBy: 'Elena Chen (Plant Director)',
    followUpResult: 'Satisfactory',
    followUpInspector: 'Thomas Wright (Tooling Supt.)',
    followUpNotes: 'Key switch removed; replaced with supervisor RFID credential with 15-minute auto-timeout.',
  },
];


