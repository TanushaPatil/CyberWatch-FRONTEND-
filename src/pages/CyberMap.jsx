import React, { useState } from 'react';
import CyberMap from '../components/CyberMap';
import MapFilters from '../components/MapFilters';
import LocationSelector from '../components/LocationSelector';
import { 
  Map as MapIcon, 
  Layers, 
  ListFilter, 
  Maximize2, 
  ChevronRight, 
  Crosshair,
  ShieldAlert,
  Compass
} from 'lucide-react';

export default function CyberMapPage({
  incidents = [],
  selectedLocation,
  setSelectedLocation,
  filters,
  setFilters,
  onResetFilters,
  onSelectIncident
}) {
  const [showIncidentDrawer, setShowIncidentDrawer] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header (Section 5 requirement) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[11px] font-mono-cyber font-bold text-red-400 uppercase tracking-widest">
              Live Geospatial Threat Visualizer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-cyber flex items-center gap-2.5">
            <MapIcon className="text-red-500" size={28} />
            <span>Global Cybercrime Map</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore reported cyber incidents by geographic location.
          </p>
        </div>

        {/* Location Selector Compact Pill */}
        <div className="flex items-center gap-2">
          <LocationSelector
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            variant="compact"
          />

          <button
            onClick={() => setShowIncidentDrawer(!showIncidentDrawer)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              showIncidentDrawer 
                ? 'bg-red-500/20 text-red-300 border-red-500/40' 
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <ListFilter size={14} />
            <span>Incident Feed ({incidents.length})</span>
          </button>
        </div>
      </div>

      {/* Multi-Dimensional Map Filters (Section 5 requirement) */}
      <MapFilters
        filters={filters}
        setFilters={setFilters}
        onResetFilters={onResetFilters}
        totalResults={incidents.length}
      />

      {/* Map + Side Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Leaflet Map Viewport */}
        <div className={`${showIncidentDrawer ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'} transition-all`}>
          <CyberMap
            incidents={incidents}
            selectedLocation={selectedLocation}
            onSelectIncident={onSelectIncident}
            height="680px"
            showHeading={false}
          />
        </div>

        {/* Incident Side Drawer / Dossier List */}
        {showIncidentDrawer && (
          <div className="lg:col-span-4 xl:col-span-3 cyber-card p-4 rounded-2xl space-y-3 h-[680px] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase font-mono-cyber flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-red-400" />
                <span>Plotted Incidents</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono-cyber">
                {incidents.length} Records
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {incidents.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No incidents match the active filters.
                </div>
              ) : (
                incidents.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => onSelectIncident(inc)}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-red-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono-cyber text-[11px] font-bold text-slate-200 group-hover:text-red-400">
                        {inc.id}
                      </span>
                      <span className={`text-[9px] font-bold font-mono-cyber px-1.5 py-0.2 rounded uppercase ${
                        inc.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400'
                          : inc.severity === 'High'
                          ? 'bg-orange-500/20 text-orange-400'
                          : inc.severity === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-sky-500/20 text-sky-400'
                      }`}>
                        {inc.severity}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-tight line-clamp-1">
                      {inc.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 font-mono-cyber">
                      <span>{inc.locality || inc.district}, {inc.country}</span>
                      <span className="text-red-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                        View →
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
