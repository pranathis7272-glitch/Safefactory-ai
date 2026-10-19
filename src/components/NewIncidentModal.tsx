import React, { useState } from 'react';
import { IncidentRecord, ZoneId, ShiftType, IncidentCategory, SeverityLevel } from '../types';
import { FACTORY_ZONES } from '../data/seedData';
import { Plus, X, ShieldAlert } from 'lucide-react';

interface NewIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (incident: IncidentRecord) => void;
}

export const NewIncidentModal: React.FC<NewIncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    zoneId: ZoneId;
    shift: ShiftType;
    category: IncidentCategory;
    severity: SeverityLevel;
    visualEvidence: string;
    uncertaintyNotes: string;
    reviewerName: string;
  }>({
    title: '',
    zoneId: 'ZONE_D',
    shift: 'Night (22:00 - 06:00)',
    category: 'PPE Non-compliance',
    severity: 'High',
    visualEvidence: '',
    uncertaintyNotes: '',
    reviewerName: 'Marcus Vance (EHS Specialist)',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.visualEvidence) return;

    const zoneObj = FACTORY_ZONES.find((z) => z.id === formData.zoneId);
    const newId = `INC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: IncidentRecord = {
      id: newId,
      title: formData.title,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      zoneId: formData.zoneId,
      zoneName: zoneObj?.name || 'General Factory Zone',
      shift: formData.shift,
      category: formData.category,
      severity: formData.severity,
      verificationStatus: 'Verified Incident',
      correctiveActionStatus: 'Action Pending',
      visualEvidence: formData.visualEvidence,
      uncertaintyNotes: formData.uncertaintyNotes || 'Confirmed by safety officer on-site.',
      reviewedBy: formData.reviewerName,
      reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      source: 'Manual Inspection',
      isSampleData: false,
    };

    onSubmit(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-400" />
            Log Audited Safety Incident
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Incident Headline / Title:</label>
            <input
              type="text"
              required
              placeholder="e.g. Unvested personnel spotted in staging corridor"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Facility Zone:</label>
              <select
                value={formData.zoneId}
                onChange={(e) => setFormData({ ...formData, zoneId: e.target.value as ZoneId })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
              >
                {FACTORY_ZONES.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Operating Shift:</label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value as ShiftType })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
              >
                <option value="Morning (06:00 - 14:00)">Morning (06:00 - 14:00)</option>
                <option value="Afternoon (14:00 - 22:00)">Afternoon (14:00 - 22:00)</option>
                <option value="Night (22:00 - 06:00)">Night (22:00 - 06:00)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Hazard Category:</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as IncidentCategory })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
              >
                <option value="PPE Non-compliance">PPE Non-compliance</option>
                <option value="Fall/Trip Hazard">Fall/Trip Hazard</option>
                <option value="Chemical/Spill">Chemical/Spill</option>
                <option value="Machine Guarding">Machine Guarding</option>
                <option value="Blocked Egress">Blocked Egress</option>
                <option value="Housekeeping">Housekeeping</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Severity Tier:</label>
              <select
                value={formData.severity}
                onChange={(e) =>
                  setFormData({ ...formData, severity: e.target.value as SeverityLevel })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Visual Evidence &amp; Specifics:</label>
            <textarea
              rows={2}
              required
              placeholder="Describe exact visual cues, location markers, missing equipment..."
              value={formData.visualEvidence}
              onChange={(e) => setFormData({ ...formData, visualEvidence: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Uncertainty / Ambient Notes:</label>
            <input
              type="text"
              placeholder="e.g. Low lighting at door 4; worker wore navy jacket without trim."
              value={formData.uncertaintyNotes}
              onChange={(e) => setFormData({ ...formData, uncertaintyNotes: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Certifying Safety Reviewer:</label>
            <input
              type="text"
              required
              value={formData.reviewerName}
              onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded"
            >
              Commit to Safety Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
