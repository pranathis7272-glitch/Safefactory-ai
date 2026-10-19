export type Language = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'ml';

export interface TranslationStrings {
  appTitle: string;
  platformSubtitle: string;
  tagline: string;
  prototypeBadge: string;
  welcomeGreeting: string;
  welcomeSubheading: string;
  homeBtn: string;
  readThis: string;
  stopReading: string;

  // 4 Main Options
  cardCheckSafetyTitle: string;
  cardCheckSafetyDesc: string;
  cardSafetyProblemsTitle: string;
  cardSafetyProblemsDesc: string;
  cardFixProblemsTitle: string;
  cardFixProblemsDesc: string;
  cardSafetyReportTitle: string;
  cardSafetyReportDesc: string;

  // Smart Safety Memory
  memoryTitle: string;
  memoryDesc: string;
  memoryDetailsBtn: string;
  memoryHideBtn: string;
  memoryInsightRepeat: string;
  memoryWhyRiskTitle: string;
  memoryWhyRiskDesc: string;
  memoryActionTitle: string;
  memoryActionDesc: string;
  memoryNoRepeatNote: string;

  // Check Safety View
  checkTitle: string;
  step1: string;
  step2: string;
  step3: string;
  pickPhotoPrompt: string;
  choosePreset: string;
  orUploadOwn: string;
  clickToUpload: string;
  checkPhotoBtn: string;
  checkingPhoto: string;
  photoDisclaimer: string;
  photoLoadedSuccess: string;
  changePhotoBtn: string;
  removePhotoBtn: string;
  loadingOptimizingPhoto: string;
  analyzedPhotoSnapshot: string;

  // Result Verdicts
  verdictSafe: string;
  verdictProblem: string;
  verdictUnclear: string;

  // Simple 4 Questions
  whatIsWrong: string;
  whereSeen: string;
  howSerious: string;
  whatShouldWeDo: string;
  unclearAdvice: string;

  // Severity labels
  highRisk: string;
  mediumRisk: string;
  lowRisk: string;

  // Save / Report Action
  saveAsProblemBtn: string;
  problemSavedSuccess: string;

  // Safety Problems View
  problemsTitle: string;
  problemsSubtitle: string;
  repeatedProblemAlert: string;
  sampleDataBadge: string;
  liveDataBadge: string;
  statusNeedsFixing: string;
  statusFixed: string;
  noProblemsFound: string;
  dateLabel: string;
  areaLabel: string;

  // Fix Problems View
  fixTitle: string;
  fixSubtitle: string;
  markAsFixedBtn: string;
  confirmFixedTitle: string;
  confirmFixedQuestion: string;
  yesFixedBtn: string;
  notYetBtn: string;
  fixedSuccessMsg: string;
  noOpenProblems: string;

  // Report View
  reportTitle: string;
  reportSubtitle: string;
  statTotalFound: string;
  statFixed: string;
  statStillOpen: string;
  statRepeatedCount: string;
  printReport: string;
  recentListTitle: string;

  // Presets
  preset1Name: string;
  preset1Desc: string;
  preset2Name: string;
  preset2Desc: string;
  preset3Name: string;
  preset3Desc: string;
  presetFloodName: string;
  presetFloodDesc: string;
  presetLandslideName: string;
  presetLandslideDesc: string;
  presetCoastalErosionName: string;
  presetCoastalErosionDesc: string;

  // Upgrades: Roles, Due Dates, Tabs, Before/After, Map, CSV, Simulator
  whyIsThisRiskyLabel: string;
  hazardTypeLabel: string;
  confidenceLabel: string;
  riskGuidanceLabel: string;
  nextStepsLabel: string;
  speakToReportTitle: string;
  speakToReportBtn: string;
  listeningStatus: string;
  stopListeningBtn: string;

  // Audio & Check Report
  checkReportAudioTitle: string;
  audioStatePreparing: string;
  audioStatePlaying: string;
  audioStateFinished: string;
  audioStateError: string;
  readableTextAlternative: string;

  // Roles
  roleLabel: string;
  dueDateLabel: string;
  roleEHS: string;
  roleShiftLead: string;
  roleMaintenance: string;
  roleLogistics: string;
  roleOpsDirector: string;

  // Action Tabs
  tabAllActions: string;
  tabOpenActions: string;
  tabInProgress: string;
  tabCompleted: string;
  btnStartAction: string;
  btnCompleteAction: string;

  // Before & After Photos
  beforePhoto: string;
  afterPhoto: string;
  uploadAfterPhotoBtn: string;
  photoComparisonTitle: string;
  noAfterPhotoYet: string;

  // Human Confirmation Modal
  humanConfirmTitle: string;
  humanConfirmSubtitle: string;
  verifierNameLabel: string;
  verifierRoleLabel: string;
  certifyCheckboxLabel: string;
  btnConfirmDone: string;

  // Follow-up Audits
  followUpAuditTitle: string;
  followUpSatisfactory: string;
  followUpAuditedBy: string;

  // Zone Risk Map
  factoryZoneMapTitle: string;
  factoryZoneMapSubtitle: string;
  clickZoneToView: string;
  statOverdueCount: string;
  statUnresolvedCount: string;

  // Reports & CSV
  btnDownloadCsv: string;
  downloadSuccessNotice: string;
  sampleBadgeText: string;
  liveBadgeText: string;

  // What-If Simulator
  simulatorTitle: string;
  simulatorSubtitle: string;
  simulatorDisclaimer: string;
  interventionOption1: string;
  interventionOption2: string;
  interventionOption3: string;
  baselineRiskLabel: string;
  simulatedRiskLabel: string;
  riskReductionEstimate: string;

  // Complete UI Polish Keys
  step1Of3: string;
  resetConfirmPrompt: string;
  cameraSupports: string;
  micAllowed: string;
  giveMicPermission: string;
  typeNotesFallback: string;
  spokenNotesLabel: string;
  spokenNotesPlaceholder: string;
  tryCheckingAgain: string;
  rejectionNoticeText: string;
  visualEvidenceLabel: string;
  visualLimitationsLabel: string;
  humanVerificationHeader: string;
  doneEditing: string;
  editDetailsBeforeSaving: string;
  confirmAndAddProblem: string;
  rejectFalseAlarm: string;
  problemDescLabel: string;
  workAreaLabel: string;
  severityLevelLabel: string;
  searchPlaceholder: string;
  allStatuses: string;
  allWorkAreas: string;
  allSeverities: string;
  clearFilters: string;
  repeatedProblemsFoundTitle: string;
  repeatedProblemsSubtitle: string;
  supportingRecordsLabel: string;
  resolutionRateLabel: string;
  completePercentLabel: string;
  activeLabel: string;
  totalLabel: string;
  closeBtn: string;
  cancelBtn: string;
  saveAssignmentBtn: string;
  editRoleDueDate: string;
  assignRoleTitle: string;
  uploadVerificationImage: string;
  photoAttached: string;
  noIncidentsInZone: string;
  initialInspectionEvidence: string;
  safetyInspectorLabel: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'INDUSAFE AI',
    platformSubtitle: 'Industrial Safety Intelligence Platform',
    tagline: 'See Risks. Prevent Repeats.',
    prototypeBadge: '',
    welcomeGreeting: 'Hello! Let’s make your workplace safer.',
    welcomeSubheading: 'Choose what you want to do.',
    homeBtn: '← Back to Home',
    readThis: '🔊 Read This',
    stopReading: '⏹️ Stop Voice',

    cardCheckSafetyTitle: 'CHECK SAFETY',
    cardCheckSafetyDesc: 'Take a photo and let AI check for possible safety problems.',
    cardSafetyProblemsTitle: 'SAFETY PROBLEMS',
    cardSafetyProblemsDesc: 'See problems, where they happened, and what to do.',
    cardFixProblemsTitle: 'FIX PROBLEMS',
    cardFixProblemsDesc: 'See what needs fixing and mark it done.',
    cardSafetyReportTitle: 'SAFETY REPORT',
    cardSafetyReportDesc: 'See problems, fixes, and repeated issues.',

    memoryTitle: 'Smart Safety Memory',
    memoryDesc: 'Remembers past problems, finds repeated issues, explains the risk, and helps you take action.',
    memoryDetailsBtn: 'Show Memory Details ▾',
    memoryHideBtn: 'Hide Details ▴',
    memoryInsightRepeat: 'Loading Area Door 3 has repeated missing helmet and vest incidents (3 times this month). Elevated risk due to reversing forklifts.',
    memoryWhyRiskTitle: 'Why is this risk prioritized?',
    memoryWhyRiskDesc: 'Recurrent non-compliance in heavy vehicle corridors creates compounding likelihood of severe crush or collision injuries.',
    memoryActionTitle: 'Active Preventive Action:',
    memoryActionDesc: 'Physical barrier chain and mandatory hi-vis gate loaner policy currently in progress.',
    memoryNoRepeatNote: 'Memory Rule: Stored records must confirm 2 or more occurrences before recurrence alert is shown.',

    checkTitle: 'Check Safety',
    step1: 'Step 1: Take or upload a photo.',
    step2: 'Step 2: Press Check Photo.',
    step3: 'Step 3: See the result.',
    pickPhotoPrompt: 'Pick a demonstration photo or upload your own:',
    choosePreset: 'Factory & Environmental Examples:',
    orUploadOwn: 'Or upload your own camera photo:',
    clickToUpload: 'Click to capture or upload a workplace photo',
    checkPhotoBtn: 'Check Photo',
    checkingPhoto: 'AI is checking photo... Please wait a moment',
    photoDisclaimer:
      'Notice: A photo does not prove the whole area is safe. Only visible safety problems and hazards can be checked. AI analysis is an assistive tool and does not replace certified safety officers.',
    photoLoadedSuccess: 'Photo loaded and ready for analysis',
    changePhotoBtn: 'Change Photo',
    removePhotoBtn: 'Remove Photo',
    loadingOptimizingPhoto: 'Loading and optimizing image...',
    analyzedPhotoSnapshot: 'Analyzed Photo Snapshot',

    verdictSafe: 'Looks Safe',
    verdictProblem: 'Safety Problem Found',
    verdictUnclear: 'Please Ask a Safety Officer',

    whatIsWrong: 'What is wrong?',
    whereSeen: 'Where was it seen?',
    howSerious: 'How serious is it?',
    whatShouldWeDo: 'What should we do?',
    unclearAdvice:
      'We cannot check this clearly. Please take another photo or ask your safety officer.',

    highRisk: 'High Risk',
    mediumRisk: 'Medium Risk',
    lowRisk: 'Low Risk',

    saveAsProblemBtn: 'Add to Safety Problems List',
    problemSavedSuccess: 'Problem saved to Safety Problems list successfully!',

    problemsTitle: 'Safety Problems',
    problemsSubtitle: 'Recorded incidents, simple risk levels, and repeated problems.',
    repeatedProblemAlert: '⚠️ This problem has happened here before.',
    sampleDataBadge: 'Sample Record',
    liveDataBadge: 'Live Verified Record',
    statusNeedsFixing: 'Needs Fixing',
    statusFixed: 'Fixed',
    noProblemsFound: 'No safety problems recorded yet. Great job!',
    dateLabel: 'Date',
    areaLabel: 'Work Area',

    fixTitle: 'Fix Problems',
    fixSubtitle: 'See what needs fixing and mark it done.',
    markAsFixedBtn: 'Mark as Fixed',
    confirmFixedTitle: 'Confirm Fix',
    confirmFixedQuestion: 'Has this problem really been fixed?',
    yesFixedBtn: 'Yes, Fixed',
    notYetBtn: 'Not Yet',
    fixedSuccessMsg: 'Recorded as fixed. Thank you for keeping the workplace safe!',
    noOpenProblems: 'No problems waiting to be fixed right now! All clear.',

    reportTitle: 'Safety Report',
    reportSubtitle: 'Understandable summary of recorded incidents and corrective actions.',
    statTotalFound: 'Total Incidents Found',
    statFixed: 'Completed Fixes',
    statStillOpen: 'Unresolved Incidents',
    statRepeatedCount: 'Recurring Issues',
    printReport: 'Print Report',
    recentListTitle: 'Incident & Fix History',

    preset1Name: 'Loading Area (Worker without vest or helmet)',
    preset1Desc: 'Worker near forklift lane without high-visibility vest',
    preset2Name: 'Chemical Tank (Safe PPE Compliant)',
    preset2Desc: 'Worker wearing chemical apron, goggles, and hardhat',
    preset3Name: 'Fabrication Aisle (Clear Walkway)',
    preset3Desc: 'Clear pedestrian walkway with spark curtains active',
    presetFloodName: 'Factory Corridor (Drainage Flooding Hazard)',
    presetFloodDesc: 'Heavy water accumulation blocking escape corridor and electrical panels',
    presetLandslideName: 'Plant Perimeter (Slope Landslide & Soil Failure)',
    presetLandslideDesc: 'Soil displacement and mudflow breaching retaining boundary',
    presetCoastalErosionName: 'Discharge Canal (Coastal Erosion & Washout)',
    presetCoastalErosionDesc: 'Embankment scour and structural foundation undermining',

    whyIsThisRiskyLabel: 'Why is this risky?',
    hazardTypeLabel: 'Hazard Category',
    confidenceLabel: 'Confidence Assessment',
    riskGuidanceLabel: 'Risk Guidance',
    nextStepsLabel: 'Recommended Next Steps',
    speakToReportTitle: 'Speak to Report',
    speakToReportBtn: '🎤 Speak to Report',
    listeningStatus: 'Listening to your voice... Please speak clearly',
    stopListeningBtn: '⏹️ Finish Speaking',

    checkReportAudioTitle: 'Report Audio Playback & Review',
    audioStatePreparing: 'Preparing audio voice...',
    audioStatePlaying: 'Playing audio report',
    audioStateFinished: 'Audio playback finished',
    audioStateError: 'Audio playback unavailable on this device. Readable text shown below.',
    readableTextAlternative: 'Readable Text Alternative:',

    roleLabel: 'Responsible Role',
    dueDateLabel: 'Due Date',
    roleEHS: 'EHS Specialist',
    roleShiftLead: 'Shift Lead',
    roleMaintenance: 'Maintenance Tech',
    roleLogistics: 'Logistics Manager',
    roleOpsDirector: 'Operations Director',

    tabAllActions: 'All Actions',
    tabOpenActions: 'Needs Fixing',
    tabInProgress: 'In Progress',
    tabCompleted: 'Completed',
    btnStartAction: 'Start Action (In Progress)',
    btnCompleteAction: 'Mark Complete & Verify',

    beforePhoto: 'Before Fix (Hazard Evidence)',
    afterPhoto: 'After Fix (Verification Photo)',
    uploadAfterPhotoBtn: '📷 Upload After-Fix Photo',
    photoComparisonTitle: 'Before & After Photo Comparison',
    noAfterPhotoYet: 'No completion photo uploaded yet. Add when marking fixed.',

    humanConfirmTitle: 'Human Verification & Sign-off',
    humanConfirmSubtitle: 'Verify that the hazard has been physically resolved before closing.',
    verifierNameLabel: 'Inspector / Verifier Name',
    verifierRoleLabel: 'Verifier Role / Designation',
    certifyCheckboxLabel: 'I certify that I have inspected this location and the hazard has been removed.',
    btnConfirmDone: 'Verify & Close Problem',

    followUpAuditTitle: 'Follow-up Audit Verification',
    followUpSatisfactory: 'Satisfactory (Risk Eliminated)',
    followUpAuditedBy: 'Audited by',

    factoryZoneMapTitle: 'Factory Zone Risk Blueprint',
    factoryZoneMapSubtitle: 'Active zone risk levels computed from confirmed incidents and open actions.',
    clickZoneToView: 'Click any zone on the blueprint to view its incidents.',
    statOverdueCount: 'Overdue Actions',
    statUnresolvedCount: 'Unresolved Incidents',

    btnDownloadCsv: 'Download Incident Report (CSV)',
    downloadSuccessNotice: 'Incident report CSV downloaded successfully!',
    sampleBadgeText: 'Sample Demo Record',
    liveBadgeText: 'Live User Record',

    simulatorTitle: 'Hypothetical Preventive Action Simulator',
    simulatorSubtitle: 'Test hypothetical preventive interventions to see estimated risk reduction.',
    simulatorDisclaimer:
      'Notice: This is a hypothetical simulation model. Simulations do not predict actual accident reduction and are for scenario planning only.',
    interventionOption1: 'Automated PPE Turnstile Scanner at Bay 3',
    interventionOption2: 'Luminous Walkway Floor Markings & Barrier Chains',
    interventionOption3: 'Machine Guard RFID Interlock Upgrade',
    baselineRiskLabel: 'Current Baseline Risk Score',
    simulatedRiskLabel: 'Simulated Risk Score',
    riskReductionEstimate: 'Hypothetical Risk Reduction',

