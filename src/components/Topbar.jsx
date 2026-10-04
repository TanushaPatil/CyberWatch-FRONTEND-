import React from 'react';
import { 
  Menu, 
  Search, 
  Calendar, 
  MapPin, 
  Bell, 
  Activity, 
  ShieldAlert, 
  Sparkles,
  Command
} from 'lucide-react';
import { MOCK_DATE } from '../data/mockIncidents';

export default function Topbar({ 
  selectedLocation, 
  onLocationClick, 
  setIsMobileOpen, 
  searchQuery, 
  setSearchQuery,
  onOpenNotifications,
  incidentCount = 0
}) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Defcon Ticker */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-mono-cyber">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-semibold tracking-wide">THREAT LEVEL: ELEVATED</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400 text-[11px]">IOC FEED: ACTIVE</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incidents, locations, crime types (e.g. Thane, Ransomware)..."
            className="w-full pl-10 pr-12 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40 transition-all font-sans"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          ) : (
            <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono-cyber text-slate-400">
              <Command size={10} />
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Date Indicator & Location Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date Indicator (Explicit requirement from prompt: 03 October 2026) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Calendar size={14} className="text-red-400" />
          <span className="font-mono-cyber font-medium tracking-tight text-slate-200">
            {MOCK_DATE}
          </span>
        </div>

        {/* Location selector quick indicator */}
        <button
          onClick={onLocationClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-red-500/40 text-xs text-slate-200 transition-all group"
          title="Click to change location hierarchy"
        >
          <MapPin size={14} className="text-red-400 group-hover:scale-110 transition-transform" />
          <span className="text-slate-400 hidden sm:inline text-[11px]">Location:</span>
          <span className="font-semibold text-white capitalize">
            {selectedLocation || 'World'}
          </span>
        </button>

        {/* Live Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="View recent alerts"
        >
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#080d16]">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
