import React from 'react';
import { 
  Radio, 
  ArrowRight, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  ChevronRight,
  AlertTriangle,
  Flame,
  FileCheck
} from 'lucide-react';
import { DAILY_BRIEF_DATA } from '../data/mockIncidents';

export default function DailyBrief({ 
  onViewAll, 
  onSelectIncidentById 
}) {
  const { date, cards, executiveSummary } = DAILY_BRIEF_DATA;

  return (
    <div className="cyber-card p-5 sm:p-6 rounded-2xl space-y-5">
      {/* Header (Section 13 requirement) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📰</span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Daily Cyber Brief
            </h3>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono-cyber font-bold animate-pulse">
              HOT BRIEF
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-xs text-slate-400 font-mono-cyber">
            <Calendar size={13} className="text-red-400" />
            <span className="text-slate-300 font-semibold">{date}</span>
            <span>•</span>
            <span>Global Intel Briefing 0800 HRS</span>
          </div>
        </div>

        {/* View Daily Brief Button (Section 13 requirement) */}
        <button
          onClick={onViewAll}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600/90 text-slate-200 hover:text-white border border-slate-700 hover:border-red-500/50 text-xs font-semibold transition-all group shadow-sm cursor-pointer"
        >
          <span>View Daily Brief</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-red-400 group-hover:text-white" />
        </button>
      </div>

      {/* Brief Executive Abstract */}
      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
        <strong className="text-red-400 font-mono-cyber text-[11px] uppercase tracking-wider block mb-1">
          Executive Telemetry Summary:
        </strong>
        {executiveSummary}
      </p>

      {/* 3 Mock Cards (Section 13 requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {cards.map((card) => {
          const isCritical = card.severity === 'Critical';
          const isHigh = card.severity === 'High';

          return (
            <div
              key={card.id}
              onClick={() => onSelectIncidentById?.(card.incidentRef)}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                isCritical
                  ? 'bg-red-950/20 hover:bg-red-950/30 border-red-900/40 hover:border-red-500/60 shadow-sm'
                  : isHigh
                  ? 'bg-orange-950/20 hover:bg-orange-950/30 border-orange-900/40 hover:border-orange-500/60'
                  : 'bg-yellow-950/15 hover:bg-yellow-950/25 border-yellow-900/40 hover:border-yellow-500/60'
              }`}
            >
              <div>
                {/* Severity Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-cyber font-bold uppercase flex items-center gap-1 ${
                    isCritical
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : isHigh
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                  }`}>
                    <span>{isCritical ? '🔴' : isHigh ? '🟠' : '🟡'}</span>
                    <span>{card.severity}</span>
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono-cyber">
                    {card.incidentRef}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                  {card.title}
                </h4>

                {/* Location */}
                <p className="text-[11px] text-slate-400 font-mono-cyber pt-1 flex items-center gap-1">
                  <span>📍</span>
                  <span className="truncate">{card.location}</span>
                </p>

                {/* Summary */}
                <p className="text-xs text-slate-300 pt-2 line-clamp-2 leading-relaxed">
                  {card.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono-cyber text-[10px]">
                  {card.tag}
                </span>
                <span className="text-red-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-medium">
                  Details <ChevronRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