    step1Of3: 'Step 1 of 3',
    resetConfirmPrompt: 'Reset all sample problems and settings to the starting demonstration?',
    cameraSupports: 'Supports Camera capture or Gallery (JPG, PNG, WEBP)',
    micAllowed: 'Microphone Allowed',
    giveMicPermission: 'Give Mic Permission',
    typeNotesFallback: 'You can also type your notes directly below.',
    spokenNotesLabel: 'Spoken Notes / Manual Observation:',
    spokenNotesPlaceholder: 'Spoken words will appear here automatically, or you can type notes...',
    tryCheckingAgain: 'Try Checking Again',
    rejectionNoticeText: 'Problem marked as false alarm / rejected. It will not be added to the confirmed records.',
    visualEvidenceLabel: 'Visual Evidence:',
    visualLimitationsLabel: 'Visual Limitations / Uncertainty:',
    humanVerificationHeader: 'Human Verification & Action Assignment',
    doneEditing: 'Done Editing',
    editDetailsBeforeSaving: 'Edit Details Before Saving',
    confirmAndAddProblem: 'Confirm & Add to Safety Problems',
    rejectFalseAlarm: 'Reject / False Alarm',
    problemDescLabel: 'Problem Description:',
    workAreaLabel: 'Work Area:',
    severityLevelLabel: 'Severity Level:',
    searchPlaceholder: 'Search problems, areas, or hazard descriptions...',
    allStatuses: 'All Statuses',
    allWorkAreas: 'All Work Areas',
    allSeverities: 'All Severities',
    clearFilters: 'Clear Filters',
    repeatedProblemsFoundTitle: 'Safety Memory Engine: Repeated Problems Found',
    repeatedProblemsSubtitle: 'Memory correlations with at least 2 verified records. Click to view supporting history.',
    supportingRecordsLabel: 'Supporting Records',
    resolutionRateLabel: 'Corrective Action Resolution Rate:',
    completePercentLabel: '% Complete',
    activeLabel: 'Active',
    totalLabel: 'Total',
    closeBtn: 'Close',
    cancelBtn: 'Cancel',
    saveAssignmentBtn: 'Save Assignment',
    editRoleDueDate: 'Edit Role / Due Date ✎',
    assignRoleTitle: 'Assign Role & Target Due Date',
    uploadVerificationImage: 'Upload Verification Image',
    photoAttached: '✓ Photo attached',
    noIncidentsInZone: 'No safety incidents recorded in this zone.',
    initialInspectionEvidence: 'Initial inspection evidence',
    safetyInspectorLabel: 'Safety Inspector',
  },

  kn: {
    appTitle: 'INDUSAFE AI',
    platformSubtitle: 'ಕೈಗಾರಿಕಾ ಸುರಕ್ಷತಾ ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
    tagline: 'ಅಪಾಯಗಳನ್ನು ಗುರುತಿಸಿ. ಪುನರಾವರ್ತನೆ ತಡೆಯಿರಿ.',
    prototypeBadge: '',
    welcomeGreeting: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಕೆಲಸದ ಸ್ಥಳವನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸೋಣ.',
    welcomeSubheading: 'ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಆಯ್ಕೆಮಾಡಿ.',
    homeBtn: '← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    readThis: '🔊 ಇದನ್ನು ಕೇಳಿ',
    stopReading: '⏹️ ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',

    cardCheckSafetyTitle: 'ಸುರಕ್ಷತೆ ಪರಿಶೀಲಿಸಿ',
    cardCheckSafetyDesc: 'ಫೋಟೋ ತೆಗೆಯಿರಿ ಮತ್ತು AI ಸಂಭಾವ್ಯ ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಬಿಡಿ.',
    cardSafetyProblemsTitle: 'ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಗಳು',
    cardSafetyProblemsDesc: 'ಸಮಸ್ಯೆಗಳು, ಅವು ಎಲ್ಲಿ ಸಂಭವಿಸಿದವು ಮತ್ತು ಏನು ಮಾಡಬೇಕೆಂದು ನೋಡಿ.',
    cardFixProblemsTitle: 'ಸಮಸ್ಯೆಗಳನ್ನು ಸರಿಪಡಿಸಿ',
    cardFixProblemsDesc: 'ಏನು ಸರಿಪಡಿಸಬೇಕು ನೋಡಿ ಮತ್ತು ಪೂರ್ಣಗೊಂಡಾಗ ಗುರುತಿಸಿ.',
    cardSafetyReportTitle: 'ಸುರಕ್ಷತಾ ವರದಿ',
    cardSafetyReportDesc: 'ದಾಖಲಾದ ಘಟನೆಗಳು ಮತ್ತು ಸರಿಪಡಿಸುವ ಕ್ರಮಗಳ ಸಾರಾಂಶ ನೋಡಿ.',

    memoryTitle: 'ಸ್ಮಾರ್ಟ್ ಸುರಕ್ಷತಾ ಮೆಮೊರಿ (Smart Safety Memory)',
    memoryDesc: 'ಹಳೆಯ ಸಮಸ್ಯೆಗಳನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳುತ್ತದೆ, ಮರುಕಳಿಸುವ ತಪ್ಪುಗಳನ್ನು ಹುಡುಕುತ್ತದೆ, ಅಪಾಯವನ್ನು ವಿವರಿಸುತ್ತದೆ ಮತ್ತು ಪರಿಹಾರಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    memoryDetailsBtn: 'ಮೆಮೊರಿ ವಿವರಗಳನ್ನು ನೋಡಿ ▾',
    memoryHideBtn: 'ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ ▴',
    memoryInsightRepeat: 'ಲೋಡಿಂಗ್ ಏರಿಯಾ ಡೋರ್ 3 ರಲ್ಲಿ ಹೆಲ್ಮೆಟ್ ಮತ್ತು ಜಾಕೆಟ್ ಇಲ್ಲದಿರುವ ಸಮಸ್ಯೆ ಈ ತಿಂಗಳು 3 ಬಾರಿ ಪುನರಾವರ್ತನೆಯಾಗಿದೆ. ಫೋರ್ಕ್‌ಲಿಫ್ಟ್ ಚಲಿಸುವುದರಿಂದ ಇದು ಹೆಚ್ಚಿನ ಅಪಾಯವಾಗಿದೆ.',
    memoryWhyRiskTitle: 'ಈ ಅಪಾಯಕ್ಕೆ ಏಕೆ ಆದ್ಯತೆ ನೀಡಲಾಗಿದೆ?',
    memoryWhyRiskDesc: 'ಭಾರೀ ವಾಹನಗಳು ಚಲಿಸುವ ಜಾಗದಲ್ಲಿ ಅದೇ ತಪ್ಪು ಪುನರಾವರ್ತನೆಯಾದಾಗ, ಮಾರಣಾಂತಿಕ ಅಪಘಾತದ ಸಂಭವನೀಯತೆ ಗಣನೀಯವಾಗಿ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
    memoryActionTitle: 'ಸಕ್ರಿಯ ರಕ್ಷಣಾ ಕ್ರಮ:',
    memoryActionDesc: 'ಗೇಟ್‌ನಲ್ಲಿ ಬ್ಯಾರಿಯರ್ ಚೈನ್ ಹಾಕುವುದು ಮತ್ತು ನೈಟ್-ಶಿಫ್ಟ್ ಹೆಲ್ಮೆಟ್ ಚೆಕಿಂಗ್ ಕೆಲಸ ಪ್ರಗತಿಯಲ್ಲಿದೆ.',
    memoryNoRepeatNote: 'ಮೆಮೊರಿ ನಿಯಮ: ಕನಿಷ್ಠ 2 ದಾಖಲೆಗಳು ಇತಿಹಾಸದಲ್ಲಿದ್ದರೆ ಮಾತ್ರ ಪುನರಾವರ್ತನೆ ಎಂದು ತೋರಿಸಲಾಗುತ್ತದೆ.',

    checkTitle: 'ಸುರಕ್ಷತೆ ಪರಿಶೀಲಿಸಿ',
    step1: 'ಹಂತ 1: ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
    step2: 'ಹಂತ 2: "ಫೋಟೋ ಪರಿಶೀಲಿಸಿ" ಒತ್ತಿರಿ.',
    step3: 'ಹಂತ 3: ಫಲಿತಾಂಶ ನೋಡಿ.',
    pickPhotoPrompt: 'ಉದಾಹರಣೆ ಫೋಟೋ ಆರಿಸಿ ಅಥವಾ ಹೊಸ ಫೋಟೋ ಹಾಕಿ:',
    choosePreset: 'ಕಾರ್ಖಾನೆಯ ಮಾದರಿ ಫೋಟೋಗಳು:',
    orUploadOwn: 'ಅಥವಾ ನಿಮ್ಮ ಸ್ವಂತ ಫೋಟೋ ಹಾಕಿ:',
    clickToUpload: 'ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಲು ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ',
    checkPhotoBtn: 'ಫೋಟೋ ಪರಿಶೀಲಿಸಿ',
    checkingPhoto: 'AI ಫೋಟೋವನ್ನು ಪರೀಕ್ಷಿಸುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಕಾಯಿರಿ',
    photoDisclaimer:
      'ಸೂಚನೆ: ಕೇವಲ ಒಂದು ಫೋಟೋ ಇಡೀ ಸ್ಥಳ ಸುರಕ್ಷಿತ ಎಂದು ಸಾಬೀತುಪಡಿಸುವುದಿಲ್ಲ. ನಾವು ಹೆಲ್ಮೆಟ್, ಜಾಕೆಟ್ ಮತ್ತು ಕಾಣುವ ಅಪಾಯಗಳನ್ನು ಮಾತ್ರ ಪರಿಶೀಲಿಸುತ್ತೇವೆ.',
    photoLoadedSuccess: 'ಫೋಟೋ ಯಶಸ್ವಿಯಾಗಿ ಲೋಡ್ ಆಗಿದೆ, ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ',
    changePhotoBtn: 'ಫೋಟೋ ಬದಲಾಯಿಸಿ',
    removePhotoBtn: 'ಫೋಟೋ ತೆಗೆದುಹಾಕಿ',
    loadingOptimizingPhoto: 'ಚಿತ್ರವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    analyzedPhotoSnapshot: 'ವಿಶ್ಲೇಷಿಸಲಾದ ಫೋಟೋ ಸ್ನ್ಯಾಪ್‌ಶಾಟ್',

    verdictSafe: 'ಸುರಕ್ಷಿತವಾಗಿ ಕಾಣುತ್ತಿದೆ',
    verdictProblem: 'ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆ ಕಂಡುಬಂದಿದೆ',
    verdictUnclear: 'ದಯವಿಟ್ಟು ಸುರಕ್ಷತಾ ಅಧಿಕಾರಿಯನ್ನು ಕೇಳಿ',

    whatIsWrong: 'ಏನು ತಪ್ಪಾಗಿದೆ?',
    whereSeen: 'ಎಲ್ಲಿ ಕಂಡುಬಂದಿದೆ?',
    howSerious: 'ಇದು ಎಷ್ಟು ಗಂಭೀರವಾಗಿದೆ?',
    whatShouldWeDo: 'ನಾವು ಏನು ಮಾಡಬೇಕು?',
    unclearAdvice:
      'ನಾವು ಇದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಪರಿಶೀಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಇನ್ನೊಂದು ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ನಿಮ್ಮ ಸುರಕ್ಷತಾ ಅಧಿಕಾರಿಯನ್ನು ಕೇಳಿ.',

    highRisk: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    mediumRisk: 'ಮಧ್ಯಮ ಅಪಾಯ',
    lowRisk: 'ಕಡಿಮೆ ಅಪಾಯ',

    saveAsProblemBtn: 'ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಗಳ ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ',
    problemSavedSuccess: 'ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಗಳ ಪಟ್ಟಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!',

    problemsTitle: 'ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಗಳು',
    problemsSubtitle: 'ಎಲ್ಲಾ ದಾಖಲಾದ ಸಮಸ್ಯೆಗಳು, ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ಪುನರಾವರ್ತನೆಗಳು.',
    repeatedProblemAlert: '⚠️ ಈ ಸಮಸ್ಯೆ ಈ ಹಿಂದೆ ಇಲ್ಲಿ ಸಂಭವಿಸಿದೆ.',
    sampleDataBadge: 'ಮಾದರಿ ದಾಖಲೆ',
    liveDataBadge: 'ನೈಜ ಬಳಕೆದಾರ ದಾಖಲೆ',
    statusNeedsFixing: 'ಸರಿಪಡಿಸಬೇಕಾಗಿದೆ',
    statusFixed: 'ಸರಿಪಡಿಸಲಾಗಿದೆ',
    noProblemsFound: 'ಇನ್ನೂ ಯಾವುದೇ ಸಮಸ್ಯೆ ದಾಖಲಾಗಿಲ್ಲ. ಧನ್ಯವಾದಗಳು!',
    dateLabel: 'ದಿನಾಂಕ',
    areaLabel: 'ಕೆಲಸದ ಸ್ಥಳ',

    fixTitle: 'ಸಮಸ್ಯೆಗಳನ್ನು ಸರಿಪಡಿಸಿ',
    fixSubtitle: 'ಏನು ಸರಿಪಡಿಸಬೇಕು ನೋಡಿ ಮತ್ತು ಪೂರ್ಣಗೊಂಡಾಗ ಗುರುತಿಸಿ.',
    markAsFixedBtn: 'ಸರಿಪಡಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    confirmFixedTitle: 'ದೃಢೀಕರಿಸಿ',
    confirmFixedQuestion: 'ಈ ಸಮಸ್ಯೆಯನ್ನು ನಿಜವಾಗಿಯೂ ಸರಿಪಡಿಸಲಾಗಿದೆಯೇ?',
    yesFixedBtn: 'ಹೌದು, ಸರಿಪಡಿಸಲಾಗಿದೆ',
    notYetBtn: 'ಇನ್ನೂ ಇಲ್ಲ',
    fixedSuccessMsg: 'ಸರಿಪಡಿಸಲಾಗಿದೆ ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ. ಸುರಕ್ಷಿತ ಕೆಲಸದ ಸ್ಥಳಕ್ಕೆ ಧನ್ಯವಾದಗಳು!',
    noOpenProblems: 'ಸರಿಪಡಿಸಲು ಯಾವುದೇ ಬಾಕಿ ಸಮಸ್ಯೆಗಳಿಲ್ಲ! ಎಲ್ಲವೂ ಸುರಕ್ಷಿತವಾಗಿದೆ.',

    reportTitle: 'ಸುರಕ್ಷತಾ ವರದಿ',
    reportSubtitle: 'ಸಮಸ್ಯೆಗಳು, ಸರಿಪಡಿಸಿದ ವಿವರಗಳು ಮತ್ತು ಪುನರಾವರ್ತನೆಗಳ ಸಾರಾಂಶ.',
    statTotalFound: 'ಒಟ್ಟು ಕಂಡುಬಂದ ಸಮಸ್ಯೆಗಳು',
    statFixed: 'ಸರಿಪಡಿಸಿದ ಸಮಸ್ಯೆಗಳು',
    statStillOpen: 'ಇನ್ನೂ ಬಾಕಿ ಇರುವ ಸಮಸ್ಯೆಗಳು',
    statRepeatedCount: 'ಪುನರಾವರ್ತಿತ ಸಮಸ್ಯೆಗಳು',
    printReport: 'ವರದಿ ಮುದ್ರಿಸಿ (Print)',
    recentListTitle: 'ದಾಖಲಾದ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಸರಿಪಡಿಸಿದ ಇತಿಹಾಸ',

    preset1Name: 'ಲೋಡಿಂಗ್ ಏರಿಯಾ (ಜಾಕೆಟ್/ಹೆಲ್ಮೆಟ್ ಇಲ್ಲದ ಕಾರ್ಮಿಕ)',
    preset1Desc: 'ಫೋರ್ಕ್‌ಲಿಫ್ಟ್ ಬಳಿ ಹೆದ್ದಾರಿ ಜಾಕೆಟ್ ಧರಿಸದ ವ್ಯಕ್ತಿ',
    preset2Name: 'ರಾಸಾಯನಿಕ ಟ್ಯಾಂಕ್ (ಎಲ್ಲಾ ಸುರಕ್ಷತಾ ಉಡುಪು ಧರಿಸಿದ್ದಾರೆ)',
    preset2Desc: 'ಕಾರ್ಮಿಕ ಸರಿಯಾಗಿ ಹೆಲ್ಮೆಟ್, ಗಾಗಲ್ಸ್ ಮತ್ತು ಅಪ್ರಾನ್ ಧರಿಸಿದ್ದಾರೆ',
    preset3Name: 'ವೆಲ್ಡಿಂಗ್ ಶಾಪ್ (ಸ್ಪಷ್ಟವಾದ ನಡಿಗೆ ಹಾದಿ)',
    preset3Desc: 'ಸುರಕ್ಷಿತ ನಡಿಗೆ ಪಥ ಮತ್ತು ಹೆಲ್ಮೆಟ್ ಸರಿಯಾಗಿದೆ',
    presetFloodName: 'ಕಾರ್ಖಾನೆ ಕಾರಿಡಾರ್ (ಚರಂಡಿ ಪ್ರವಾಹ ಮತ್ತು ನೀರಿನ ಸಂಗ್ರಹ)',
    presetFloodDesc: 'ದಾರಿಯನ್ನು ನಿರ್ಬಂಧಿಸುವ ಮತ್ತು ವಿದ್ಯುತ್ ಪ್ಯಾನೆಲ್‌ಗಳ ಬಳಿ ಭಾರೀ ನೀರು ತುಂಬುವಿಕೆ',
    presetLandslideName: 'ಸಸ್ಯದ ಗಡಿ (ಭೂಕುಸಿತ ಮತ್ತು ಮಣ್ಣಿನ ಸವೆತ)',
    presetLandslideDesc: 'ರಕ್ಷಣಾ ಗೋಡೆ ಮುರಿದು ಸಸ್ಯದ ಗಡಿಗೆ ಮಣ್ಣು ನುಗ್ಗುತ್ತಿರುವ ಅಪಾಯ',
    presetCoastalErosionName: 'ಕಾಲುವೆ ತೀರ (ಕರಾವಳಿ ಸವೆತ ಮತ್ತು ತಡೆಗೋಡೆ ಕೊಚ್ಚಿಹೋಗುವುದು)',
    presetCoastalErosionDesc: 'ಅಡಿಪಾಯ ಕೊಚ್ಚಿಹೋಗುವಿಕೆ ಮತ್ತು ಕಟ್ಟಡದ ಅಪಾಯ',

    whyIsThisRiskyLabel: 'ಇದು ಏಕೆ ಅಪಾಯಕಾರಿ?',
    hazardTypeLabel: 'ಅಪಾಯದ ವರ್ಗ',
    confidenceLabel: 'ವಿಶ್ವಾಸಾರ್ಹತೆ ಮೌಲ್ಯಮಾಪನ',
    riskGuidanceLabel: 'ಅಪಾಯ ನಿರ್ವಹಣೆ ಮಾರ್ಗದರ್ಶನ',
    nextStepsLabel: 'ಮುಂದಿನ ಶಿಫಾರಸು ಕ್ರಮಗಳು',
    speakToReportTitle: 'ಮಾತನಾಡಿ ವರದಿ ಮಾಡಿ',
    speakToReportBtn: '🎤 ಮಾತನಾಡಿ ವರದಿ ಮಾಡಿ (Speak to Report)',
    listeningStatus: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',
    stopListeningBtn: '⏹️ ಮಾತನಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ',

    checkReportAudioTitle: 'ವರದಿ ಆಡಿಯೋ ಪ್ಲೇಬ್ಯಾಕ್ ಮತ್ತು ಪರಿಶೀಲನೆ',
    audioStatePreparing: 'ಆಡಿಯೋ ಧ್ವನಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    audioStatePlaying: 'ಆಡಿಯೋ ವರದಿ ನುಡಿಯುತ್ತಿದೆ',
    audioStateFinished: 'ಆಡಿಯೋ ಪ್ಲೇಬ್ಯಾಕ್ ಪೂರ್ಣಗೊಂಡಿದೆ',
    audioStateError: 'ಈ ಸಾಧನದಲ್ಲಿ ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ. ಕೆಳಗೆ ಪಠ್ಯವನ್ನು ಓದಬಹುದು.',
    readableTextAlternative: 'ಪರ್ಯಾಯ ಓದುವ ಪಠ್ಯ:',

    roleLabel: 'ಜವಾಬ್ದಾರಿಯುತ ಹುದ್ದೆ',
    dueDateLabel: 'ಗಡುವು ದಿನಾಂಕ',
    roleEHS: 'ಇಎಚ್‌ಎಸ್ ತಜ್ಞ (EHS Specialist)',
    roleShiftLead: 'ಶಿಫ್ಟ್ ಲೀಡ್ (Shift Lead)',
    roleMaintenance: 'ನಿರ್ವಹಣಾ ತಂತ್ರಜ್ಞ',
    roleLogistics: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಮ್ಯಾನೇಜರ್',
    roleOpsDirector: 'ಪ್ಲಾಂಟ್ ಆಪರೇಷನ್ಸ್ ಡೈರೆಕ್ಟರ್',

    tabAllActions: 'ಎಲ್ಲಾ ಕ್ರಮಗಳು',
    tabOpenActions: 'ಬಾಕಿ ಇರುವ ಕ್ರಮಗಳು',
    tabInProgress: 'ಪ್ರಗತಿಯಲ್ಲಿರುವ ಕ್ರಮಗಳು',
    tabCompleted: 'ಪೂರ್ಣಗೊಂಡ ಕ್ರಮಗಳು',
    btnStartAction: 'ಕೆಲಸ ಪ್ರಾರಂಭಿಸಿ (In Progress)',
    btnCompleteAction: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',

    beforePhoto: 'ಸರಿಪಡಿಸುವ ಮೊದಲು (ಅಪಾಯದ ಸಾಕ್ಷ್ಯ)',
    afterPhoto: 'ಸರಿಪಡಿಸಿದ ನಂತರ (ಪರಿಶೀಲನಾ ಫೋಟೋ)',
    uploadAfterPhotoBtn: '📷 "ಸರಿಪಡಿಸಿದ ನಂತರದ" ಫೋಟೋ ಹಾಕಿ',
    photoComparisonTitle: 'ಮೊದಲು ಮತ್ತು ನಂತರದ ಫೋಟೋ ಹೋಲಿಕೆ',
    noAfterPhotoYet: 'ಇನ್ನೂ ಪರಿಹಾರದ ಫೋಟೋ ಸೇರಿಸಿಲ್ಲ. ಪೂರ್ಣಗೊಳಿಸುವಾಗ ನೀವು ಫೋಟೋ ಹಾಕಬಹುದು.',

    humanConfirmTitle: 'ಮಾನವ ಪರಿಶೀಲನೆ ಮತ್ತು ದೃಢೀಕರಣ',
    humanConfirmSubtitle: 'ಮುಚ್ಚುವ ಮೊದಲು ಅಪಾಯ ಪರಿಹಾರವಾಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    verifierNameLabel: 'ಪರಿಶೀಲಕರ ಹೆಸರು',
    verifierRoleLabel: 'ಪರಿಶೀಲಕರ ಹುದ್ದೆ',
    certifyCheckboxLabel: 'ನಾನು ಈ ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ ಮತ್ತು ಅಪಾಯ ನಿವಾರಣೆಯಾಗಿದೆ ಎಂದು ಪ್ರಮಾಣೀಕರಿಸುತ್ತೇನೆ.',
    btnConfirmDone: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಮಸ್ಯೆಯನ್ನು ಮುಚ್ಚಿ',

    followUpAuditTitle: 'ಫಾಲೋ-ಅಪ್ ಆಡಿಟ್ ಪರಿಶೀಲನೆ',
    followUpSatisfactory: 'ತೃಪ್ತಿದಾಯಕ (ಅಪಾಯ ನಿವಾರಣೆಯಾಗಿದೆ)',
    followUpAuditedBy: 'ಆಡಿಟ್ ಮಾಡಿದವರು',

    factoryZoneMapTitle: 'ಕಾರ್ಖಾನೆಯ ವಲಯ ಅಪಾಯದ ನಕ್ಷೆ (Factory Map)',
    factoryZoneMapSubtitle: 'ದಾಖಲಾದ ಸಮಸ್ಯೆಗಳ ಆಧಾರದ ಮೇಲೆ ಸಕ್ರಿಯ ವಲಯ ಅಪಾಯದ ಮಟ್ಟ.',
    clickZoneToView: 'ಆ ವಲಯದ ಸಮಸ್ಯೆಗಳನ್ನು ನೋಡಲು ವಲಯದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    statOverdueCount: 'ಅವಧಿ ಮೀರಿದ ಕ್ರಮಗಳು',
    statUnresolvedCount: 'ಬಾಕಿ ಇರುವ ಘಟನೆಗಳು',

    btnDownloadCsv: 'ವರದಿಯನ್ನು CSV ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    downloadSuccessNotice: 'ಘಟನೆಗಳ ವರದಿ CSV ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!',
    sampleBadgeText: 'ಮಾದರಿ ದಾಖಲೆ (Demo)',
    liveBadgeText: 'ಲೈವ್ ದಾಖಲೆ',

    simulatorTitle: 'ಕಾಲ್ಪನಿಕ ತಡೆಗಟ್ಟುವಿಕೆ ಸಿಮ್ಯುಲೇಟರ್ (What-If Simulator)',
    simulatorSubtitle: 'ವಿವಿಧ ರಕ್ಷಣಾ ಕ್ರಮಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ಅಪಾಯ ಕಡಿಮೆಯಾಗುವುದನ್ನು ಊಹಿಸಿ.',
    simulatorDisclaimer:
      'ಸೂಚನೆ: ಇದು ಕೇವಲ ಶೈಕ್ಷಣಿಕ ಕಾಲ್ಪನಿಕ ಮಾದರಿಯಾಗಿದೆ. ಇದು ಭವಿಷ್ಯದ ಅಪಘಾತ ಇಳಿಕೆಯನ್ನು ಖಚಿತವಾಗಿ ಊಹಿಸುವುದಿಲ್ಲ.',
    interventionOption1: 'ಬೇ 3 ರಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತ ಪಿಪಿಇ ಟರ್ನ್‌ಸ್ಟೈಲ್ ಸ್ಕ್ಯಾನರ್',
    interventionOption2: 'ಪ್ರಕಾಶಮಾನ ಪಾದಚಾರಿ ಗುರುತು ಮತ್ತು ಬ್ಯಾರಿಯರ್ ಸರಪಳಿಗಳು',
    interventionOption3: 'ಯಂತ್ರ ಸುರಕ್ಷತೆ RFID ಇಂಟರ್‌ಲಾಕ್ ನವೀಕರಣ',
    baselineRiskLabel: 'ಪ್ರಸ್ತುತ ಮೂಲ ಅಪಾಯದ ಸ್ಕೋರ್',
    simulatedRiskLabel: 'ಸಿಮ್ಯುಲೇಟೆಡ್ ಅಪಾಯದ ಸ್ಕೋರ್',
    riskReductionEstimate: 'ಕಾಲ್ಪನಿಕ ಅಪಾಯ ಇಳಿಕೆ',

    step1Of3: 'ಹಂತ 1 ರಲ್ಲಿ 3',
    resetConfirmPrompt: 'ಎಲ್ಲಾ ಮಾದರಿ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಮೊದಲಿನ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸುವುದೇ?',
    cameraSupports: 'ಕ್ಯಾಮೆರಾ ಅಥವಾ ಗ್ಯಾಲರಿ ಚಿತ್ರಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ (JPG, PNG, WEBP)',
    micAllowed: 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿಸಲಾಗಿದೆ',
    giveMicPermission: 'ಮೈಕ್ ಅನುಮತಿ ನೀಡಿ',
    typeNotesFallback: 'ನೀವು ಕೆಳಗೆ ನೇರವಾಗಿ ನಿಮ್ಮ ಟಿಪ್ಪಣಿಗಳನ್ನು ಬರೆಯಬಹುದು.',
    spokenNotesLabel: 'ಧ್ವನಿ ಟಿಪ್ಪಣಿಗಳು / ನೇರ ಪರಿಶೀಲನೆ:',
    spokenNotesPlaceholder: 'ಮಾತನಾಡಿದ ಮಾತುಗಳು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ, ಅಥವಾ ನೀವು ಟೈಪ್ ಮಾಡಬಹುದು...',
    tryCheckingAgain: 'ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ',
    rejectionNoticeText: 'ಸಮಸ್ಯೆಯನ್ನು ತಪ್ಪು ಎಚ್ಚರಿಕೆ ಎಂದು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ. ಇದನ್ನು ದಾಖಲೆಗೆ ಸೇರಿಸಲಾಗುವುದಿಲ್ಲ.',
    visualEvidenceLabel: 'ದೃಶ್ಯ ಪುರಾವೆ:',
    visualLimitationsLabel: 'ದೃಶ್ಯ ಮಿತಿಗಳು / ಅನಿಶ್ಚಿತತೆ:',
    humanVerificationHeader: 'ಮಾನವ ಪರಿಶೀಲನೆ ಮತ್ತು ಜವಾಬ್ದಾರಿ ನಿಯೋಜನೆ',
    doneEditing: 'ತಿದ್ದುಪಡಿ ಪೂರ್ಣ',
    editDetailsBeforeSaving: 'ಉಳಿಸುವ ಮುನ್ನ ವಿವರಗಳನ್ನು ಬದಲಾಯಿಸಿ',
    confirmAndAddProblem: 'ದೃಢೀಕರಿಸಿ ಮತ್ತು ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಗಳಿಗೆ ಸೇರಿಸಿ',
    rejectFalseAlarm: 'ತಿರಸ್ಕರಿಸಿ / ತಪ್ಪು ಎಚ್ಚರಿಕೆ',
    problemDescLabel: 'ಸಮಸ್ಯೆಯ ವಿವರಣೆ:',
    workAreaLabel: 'ಕೆಲಸದ ಸ್ಥಳ:',
    severityLevelLabel: 'ಗಂಭೀರತೆ ಮಟ್ಟ:',
    searchPlaceholder: 'ಸಮಸ್ಯೆಗಳು, ಸ್ಥಳಗಳು ಅಥವಾ ವಿವರಣೆಗಳನ್ನು ಹುಡುಕಿ...',
    allStatuses: 'ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು',
    allWorkAreas: 'ಎಲ್ಲಾ ಕೆಲಸದ ಸ್ಥಳಗಳು',
    allSeverities: 'ಎಲ್ಲಾ ಅಪಾಯ ಮಟ್ಟಗಳು',
    clearFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    repeatedProblemsFoundTitle: 'ಸುರಕ್ಷತಾ ಮೆಮೊರಿ ಎಂಜಿನ್: ಪುನರಾವರ್ತಿತ ಸಮಸ್ಯೆಗಳು ಕಂಡುಬಂದಿವೆ',
    repeatedProblemsSubtitle: 'ಕನಿಷ್ಠ 2 ದಾಖಲೆಗಳೊಂದಿಗೆ ಗುರುತಿಸಲಾದ ಪುನರಾವರ್ತನೆ. ಇತಿಹಾಸ ನೋಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ.',
    supportingRecordsLabel: 'ಆಧಾರ ದಾಖಲೆಗಳು',
    resolutionRateLabel: 'ಪರಿಹಾರ ಕ್ರಮಗಳ ಪೂರ್ಣತೆಯ ದರ:',
    completePercentLabel: '% ಪೂರ್ಣಗೊಂಡಿದೆ',
    activeLabel: 'ಸಕ್ರಿಯ',
    totalLabel: 'ಒಟ್ಟು',
    closeBtn: 'ಮುಚ್ಚಿ',
    cancelBtn: 'ರದ್ದುಮಾಡಿ',
    saveAssignmentBtn: 'ನಿಯೋಜನೆಯನ್ನು ಉಳಿಸಿ',
    editRoleDueDate: 'ಜವಾಬ್ದಾರಿ / ಗಡುವಿನ ದಿನಾಂಕ ಬದಲಾಯಿಸಿ ✎',
    assignRoleTitle: 'ಜವಾಬ್ದಾರಿ ಮತ್ತು ಗಡುವಿನ ದಿನಾಂಕ ನಿಗದಿಪಡಿಸಿ',
    uploadVerificationImage: 'ಪರಿಶೀಲನಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    photoAttached: '✓ ಫೋಟೋ ಲಗತ್ತಿಸಲಾಗಿದೆ',
    noIncidentsInZone: 'ಈ ವಲಯದಲ್ಲಿ ಯಾವುದೇ ಸುರಕ್ಷತಾ ಘಟನೆಗಳು ದಾಖಲಾಗಿಲ್ಲ.',
    initialInspectionEvidence: 'ಆರಂಭಿಕ ತಪಾಸಣಾ ಸಾಕ್ಷ್ಯ',
    safetyInspectorLabel: 'ಸುರಕ್ಷತಾ ನಿರೀಕ್ಷಕ',
  },

  hi: {
    appTitle: 'INDUSAFE AI',
    platformSubtitle: 'औद्योगिक सुरक्षा इंटेलिजेंस प्लेटफॉर्म',
    tagline: 'खतरों को पहचानें। पुनरावृत्ति रोकें।',
    prototypeBadge: '',
    welcomeGreeting: 'नमस्ते! आइए आपके कार्यक्षेत्र को सुरक्षित बनाएं।',
    welcomeSubheading: 'चुनें कि आप क्या करना चाहते हैं।',
    homeBtn: '← मुख्य पृष्ठ पर वापस जाएं',
    readThis: '🔊 इसे सुनें',
    stopReading: '⏹️ आवाज़ रोकें',

    cardCheckSafetyTitle: 'सुरक्षा जांचें',
    cardCheckSafetyDesc: 'फोटो लें और एआई से संभावित सुरक्षा समस्याओं की जांच कराएं।',
    cardSafetyProblemsTitle: 'सुरक्षा समस्याएं',
    cardSafetyProblemsDesc: 'देखें क्या समस्याएं हुईं, कहाँ हुईं और क्या करना चाहिए।',
    cardFixProblemsTitle: 'समस्याएं ठीक करें',
    cardFixProblemsDesc: 'देखें क्या ठीक करना बाकी है और पूरा होने पर मार्क करें।',
    cardSafetyReportTitle: 'सुरक्षा रिपोर्ट',
    cardSafetyReportDesc: 'समस्याएं, सुधार और बार-बार होने वाली बातें देखें।',

    memoryTitle: 'स्मार्ट सेफ्टी मेमोरी (Smart Safety Memory)',
    memoryDesc: 'पुरानी समस्याओं को याद रखता है, बार-बार होने वाली गलतियां ढूंढता है, खतरे को समझाता है और हल निकालने में मदद करता है।',
    memoryDetailsBtn: 'मेमोरी जानकारी देखें ▾',
    memoryHideBtn: 'जानकारी छिपाएं ▴',
    memoryInsightRepeat: 'लोडिंग एरिया डोर 3 में इस महीने 3 बार हेलमेट और जैकेट की समस्या दोहराई गई है। यहाँ फोर्कलिफ्ट चलने के कारण इसे उच्च जोखिम माना गया है।',
    memoryWhyRiskTitle: 'इस जोखिम को प्राथमिकता क्यों दी गई?',
    memoryWhyRiskDesc: 'जब चलती मशीनों वाले क्षेत्र में एक ही गलती बार-बार होती है, तो गंभीर चोट का खतरा कई गुना बढ़ जाता है।',
    memoryActionTitle: 'सक्रिय सुधारात्मक कदम:',
    memoryActionDesc: 'गेट पर बैरियर लगाना और नाइट-शिफ्ट हेलमेट चेकिंग का काम चालू है।',
    memoryNoRepeatNote: 'मेमोरी नियम: जब तक कम से कम 2 रिकॉर्ड न हों, पुनरावृत्ति नहीं मानी जाती।',

    checkTitle: 'सुरक्षा जांचें',
    step1: 'स्टेप 1: फोटो लें या अपलोड करें।',
    step2: 'स्टेप 2: "फोटो जांचें" दबाएं।',
    step3: 'स्टेप 3: परिणाम देखें।',
    pickPhotoPrompt: 'नमूना फोटो चुनें या नई फोटो लें:',
    choosePreset: 'फैक्ट्री और पर्यावरण उदाहरण फोटो:',
    orUploadOwn: 'या अपनी खुद की फोटो लगाएं:',
    clickToUpload: 'फोटो खींचने या अपलोड करने के लिए यहाँ क्लिक करें',
    checkPhotoBtn: 'फोटो जांचें',
    checkingPhoto: 'एआई फोटो की जांच कर रहा है... कृपया थोड़ा इंतज़ार करें',
    photoDisclaimer:
      'सूचना: सिर्फ एक फोटो पूरे क्षेत्र को सुरक्षित साबित नहीं करती। हम केवल हेलमेट, जैकेट और दिखने वाले खतरों की जांच करते हैं।',
    photoLoadedSuccess: 'फ़ोटो सफलतापूर्वक लोड हो गई है, विश्लेषण के लिए तैयार',
    changePhotoBtn: 'फ़ोटो बदलें',
    removePhotoBtn: 'फ़ोटो हटाएं',
    loadingOptimizingPhoto: 'फ़ोटो लोड और ऑप्टिमाइज़ हो रही है...',
    analyzedPhotoSnapshot: 'विश्लेषित फ़ोटो स्नैपशॉट',

    verdictSafe: 'सुरक्षित दिख रहा है',
    verdictProblem: 'सुरक्षा समस्या मिली',
    verdictUnclear: 'कृपया सुरक्षा अधिकारी से पूछें',

    whatIsWrong: 'क्या गलत है?',
    whereSeen: 'कहाँ देखा गया?',
    howSerious: 'यह कितना गंभीर है?',
    whatShouldWeDo: 'हमें क्या करना चाहिए?',
    unclearAdvice:
      'हम इसे स्पष्ट रूप से जांच नहीं सकते। कृपया दूसरी फोटो लें या अपने सुरक्षा अधिकारी से पूछें।',

    highRisk: 'उच्च जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    lowRisk: 'कम जोखिम',

    saveAsProblemBtn: 'सुरक्षा समस्या सूची में सेव करें',
    problemSavedSuccess: 'सुरक्षा समस्याओं की सूची में सफलतापूर्वक सेव कर दिया गया!',

    problemsTitle: 'सुरक्षा समस्याएं',
    problemsSubtitle: 'सभी दर्ज समस्याएं, जोखिम स्तर और बार-बार होने वाली गलतियां।',
    repeatedProblemAlert: '⚠️ यह समस्या पहले भी यहाँ हो चुकी है।',
    sampleDataBadge: 'नमूना रिकॉर्ड',
    liveDataBadge: 'सत्यापित असली रिकॉर्ड',
    statusNeedsFixing: 'ठीक करने की जरूरत है',
    statusFixed: 'ठीक हो गया',
    noProblemsFound: 'अभी तक कोई समस्या दर्ज नहीं हुई। बहुत बढ़िया!',
    dateLabel: 'तारीख',
    areaLabel: 'स्थान',

    fixTitle: 'समस्याएं ठीक करें',
    fixSubtitle: 'देखें क्या ठीक करना बाकी है और पूरा होने पर मार्क करें।',
    markAsFixedBtn: 'ठीक हो गया मार्क करें',
    confirmFixedTitle: 'पुष्टि करें',
    confirmFixedQuestion: 'क्या यह समस्या वास्तव में ठीक हो गई है?',
    yesFixedBtn: 'हाँ, ठीक हो गया',
    notYetBtn: 'अभी नहीं',
    fixedSuccessMsg: 'ठीक दर्ज किया गया। फैक्ट्री को सुरक्षित रखने के लिए धन्यवाद!',
    noOpenProblems: 'अभी कोई समस्या बाकी नहीं है! सब कुछ ठीक है।',

    reportTitle: 'सुरक्षा रिपोर्ट',
    reportSubtitle: 'समस्याएं, सुधार और बार-बार होने वाली बातें देखें।',
    statTotalFound: 'कुल मिली समस्याएं',
    statFixed: 'ठीक की गई समस्याएं',
    statStillOpen: 'अभी भी बाकी समस्याएं',
    statRepeatedCount: 'दोहराई गई समस्याएं',
    printReport: 'रिपोर्ट प्रिंट करें',
    recentListTitle: 'दर्ज समस्याओं और सुधारों की सूची',

    preset1Name: 'लोडिंग एरिया (बिना जैकेट/हेलमेट वाला मजदूर)',
    preset1Desc: 'फोर्कलिफ्ट के पास बिना हाई-विजिबिलिटी जैकेट वाला मजदूर',
    preset2Name: 'केमिकल टैंक (सभी सुरक्षा उपकरण पहने हैं)',
    preset2Desc: 'मजदूर ने सही तरीके से हेलमेट, चश्मा और एप्रन पहना है',
    preset3Name: 'वेल्डिंग एरिया (साफ रास्ता)',
    preset3Desc: 'सुरक्षित रास्ता और हेलमेट सही हैं',
    presetFloodName: 'फैक्ट्री कॉरिडोर (जलभराव व नाली जाम का खतरा)',
    presetFloodDesc: 'बिजली के पैनल और रास्ते को बाधित करने वाला भारी पानी',
    presetLandslideName: 'परिसर सीमा (भूस्खलन और मिट्टी का खिसकना)',
    presetLandslideDesc: 'सुरक्षा दीवार तोड़कर फैक्ट्री में घुसती मिट्टी व कीचड़',
    presetCoastalErosionName: 'निकासी नहर (तटीय कटाव और तटबंध टूटना)',
    presetCoastalErosionDesc: 'नींव का कटाव और संरचनात्मक दीवार का खतरा',

    whyIsThisRiskyLabel: 'यह जोखिम भरा क्यों है?',
    hazardTypeLabel: 'खतरे की श्रेणी',
    confidenceLabel: 'सटीकता मूल्यांकन',
    riskGuidanceLabel: 'सुरक्षा मार्गदर्शन',
    nextStepsLabel: 'अनुशंसित अगले कदम',
    speakToReportTitle: 'बोलकर रिपोर्ट दर्ज करें',
    speakToReportBtn: '🎤 बोलकर रिपोर्ट करें (Speak to Report)',
    listeningStatus: 'सुन रहे हैं... कृपया स्पष्ट बोलें',
    stopListeningBtn: '⏹️ बोलना समाप्त करें',

    checkReportAudioTitle: 'रिपोर्ट ऑडियो प्लेबैक और समीक्षा',
    audioStatePreparing: 'ऑडियो आवाज़ तैयार हो रही है...',
    audioStatePlaying: 'ऑडियो रिपोर्ट सुनाई जा रही है',
    audioStateFinished: 'ऑडियो प्लेबैक समाप्त हुआ',
    audioStateError: 'इस डिवाइस पर ऑडियो उपलब्ध नहीं है। नीचे दिया गया पाठ पढ़ें।',
    readableTextAlternative: 'पठनीय पाठ विकल्प:',

    roleLabel: 'ज़िम्मेदार पद',
    dueDateLabel: 'नियत तारीख',
    roleEHS: 'ईएचएस विशेषज्ञ (EHS Specialist)',
    roleShiftLead: 'शिफ्ट लीड (Shift Lead)',
    roleMaintenance: 'मेंटेनेंस तकनीशियन',
    roleLogistics: 'लॉजिस्टिक्स मैनेजर',
    roleOpsDirector: 'प्लांट ऑपरेशंस डायरेक्टर',

    tabAllActions: 'सभी कार्य',
    tabOpenActions: 'बाकी कार्य',
    tabInProgress: 'प्रगति पर',
    tabCompleted: 'पूरे किए गए कार्य',
    btnStartAction: 'काम शुरू करें (In Progress)',
    btnCompleteAction: 'पूर्ण चिह्नित करें',

    beforePhoto: 'सुधार से पहले (खतरे का साक्ष्य)',
    afterPhoto: 'सुधार के बाद (सत्यापन फोटो)',
    uploadAfterPhotoBtn: '📷 "सुधार के बाद" की फोटो लगाएं',
    photoComparisonTitle: 'पहले और बाद की फोटो तुलना',
    noAfterPhotoYet: 'अभी तक सुधार की फोटो नहीं जोड़ी गई। पूर्ण करते समय आप फोटो लगा सकते हैं।',

    humanConfirmTitle: 'मानव सत्यापन और समापन',
    humanConfirmSubtitle: 'बंद करने से पहले सत्यापित करें कि खतरा हल हो गया है।',
    verifierNameLabel: 'निरीक्षक का नाम',
    verifierRoleLabel: 'निरीक्षक का पद',
    certifyCheckboxLabel: 'मैं प्रमाणित करता हूँ कि मैंने इस स्थान का निरीक्षण किया है और खतरा हल हो गया है।',
    btnConfirmDone: 'सत्यापित करें और कार्य बंद करें',

    followUpAuditTitle: 'फॉलो-अप ऑडिट सत्यापन',
    followUpSatisfactory: 'संतोषजनक (खतरा समाप्त)',
    followUpAuditedBy: 'ऑडिट किया गया द्वारा',

    factoryZoneMapTitle: 'फैक्ट्री ज़ोन जोखिम मानचित्र',
    factoryZoneMapSubtitle: 'दर्ज घटनाओं के आधार पर ज़ोन जोखिम स्तर।',
    clickZoneToView: 'उस क्षेत्र की समस्याएं देखने के लिए ज़ोन पर क्लिक करें।',
    statOverdueCount: 'अतिदेय कार्य',
    statUnresolvedCount: 'लंबित घटनाएं',

    btnDownloadCsv: 'घटना रिपोर्ट CSV डाउनलोड करें',
    downloadSuccessNotice: 'घटना रिपोर्ट CSV सफलतापूर्वक डाउनलोड हो गई!',
    sampleBadgeText: 'नमूना रिकॉर्ड (Demo)',
    liveBadgeText: 'लाइव उपयोगकर्ता रिकॉर्ड',

    simulatorTitle: 'हाइपोथेटिकल निवारक सिम्युलेटर (What-If Simulator)',
    simulatorSubtitle: 'विभिन्न सुरक्षा उपायों का परीक्षण करें और जोखिम में कमी देखें।',
    simulatorDisclaimer:
      'सूचना: यह एक काल्पनिक शैक्षिक मॉडल है। यह भविष्य में दुर्घटना में कमी की गारंटी नहीं देता है।',
    interventionOption1: 'बे 3 पर स्वचालित पीपीई टर्नस्टाइल स्कैनर',
    interventionOption2: 'चमकदार वॉकवे फ्लोर मार्किंग और बैरियर चेन',
    interventionOption3: 'मशीन गार्ड आरएफआईडी इंटरलॉक अपग्रेड',
    baselineRiskLabel: 'मूल जोखिम स्कोर',
    simulatedRiskLabel: 'सिम्युलेटेड जोखिम स्कोर',
    riskReductionEstimate: 'काल्पनिक जोखिम में कमी',

    step1Of3: '3 में से चरण 1',
    resetConfirmPrompt: 'क्या सभी नमूना समस्याओं और सेटिंग्स को प्रारंभिक स्थिति में रीसेट करें?',
    cameraSupports: 'कैमरा कैप्चर या गैलरी (JPG, PNG, WEBP) समर्थित है',
    micAllowed: 'माइक्रोफ़ोन की अनुमति है',
    giveMicPermission: 'माइक अनुमति दें',
    typeNotesFallback: 'आप सीधे नीचे अपने नोट्स भी लिख सकते हैं।',
    spokenNotesLabel: 'बोले गए नोट्स / प्रत्यक्ष अवलोकन:',
    spokenNotesPlaceholder: 'बोले गए शब्द यहां स्वतः दिखाई देंगे, या आप लिख सकते हैं...',
    tryCheckingAgain: 'पुनः जांचने का प्रयास करें',
    rejectionNoticeText: 'समस्या को झूठा अलार्म/अस्वीकृत माना गया। इसे रिकॉर्ड में नहीं जोड़ा जाएगा।',
    visualEvidenceLabel: 'दृश्य साक्ष्य:',
    visualLimitationsLabel: 'दृश्य सीमाएं / अनिश्चितता:',
    humanVerificationHeader: 'मानव सत्यापन एवं कार्य सौंपना',
    doneEditing: 'संपादन संपन्न',
    editDetailsBeforeSaving: 'सहेजने से पहले विवरण संपादित करें',
    confirmAndAddProblem: 'पुष्टि करें और सुरक्षा समस्याओं में जोड़ें',
    rejectFalseAlarm: 'अस्वीकार करें / झूठा अलार्म',
    problemDescLabel: 'समस्या का विवरण:',
    workAreaLabel: 'कार्य क्षेत्र:',
    severityLevelLabel: 'गंभीरता स्तर:',
    searchPlaceholder: 'समस्याएं, क्षेत्र या खतरे के विवरण खोजें...',
    allStatuses: 'सभी स्थितियां',
    allWorkAreas: 'सभी कार्य क्षेत्र',
    allSeverities: 'सभी गंभीरता स्तर',
    clearFilters: 'फ़िल्टर हटाएं',
    repeatedProblemsFoundTitle: 'सुरक्षा मेमोरी इंजन: दोहराई गई समस्याएं मिलीं',
    repeatedProblemsSubtitle: 'कम से कम 2 सत्यापित रिकॉर्ड्स के साथ संबंध। इतिहास देखने के लिए क्लिक करें।',
    supportingRecordsLabel: 'समर्थक रिकॉर्ड',
    resolutionRateLabel: 'सुधारात्मक कार्रवाई समाधान दर:',
    completePercentLabel: '% संपन्न',
    activeLabel: 'सक्रिय',
    totalLabel: 'कुल',
    closeBtn: 'बंद करें',
    cancelBtn: 'रद्द करें',
    saveAssignmentBtn: 'कार्यभार सहेजें',
    editRoleDueDate: 'भूमिका / नियत तारीख बदलें ✎',
    assignRoleTitle: 'भूमिका और लक्षित नियत तारीख सौंपें',
    uploadVerificationImage: 'सत्यापन फ़ोटो अपलोड करें',
    photoAttached: '✓ फ़ोटो संलग्न',
    noIncidentsInZone: 'इस क्षेत्र में कोई सुरक्षा घटना दर्ज नहीं है।',
    initialInspectionEvidence: 'प्रारंभिक निरीक्षण साक्ष्य',
    safetyInspectorLabel: 'सुरक्षा निरीक्षक',
  },

  te: {
    appTitle: 'INDUSAFE AI',
    platformSubtitle: 'పారిశ్రామిక భద్రతా ఇంటెలిజెన్స్ ప్లాట్‌ఫారమ్',
    tagline: 'ప్రమాదాలను గుర్తించండి. పునరావృతాన్ని నివారించండి.',
    prototypeBadge: '',
    welcomeGreeting: 'నమస్కారం! మీ పని ప్రదేశాన్ని మరింత సురక్షితంగా చేద్దాం.',
    welcomeSubheading: 'మీరు ఏమి చేయాలనుకుంటున్నారో ఎంచుకోండి.',
    homeBtn: '← ముఖద్వారానికి వెళ్లండి',
    readThis: '🔊 చదివి వినిపించండి',
    stopReading: '⏹️ వాయిస్ ఆపండి',

    cardCheckSafetyTitle: 'భద్రతను తనిఖీ చేయండి',
    cardCheckSafetyDesc: 'ఫోటో తీయండి మరియు AI భద్రతా సమస్యలను తనిఖీ చేయనివ్వండి.',
    cardSafetyProblemsTitle: 'భద్రతా సమస్యలు',
    cardSafetyProblemsDesc: 'సమస్యలు, అవి ఎక్కడ జరిగాయి మరియు ఏమి చేయాలో చూడండి.',
    cardFixProblemsTitle: 'సమస్యలను సరిదిద్దండి',
    cardFixProblemsDesc: 'ఏమి పరిష్కరించాలో చూసి పూర్తయినట్లు మార్క్ చేయండి.',
    cardSafetyReportTitle: 'భద్రతా నివేదిక',
    cardSafetyReportDesc: 'సమస్యలు, పరిష్కారాలు మరియు పునరావృత విషయాల సారాంశం.',

    memoryTitle: 'స్మార్ట్ భద్రతా జ్ఞాపకం (Smart Safety Memory)',
    memoryDesc: 'గత సమస్యలను గుర్తుంచుకుంటుంది, పునరావృత సమస్యలను గుర్తిస్తుంది మరియు చర్యలు తీసుకోవడానికి సహాయపడుతుంది.',
    memoryDetailsBtn: 'వివరాలు చూడండి ▾',
    memoryHideBtn: 'వివరాలు దాచండి ▴',
    memoryInsightRepeat: 'లోడింగ్ ఏరియా డోర్ 3 వద్ద హెల్మెట్ మరియు జాకెట్ సమస్య ఈ నెలలో 3 సార్లు పునరావృతమైంది.',
    memoryWhyRiskTitle: 'ఈ ప్రమాదానికి ఎందుకు ప్రాధాన్యత ఇవ్వబడింది?',
    memoryWhyRiskDesc: 'ఫోర్క్‌లిఫ్ట్ చలనం ఉన్న ప్రదేశంలో పునరావృత లోపాలు ప్రాణాంతక ప్రమాదాలకు దారితీస్తాయి.',
    memoryActionTitle: 'సక్రియ నివారణ చర్య:',
    memoryActionDesc: 'గేటు వద్ద రక్షణ అవరోధం మరియు హై-విజ్ జాకెట్ తనిఖీలు పురోగతిలో ఉన్నాయి.',
    memoryNoRepeatNote: 'నియమం: 2 లేదా అంతకంటే ఎక్కువ రికార్డులు ఉంటేనే పునరావృత హెచ్చరిక చూపబడుతుంది.',

    checkTitle: 'భద్రత తనిఖీ',
    step1: 'దశ 1: ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.',
    step2: 'దశ 2: "ఫోటో తనిఖీ" నొక్కండి.',
    step3: 'దశ 3: ఫలితాన్ని చూడండి.',
    pickPhotoPrompt: 'ఉదాహరణ ఫోటోను ఎంచుకోండి లేదా మీ ఫోటోను జోడించండి:',
    choosePreset: 'ఫ్యాక్టరీ & పర్యావరణ ఉదాహరణలు:',
    orUploadOwn: 'లేదా మీ కెమెరా ఫోటోను అప్‌లోడ్ చేయండి:',
    clickToUpload: 'ఫోటో తీయడానికి లేదా అప్‌లోడ్ చేయడానికి ఇక్కడ క్లిక్ చేయండి',
    checkPhotoBtn: 'ఫోటో తనిఖీ చేయండి',
    checkingPhoto: 'AI ఫోటోను విశ్లేషిస్తోంది... దయచేసి వేచి ఉండండి',
    photoDisclaimer:
      'గమనిక: ఒక ఫోటో మొత్తం ప్రాంతం సురక్షితమని నిరూపించదు. కనిపించే రక్షణ పరికరాలు మరియు స్పష్టమైన ప్రమాదాలను మాత్రమే తనిఖీ చేయవచ్చు.',
    photoLoadedSuccess: 'ఫోటో విజయవంతంగా లోడ్ అయింది, విశ్లేషణకు సిద్ధంగా ఉంది',
    changePhotoBtn: 'ఫోటో మార్చండి',
    removePhotoBtn: 'ఫోటో తొలగించండి',
    loadingOptimizingPhoto: 'ఫోటో లోడ్ అవుతోంది...',
    analyzedPhotoSnapshot: 'విశ్లేషించిన ఫోటో స్నాప్‌షాట్',

    verdictSafe: 'సురక్షితంగా కనిపిస్తోంది',
    verdictProblem: 'భద్రతా సమస్య కనుగొనబడింది',
    verdictUnclear: 'భద్రతా అధికారిని సంప్రదించండి',

    whatIsWrong: 'ఏమి తప్పు జరిగింది?',
    whereSeen: 'ఎక్కడ కనిపించింది?',
    howSerious: 'ఇది ఎంత తీవ్రమైనది?',
    whatShouldWeDo: 'మనం ఏమి చేయాలి?',
    unclearAdvice:
      'మేము దీన్ని స్పష్టంగా తనిఖీ చేయలేకపోతున్నాము. దయచేసి మరొక ఫోటో తీయండి లేదా మీ సేఫ్టీ ఆఫీసర్‌ని అడగండి.',

    highRisk: 'అధిక ప్రమాదం',
    mediumRisk: 'మధ్యస్థ ప్రమాదం',
    lowRisk: 'తక్కువ ప్రమాదం',

    saveAsProblemBtn: 'భద్రతా సమస్యల జాబితాలో భద్రపరచండి',
    problemSavedSuccess: 'సమస్య విజయవంతంగా సేవ్ చేయబడింది!',

    problemsTitle: 'భద్రతా సమస్యలు',
    problemsSubtitle: 'నమోదైన అన్ని సమస్యలు, తీవ్రత స్థాయిలు మరియు పునరావృతాలు.',
    repeatedProblemAlert: '⚠️ ఈ సమస్య ఇంతకు ముందు ఇక్కడ జరిగింది.',
    sampleDataBadge: 'నమూనా రికార్డు',
    liveDataBadge: 'నిజమైన రికార్డు',
    statusNeedsFixing: 'పరిష్కరించాల్సి ఉంది',
    statusFixed: 'పరిష్కరించబడింది',
    noProblemsFound: 'ఇంకా ఎలాంటి సమస్యలు నమోదు కాలేదు. అభినందనలు!',
    dateLabel: 'తేదీ',
    areaLabel: 'ప్రాంతం',

    fixTitle: 'సమస్యలను సరిదిద్దండి',
    fixSubtitle: 'ఏమి పరిష్కరించాలో చూసి పూర్తయినట్లు మార్క్ చేయండి.',
    markAsFixedBtn: 'పరిష్కరించబడినట్లు గుర్తించండి',
    confirmFixedTitle: 'ధృవీకరణ',
    confirmFixedQuestion: 'ఈ సమస్య నిజంగా పరిష్కరించబడిందా?',
    yesFixedBtn: 'అవును, పరిష్కరించబడింది',
    notYetBtn: 'ఇంకా లేదు',
    fixedSuccessMsg: 'పరిష్కరించబడినట్లు నమోదు చేయబడింది. ధన్యవాదాలు!',
    noOpenProblems: 'ప్రస్తుతం పెండింగ్‌లో ఉన్న సమస్యలు ఏవీ లేవు!',

    reportTitle: 'భద్రతా నివేదిక',
    reportSubtitle: 'నమోదైన సంఘటనలు మరియు నివారణ చర్యల సారాంశం.',
    statTotalFound: 'మొత్తం కనుగొనబడిన సమస్యలు',
    statFixed: 'పరిష్కరించబడినవి',
    statStillOpen: 'పరిష్కారం కానివి',
    statRepeatedCount: 'పునరావృత సమస్యలు',
    printReport: 'నివేదికను ప్రింట్ చేయండి',
    recentListTitle: 'సమస్యలు మరియు చర్యల చరిత్ర',

    preset1Name: 'లోడింగ్ ఏరియా (జాకెట్ లేదా హెల్మెట్ లేని కార్మికుడు)',
    preset1Desc: 'ఫోర్క్‌లిఫ్ట్ మార్గంలో హై-విజ్ జాకెట్ లేని వ్యక్తి',
    preset2Name: 'కెమికల్ ట్యాంక్ (సరైన భద్రతా పరికరాలు)',
    preset2Desc: 'హెల్మెట్, గాగుల్స్, ఆప్రాన్ ధరించిన కార్మికుడు',
    preset3Name: 'ఫ్యాబ్రికేషన్ ప్రాంతం (స్పష్టమైన నడక మార్గం)',
    preset3Desc: 'రక్షణ తెరలతో కూడిన సురక్షిత నడక మార్గం',
    presetFloodName: 'ఫ్యాక్టరీ కారిడార్ (వరద & నీటి నిల్వ ప్రమాదం)',
    presetFloodDesc: 'ఎలక్ట్రికల్ ప్యానెళ్ల వద్ద మార్గాన్ని అడ్డుకుంటున్న వరద నీరు',
    presetLandslideName: 'ప్లాంట్ సరిహద్దు (కొండచరియలు విరిగిపడటం)',
    presetLandslideDesc: 'గోడను కూల్చివేస్తూ ప్లాంట్‌లోకి చేరిన మట్టి మరియు బురద',
    presetCoastalErosionName: 'కాల్వ తీరం (కోత & గట్టు తెగిపోవడం)',
    presetCoastalErosionDesc: 'పునాది దెబ్బతినడం మరియు గోడల కోత ప్రమాదం',

    whyIsThisRiskyLabel: 'ఇది ఎందుకు ప్రమాదకరం?',
    hazardTypeLabel: 'ప్రమాద విభాగం',
    confidenceLabel: 'ఖచ్చితత్వ అంచనా',
    riskGuidanceLabel: 'భద్రతా మార్గదర్శకత్వం',
    nextStepsLabel: 'సిఫార్సు చేయబడిన తదుపరి చర్యలు',
    speakToReportTitle: 'వాయిస్ ద్వారా రిపోర్ట్ చేయండి',
    speakToReportBtn: '🎤 మాట్లాడి రిపోర్ట్ చేయండి (Speak to Report)',
    listeningStatus: 'వినబడుతోంది... దయచేసి స్పష్టంగా మాట్లాడండి',
    stopListeningBtn: '⏹️ మాట్లాడటం ముగించండి',

    checkReportAudioTitle: 'నివేదిక ఆడియో ప్లేబ్యాక్ & సమీక్ష',
    audioStatePreparing: 'ఆడియో వాయిస్ సిద్ధమవుతోంది...',
    audioStatePlaying: 'ఆడియో నివేదిక ప్లే అవుతోంది',
    audioStateFinished: 'ఆడియో పూర్తయింది',
    audioStateError: 'ఈ పరికరంలో ఆడియో అందుబాటులో లేదు. క్రింది పాఠాన్ని చదవండి.',
    readableTextAlternative: 'చదవదగిన వచన ప్రత్యామ్నాయం:',

    roleLabel: 'బాధ్యతాయుత హోదా',
    dueDateLabel: 'గడువు తేదీ',
    roleEHS: 'EHS నిపుణుడు',
    roleShiftLead: 'షిఫ్ట్ లీడ్',
    roleMaintenance: 'మెయింటెనెన్స్ టెక్నీషియన్',
    roleLogistics: 'లాజిస్టిక్స్ మేనేజర్',
    roleOpsDirector: 'ఆపరేషన్స్ డైరెక్టర్',

    tabAllActions: 'అన్ని చర్యలు',
    tabOpenActions: 'ఓపెన్ చర్యలు',
    tabInProgress: 'పురోగతిలో ఉన్నాయి',
    tabCompleted: 'పూర్తయినవి',
    btnStartAction: 'పని ప్రారంభించండి (In Progress)',
    btnCompleteAction: 'పూర్తయినట్లు ధృవీకరించండి',

    beforePhoto: 'పరిష్కారానికి ముందు (సాక్ష్యం)',
    afterPhoto: 'పరిష్కారం తర్వాత (ఫోటో)',
    uploadAfterPhotoBtn: '📷 పరిష్కారం తర్వాత ఫోటోను అప్‌లోడ్ చేయండి',
    photoComparisonTitle: 'ముందు మరియు తర్వాత ఫోటోల పోలిక',
    noAfterPhotoYet: 'ఇంకా పరిష్కార ఫోటో జోడించబడలేదు.',

    humanConfirmTitle: 'మానవ ధృవీకరణ & క్లోజింగ్',
    humanConfirmSubtitle: 'ముగించే ముందు ప్రమాదం తొలగించబడిందని ధృవీకరించండి.',
    verifierNameLabel: 'ఇన్‌స్పెక్టర్ పేరు',
    verifierRoleLabel: 'ఇన్‌స్పెక్టర్ హోదా',
    certifyCheckboxLabel: 'నేను స్వయంగా తనిఖీ చేశానని మరియు ప్రమాదం తొలగించబడిందని ధృవీకరిస్తున్నాను.',
    btnConfirmDone: 'ధృవీకరించి సమస్యను ముగించండి',

    followUpAuditTitle: 'ఫాలో-అప్ ఆడిట్ ధృవీకరణ',
    followUpSatisfactory: 'సంతృప్తికరం (ప్రమాదం తొలగించబడింది)',
    followUpAuditedBy: 'ఆడిట్ చేసినవారు',

    factoryZoneMapTitle: 'ఫ్యాక్టరీ జోన్ రిస్క్ మ్యాప్',
    factoryZoneMapSubtitle: 'నమోదైన సంఘటనల ఆధారంగా జోన్ ప్రమాద స్థాయిలు.',
    clickZoneToView: 'ఆ ప్రాంత సమస్యలను చూడటానికి జోన్‌పై క్లిక్ చేయండి.',
    statOverdueCount: 'గడువు ముగిసిన చర్యలు',
    statUnresolvedCount: 'పెండింగ్ సంఘటనలు',

    btnDownloadCsv: 'నివేదికను CSV డౌన్‌లోడ్ చేయండి',
    downloadSuccessNotice: 'CSV ఫైల్ విజయవంతంగా డౌన్‌లోడ్ అయింది!',
    sampleBadgeText: 'నమూనా రికార్డు',
    liveBadgeText: 'లైవ్ రికార్డు',

    simulatorTitle: 'నివారణ చర్యల సిమ్యులేటర్ (What-If Simulator)',
    simulatorSubtitle: 'వివిధ రక్షణ చర్యలను పరీక్షించి ప్రమాద తగ్గింపును అంచనా వేయండి.',
    simulatorDisclaimer:
      'గమనిక: ఇది ఒక ఊహాజనిత విద్యా మోడల్ మాత్రమే. భవిష్యత్తు ప్రమాదాల తగ్గింపును ఖచ్చితంగా హామీ ఇవ్వదు.',
    interventionOption1: 'బే 3 వద్ద ఆటోమేటెడ్ PPE స్కానర్',
    interventionOption2: 'ప్రకాశవంతమైన నడక మార్గ గుర్తులు & చైన్లు',
    interventionOption3: 'మెషిన్ గార్డ్ RFID ఇంటర్‌లాక్ నవీకరణ',
    baselineRiskLabel: 'ప్రస్తుత రిస్క్ స్కోరు',
    simulatedRiskLabel: 'సిమ్యులేటెడ్ రిస్క్ స్కోరు',
    riskReductionEstimate: 'ఊహాజనిత రిస్క్ తగ్గింపు',

    step1Of3: '3 లో 1 వ దశ',
    resetConfirmPrompt: 'అన్ని నమూనా సమస్యలు మరియు సెట్టింగ్‌లను ప్రారంభ స్థితికి రీసెట్ చేయాలా?',
    cameraSupports: 'కెమెరా క్యాప్చర్ లేదా గ్యాలరీకి మద్దతు ఇస్తుంది (JPG, PNG, WEBP)',
    micAllowed: 'మైక్రోఫోన్ అనుమతించబడింది',
    giveMicPermission: 'మైక్ అనుమతి ఇవ్వండి',
    typeNotesFallback: 'మీరు మీ గమనికలను నేరుగా క్రింద టైప్ చేయవచ్చు.',
    spokenNotesLabel: 'వాయిస్ నోట్స్ / ప్రత్యక్ష పరిశీలన:',
    spokenNotesPlaceholder: 'మాట్లాడిన పదాలు ఇక్కడ కనిపిస్తాయి, లేదా టైప్ చేయవచ్చు...',
    tryCheckingAgain: 'మళ్ళీ తనిఖీ చేయడానికి ప్రయత్నించండి',
    rejectionNoticeText: 'సమస్య తప్పుడు అలారంగా తిరస్కరించబడింది. ఇది రికార్డులకు జోడించబడదు.',
    visualEvidenceLabel: 'దృశ్య సాక్ష్యం:',
    visualLimitationsLabel: 'దృశ్య పరిమితులు / అనిశ్చితి:',
    humanVerificationHeader: 'మానవ ధృవీకరణ మరియు బాధ్యత కేటాయింపు',
    doneEditing: 'సవరణ పూర్తయింది',
    editDetailsBeforeSaving: 'సేవ్ చేయడానికి ముందు వివరాలను సవరించండి',
    confirmAndAddProblem: 'ధృవీకరించి భద్రతా సమస్యలలో చేర్చండి',
    rejectFalseAlarm: 'తిరస్కరించండి / తప్పుడు అలారం',
    problemDescLabel: 'సమస్య వివరణ:',
    workAreaLabel: 'పని ప్రాంతం:',
    severityLevelLabel: 'తీవ్రత స్థాయి:',
    searchPlaceholder: 'సమస్యలు, ప్రాంతాలు లేదా ప్రమాద వివరాలను వెతకండి...',
    allStatuses: 'అన్ని స్థితులు',
    allWorkAreas: 'అన్ని పని ప్రాంతాలు',
    allSeverities: 'అన్ని తీవ్రత స్థాయిలు',
    clearFilters: 'ఫిల్టర్‌లను తొలగించండి',
    repeatedProblemsFoundTitle: 'భద్రతా మెమరీ ఇంజిన్: పునరావృత సమస్యలు కనుగొనబడ్డాయి',
    repeatedProblemsSubtitle: 'కనీసం 2 రికార్డులతో గుర్తించబడిన పునరావృతం. చరిత్ర చూడటానికి క్లిక్ చేయండి.',
    supportingRecordsLabel: 'మద్దతు రికార్డులు',
    resolutionRateLabel: 'దిద్దుబాటు చర్యల పరిష్కార రేటు:',
    completePercentLabel: '% పూర్తయింది',
    activeLabel: 'క్రియాశీలం',
    totalLabel: 'మొత్తం',
    closeBtn: 'మూసివేయి',
    cancelBtn: 'రద్దు చేయి',
    saveAssignmentBtn: 'కేటాయింపును సేవ్ చేయండి',
    editRoleDueDate: 'పాత్ర / గడువు తేదీని సవరించండి ✎',
    assignRoleTitle: 'పాత్ర & గడువు తేదీని కేటాయించండి',
    uploadVerificationImage: 'ధృవీకరణ చిత్రాన్ని అప్‌లోడ్ చేయండి',
    photoAttached: '✓ ఫోటో జతచేయబడింది',
    noIncidentsInZone: 'ఈ జోన్‌లో ఎటువంటి భద్రతా సంఘటనలు నమోదు కాలేదు.',
    initialInspectionEvidence: 'ప్రారంభ తనిఖీ సాక్ష్యం',
    safetyInspectorLabel: 'భద్రతా ఇన్‌స్పెక్టర్',
  },

  ta: {
    appTitle: 'INDUSAFE AI',
    platformSubtitle: 'தொழில்துறை பாதுகாப்பு நுண்ணறிவு தளம்',
    tagline: 'ஆபத்துகளைக் காண்க. மீண்டும் நிகழ்வதைத் தடுக்க.',
    prototypeBadge: '',
    welcomeGreeting: 'வணக்கம்! உங்கள் பணியிடத்தை பாதுகாப்பானதாக மாற்றுவோம்.',
    welcomeSubheading: 'நீங்கள் என்ன செய்ய விரும்புகிறீர்கள் என்பதைத் தேர்வுசெய்க.',
    homeBtn: '← முதன்மைப் பக்கத்திற்குச் செல்லவும்',
    readThis: '🔊 வாசித்துக் கேட்கவும்',
    stopReading: '⏹️ குரலை நிறுத்தவும்',

    cardCheckSafetyTitle: 'பாதுகாப்பைச் சரிபார்க்கவும்',
    cardCheckSafetyDesc: 'புகைப்படம் எடுத்து AI மூலம் சாத்தியமான பாதுகாப்பு சிக்கல்களைச் சரிபார்க்கவும்.',
    cardSafetyProblemsTitle: 'பாதுகாப்பு சிக்கல்கள்',
    cardSafetyProblemsDesc: 'சிக்கல்கள் எங்கு நிகழ்ந்தன மற்றும் என்ன செய்ய வேண்டும் என்பதைப் பார்க்கவும்.',
    cardFixProblemsTitle: 'சிக்கல்களைச் சரிசெய்க',
    cardFixProblemsDesc: 'என்ன சரிசெய்ய வேண்டும் என்பதைப் பார்த்து முடிந்ததாகக் குறிக்கவும்.',
    cardSafetyReportTitle: 'பாதுகாப்பு அறிக்கை',
    cardSafetyReportDesc: 'பதிவுசெய்யப்பட்ட சம்பவங்கள் மற்றும் திருத்த நடவடிக்கைகளின் சுருக்கம்.',

    memoryTitle: 'ஸ்மார்ட் பாதுகாப்பு நினைவகம் (Smart Safety Memory)',
    memoryDesc: 'கடந்த கால சிக்கல்களை நினைவில் கொள்கிறது, மீண்டும் மீண்டும் வரும் தவறுகளைக் கண்டறிகிறது.',
    memoryDetailsBtn: 'விவரங்களைக் காண்க ▾',
    memoryHideBtn: 'விவரங்களை மறைக்க ▴',
    memoryInsightRepeat: 'ஏற்றுதல் பகுதி கதவு 3 இல் ஹெல்மெட் மற்றும் ஜாக்கெட் இல்லாத பிரச்சனை 3 முறை மீண்டும் நிகழ்ந்துள்ளது.',
    memoryWhyRiskTitle: 'இந்த ஆபத்துக்கு ஏன் முன்னுரிமை அளிக்கப்படுகிறது?',
    memoryWhyRiskDesc: 'வாகனங்கள் இயங்கும் பகுதியில் மீண்டும் மீண்டும் ஏற்படும் தவறுகள் கடுமையான விபத்துகளுக்கு வழிவகுக்கும்.',
    memoryActionTitle: 'செயலில் உள்ள தடுப்பு நடவடிக்கை:',
    memoryActionDesc: 'நுழைவாயிலில் தடுப்பு சங்கிலி அமைத்தல் மற்றும் பாதுகாப்பு உடைகள் சரிபார்ப்பு நடந்து வருகிறது.',
    memoryNoRepeatNote: 'விதி: குறைந்தபட்சம் 2 பதிவுகள் இருந்தால் மட்டுமே மீண்டும் நிகழும் எச்சரிக்கை காட்டப்படும்.',

    checkTitle: 'பாதுகாப்பு சோதனை',
    step1: 'படி 1: புகைப்படம் எடுக்கவும் அல்லது பதிவேற்றவும்.',
    step2: 'படி 2: "புகைப்படத்தைச் சரிபார்" என்பதை அழுத்தவும்.',
    step3: 'படி 3: முடிவைப் பார்க்கவும்.',
    pickPhotoPrompt: 'மாதிரி புகைப்படத்தைத் தேர்வுசெய்யவும் அல்லது உங்கள் புகைப்படத்தைப் பதிவேற்றவும்:',
    choosePreset: 'தொழிற்சாலை மற்றும் சுற்றுச்சூழல் மாதிரிகள்:',
    orUploadOwn: 'அல்லது உங்கள் சொந்த புகைப்படத்தைப் பதிவேற்றவும்:',
    clickToUpload: 'புகைப்படம் எடுக்க அல்லது பதிவேற்ற இங்கே கிளிக் செய்யவும்',
    checkPhotoBtn: 'புகைப்படத்தைச் சரிபார்க்கவும்',
    checkingPhoto: 'AI புகைப்படத்தைச் சரிபார்க்கிறது... தயவுசெய்து காத்திருக்கவும்',
    photoDisclaimer:
      'அறிவிப்பு: ஒரு புகைப்படம் முழு பகுதியும் பாதுகாப்பானது என்பதை நிரூபிக்காது. தெரியும் பாதுகாப்பு உபகரணங்கள் மற்றும் தெளிவான ஆபத்துகள் மட்டுமே சோதிக்கப்படும்.',
    photoLoadedSuccess: 'புகைப்படம் வெற்றிகரமாக பதிவேற்றப்பட்டது, ஆய்வுக்கு தயார்',
    changePhotoBtn: 'புகைப்படத்தை மாற்றவும்',
    removePhotoBtn: 'புகைப்படத்தை அகற்றவும்',
    loadingOptimizingPhoto: 'புகைப்படம் ஏற்றப்படுகிறது...',
    analyzedPhotoSnapshot: 'ஆய்வு செய்யப்பட்ட புகைப்படம்',

    verdictSafe: 'பாதுகாப்பாகத் தெரிகிறது',
    verdictProblem: 'பாதுகாப்பு சிக்கல் கண்டறியப்பட்டது',
    verdictUnclear: 'பாதுகாப்பு அதிகாரியைக் கேட்கவும்',

    whatIsWrong: 'என்ன தவறு?',
    whereSeen: 'எங்கு காணப்பட்டது?',
    howSerious: 'இது எவ்வளவு தீவிரமானது?',
    whatShouldWeDo: 'நாம் என்ன செய்ய வேண்டும்?',
    unclearAdvice:
      'இதை எங்களால் தெளிவாகச் சோதிக்க முடியவில்லை. தயவுசெய்து மற்றொரு புகைப்படம் எடுக்கவும் அல்லது பாதுகாப்பு அதிகாரியிடம் கேட்கவும்.',

    highRisk: 'அதிக ஆபத்து',
    mediumRisk: 'நடுத்தர ஆபத்து',
    lowRisk: 'குறைந்த ஆபத்து',

    saveAsProblemBtn: 'பாதுகாப்புப் பிரச்சனைகள் பட்டியலில் சேர்க்கவும்',
    problemSavedSuccess: 'சிக்கல் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!',

    problemsTitle: 'பாதுகாப்பு சிக்கல்கள்',
    problemsSubtitle: 'அனைத்து பதிவுசெய்யப்பட்ட பிரச்சனைகள் மற்றும் தீவிரத்தன்மை.',
    repeatedProblemAlert: '⚠️ இந்த பிரச்சனை இதற்கு முன் இங்கு நடந்துள்ளது.',
    sampleDataBadge: 'மாதிரி பதிவு',
    liveDataBadge: 'நேரடி பயனர் பதிவு',
    statusNeedsFixing: 'சரிசெய்ய வேண்டும்',
    statusFixed: 'சரிசெய்யப்பட்டது',
    noProblemsFound: 'இதுவரை எந்த பிரச்சனையும் பதிவு செய்யப்படவில்லை. அருமை!',
    dateLabel: 'தேதி',
    areaLabel: 'பணிப் பகுதி',

    fixTitle: 'சிக்கல்களைச் சரிசெய்க',
    fixSubtitle: 'என்ன சரிசெய்ய வேண்டும் என்பதைப் பார்த்து முடிந்ததாகக் குறிக்கவும்.',
    markAsFixedBtn: 'சரிசெய்யப்பட்டதாகக் குறிக்கவும்',
    confirmFixedTitle: 'உறுதிப்படுத்தல்',
    confirmFixedQuestion: 'இந்த பிரச்சனை உண்மையில் சரிசெய்யப்பட்டதா?',
    yesFixedBtn: 'ஆம், சரிசெய்யப்பட்டது',
    notYetBtn: 'இன்னும் இல்லை',
    fixedSuccessMsg: 'சரிசெய்யப்பட்டதாகப் பதிவு செய்யப்பட்டது. நன்றி!',
    noOpenProblems: 'சரிசெய்ய வேண்டிய பிரச்சனைகள் எதுவும் இல்லை!',

    reportTitle: 'பாதுகாப்பு அறிக்கை',
    reportSubtitle: 'சம்பவங்கள் மற்றும் திருத்த நடவடிக்கைகளின் சுருக்கம்.',
    statTotalFound: 'மொத்த சிக்கல்கள்',
    statFixed: 'சரிசெய்யப்பட்டவை',
    statStillOpen: 'நிலுவையில் உள்ளவை',
    statRepeatedCount: 'மீண்டும் மீண்டும் வரும் சிக்கல்கள்',
    printReport: 'அறிக்கையை அச்சிடுக',
    recentListTitle: 'சம்பவங்கள் மற்றும் தீர்வுகள் வரலாறு',

    preset1Name: 'ஏற்றுதல் பகுதி (ஜாக்கெட்/ஹெல்மெட் இல்லாத தொழிலாளி)',
    preset1Desc: 'ஃபோர்க்லிஃப்ட் அருகே எச்சரிக்கை உடை அணியாத தொழிலாளி',
    preset2Name: 'வேதியியல் தொட்டி (முறையான பாதுகாப்பு உபகரணங்கள்)',
    preset2Desc: 'ஹெல்மெட், கண்ணாடி மற்றும் கவசம் அணிந்த தொழிலாளி',
    preset3Name: 'உற்பத்திப் பாதை (தெளிவான நடைபாதை)',
    preset3Desc: 'தெளிவான நடைபாதை மற்றும் சரியான பாதுகாப்பு உபகரணம்',
    presetFloodName: 'தொழிற்சாலை தாழ்வாரம் (வெள்ளம் & வடிகால் அடைப்பு)',
    presetFloodDesc: 'மின் பலகைகள் மற்றும் பாதையைத் தடுக்கும் கனமழை நீர் தேக்கம்',
    presetLandslideName: 'வளாக எல்லை (நிலச்சரிவு & மண் சரிவு ஆபத்து)',
    presetLandslideDesc: 'சுவரை உடைத்து ஆலைக்குள் புகும் சேறு மற்றும் மண் சரிவு',
    presetCoastalErosionName: 'வடிகால் கால்வாய் (கடலோர அரிப்பு & கரை உடைப்பு)',
    presetCoastalErosionDesc: 'அடித்தள அரிப்பு மற்றும் கட்டட சேத அபாயம்',

    whyIsThisRiskyLabel: 'இது ஏன் ஆபத்தானது?',
    hazardTypeLabel: 'ஆபத்து வகை',
    confidenceLabel: 'நம்பகத்தன்மை மதிப்பீடு',
    riskGuidanceLabel: 'பாதுகாப்பு வழிகாட்டல்',
    nextStepsLabel: 'பரிந்துரைக்கப்பட்ட அடுத்த நடவடிக்கைகள்',
    speakToReportTitle: 'பேசிப் புகாரளிக்கவும்',
    speakToReportBtn: '🎤 பேசிப் புகாரளிக்கவும் (Speak to Report)',
    listeningStatus: 'கேட்கிறது... தயவுசெய்து தெளிவாகப் பேசவும்',
    stopListeningBtn: '⏹️ பேசுவதை நிறுத்தவும்',

    checkReportAudioTitle: 'அறிக்கை ஆடியோ பிளேபேக் & மதிப்பாய்வு',
    audioStatePreparing: 'ஆடியோ குரல் தயாராகிறது...',
    audioStatePlaying: 'ஆடியோ அறிக்கை ஒலிக்கிறது',
    audioStateFinished: 'ஆடியோ பிளேபேக் முடிந்தது',
    audioStateError: 'இந்தச் சாதனத்தில் ஆடியோ வசதி இல்லை. கீழே உள்ள உரையைப் படிக்கவும்.',
    readableTextAlternative: 'படிக்கக்கூடிய உரை மாற்று:',

    roleLabel: 'பொறுப்பான பதவி',
    dueDateLabel: 'காலக்கெடு தேதி',
    roleEHS: 'EHS நிபுணர்',
    roleShiftLead: 'ஷிப்ட் தலைவர்',
    roleMaintenance: 'பராமரிப்பு தொழில்நுட்ப வல்லுநர்',
    roleLogistics: 'தளவாட மேலாளர்',
    roleOpsDirector: 'செயல்பாட்டு இயக்குநர்',

    tabAllActions: 'அனைத்து நடவடிக்கைகள்',
    tabOpenActions: 'திறந்த நடவடிக்கைகள்',
    tabInProgress: 'செயலில் உள்ளவை',
    tabCompleted: 'முடிக்கப்பட்டவை',
    btnStartAction: 'வேலையைத் தொடங்கவும் (In Progress)',
    btnCompleteAction: 'முடிக்கப்பட்டதாகக் குறிக்கவும்',

    beforePhoto: 'சரிசெய்வதற்கு முன் (ஆபத்து சான்று)',
    afterPhoto: 'சரிசெய்த பின் (சரிபார்ப்பு புகைப்படம்)',
    uploadAfterPhotoBtn: '📷 சரிசெய்த பின் புகைப்படத்தைப் பதிவேற்றவும்',
    photoComparisonTitle: 'முன் மற்றும் பின் புகைப்பட ஒப்பீடு',
    noAfterPhotoYet: 'இன்னும் சரிசெய்த புகைப்படம் சேர்க்கப்படவில்லை.',

    humanConfirmTitle: 'மனித சரிபார்ப்பு & நிறைவு',
    humanConfirmSubtitle: 'மூடுவதற்கு முன் ஆபத்து அகற்றப்பட்டதை உறுதிப்படுத்தவும்.',
    verifierNameLabel: 'ஆய்வாளர் பெயர்',
    verifierRoleLabel: 'ஆய்வாளர் பதவி',
    certifyCheckboxLabel: 'நான் இந்த இடத்தை ஆய்வு செய்துள்ளேன் மற்றும் ஆபத்து நீக்கப்பட்டுவிட்டது என சான்றளிக்கிறேன்.',
    btnConfirmDone: 'சரிபார்த்து சிக்கலை மூடவும்',

    followUpAuditTitle: 'பின்தொடர்தல் தணிக்கை சரிபார்ப்பு',
    followUpSatisfactory: 'திருப்திகரமானது (ஆபத்து நீக்கப்பட்டது)',
    followUpAuditedBy: 'தணிக்கை செய்தவர்',

    factoryZoneMapTitle: 'தொழிற்சாலை மண்டல ஆபத்து வரைபடம்',
    factoryZoneMapSubtitle: 'பதிவுசெய்யப்பட்ட சம்பவங்களின் அடிப்படையில் மண்டல ஆபத்து நிலைகள்.',
    clickZoneToView: 'அந்தப் பகுதியின் சிக்கல்களைப் பார்க்க மண்டலத்தைக் கிளிக் செய்யவும்.',
    statOverdueCount: 'காலாவதியான நடவடிக்கைகள்',
    statUnresolvedCount: 'நிலுவையில் உள்ள சம்பவங்கள்',

    btnDownloadCsv: 'அறிக்கையை CSV பதிவிறக்கவும்',
    downloadSuccessNotice: 'CSV கோப்பு வெற்றிகரமாகப் பதிவிறக்கப்பட்டது!',
    sampleBadgeText: 'மாதிரி பதிவு',
    liveBadgeText: 'நேரடி பதிவு',

    simulatorTitle: 'தடுப்பு நடவடிக்கை சிமுலேட்டர் (What-If Simulator)',
    simulatorSubtitle: 'பல்வேறு பாதுகாப்பு நடவடிக்கைகளைச் சோதித்து ஆபத்து குறைப்பைக் கணிக்கவும்.',
    simulatorDisclaimer:
      'அறிவிப்பு: இது ஒரு கற்பனையான மாதிரி மட்டுமே. எதிர்கால விபத்துக் குறைப்பை உத்தரவாதப்படுத்தாது.',
    interventionOption1: 'பே 3 இல் தானியங்கி PPE ஸ்கேனர்',
    interventionOption2: 'ஒளிரும் நடைபாதை அடையாளங்கள் & சங்கிலிகள்',
    interventionOption3: 'இயந்திர பாதுகாப்பு RFID பூட்டு மேம்பாடு',
    baselineRiskLabel: 'தற்போதைய ஆபத்து மதிப்பீடு',
    simulatedRiskLabel: 'கணிக்கப்பட்ட ஆபத்து மதிப்பீடு',
    riskReductionEstimate: 'கற்பனை ஆபத்து குறைப்பு',

    step1Of3: '3 இல் படி 1',
    resetConfirmPrompt: 'அனைத்து மாதிரி சிக்கல்களையும் அமைப்புகளையும் ஆரம்ப நிலைக்கு மீட்டமைக்கவா?',
    cameraSupports: 'கேமரா அல்லது கேலரியை ஆதரிக்கிறது (JPG, PNG, WEBP)',
    micAllowed: 'மைக்ரோஃபோன் அனுமதிக்கப்பட்டது',
    giveMicPermission: 'மைக் அனுமதி வழங்கவும்',
    typeNotesFallback: 'உங்கள் குறிப்புகளை நேரடியாக கீழே தட்டச்சு செய்யலாம்.',
    spokenNotesLabel: 'பேசப்பட்ட குறிப்புகள் / நேரடி கவனிப்பு:',
    spokenNotesPlaceholder: 'பேசப்பட்ட வார்த்தைகள் இங்கே தோன்றும், அல்லது தட்டச்சு செய்யலாம்...',
    tryCheckingAgain: 'மீண்டும் சரிபார்க்க முயற்சிக்கவும்',
    rejectionNoticeText: 'சிக்கல் தவறான எச்சரிக்கையாக நிராகரிக்கப்பட்டது. பதிவில் சேர்க்கப்படாது.',
    visualEvidenceLabel: 'காட்சி ஆதாரம்:',
    visualLimitationsLabel: 'காட்சி வரம்புகள் / நிச்சயமற்ற தன்மை:',
    humanVerificationHeader: 'மனித சரிபார்ப்பு மற்றும் பணி ஒதுக்கீடு',
    doneEditing: 'திருத்தம் முடிந்தது',
    editDetailsBeforeSaving: 'சேமிப்பதற்கு முன் விவரங்களைத் திருத்தவும்',
    confirmAndAddProblem: 'உறுதிசெய்து பாதுகாப்பு சிக்கல்களில் சேர்க்கவும்',
    rejectFalseAlarm: 'நிராகரி / தவறான எச்சரிக்கை',
    problemDescLabel: 'சிக்கலின் விளக்கம்:',
    workAreaLabel: 'பணிப் பகுதி:',
    severityLevelLabel: 'தீவிர நிலை:',
    searchPlaceholder: 'சிக்கல்கள், பகுதிகள் அல்லது ஆபத்து விளக்கங்களைத் தேடுங்கள்...',
    allStatuses: 'அனைத்து நிலைகளும்',
    allWorkAreas: 'அனைத்து பணிப் பகுதிகள்',
    allSeverities: 'அனைத்து தீவிர நிலைகளும்',
    clearFilters: 'வடிகட்டிகளை அழிக்கவும்',
    repeatedProblemsFoundTitle: 'பாதுகாப்பு நினைவக பொறிமுறை: தொடர்ச்சியான சிக்கல்கள் கண்டறியப்பட்டன',
    repeatedProblemsSubtitle: 'குறைந்தது 2 சரிபார்க்கப்பட்ட பதிவுகளுடன் தொடர்பு. வரலாற்றைப் பார்க்க கிளிக் செய்யவும்.',
    supportingRecordsLabel: 'ஆதாரப் பதிவுகள்',
    resolutionRateLabel: 'சரிசெய்தல் நடவடிக்கை தீர்வு விகிதம்:',
    completePercentLabel: '% முடிந்தது',
    activeLabel: 'செயலில்',
    totalLabel: 'மொத்தம்',
    closeBtn: 'மூடு',
    cancelBtn: 'ரத்துசெய்',
    saveAssignmentBtn: 'ஒதுக்கீட்டைச் சேமிக்கவும்',
    editRoleDueDate: 'பொறுப்பு / இறுதித் தேதியைத் திருத்துக ✎',
    assignRoleTitle: 'பொறுப்பு மற்றும் இறுதித் தேதியை ஒதுக்கவும்',
    uploadVerificationImage: 'சரிபார்ப்புப் படத்தை பதிவேற்றவும்',
    photoAttached: '✓ படம் இணைக்கப்பட்டது',
    noIncidentsInZone: 'இந்த மண்டலத்தில் பாதுகாப்பு சம்பவங்கள் எதுவும் பதிவு செய்யப்படவில்லை.',
    initialInspectionEvidence: 'தொடக்க ஆய்வுச் சான்று',
    safetyInspectorLabel: 'பாதுகாப்பு ஆய்வாளர்',
  },

  ml: {
    appTitle: 'INDUSAFE AI',
    platformSubtitle: 'വ്യാവസായിക സുരക്ഷാ ഇന്റലിജൻസ് പ്ലാറ്റ്‌ഫോം',
    tagline: 'അപകടങ്ങൾ കാണുക. ആവർത്തനം തടയുക.',
    prototypeBadge: '',
    welcomeGreeting: 'നമസ്കാരം! നിങ്ങളുടെ തൊഴിലിടം കൂടുതൽ സുരക്ഷിതമാക്കാം.',
    welcomeSubheading: 'നിങ്ങൾ എന്താണ് ചെയ്യാൻ ആഗ്രഹിക്കുന്നതെന്ന് തിരഞ്ഞെടുക്കുക.',
    homeBtn: '← പ്രധാന പേജിലേക്ക് മടങ്ങുക',
    readThis: '🔊 വായിച്ചു കേൾക്കുക',
    stopReading: '⏹️ ശബ്ദം നിർത്തുക',

    cardCheckSafetyTitle: 'സുരക്ഷ പരിശോധിക്കുക',
    cardCheckSafetyDesc: 'ഫോട്ടോ എടുത്ത് AI ഉപയോഗിച്ച് സുരക്ഷാ പ്രശ്നങ്ങൾ പരിശോധിക്കുക.',
    cardSafetyProblemsTitle: 'സുരക്ഷാ പ്രശ്നങ്ങൾ',
    cardSafetyProblemsDesc: 'പ്രശ്നങ്ങൾ എവിടെ സംഭവിച്ചുവെന്നും എന്തുചെയ്യണമെന്നും കാണുക.',
    cardFixProblemsTitle: 'പ്രശ്നങ്ങൾ പരിഹരിക്കുക',
    cardFixProblemsDesc: 'പരിഹരിക്കേണ്ട കാര്യങ്ങൾ കണ്ട് പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക.',
    cardSafetyReportTitle: 'സുരക്ഷാ റിപ്പോർട്ട്',
    cardSafetyReportDesc: 'രേഖപ്പെടുത്തിയ സംഭവങ്ങളുടെയും പരിഹാരങ്ങളുടെയും സംഗ്രഹം.',

    memoryTitle: 'സ്മാർട്ട് സുരക്ഷാ മെമ്മറി (Smart Safety Memory)',
    memoryDesc: 'കഴിഞ്ഞകാല പ്രശ്നങ്ങൾ ഓർമ്മിക്കുന്നു, ആവർത്തിച്ചുള്ള തെറ്റുകൾ കണ്ടെത്തുന്നു.',
    memoryDetailsBtn: 'വിശദാംശങ്ങൾ കാണുക ▾',
    memoryHideBtn: 'വിശദാംശങ്ങൾ മറയ്ക്കുക ▴',
    memoryInsightRepeat: 'ലോഡിംഗ് ഏരിയ ഡോർ 3 ൽ ഹെൽമെറ്റും ജാക്കറ്റും ധരിക്കാത്ത പ്രശ്നം ഈ മാസം 3 തവണ ആവർത്തിച്ചു.',
    memoryWhyRiskTitle: 'എന്തുകൊണ്ട് ഈ അപകടത്തിന് മുൻഗണന നൽകുന്നു?',
    memoryWhyRiskDesc: 'വാഹനങ്ങൾ ചലിക്കുന്ന സ്ഥലങ്ങളിൽ തെറ്റുകൾ ആവർത്തിക്കുന്നത് ഗുരുതരമായ അപകടങ്ങൾക്ക് കാരണമാകും.',
    memoryActionTitle: 'സജീവ പ്രതിരോധ നടപടി:',
    memoryActionDesc: 'ഗേറ്റിൽ ബാരിയർ ചങ്ങലയും ഹൈ-വിസ് ജാക്കറ്റ് പരിശോധനയും പുരോഗമിക്കുന്നു.',
    memoryNoRepeatNote: 'നിയമം: കുറഞ്ഞത് 2 രേഖകൾ ഉണ്ടെങ്കിൽ മാത്രമേ ആവർത്തന മുന്നറിയിപ്പ് കാണിക്കൂ.',

    checkTitle: 'സുരക്ഷാ പരിശോധന',
    step1: 'ഘട്ടം 1: ഫോട്ടോ എടുക്കുക അല്ലെങ്കിൽ അപ്‌ലോഡ് ചെയ്യുക.',
    step2: 'ഘട്ടം 2: "ഫോട്ടോ പരിശോധിക്കുക" അമർത്തുക.',
    step3: 'ഘട്ടം 3: ഫലം കാണുക.',
    pickPhotoPrompt: 'മാതൃകാ ഫോട്ടോ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ നിങ്ങളുടെ ഫോട്ടോ ചേർക്കുക:',
    choosePreset: 'ഫാക്ടറി & പരിസ്ഥിതി മാതൃകകൾ:',
    orUploadOwn: 'അല്ലെങ്കിൽ നിങ്ങളുടെ സ്വന്തം ഫോട്ടോ നൽകുക:',
    clickToUpload: 'ഫോട്ടോ എടുക്കാനോ അപ്‌ലോഡ് ചെയ്യാനോ ഇവിടെ ക്ലിക്ക് ചെയ്യുക',
    checkPhotoBtn: 'ഫോട്ടോ പരിശോധിക്കുക',
    checkingPhoto: 'AI ഫോട്ടോ പരിശോധിക്കുന്നു... ദയവായി കാത്തിരിക്കുക',
    photoDisclaimer:
      'ശ്രദ്ധിക്കുക: ഒരു ഫോട്ടോ മുഴുവൻ സ്ഥലവും സുരക്ഷിതമാണെന്ന് തെളിയിക്കുന്നില്ല. കാണാൻ കഴിയുന്ന ഉപകരണങ്ങളും അപകടങ്ങളും മാത്രമേ പരിശോധിക്കാൻ കഴിയൂ.',
    photoLoadedSuccess: 'ഫോട്ടോ വിജയകരമായി ലോഡ് ചെയ്തു, വിശകലനത്തിന് തയ്യാറാണ്',
    changePhotoBtn: 'ഫോട്ടോ മാറ്റുക',
    removePhotoBtn: 'ഫോട്ടോ നീക്കം ചെയ്യുക',
    loadingOptimizingPhoto: 'ഫോട്ടോ ലോഡ് ചെയ്യുന്നു...',
    analyzedPhotoSnapshot: 'വിശകലനം ചെയ്ത ഫോട്ടോ സ്നാപ്പ്ഷോട്ട്',

    verdictSafe: 'സുരക്ഷിതമായി കാണപ്പെടുന്നു',
    verdictProblem: 'സുരക്ഷാ പ്രശ്നം കണ്ടെത്തി',
    verdictUnclear: 'സുരക്ഷാ ഉദ്യോഗസ്ഥനോട് ചോദിക്കുക',

    whatIsWrong: 'എന്താണ് തെറ്റ്?',
    whereSeen: 'എവിടെയാണ് കണ്ടത്?',
    howSerious: 'ഇത് എത്രത്തോളം ഗുരുതരമാണ്?',
    whatShouldWeDo: 'നമ്മൾ എന്താണ് ചെയ്യേണ്ടത്?',
    unclearAdvice:
      'ഇത് വ്യക്തമായി പരിശോധിക്കാൻ ഞങ്ങൾക്ക് കഴിയുന്നില്ല. ദയവായി മറ്റൊരു ഫോട്ടോ എടുക്കുക അല്ലെങ്കിൽ സുരക്ഷാ ഉദ്യോഗസ്ഥനോട് ചോദിക്കുക.',

    highRisk: 'ഉയർന്ന അപകടസാധ്യത',
    mediumRisk: 'ഇടത്തരം അപകടസാധ്യത',
    lowRisk: 'കുറഞ്ഞ അപകടസാധ്യത',

    saveAsProblemBtn: 'സുരക്ഷാ പ്രശ്നങ്ങളുടെ പട്ടികയിലേക്ക് ചേർക്കുക',
    problemSavedSuccess: 'പ്രശ്നം വിജയകരമായി സേവ് ചെയ്തു!',

    problemsTitle: 'സുരക്ഷാ പ്രശ്നങ്ങൾ',
    problemsSubtitle: 'രേഖപ്പെടുത്തിയ എല്ലാ പ്രശ്നങ്ങളും അവയുടെ തീവ്രതയും.',
    repeatedProblemAlert: '⚠️ ഈ പ്രശ്നം മുമ്പും ഇവിടെ സംഭവിച്ചിട്ടുണ്ട്.',
    sampleDataBadge: 'മാതൃകാ റെക്കോർഡ്',
    liveDataBadge: 'തത്സമയ റെക്കോർഡ്',
    statusNeedsFixing: 'പരിഹരിക്കേണ്ടതുണ്ട്',
    statusFixed: 'പരിഹരിച്ചു',
    noProblemsFound: 'ഇതുവരെ പ്രശ്നങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല. അഭിനന്ദനങ്ങൾ!',
    dateLabel: 'തീയതി',
    areaLabel: 'ജോലിസ്ഥലം',

    fixTitle: 'പ്രശ്നങ്ങൾ പരിഹരിക്കുക',
    fixSubtitle: 'പരിഹരിക്കേണ്ട കാര്യങ്ങൾ കണ്ട് പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക.',
    markAsFixedBtn: 'പരിഹരിച്ചതായി അടയാളപ്പെടുത്തുക',
    confirmFixedTitle: 'സ്ഥിരീകരിക്കുക',
    confirmFixedQuestion: 'ഈ പ്രശ്നം യഥാർത്ഥത്തിൽ പരിഹരിച്ചോ?',
    yesFixedBtn: 'അതെ, പരിഹരിച്ചു',
    notYetBtn: 'ഇതുവരെയില്ല',
    fixedSuccessMsg: 'പരിഹരിച്ചതായി രേഖപ്പെടുത്തി. നന്ദി!',
    noOpenProblems: 'നിലവിൽ പരിഹരിക്കാൻ ബാക്കിയുള്ള പ്രശ്നങ്ങളൊന്നുമില്ല!',

    reportTitle: 'സുരക്ഷാ റിപ്പോർട്ട്',
    reportSubtitle: 'സംഭവങ്ങളുടെയും പരിഹാരങ്ങളുടെയും സംഗ്രഹം.',
    statTotalFound: 'ആകെ കണ്ടെത്തിയ പ്രശ്നങ്ങൾ',
    statFixed: 'പരിഹരിച്ചവ',
    statStillOpen: 'തീർപ്പുകൽപ്പിക്കാത്തവ',
    statRepeatedCount: 'ആവർത്തിച്ചുള്ള പ്രശ്നങ്ങൾ',
    printReport: 'റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക',
    recentListTitle: 'പ്രശ്നങ്ങളുടെയും പരിഹാരങ്ങളുടെയും ചരിത്രം',

    preset1Name: 'ലോഡിംഗ് ഏരിയ (ജാക്കറ്റോ ഹെൽമെറ്റോ ഇല്ലാത്ത തൊഴിലാളി)',
    preset1Desc: 'ഫോർക്ക്‌ലിഫ്റ്റിനടുത്ത് സുരക്ഷാ ജാക്കറ്റ് ഇല്ലാത്ത തൊഴിലാളി',
    preset2Name: 'കെമിക്കൽ ടാങ്ക് (ശരിയായ സുരക്ഷാ വസ്ത്രങ്ങൾ)',
    preset2Desc: 'ഹെൽമെറ്റ്, കണ്ണട, ഏപ്രണുകൾ ധരിച്ച തൊഴിലാളി',
    preset3Name: 'ഫാബ്രിക്കേഷൻ ഏരിയ (വ്യക്തമായ നടപ്പാത)',
    preset3Desc: 'സുരക്ഷിതമായ നടപ്പാതയും ഹെൽമെറ്റും ശരിയാണ്',
    presetFloodName: 'ഫാക്ടറി കോറിഡോർ (വെള്ളപ്പൊക്കവും ഡ്രെയിനേജ് തടസ്സവും)',
    presetFloodDesc: 'വൈദ്യുത പാനലുകൾക്കരികിൽ വഴി തടസ്സപ്പെടുത്തുന്ന വെള്ളക്കെട്ട്',
    presetLandslideName: 'പ്ലാന്റ് അതിർത്തി (മണ്ണിടിച്ചിലും ഭൂമി വിള്ളലും)',
    presetLandslideDesc: 'സംരക്ഷണ മതിൽ തകർത്ത് ഫാക്ടറിയിലേക്ക് കയറുന്ന ചെളിയും മണ്ണും',
    presetCoastalErosionName: 'കനാൽ തീരം (തീരശോഷണവും ചിറ തകർച്ചയും)',
    presetCoastalErosionDesc: 'അടിത്തറ ഒലിച്ചുപോകുന്നതും കെട്ടിടത്തിന് ഭീഷണിയാകുന്നതും',

    whyIsThisRiskyLabel: 'ഇത് എന്തുകൊണ്ട് അപകടകരമാണ്?',
    hazardTypeLabel: 'അപകട വിഭാഗം',
    confidenceLabel: 'കൃത്യതാ വിലയിരുത്തൽ',
    riskGuidanceLabel: 'സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശം',
    nextStepsLabel: 'ശുപാർശ ചെയ്യുന്ന അടുത്ത നടപടികൾ',
    speakToReportTitle: 'സംസാരിച്ച് റിപ്പോർട്ട് ചെയ്യുക',
    speakToReportBtn: '🎤 സംസാരിച്ച് റിപ്പോർട്ട് ചെയ്യുക (Speak to Report)',
    listeningStatus: 'ശ്രദ്ധിക്കുന്നു... ദയവായി വ്യക്തമായി സംസാരിക്കുക',
    stopListeningBtn: '⏹️ സംസാരിക്കുന്നത് നിർത്തുക',

    checkReportAudioTitle: 'റിപ്പോർട്ട് ഓഡിയോ പ്ലേബാക്കും അവലോകനവും',
    audioStatePreparing: 'ഓഡിയോ ശബ്ദം തയ്യാറാക്കുന്നു...',
    audioStatePlaying: 'ഓഡിയോ റിപ്പോർട്ട് പ്ലേ ചെയ്യുന്നു',
    audioStateFinished: 'ഓഡിയോ പൂർത്തിയായി',
    audioStateError: 'ഈ ഉപകരണത്തിൽ ഓഡിയോ ലഭ്യമല്ല. ചുവടെയുള്ള വാചകം വായിക്കുക.',
    readableTextAlternative: 'വായിക്കാവുന്ന വാചക ബദൽ:',

    roleLabel: 'ഉത്തരവാദിത്തപ്പെട്ട പദവി',
    dueDateLabel: 'അവസാന തീയതി',
    roleEHS: 'EHS സ്പെഷ്യലിസ്റ്റ്',
    roleShiftLead: 'ഷിഫ്റ്റ് ലീഡ്',
    roleMaintenance: 'മെയിന്റനൻസ് ടെക്നീഷ്യൻ',
    roleLogistics: 'ലോജിസ്റ്റിക്സ് മാനേജർ',
    roleOpsDirector: 'ഓപ്പറേഷൻസ് ഡയറക്ടർ',

    tabAllActions: 'എല്ലാ നടപടികളും',
    tabOpenActions: 'തുറന്ന നടപടികൾ',
    tabInProgress: 'പുരോഗതിയിലുള്ളവ',
    tabCompleted: 'പൂർത്തിയായവ',
    btnStartAction: 'ജോലി ആരംഭിക്കുക (In Progress)',
    btnCompleteAction: 'പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക',

    beforePhoto: 'പരിഹരിക്കുന്നതിന് മുമ്പ് (തെളിവ്)',
    afterPhoto: 'പരിഹരിച്ചതിന് ശേഷം (ഫോട്ടോ)',
    uploadAfterPhotoBtn: '📷 പരിഹരിച്ച ശേഷമുള്ള ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    photoComparisonTitle: 'മുമ്പും ശേഷവുമുള്ള ഫോട്ടോ താരതമ്യം',
    noAfterPhotoYet: 'ഇതുവരെ പരിഹാര ഫോട്ടോ ചേർത്തിട്ടില്ല.',

    humanConfirmTitle: 'മാനുഷിക പരിശോധനയും സ്ഥിരീകരണവും',
    humanConfirmSubtitle: 'ക്ലോസ് ചെയ്യുന്നതിന് മുമ്പ് അപകടം നീക്കം ചെയ്തതായി ഉറപ്പാക്കുക.',
    verifierNameLabel: 'പരിശോധകന്റെ പേര്',
    verifierRoleLabel: 'പരിശോധകന്റെ പദവി',
    certifyCheckboxLabel: 'ഞാൻ ഈ സ്ഥലം പരിശോധിച്ചുവെന്നും അപകടം നീക്കം ചെയ്തതായും സാക്ഷ്യപ്പെടുത്തുന്നു.',
    btnConfirmDone: 'സ്ഥിരീകരിച്ച് പ്രശ്നം ക്ലോസ് ചെയ്യുക',

    followUpAuditTitle: 'ഫോളോ-അപ്പ് ഓഡിറ്റ് പരിശോധന',
    followUpSatisfactory: 'തൃപ്തികരം (അപകടം ഒഴിവാക്കി)',
    followUpAuditedBy: 'ഓഡിറ്റ് ചെയ്തത്',

    factoryZoneMapTitle: 'ഫാക്ടറി സോൺ റിസ്ക് മാപ്പ്',
    factoryZoneMapSubtitle: 'രേഖപ്പെടുത്തിയ സംഭവങ്ങളുടെ അടിസ്ഥാനത്തിലുള്ള സോൺ അപകടസാധ്യതാ നില.',
    clickZoneToView: 'ആ പ്രദേശത്തെ പ്രശ്നങ്ങൾ കാണാൻ സോണിൽ ക്ലിക്ക് ചെയ്യുക.',
    statOverdueCount: 'കാലഹരണപ്പെട്ട നടപടികൾ',
    statUnresolvedCount: 'തീർപ്പുകൽപ്പിക്കാത്ത സംഭവങ്ങൾ',

    btnDownloadCsv: 'റിപ്പോർട്ട് CSV ഡൗൺലോഡ് ചെയ്യുക',
    downloadSuccessNotice: 'CSV ഫയൽ വിജയകരമായി ഡൗൺലോഡ് ചെയ്തു!',
    sampleBadgeText: 'മാതൃകാ റെക്കോർഡ്',
    liveBadgeText: 'തത്സമയ റെക്കോർഡ്',

    simulatorTitle: 'പ്രിവെന്റീവ് ആക്ഷൻ സിമുലേറ്റർ (What-If Simulator)',
    simulatorSubtitle: 'വിവിധ സംരക്ഷണ നടപടികൾ പരിശോധിച്ച് അപകടസാധ്യത കുറയ്ക്കുന്നത് കണക്കുകൂട്ടുക.',
    simulatorDisclaimer:
      'ശ്രദ്ധിക്കുക: ഇതൊരു സാങ്കൽപ്പിക വിദ്യാഭ്യാസ മാതൃക മാത്രമാണ്. യഥാർത്ഥ അപകട കുറവ് ഉറപ്പുനൽകുന്നില്ല.',
    interventionOption1: 'ബേ 3 ൽ ഓട്ടോമേറ്റഡ് PPE സ്കാനർ',
    interventionOption2: 'പ്രകാശമുള്ള നടപ്പാത അടയാളങ്ങളും ചങ്ങലകളും',
    interventionOption3: 'മെഷീൻ ഗാർഡ് RFID ഇന്റർലോക്ക് നവീകരണം',
    baselineRiskLabel: 'നിലവിലെ റിസ്ക് സ്കോർ',
    simulatedRiskLabel: 'സിമുലേറ്റഡ് റിസ്ക് സ്കോർ',
    riskReductionEstimate: 'കണക്കാക്കിയ റിസ്ക് കുറവ്',

    step1Of3: '3-ൽ ഘട്ടം 1',
    resetConfirmPrompt: 'എല്ലാ സാമ്പിൾ പ്രശ്നങ്ങളും ക്രമീകരണങ്ങളും പ്രാരംഭ നിലയിലേക്ക് പുനഃക്രമീകരിക്കണോ?',
    cameraSupports: 'ക്യാമറ ക്യാപ്‌ചർ അല്ലെങ്കിൽ ഗാലറി പിന്തുണയ്ക്കുന്നു (JPG, PNG, WEBP)',
    micAllowed: 'മൈക്രോഫോൺ അനുവദിച്ചു',
    giveMicPermission: 'മൈക്ക് അനുമതി നൽകുക',
    typeNotesFallback: 'നിങ്ങൾക്ക് നേരിട്ട് താഴെ കുറിപ്പുകൾ ടൈപ്പ് ചെയ്യാം.',
    spokenNotesLabel: 'ശബ്ദ കുറിപ്പുകൾ / നേരിട്ടുള്ള നിരീക്ഷണം:',
    spokenNotesPlaceholder: 'സംസാരിക്കുന്ന വാക്കുകൾ ഇവിടെ സ്വയമേവ ദൃശ്യമാകും, അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യാം...',
    tryCheckingAgain: 'വീണ്ടും പരിശോധിക്കാൻ ശ്രമിക്കുക',
    rejectionNoticeText: 'പ്രശ്നം തെറ്റായ മുന്നറിയിപ്പായി നിരസിച്ചു. റെക്കോർഡുകളിൽ ചേർക്കില്ല.',
    visualEvidenceLabel: 'ദൃശ്യ തെളിവ്:',
    visualLimitationsLabel: 'ദൃശ്യ പരിമിതികൾ / അനിശ്ചിതത്വം:',
    humanVerificationHeader: 'മനുഷ്യ പരിശോധനയും ചുമതല നൽകലും',
    doneEditing: 'എഡിറ്റിംഗ് കഴിഞ്ഞു',
    editDetailsBeforeSaving: 'സംരക്ഷിക്കുന്നതിന് മുമ്പ് വിശദാംശങ്ങൾ എഡിറ്റ് ചെയ്യുക',
    confirmAndAddProblem: 'സ്ഥിരീകരിച്ച് സുരക്ഷാ പ്രശ്നങ്ങളിൽ ചേർക്കുക',
    rejectFalseAlarm: 'നിരസിക്കുക / തെറ്റായ മുന്നറിയിപ്പ്',
    problemDescLabel: 'പ്രശ്നത്തിന്റെ വിവരണം:',
    workAreaLabel: 'ജോലി സ്ഥലം:',
    severityLevelLabel: 'തീവ്രതാ നില:',
    searchPlaceholder: 'പ്രശ്നങ്ങൾ, സ്ഥലങ്ങൾ അല്ലെങ്കിൽ വിവരണങ്ങൾ തിരയുക...',
    allStatuses: 'എല്ലാ അവസ്ഥകളും',
    allWorkAreas: 'എല്ലാ ജോലി സ്ഥലങ്ങളും',
    allSeverities: 'എല്ലാ തീവ്രതാ നിലകളും',
    clearFilters: 'ഫിൽട്ടറുകൾ നീക്കുക',
    repeatedProblemsFoundTitle: 'സുരക്ഷാ മെമ്മറി എഞ്ചിൻ: ആവർത്തിച്ചുള്ള പ്രശ്നങ്ങൾ കണ്ടെത്തി',
    repeatedProblemsSubtitle: 'കുറഞ്ഞത് 2 സ്ഥിരീകരിച്ച രേഖകളുള്ള ആവർത്തനം. ചരിത്രം കാണാൻ ക്ലിക്ക് ചെയ്യുക.',
    supportingRecordsLabel: 'തെളിവ് രേഖകൾ',
    resolutionRateLabel: 'പരിഹാര നടപടി പൂർത്തീകരണ നിരക്ക്:',
    completePercentLabel: '% പൂർത്തിയായി',
    activeLabel: 'സജീവം',
    totalLabel: 'ആകെ',
    closeBtn: 'അടയ്ക്കുക',
    cancelBtn: 'റദ്ദാക്കുക',
    saveAssignmentBtn: 'ചുമതലപ്പെടുത്തൽ സംരക്ഷിക്കുക',
    editRoleDueDate: 'ചുമതല / അവസാന തീയതി മാറ്റുക ✎',
    assignRoleTitle: 'ചുമതലയും അവസാന തീയതിയും നൽകുക',
    uploadVerificationImage: 'പരിശോധനാ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    photoAttached: '✓ ഫോട്ടോ ചേർത്തു',
    noIncidentsInZone: 'ഈ മേഖലയിൽ സുരക്ഷാ സംഭവങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.',
    initialInspectionEvidence: 'പ്രാഥമിക പരിശോധനാ തെളിവ്',
    safetyInspectorLabel: 'സുരക്ഷാ ഇൻസ്പെക്ടർ',
  },
};

/**
 * Returns safe translation strings with reliable English fallback for any missing key.
 */
export function getTranslation(lang: Language): TranslationStrings {
  const target = TRANSLATIONS[lang];
  if (!target) return TRANSLATIONS.en;
  return { ...TRANSLATIONS.en, ...target };
}
