import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Radio, 
  Terminal, 
  AlertTriangle,
  Building,
  Target,
  UserCheck
} from 'lucide-react';

export default function IncidentModal({ incident, onClose }) {
  const [copiedIoc, setCopiedIoc] = useState(null);
  const [showSourceToast, setShowSourceToast] = useState(false);

  if (!incident) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedIoc(text);
    setTimeout(() => setCopiedIoc(null), 2000);
  };

  const handleOpenSource = () => {
    setShowSourceToast(true);
    setTimeout(() => setShowSourceToast(false), 3500);
  };

  const severity = incident.severity || 'Medium';
  const isCritical = severity === 'Critical';
  const isHigh = severity === 'High';
  const isMedium = severity === 'Medium';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#090e18] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Top Accent Strip */}
        <div 
          className={`h-1.5 w-full ${
            isCritical ? 'bg-red-500' : isHigh ? 'bg-orange-500' : isMedium ? 'bg-yellow-400' : 'bg-sky-400'
          }`} 
        />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono-cyber font-bold text-white tracking-wider">
                {incident.id}
              </span>

              <span className={`px-2.5 py-0.5 rounded text-xs font-mono-cyber font-bold uppercase flex items-center gap-1.5 ${
                isCritical
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : isHigh
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : isMedium
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
              }`}>
                <span>{isCritical ? '🔴' : isHigh ? '🟠' : isMedium ? '🟡' : '🔵'}</span>
                <span>{incident.severity}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono-cyber">
                ● {incident.status || 'Investigation Ongoing'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {incident.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close modal (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Metadata Grid (Section 8 items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            {/* Location */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1">
                <MapPin size={12} className="text-red-400" />
                <span>Location</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white">
                {incident.locality ? `${incident.locality}, ` : ''}{incident.district}, {incident.state}, {incident.country}
              </p>
            </div>

            {/* Crime Type */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1">
                <ShieldAlert size={12} className="text-sky-400" />
                <span>Crime Type</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {incident.crimeType}
              </p>
            </div>

            {/* Severity */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1">
                <AlertTriangle size={12} className="text-amber-400" />
                <span>Severity</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {incident.severity}
              </p>
            </div>

            {/* Reported Date */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1">
                <Calendar size={12} className="text-emerald-400" />
                <span>Reported</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 font-mono-cyber">
                {incident.date === '2026-10-03' ? '03 October 2026' : incident.date}
              </p>
            </div>
          </div>

          {/* Incident Summary (Section 8 requirement) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono-cyber flex items-center gap-2">
              <FileText size={14} className="text-red-400" />
              <span>Incident Summary</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{incident.summary}"
            </div>
          </div>

          {/* Tactical Intelligence Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {incident.sector && (
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-mono-cyber text-[10px] uppercase flex items-center gap-1">
                  <Building size={11} className="text-slate-400" /> Target Sector
                </span>
                <p className="font-medium text-slate-200">{incident.sector}</p>
              </div>
            )}
            {incident.vector && (
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-mono-cyber text-[10px] uppercase flex items-center gap-1">
                  <Target size={11} className="text-red-400" /> Attack Vector
                </span>
                <p className="font-medium text-slate-200">{incident.vector}</p>
              </div>
            )}
            {incident.threatActor && (
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1 sm:col-span-2">
                <span className="text-slate-400 font-mono-cyber text-[10px] uppercase flex items-center gap-1">
                  <UserCheck size={11} className="text-sky-400" /> Attribution
                </span>
                <p className="font-mono-cyber text-slate-200 font-medium">{incident.threatActor}</p>
              </div>
            )}
          </div>

          {/* Indicators of Compromise (IOCs) */}
          {incident.iocs && incident.iocs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono-cyber flex items-center gap-1.5">
                <Terminal size={12} className="text-emerald-400" />
                <span>Extracted Artifacts & Indicators (IOCs)</span>
              </span>
              <div className="space-y-1.5 font-mono-cyber text-xs">
                {incident.iocs.map((ioc, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <span className="text-emerald-400 select-all">{ioc}</span>
                    <button
                      onClick={() => copyToClipboard(ioc)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="Copy IOC"
                    >
                      {copiedIoc === ioc ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Section (Section 8 requirement) */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400">Source:</span>{' '}
              <strong className="text-xs text-slate-200 font-mono-cyber">
                {incident.source || 'Demo Cybercrime Report'}
              </strong>
              <p className="text-[10px] text-slate-400">
                Classification: TLP:AMBER | Automated ingestion pipeline
              </p>
            </div>

            {/* Open Source Button */}
            <button
              onClick={handleOpenSource}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2 transition-all hover:border-red-500/40"
            >
              <ExternalLink size={14} className="text-red-400" />
              <span>Open Source</span>
            </button>
          </div>

          {/* Feedback Toast for Open Source simulation */}
          {showSourceToast && (
            <div className="p-3 rounded-lg bg-slate-900 border border-red-500/40 text-xs text-slate-300 flex items-center gap-2 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
              <span>
                <strong>Frontend Demo:</strong> Simulated secure gateway access to <code>{incident.sourceUrl || 'internal repository'}</code>. No external backend required.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono-cyber text-[11px]">
            CYBERWATCH INTEL ID: {incident.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
