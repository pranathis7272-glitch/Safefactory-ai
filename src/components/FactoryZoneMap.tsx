import React from 'react';
import { ZoneId, ZoneInfo } from '../types';
import { FACTORY_ZONES } from '../data/seedData';
import { ShieldAlert, AlertTriangle, CheckCircle2, Users, Flame, Zap } from 'lucide-react';

interface FactoryZoneMapProps {
  selectedZone: ZoneId | 'ALL';
  onSelectZone: (zoneId: ZoneId | 'ALL') => void;
  zoneRiskScores: Record<ZoneId, { score: number; tier: string; activeIssues: number }>;
}

export const FactoryZoneMap: React.FC<FactoryZoneMapProps> = ({
  selectedZone,
  onSelectZone,
  zoneRiskScores,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
              Interactive Facility Zone Risk Map
            </h3>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Live Topology
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Select any manufacturing zone to inspect shift hazard profiles, repeat non-compliances, and active controls.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onSelectZone('ALL')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              selectedZone === 'ALL'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
          >
            Show All Facility Zones
          </button>
          <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500"></span>
              <span className="text-slate-400">Critical (75+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
              <span className="text-slate-400">High (55-74)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-teal-500/20 border border-teal-500"></span>
              <span className="text-slate-400">Standard (&lt;55)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full aspect-[16/9] max-h-[380px] bg-slate-950 rounded-lg border border-slate-800/80 p-2 overflow-hidden select-none">
        <svg
          viewBox="0 0 760 410"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Blueprint Grid Lines */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.6" />
            </pattern>
            <linearGradient id="glowD" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="760" height="410" fill="url(#grid)" />

          {/* Pedestrian Safety Aisle (Luminous Path) */}
          <path
            d="M 245 40 L 245 200 L 485 200 L 485 400"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="8"
            strokeDasharray="6 4"
            opacity="0.25"
          />
          <text x="320" y="206" fill="#38bdf8" fontSize="9" fontWeight="bold" letterSpacing="1" opacity="0.7">
            PROTECTED PEDESTRIAN AISLE
          </text>

          {/* Zones */}
          {FACTORY_ZONES.map((zone) => {
            const risk = zoneRiskScores[zone.id] || { score: 30, tier: 'Low', activeIssues: 0 };
            const isSelected = selectedZone === zone.id;
            const { x, y, width, height } = zone.coordinates;

            // Determine border & fill color by risk tier
            let strokeColor = '#0d9488'; // teal default
            let fillColor = 'rgba(13, 148, 136, 0.12)';
            let badgeBg = 'bg-teal-500/20 text-teal-300 border-teal-500/30';
            if (risk.score >= 75) {
              strokeColor = '#ef4444'; // Red critical
              fillColor = 'rgba(239, 68, 68, 0.22)';
              badgeBg = 'bg-red-500/20 text-red-300 border-red-500/40';
            } else if (risk.score >= 55) {
              strokeColor = '#f59e0b'; // Amber high
              fillColor = 'rgba(245, 158, 11, 0.18)';
              badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
            }

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(isSelected ? 'ALL' : zone.id)}
                className="cursor-pointer transition-all duration-200 group"
              >
                {/* Zone Box Background */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx="8"
                  fill={isSelected ? (risk.score >= 75 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(13, 148, 136, 0.3)') : fillColor}
                  stroke={isSelected ? '#38bdf8' : strokeColor}
                  strokeWidth={isSelected ? '3' : '1.8'}
                  className="transition-all duration-200 group-hover:stroke-cyan-400"
                />

                {/* Pulsing Corner Indicator for High Risk */}
                {risk.score >= 75 && (
                  <circle cx={x + width - 18} cy={y + 18} r="6" fill="#ef4444" className="animate-ping" />
                )}
                {risk.score >= 75 && (
                  <circle cx={x + width - 18} cy={y + 18} r="6" fill="#ef4444" />
                )}

                {/* Zone Code & Name */}
                <text
                  x={x + 14}
                  y={y + 24}
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  {zone.code}
                </text>
                <text
                  x={x + 14}
                  y={y + 42}
                  fill="#f1f5f9"
                  fontSize="12.5"
                  fontWeight="bold"
                  className="group-hover:fill-cyan-300 transition-colors"
                >
                  {zone.name.split('—')[0].trim()}
                </text>
                <text
                  x={x + 14}
                  y={y + 58}
                  fill="#64748b"
                  fontSize="10"
                >
                  {zone.activityType}
                </text>

                {/* Stats row inside Zone */}
                <rect
                  x={x + 12}
                  y={y + height - 44}
                  width={width - 24}
                  height="32"
                  rx="4"
                  fill="#090d16"
                  opacity="0.85"
                />

                <text
                  x={x + 22}
                  y={y + height - 24}
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                >
                  Headcount: {zone.nominalHeadcount}
                </text>

                <text
                  x={x + width - 24}
                  y={y + height - 24}
                  textAnchor="end"
                  fill={risk.score >= 75 ? '#f87171' : risk.score >= 55 ? '#fbbf24' : '#2dd4bf'}
                  fontSize="11"
                  fontWeight="bold"
                >
                  Risk Score: {risk.score}/100
                </text>

                {/* Active alert indicator */}
                {risk.activeIssues > 0 && (
                  <text
                    x={x + 14}
                    y={y + 82}
                    fill={risk.score >= 75 ? '#fca5a5' : '#fde047'}
                    fontSize="10"
                    fontWeight="600"
                  >
                    ⚠️ {risk.activeIssues} Recurrence Alert{risk.activeIssues > 1 ? 's' : ''}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Zone Quick Details when selected */}
      {selectedZone !== 'ALL' && (
        <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          {(() => {
            const zone = FACTORY_ZONES.find((z) => z.id === selectedZone);
            if (!zone) return null;
            const risk = zoneRiskScores[zone.id];
            return (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/80 rounded-lg text-teal-400">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100 text-sm">{zone.name}</div>
                    <div className="text-slate-400">{zone.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-slate-400 text-[11px]">Hazard Tier</div>
                    <div className="font-bold text-slate-200">{zone.equipmentHazardTier}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-[11px]">Decision Risk Score</div>
                    <div className={`font-bold ${risk?.score >= 75 ? 'text-red-400' : risk?.score >= 55 ? 'text-amber-400' : 'text-teal-400'}`}>
                      {risk?.score ?? 'N/A'}/100 ({risk?.tier})
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectZone('ALL')}
                    className="text-xs text-slate-400 hover:text-slate-200 underline ml-2"
                  >
                    Clear Filter
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
