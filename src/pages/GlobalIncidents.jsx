import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  LayoutGrid, 
  List, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { CRIME_TYPES, SEVERITY_LEVELS } from '../data/mockIncidents';

export default function GlobalIncidents({ 
  incidents = [], 
  onSelectIncident,
  searchQuery,
  setSearchQuery 
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'severity'

  // Filter incidents locally based on page-level quick selectors
  const filtered = incidents.filter((item) => {
    if (selectedType !== 'All' && item.crimeType !== selectedType) return false;
    if (selectedSeverity !== 'All' && item.severity !== selectedSeverity) return false;
    return true;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'severity') {
      const order = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return (order[b.severity] || 0) - (order[a.severity] || 0);
    }
    return new Date(b.date) - new Date(a.date);
  });

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sorted, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cyberwatch-incidents-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-[11px] font-mono-cyber font-bold text-red-400 uppercase tracking-widest">
              Live Threat Registry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-cyber flex items-center gap-2.5">
            <ShieldAlert className="text-red-500" size={28} />
            <span>Global Incident Database</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time catalog of reported cyber threats, intrusions, and security advisories.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Export JSON Button */}
          <button
            onClick={exportToJson}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
            title="Export filtered records as JSON"
          >
            <Download size={14} className="text-red-400" />
            <span>Export Feed (JSON)</span>
          </button>

          {/* Toggle Table/Grid */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md ${viewMode === 'cards' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Cards View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filter Bar */}
      <div className="cyber-card p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-cyber mr-1">
            <Filter size={13} className="text-red-400" />
            <span>Quick Filters:</span>
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            {CRIME_TYPES.filter(t => t !== 'All').map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none"
          >
            <option value="All">All Severities</option>
            {SEVERITY_LEVELS.filter(s => s !== 'All').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white focus:outline-none"
          >
            <option value="date">Sort: Most Recent</option>
            <option value="severity">Sort: Highest Severity</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono-cyber">
          Showing <strong className="text-white">{sorted.length}</strong> of {incidents.length} incidents
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {viewMode === 'table' ? (
        <div className="cyber-card rounded-2xl overflow-hidden border border-slate-800/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#090f1d] border-b border-slate-800 text-slate-400 font-mono-cyber uppercase">
                <tr>
                  <th className="py-3 px-4">Incident ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Crime Type</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Jurisdiction</th>
                  <th className="py-3 px-4">Target Sector</th>
                  <th className="py-3 px-4">Reported</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-[#080d16]/70">
                {sorted.map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => onSelectIncident(inc)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono-cyber font-bold text-slate-200 group-hover:text-red-400">
                      {inc.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white max-w-sm truncate">
                      {inc.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono-cyber text-[11px]">
                        {inc.crimeType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-cyber uppercase ${
                        inc.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : inc.severity === 'High'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : inc.severity === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      }`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {inc.locality ? `${inc.locality}, ` : ''}{inc.district}, {inc.country}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] truncate max-w-xs">
                      {inc.sector || 'General Infrastructure'}
                    </td>
                    <td className="py-3.5 px-4 font-mono-cyber text-slate-400 text-[11px]">
                      {inc.date === '2026-10-03' ? '03 Oct 2026' : inc.date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIncident(inc);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors text-[11px] font-medium"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((inc) => (
            <div
              key={inc.id}
              onClick={() => onSelectIncident(inc)}
              className="cyber-card p-5 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-cyber font-bold text-xs text-white">
                    {inc.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-cyber uppercase ${
                    inc.severity === 'Critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : inc.severity === 'High'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : inc.severity === 'Medium'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  }`}>
                    {inc.severity}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  {inc.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {inc.summary}
                </p>

                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-red-400" />
                    <span className="truncate">{inc.locality ? `${inc.locality}, ` : ''}{inc.district}, {inc.state}, {inc.country}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-cyber">
                    <span>{inc.crimeType}</span>
                    <span>{inc.date}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-emerald-400 font-mono-cyber">
                  ● {inc.status}
                </span>
                <span className="text-red-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  Dossier →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
