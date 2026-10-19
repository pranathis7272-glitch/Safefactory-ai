import React, { useState } from 'react';
import { IncidentRecord, ZoneId, ShiftType, IncidentCategory, SeverityLevel } from '../types';
import { FACTORY_ZONES, INSPECTION_IMAGE_PRESETS } from '../data/seedData';
import { processAndOptimizeImage } from '../utils/imageProcessor';
import {
  Camera,
  Upload,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Eye,
  RefreshCw,
  HardHat,
  Sparkles,
  Info,
  Check,
  X,
  FileEdit,
} from 'lucide-react';

interface InspectionStudioProps {
  onCommitIncident: (incident: IncidentRecord) => void;
}

export const InspectionStudio: React.FC<InspectionStudioProps> = ({ onCommitIncident }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-loading-dock');
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [customImageMime, setCustomImageMime] = useState<string>('image/jpeg');

  const [selectedZone, setSelectedZone] = useState<ZoneId>('ZONE_D');
  const [selectedShift, setSelectedShift] = useState<ShiftType>('Night (22:00 - 06:00)');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Review editing state
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState<{
    zoneId: ZoneId;
    shift: ShiftType;
    category: IncidentCategory;
    severity: SeverityLevel;
    title: string;
    evidence: string;
  }>({
    zoneId: 'ZONE_D',
    shift: 'Night (22:00 - 06:00)',
    category: 'PPE Non-compliance',
    severity: 'High',
    title: 'Loading Bay 3: Unvested personnel during trailer unloading',
    evidence: 'Personnel observed inside trailer entrance without high-visibility vest or approved hardhat.',
  });

  const [committedSuccess, setCommittedSuccess] = useState<string | null>(null);

  // Helper to convert preset SVG to base64 for API submission
  const getPresetAsBase64 = (svgContent: string): string => {
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
  };

  const handleRunInspection = async () => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisResult(null);
    setCommittedSuccess(null);

    try {
      let imagePayload = customImageBase64;
      let mime = customImageMime;

      if (!imagePayload) {
        const preset = INSPECTION_IMAGE_PRESETS.find((p) => p.id === selectedPresetId);
        if (preset) {
          imagePayload = getPresetAsBase64(preset.svgContent);
          mime = 'image/svg+xml';
        }
      }

      if (!imagePayload) {
        throw new Error('Please select an inspection preset image or upload an image.');
      }

      const res = await fetch('/api/analyze-inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePayload,
          mimeType: mime,
          userZone: FACTORY_ZONES.find((z) => z.id === selectedZone)?.name,
          shift: selectedShift,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `Server returned error status ${res.status}`);
      }

      const data = await res.json();
      setAnalysisResult(data);

      // Populate review form defaults
      const zoneObj = FACTORY_ZONES.find((z) => z.id === selectedZone);
      setReviewForm({
        zoneId: selectedZone,
        shift: selectedShift,
        category: (data.primaryViolation?.category as IncidentCategory) || 'PPE Non-compliance',
        severity: (data.primaryViolation?.severity as SeverityLevel) || 'High',
        title: `${zoneObj?.code || 'ZONE'}: ${data.primaryViolation?.type || 'PPE Non-compliance observed'}`,
        evidence: data.primaryViolation?.evidence || data.summary || 'Visual evidence extracted from inspection image.',
      });
    } catch (err: any) {
      console.error('Inspection error:', err);
      setErrorMessage(err.message || 'An error occurred while analyzing the inspection image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const processed = await processAndOptimizeImage(file);
      setCustomImageBase64(processed.dataUrl);
      setCustomImageMime(processed.mimeType);
      setSelectedPresetId('custom');
      setAnalysisResult(null);
      setCommittedSuccess(null);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to read image file. Please try another photo.');
    } finally {
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleConfirmIncident = (status: 'Verified Incident' | 'Rejected (False Positive)') => {
    if (!analysisResult) return;

    const zoneObj = FACTORY_ZONES.find((z) => z.id === reviewForm.zoneId);
    const newId = `INC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newIncident: IncidentRecord = {
      id: newId,
      title: reviewForm.title,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      zoneId: reviewForm.zoneId,
      zoneName: zoneObj?.name || 'General Factory Zone',
      shift: reviewForm.shift,
      category: reviewForm.category,
      severity: reviewForm.severity,
      verificationStatus: status,
      correctiveActionStatus: status === 'Verified Incident' ? 'Action Pending' : 'None Required',
      visualEvidence: reviewForm.evidence,
      uncertaintyNotes: analysisResult.uncertaintyNotes,
      reviewedBy: 'Safety Officer (Logged-in Session)',
      reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      source: 'AI Vision Audit',
      isSampleData: false,
      workerCount: analysisResult.workerCount ?? 0,
      helmetsDetected: analysisResult.helmetsDetected ?? 0,
      vestsDetected: analysisResult.vestsDetected ?? 0,
      recommendation: analysisResult.recommendation,
    };

    onCommitIncident(newIncident);
    setCommittedSuccess(
      status === 'Verified Incident'
        ? `Incident ${newId} confirmed and permanently added to Safety Memory Engine.`
        : `Record marked as Rejected (False Alarm). Excluded from historical recurrence metrics.`
    );
    setIsEditingReview(false);
  };

  const currentPreset = INSPECTION_IMAGE_PRESETS.find((p) => p.id === selectedPresetId);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Camera className="w-5 h-5 text-teal-400" />
              AI Safety Inspection Studio
            </h2>
            <span className="bg-teal-500/20 text-teal-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-teal-500/30">
              Gemini Vision 3.8
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Audit work zone snapshots for visible workers, helmets, and high-visibility vests. Strict grounding rules
            prevent hallucinating absent items or inventing location tags. Unclear images flag for human safety verification.
          </p>
        </div>

        {/* Mandatory Non-CCTV Disclaimer */}
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-lg p-2.5 text-xs text-amber-200/90 flex items-start gap-2 max-w-md">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Audit Scope Disclosure:</strong> This single-image computer vision inspection assists safety officers.
            It does <em>not</em> provide continuous CCTV monitoring, nor does it replace physical safety walkthroughs.
          </span>
        </div>
      </div>

      {/* Main Grid: Input / Presets + Image Viewport + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Controls & Parameters (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-lg">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" />
              1. Inspection Target &amp; Presets
            </h3>

            {/* Presets Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 block">Select Calibrated Test Photo:</label>
              <div className="space-y-2">
                {INSPECTION_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setCustomImageBase64(null);
                      setSelectedZone(preset.zoneId);
                      setSelectedShift(preset.shift);
                      setAnalysisResult(null);
                      setCommittedSuccess(null);
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                      selectedPresetId === preset.id
                        ? 'bg-teal-950/40 border-teal-500/60 text-slate-100 shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">{preset.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload Option */}
            <div className="pt-2 border-t border-slate-800">
              <label className="text-xs font-medium text-slate-400 block mb-2">Or Upload Factory Image:</label>
              <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-700 hover:border-teal-500 rounded-lg cursor-pointer bg-slate-950/40 transition-colors">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-xs text-slate-300 font-medium">Click to select photo</span>
                <span className="text-[10px] text-slate-500">PNG, JPG, or WEBP up to 10MB</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              {customImageBase64 && (
                <div className="mt-2 text-xs text-teal-400 flex items-center justify-between">
                  <span>Custom image uploaded</span>
                  <button
                    onClick={() => {
                      setCustomImageBase64(null);
                      setSelectedPresetId('preset-loading-dock');
                    }}
                    className="text-slate-400 hover:text-slate-200 underline"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Inspection Context Parameters */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Affiliated Facility Zone:</label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value as ZoneId)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                >
                  {FACTORY_ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Location is provided by you; the vision model will not invent arbitrary plant zones.
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">Operating Shift:</label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value as ShiftType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                >
                  <option value="Morning (06:00 - 14:00)">Morning (06:00 - 14:00)</option>
                  <option value="Afternoon (14:00 - 22:00)">Afternoon (14:00 - 22:00)</option>
                  <option value="Night (22:00 - 06:00)">Night (22:00 - 06:00)</option>
                </select>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunInspection}
              disabled={isAnalyzing}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                isAnalyzing
                  ? 'bg-teal-700 text-teal-200 cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 active:scale-[0.98]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Scene with Gemini 3.8...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Run AI Safety Inspection
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Visual Preview & Structured Findings (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Preview Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Target Visual Snapshot</span>
                <span className="text-[11px] text-slate-500">
                  {customImageBase64 ? 'Uploaded Frame' : 'Calibrated Scenario Frame'}
                </span>
              </div>
              <div className="relative aspect-[4/3] bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
                {customImageBase64 ? (
                  <img
                    src={customImageBase64}
                    alt="Custom Inspection Upload"
                    className="w-full h-full object-contain"
                  />
                ) : currentPreset ? (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: currentPreset.svgContent }}
                  />
                ) : (
                  <span className="text-xs text-slate-500">No image loaded</span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Active Target: {FACTORY_ZONES.find((z) => z.id === selectedZone)?.code}</span>
                <span>{selectedShift.split('(')[0]}</span>
              </div>
            </div>

            {/* Status / Quick Counts Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-3">
                  Visual Detections Breakdown
                </span>
                {analysisResult ? (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Visible Workers</div>
                      <div className="text-2xl font-black text-slate-100 mt-1">
                        {analysisResult.workerCount ?? 0}
                      </div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Hardhats Worn</div>
                      <div
                        className={`text-2xl font-black mt-1 ${
                          (analysisResult.helmetsDetected ?? 0) < (analysisResult.workerCount ?? 0)
                            ? 'text-amber-400'
                            : 'text-teal-400'
                        }`}
                      >
                        {analysisResult.helmetsDetected ?? 0}
                      </div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">High-Vis Vests</div>
                      <div
                        className={`text-2xl font-black mt-1 ${
                          (analysisResult.vestsDetected ?? 0) < (analysisResult.workerCount ?? 0)
                            ? 'text-red-400'
                            : 'text-teal-400'
                        }`}
                      >
                        {analysisResult.vestsDetected ?? 0}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
                    <HardHat className="w-8 h-8 text-slate-600 mb-2 stroke-[1.5]" />
                    Run inspection to detect visible personnel, helmets, and high-visibility apparel.
                  </div>
                )}
              </div>

              {/* Uncertainty Callout */}
              {analysisResult && (
                <div className="mt-4 p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  <div className="text-slate-300 font-semibold mb-0.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    Uncertainty &amp; Visual Grounding:
                  </div>
                  <p>{analysisResult.uncertaintyNotes || 'Clear line of sight. No visual obstruction detected.'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Committed Banner */}
          {committedSuccess && (
            <div className="p-3 bg-teal-950/50 border border-teal-800 rounded-xl text-xs text-teal-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{committedSuccess}</span>
            </div>
          )}

          {/* Structured Analysis Results & Review Workflow */}
          {analysisResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                      analysisResult.primaryViolation?.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : analysisResult.primaryViolation?.severity === 'High'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}
                  >
                    {analysisResult.primaryViolation?.severity || 'Moderate'} Priority
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {analysisResult.primaryViolation?.type || 'Potential Non-compliance Observed'}
                  </span>
                </div>

                {analysisResult.needsHumanReview && (
                  <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-semibold border border-amber-500/40 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Needs Human Safety Verification
                  </span>
                )}
              </div>

              {/* Summary and Evidence */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Summary of Findings:</span>
                  <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                    {analysisResult.summary}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Visual Grounding Evidence:</span>
                  <p className="text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px]">
                    "{analysisResult.primaryViolation?.evidence || analysisResult.summary}"
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Preventive Recommendation:</span>
                  <p className="text-teal-300 bg-teal-950/20 border border-teal-900/60 p-3 rounded-lg">
                    💡 {analysisResult.recommendation}
                  </p>
                </div>
              </div>

              {/* HUMAN-IN-THE-LOOP SAFETY OFFICER REVIEW WORKFLOW */}
              <div className="pt-4 border-t border-slate-800 bg-slate-950/60 p-4 rounded-xl border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                      Safety Officer Review Gate
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Only confirmed incidents enter the verified Safety Memory
                  </span>
                </div>

                {isEditingReview ? (
                  /* Editable Verification Form */
                  <div className="space-y-3 bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs mb-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Incident Title:</label>
                        <input
                          type="text"
                          value={reviewForm.title}
                          onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Category:</label>
                        <select
                          value={reviewForm.category}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, category: e.target.value as IncidentCategory })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
                        >
                          <option value="PPE Non-compliance">PPE Non-compliance</option>
                          <option value="Fall/Trip Hazard">Fall/Trip Hazard</option>
                          <option value="Chemical/Spill">Chemical/Spill</option>
                          <option value="Machine Guarding">Machine Guarding</option>
                          <option value="Blocked Egress">Blocked Egress</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Severity:</label>
                        <select
                          value={reviewForm.severity}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, severity: e.target.value as SeverityLevel })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Zone:</label>
                        <select
                          value={reviewForm.zoneId}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, zoneId: e.target.value as ZoneId })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
                        >
                          {FACTORY_ZONES.map((z) => (
                            <option key={z.id} value={z.id}>
                              {z.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Evidence Annotation:</label>
                      <textarea
                        rows={2}
                        value={reviewForm.evidence}
                        onChange={(e) => setReviewForm({ ...reviewForm, evidence: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ) : null}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleConfirmIncident('Verified Incident')}
                    className="flex-1 min-w-[200px] py-2 px-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 active:scale-[0.99] transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Confirm &amp; Commit to Safety Memory
                  </button>

                  <button
                    onClick={() => setIsEditingReview(!isEditingReview)}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    {isEditingReview ? 'Close Edit Form' : 'Adjust Parameters'}
                  </button>

                  <button
                    onClick={() => handleConfirmIncident('Rejected (False Positive)')}
                    className="py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 font-medium text-xs flex items-center gap-1.5 border border-red-800/80 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reject (False Alarm)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
