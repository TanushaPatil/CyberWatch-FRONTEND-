import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Skull, 
  Database, 
  Globe, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';

const ICON_MAP = {
  total: ShieldAlert,
  critical: AlertTriangle,
  ransomware: Skull,
  breaches: Database,
  countries: Globe,
};

const COLOR_MAP = {
  total: {
    accent: 'text-slate-200',
    iconBg: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    border: 'hover:border-slate-600',
    glow: 'rgba(148, 163, 184, 0.1)',
  },
  critical: {
    accent: 'text-red-400',
    iconBg: 'bg-red-500/15 text-red-400 border-red-500/30',
    border: 'hover:border-red-500/50',
    glow: 'rgba(239, 68, 68, 0.18)',
  },
  ransomware: {
    accent: 'text-rose-400',
    iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    border: 'hover:border-rose-500/50',
    glow: 'rgba(244, 63, 94, 0.18)',
  },
  breaches: {
    accent: 'text-sky-400',
    iconBg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    border: 'hover:border-sky-500/50',
    glow: 'rgba(56, 189, 248, 0.18)',
  },
  countries: {
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    border: 'hover:border-emerald-500/50',
    glow: 'rgba(16, 185, 129, 0.18)',
  },
};

export default function StatCard({ 
  type = 'total', 
  label, 
  value, 
  trend = '+12.4% this week',
  subtext,
  onClick
}) {
  const Icon = ICON_MAP[type] || ShieldAlert;
  const colors = COLOR_MAP[type] || COLOR_MAP.total;
  const isPositiveTrend = trend.startsWith('+') || trend.includes('new');

  return (
    <div 
      onClick={onClick}
      className={`cyber-card relative p-4 sm:p-5 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden ${colors.border}`}
      style={{
        '--card-glow': colors.glow,
      }}
    >
      {/* Subtle background glow */}
      <div 
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ backgroundColor: colors.glow }}
      />

      {/* Cyber Corner Decors */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-700/50 group-hover:border-red-500/50 transition-colors pointer-events-none" />

      {/* Header with Icon and Trend */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className={`p-2.5 rounded-lg border flex items-center justify-center transition-transform group-hover:scale-105 ${colors.iconBg}`}>
          <Icon size={18} />
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono-cyber font-medium px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
          {isPositiveTrend ? (
            <TrendingUp size={12} className={type === 'critical' ? 'text-red-400' : 'text-emerald-400'} />
          ) : (
            <TrendingDown size={12} className="text-sky-400" />
          )}
          <span className={type === 'critical' && isPositiveTrend ? 'text-red-400' : 'text-slate-300'}>
            {trend}
          </span>
        </div>
      </div>

      {/* Metric Value */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold font-mono-cyber tracking-tight text-white group-hover:text-slate-100 transition-colors">
            {value}
          </span>
          <ArrowUpRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        {/* Label */}
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </p>

        {subtext && (
          <p className="text-[10px] text-slate-400 font-mono-cyber pt-1">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
