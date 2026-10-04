import React from 'react';
import { 
  ShieldAlert, 
  Map, 
  Calendar, 
  ArrowRight, 
  Radio, 
  Activity, 
  ExternalLink, 
  ChevronRight,
  TrendingUp,
  Flame,
  Globe
} from 'lucide-react';
import StatCard from '../components/StatCard';
import LocationSelector from '../components/LocationSelector';
import CyberMap from '../components/CyberMap';
import TrendsCharts from '../components/TrendsCharts';
import DailyBrief from '../components/DailyBrief';
import { getStatsForLocation, MOCK_DATE } from '../data/mockIncidents';

export default function Dashboard({ 
  selectedLocation, 
  setSelectedLocation, 
  filteredIncidents, 
  onSelectIncident,
  onNavigatePage
}) {
  // Compute dynamic stats based on selected location
  const stats = getStatsForLocation(selectedLocation);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Top Section (Section 3 requirement) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-[11px] font-mono-cyber font-bold text-red-400 uppercase tracking-widest">
                SOC Threat Telemetry Engine
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Global Cybercrime Intelligence
            </h1>

            <p className="text-sm sm:text-base text-slate-300">
              Monitor reported cyber incidents across the world and explore them geographically.
            </p>
          </div>

          {/* Date Indicator (Explicit requirement: 03 October 2026) */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
              <Calendar size={16} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono-cyber uppercase block">
                Intelligence Cycle Date
              </span>
              <span className="text-sm font-bold text-white font-mono-cyber">
                {MOCK_DATE}
              </span>
            </div>
          </div>
        </div>

        {/* Location Selector Hierarchy Explorer (Section 3 & 9 requirements) */}
        <LocationSelector 
          selectedLocation={selectedLocation} 
          onSelectLocation={setSelectedLocation} 
        />
      </div>

      {/* 2. Statistics Cards (Section 4 requirement: 5 cards) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 font-mono-cyber uppercase tracking-wider">
            Active Telemetry Metrics ({selectedLocation.toUpperCase()})
          </span>
          {stats.isFiltered && (
            <button
              onClick={() => setSelectedLocation('world')}
              className="text-xs text-red-400 hover:text-red-300 font-mono-cyber underline"
            >
              Reset to Global Aggregate
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* Card 1: Total Incidents */}
          <StatCard
            type="total"
            label="Total Incidents"
            value={stats.totalIncidents}
            trend={stats.totalChange}
            subtext={stats.isFiltered ? `In ${selectedLocation}` : "Global Database"}
            onClick={() => onNavigatePage('incidents')}
          />

          {/* Card 2: Critical */}
          <StatCard
            type="critical"
            label="Critical"
            value={stats.critical}
            trend={stats.criticalChange}
            subtext="Immediate SOC Action"
            onClick={() => onNavigatePage('incidents')}
          />

          {/* Card 3: Ransomware */}
          <StatCard
            type="ransomware"
            label="Ransomware"
            value={stats.ransomware}
            trend={stats.ransomwareChange}
            subtext="Encryption Threats"
            onClick={() => onNavigatePage('incidents')}
          />

          {/* Card 4: Data Breaches */}
          <StatCard
            type="breaches"
            label="Data Breaches"
            value={stats.dataBreaches}
            trend={stats.dataBreachesChange}
            subtext="Credential Leaks"
            onClick={() => onNavigatePage('incidents')}
          />

          {/* Card 5: Countries Affected */}
          <StatCard
            type="countries"
            label="Countries Affected"
            value={stats.countriesAffected}
            trend={stats.countriesChange}
            subtext="Sovereign Jurisdictions"
            onClick={() => onNavigatePage('map')}
          />
        </div>
      </div>

      {/* 3. Cyber Map Viewport Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Map size={18} className="text-red-400" />
              <span>Interactive Threat Map View</span>
            </h2>
            <p className="text-xs text-slate-400">
              Visualizing incident coordinates for {selectedLocation} (click markers for detailed dossier)
            </p>
          </div>

          <button
            onClick={() => onNavigatePage('map')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
          >
            <span>Full Map Screen</span>
            <ArrowRight size={13} className="text-red-400" />
          </button>
        </div>

        <CyberMap
          incidents={filteredIncidents}
          selectedLocation={selectedLocation}
          onSelectIncident={onSelectIncident}
          height="460px"
          showHeading={false}
        />
      </div>

      {/* 4. Daily Cyber Brief Preview (Section 13 requirement) */}
      <DailyBrief 
        onViewAll={() => onNavigatePage('brief')}
        onSelectIncidentById={(incId) => {
          const match = filteredIncidents.find(i => i.id === incId);
          if (match) onSelectIncident(match);
          else onNavigatePage('incidents');
        }}
      />

      {/* 5. Trends Analytics Preview (Section 12 requirement: Chart.js) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-sky-400" />
              <span>Threat Intelligence Trends</span>
            </h2>
            <p className="text-xs text-slate-400">
              Breakdown by attack taxonomy and high-density geographic jurisdictions
            </p>
          </div>

          <button
            onClick={() => onNavigatePage('trends')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
          >
            <span>Detailed Analytics</span>
            <ArrowRight size={13} className="text-sky-400" />
          </button>
        </div>

        <TrendsCharts showTimeline={false} />
      </div>

      {/* 6. Recent Incident Activity Ticker & Table */}
      <div className="cyber-card p-5 sm:p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-red-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
              Recent Incidents Stream ({filteredIncidents.length})
            </h3>
          </div>

          <button
            onClick={() => onNavigatePage('incidents')}
            className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
          >
            <span>View All Global Incidents</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-mono-cyber uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Incident ID</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIncidents.slice(0, 6).map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectIncident(item)}
                >
                  <td className="py-3 px-3 font-mono-cyber font-bold text-slate-200 group-hover:text-red-400">
                    {item.id}
                  </td>
                  <td className="py-3 px-3 font-medium text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono-cyber text-[10px]">
                      {item.crimeType}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-cyber uppercase ${
                      item.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : item.severity === 'High'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : item.severity === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {item.locality ? `${item.locality}, ` : ''}{item.district}, {item.country}
                  </td>
                  <td className="py-3 px-3 font-mono-cyber text-slate-400 text-[11px]">
                    {item.date === '2026-10-03' ? '03 Oct 2026' : item.date}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1 group-hover:underline">
                      View →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
