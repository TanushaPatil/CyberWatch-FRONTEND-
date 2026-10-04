import React, { useState } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  ChevronRight, 
  Globe, 
  Check, 
  CornerDownRight,
  Layers,
  Search
} from 'lucide-react';
import { QUICK_LOCATION_OPTIONS, LOCATION_HIERARCHY } from '../data/mockIncidents';

export default function LocationSelector({ 
  selectedLocation = 'world', 
  onSelectLocation,
  variant = 'dropdown' // 'dropdown' | 'explorer' | 'compact'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState({
    world: true,
    india: true,
    maharashtra: true,
    thane: true
  });

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleSelect = (locId) => {
    onSelectLocation(locId);
    setIsOpen(false);
  };

  const activeOption = QUICK_LOCATION_OPTIONS.find(
    opt => opt.id.toLowerCase() === selectedLocation.toLowerCase()
  ) || QUICK_LOCATION_OPTIONS[0];

  // Breadcrumbs path computation
  const getBreadcrumbs = (locId) => {
    const id = (locId || 'world').toLowerCase();
    if (id === 'shilgaon') return ['World', 'India', 'Maharashtra', 'Thane', 'Shilgaon'];
    if (id === 'thane') return ['World', 'India', 'Maharashtra', 'Thane'];
    if (id === 'mumbai') return ['World', 'India', 'Maharashtra', 'Mumbai'];
    if (id === 'pune') return ['World', 'India', 'Maharashtra', 'Pune'];
    if (id === 'maharashtra') return ['World', 'India', 'Maharashtra'];
    if (id === 'india') return ['World', 'India'];
    if (id === 'usa') return ['World', 'USA'];
    if (id === 'uk') return ['World', 'UK'];
    if (id === 'germany') return ['World', 'Germany'];
    if (id === 'japan') return ['World', 'Japan'];
    if (id === 'australia') return ['World', 'Australia'];
    return ['World'];
  };

  const breadcrumbs = getBreadcrumbs(selectedLocation);

  // If compact inline dropdown requested
  if (variant === 'compact') {
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-red-500/50 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
        >
          <span className="text-red-400">📍</span>
          <span>{activeOption.label}</span>
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0b111e] border border-slate-700/90 shadow-2xl z-50 py-1 overflow-hidden backdrop-blur-md">
              <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-mono-cyber uppercase text-slate-400">
                Location Hierarchy
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {QUICK_LOCATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                      selectedLocation.toLowerCase() === opt.id.toLowerCase()
                        ? 'bg-red-500/20 text-red-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{opt.flag}</span>
                      <span className={opt.level === 'locality' ? 'pl-2 text-slate-300' : ''}>
                        {opt.label}
                      </span>
                    </span>
                    {selectedLocation.toLowerCase() === opt.id.toLowerCase() && (
                      <Check size={14} className="text-red-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Top Banner Control: 📍 Location: World (with breadcrumbs) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            <MapPin size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Active Intelligence Scope:</span>
              <span className="text-xs font-bold text-white font-mono-cyber px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                📍 Location: {activeOption.label}
              </span>
            </div>
            {/* Visual Hierarchy Breadcrumb: World → India → Maharashtra → Thane → Shilgaon */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400 font-mono-cyber overflow-x-auto">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  <button
                    onClick={() => handleSelect(crumb.toLowerCase())}
                    className={`hover:text-red-400 transition-colors ${
                      idx === breadcrumbs.length - 1 ? 'text-red-400 font-bold underline underline-offset-2' : 'text-slate-400'
                    }`}
                  >
                    {crumb}
                  </button>
                  {idx < breadcrumbs.length - 1 && (
                    <span className="text-slate-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Dropdown Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-all"
          >
            <Layers size={14} className="text-red-400" />
            <span>Hierarchy Explorer</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable Hierarchy Explorer Modal / Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-full max-w-md rounded-2xl bg-[#0a0f1c] border border-slate-700/90 shadow-2xl z-50 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-red-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono-cyber">
                  Geographic Hierarchy Tree
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 font-mono-cyber">
                Select node to filter
              </span>
            </div>

            {/* Tree Structure Matching Prompt Section 9 */}
            <div className="py-3 space-y-1 font-mono-cyber text-xs max-h-80 overflow-y-auto">
              {/* World Root */}
              <div>
                <button
                  onClick={() => handleSelect('world')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    selectedLocation.toLowerCase() === 'world'
                      ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/30'
                      : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>World</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Global Overview</span>
                </button>

                {/* India Branch */}
                <div className="pl-5 pt-1 space-y-1 border-l border-slate-800 ml-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleSelect('india')}
                      className={`flex-1 flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                        selectedLocation.toLowerCase() === 'india'
                          ? 'bg-red-500/20 text-red-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span>└── 🇮🇳</span>
                      <span>India</span>
                    </button>
                    <button 
                      onClick={() => toggleNode('india')}
                      className="p-1 text-slate-400 hover:text-slate-200"
                    >
                      <ChevronDown size={14} className={expandedNodes.india ? '' : '-rotate-90'} />
                    </button>
                  </div>

                  {expandedNodes.india && (
                    <div className="pl-5 pt-0.5 space-y-1 border-l border-slate-800/60 ml-2">
                      {/* Maharashtra */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleSelect('maharashtra')}
                          className={`flex-1 flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                            selectedLocation.toLowerCase() === 'maharashtra'
                              ? 'bg-red-500/20 text-red-300 font-bold'
                              : 'text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="text-slate-400">└──</span>
                          <span>Maharashtra</span>
                        </button>
                        <button 
                          onClick={() => toggleNode('maharashtra')}
                          className="p-1 text-slate-400 hover:text-slate-200"
                        >
                          <ChevronDown size={14} className={expandedNodes.maharashtra ? '' : '-rotate-90'} />
                        </button>
                      </div>

                      {expandedNodes.maharashtra && (
                        <div className="pl-5 pt-0.5 space-y-1 border-l border-slate-800/40 ml-2">
                          {/* Thane */}
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleSelect('thane')}
                              className={`flex-1 flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                                selectedLocation.toLowerCase() === 'thane'
                                  ? 'bg-red-500/20 text-red-300 font-bold'
                                  : 'text-slate-300 hover:bg-slate-800/60'
                              }`}
                            >
                              <span className="text-slate-400">└──</span>
                              <span>Thane</span>
                            </button>
                            <button 
                              onClick={() => toggleNode('thane')}
                              className="p-1 text-slate-400 hover:text-slate-200"
                            >
                              <ChevronDown size={14} className={expandedNodes.thane ? '' : '-rotate-90'} />
                            </button>
                          </div>

                          {expandedNodes.thane && (
                            <div className="pl-5 pt-0.5 space-y-1 border-l border-slate-800/30 ml-2">
                              {/* Shilgaon */}
                              <button
                                onClick={() => handleSelect('shilgaon')}
                                className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors ${
                                  selectedLocation.toLowerCase() === 'shilgaon'
                                    ? 'bg-red-500/30 text-red-300 font-bold border border-red-500/40 shadow-sm'
                                    : 'text-slate-300 hover:bg-slate-800/60'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="text-slate-400">└──</span>
                                  <span className="text-emerald-400">🎯 Shilgaon</span>
                                </span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-400">
                                  Target
                                </span>
                              </button>
                            </div>
                          )}

                          {/* Mumbai */}
                          <button
                            onClick={() => handleSelect('mumbai')}
                            className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                              selectedLocation.toLowerCase() === 'mumbai'
                                ? 'bg-red-500/20 text-red-300 font-bold'
                                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-slate-400">└──</span>
                            <span>Mumbai</span>
                          </button>
                          {/* Pune */}
                          <button
                            onClick={() => handleSelect('pune')}
                            className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors ${
                              selectedLocation.toLowerCase() === 'pune'
                                ? 'bg-red-500/20 text-red-300 font-bold'
                                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-slate-400">└──</span>
                            <span>Pune</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Other Global Countries */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest pl-2">
                      International Nodes
                    </span>
                    <div className="grid grid-cols-2 gap-1 pt-1.5">
                      {[
                        { id: 'usa', label: '🇺🇸 USA' },
                        { id: 'uk', label: '🇬🇧 UK' },
                        { id: 'germany', label: '🇩🇪 Germany' },
                        { id: 'japan', label: '🇯🇵 Japan' },
                        { id: 'singapore', label: '🇸🇬 Singapore' },
                        { id: 'australia', label: '🇦🇺 Australia' },
                      ].map(country => (
                        <button
                          key={country.id}
                          onClick={() => handleSelect(country.id)}
                          className={`px-2 py-1 rounded text-xs text-left transition-colors ${
                            selectedLocation.toLowerCase() === country.id
                              ? 'bg-red-500/20 text-red-300 font-semibold'
                              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                          }`}
                        >
                          {country.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reset Footer */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
              <span className="text-slate-400 font-mono-cyber">Selected: {activeOption.label}</span>
              <button
                onClick={() => handleSelect('world')}
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Reset to Global (World)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
