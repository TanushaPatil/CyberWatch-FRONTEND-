import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  ShieldAlert, 
  Clock, 
  Layers, 
  MapPin,
  ChevronDown
} from 'lucide-react';
import { CRIME_TYPES, SEVERITY_LEVELS, TIME_RANGES, QUICK_LOCATION_OPTIONS } from '../data/mockIncidents';

export default function MapFilters({
  filters,
  setFilters,
  onResetFilters,
  totalResults = 0
}) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="cyber-card p-4 rounded-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-red-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono-cyber">
            Intelligence Filters
          </h3>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono-cyber">
            {totalResults} Incidents
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors font-mono-cyber"
        >
          <RotateCcw size={12} />
          <span>Reset All</span>
        </button>
      </div>

      {/* Grid of Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Location Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1.5">
            <MapPin size={12} className="text-red-400" />
            <span>Location</span>
          </label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full appearance-none px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-red-500/60 font-sans cursor-pointer pr-8"
            >
              {QUICK_LOCATION_OPTIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.flag} {loc.label} {loc.level === 'locality' ? '(Focal Node)' : ''}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 2. Crime Type Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1.5">
            <Layers size={12} className="text-sky-400" />
            <span>Crime Type</span>
          </label>
          <div className="relative">
            <select
              value={filters.crimeType}
              onChange={(e) => handleChange('crimeType', e.target.value)}
              className="w-full appearance-none px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-sky-500/60 font-sans cursor-pointer pr-8"
            >
              {CRIME_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 3. Severity Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1.5">
            <ShieldAlert size={12} className="text-red-400" />
            <span>Severity</span>
          </label>
          <div className="relative">
            <select
              value={filters.severity}
              onChange={(e) => handleChange('severity', e.target.value)}
              className="w-full appearance-none px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-red-500/60 font-sans cursor-pointer pr-8"
            >
              {SEVERITY_LEVELS.map((sev) => (
                <option key={sev} value={sev}>
                  {sev === 'Critical' ? '🔴 Critical' : sev === 'High' ? '🟠 High' : sev === 'Medium' ? '🟡 Medium' : sev === 'Low' ? '🔵 Low' : 'All Severities'}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 4. Time Window Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1.5">
            <Clock size={12} className="text-amber-400" />
            <span>Time Window</span>
          </label>
          <div className="relative">
            <select
              value={filters.timeRange}
              onChange={(e) => handleChange('timeRange', e.target.value)}
              className="w-full appearance-none px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-amber-500/60 font-sans cursor-pointer pr-8"
            >
              {TIME_RANGES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Quick Filter Tag Badges */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
        <span className="text-[10px] text-slate-400 font-mono-cyber uppercase mr-1">Hot Targets:</span>
        {['Shilgaon', 'Thane', 'Mumbai', 'Financial Fraud', 'Ransomware'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              if (['Shilgaon', 'Thane', 'Mumbai'].includes(tag)) {
                handleChange('location', tag.toLowerCase());
              } else {
                handleChange('crimeType', tag);
              }
            }}
            className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-red-500/20 hover:text-red-300 border border-slate-700/60 text-[11px] text-slate-300 transition-colors font-mono-cyber"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
