import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Map, 
  FileText, 
  TrendingUp, 
  Radio, 
  Bookmark, 
  Settings, 
  User, 
  X,
  ChevronRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export default function Sidebar({ 
  activePage, 
  setActivePage, 
  isMobileOpen, 
  setIsMobileOpen,
  onOpenSettings,
  onOpenProfile
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'incidents', label: 'Global Incidents', icon: ShieldAlert, badge: '24 New' },
    { id: 'map', label: 'Cyber Map', icon: Map, badge: 'LIVE' },
    { id: 'trends', label: 'Trends', icon: TrendingUp, badge: null },
    { id: 'brief', label: 'Daily Brief', icon: Radio, badge: '03 Oct' },
    { id: 'saved', label: 'Saved Reports', icon: Bookmark, badge: '3' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#080d16] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center shadow-lg shadow-red-900/30 border border-red-500/30">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold tracking-wider text-base text-white font-mono-cyber">
                    CYBERWATCH
                  </h1>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono-cyber font-semibold border border-red-500/30">
                    SOC v2.6
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono-cyber tracking-widest uppercase">
                  Global Cyber Intelligence
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* System Telemetry Beacon */}
          <div className="mx-4 my-3 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-slate-300 font-medium text-[11px]">System Status</span>
            </div>
            <span className="font-mono-cyber text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              OPERATIONAL
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber">
              Intelligence Portals
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-red-500/15 text-red-400 border border-red-500/40 shadow-sm shadow-red-950/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      size={18} 
                      className={`transition-colors ${
                        isActive ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`} 
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono-cyber font-medium ${
                        item.badge === 'LIVE'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_#ef4444]" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Settings & User Profile */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070b13] space-y-1">
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Settings size={16} />
              <span>Settings & Feed API</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono-cyber">v2.6</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors group text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 font-bold text-xs">
                  AN
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#070b13]"></div>
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-red-400 transition-colors">
                  Analyst Terminal
                </div>
                <div className="text-[10px] text-slate-400 font-mono-cyber truncate">
                  CLEARANCE: LEVEL 4
                </div>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-200" />
          </button>
        </div>
      </aside>
    </>
  );
}
