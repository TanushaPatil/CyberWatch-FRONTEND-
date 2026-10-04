import React, { useState } from 'react';
import { X, Settings, Server, Globe, Shield, Check, RefreshCw } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [apiUrl, setApiUrl] = useState('http://127.0.0.1:5000/api/v1');
  const [useBackendApi, setUseBackendApi] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#090e18] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <Settings size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono-cyber">
                System & API Preferences
              </h3>
              <p className="text-xs text-slate-400">
                Frontend configuration and backend bridge settings
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* Flask API Integration Preview (Addressing Requirement 16) */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white font-mono-cyber uppercase flex items-center gap-1.5">
                <Server size={14} className="text-red-400" />
                <span>Backend Connector (Flask API)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono-cyber">
                READY FOR FLASK
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              The frontend is decoupled from data. When your Python Flask API is deployed, set the endpoint below. All components consume data via the <code>mockIncidents.js</code> abstraction layer.
            </p>
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-mono-cyber text-slate-400">Flask Base URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 font-mono-cyber text-xs focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Theme & Map Engine */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="font-bold text-white font-mono-cyber uppercase flex items-center gap-1.5">
              <Globe size={14} className="text-sky-400" />
              <span>Map & Visualization Engine</span>
            </span>

            <div className="flex items-center justify-between py-1 border-b border-slate-800 text-[11px]">
              <span className="text-slate-300">Primary Map Engine</span>
              <span className="font-mono-cyber text-white">Leaflet.js + CartoDB / OSM</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-800 text-[11px]">
              <span className="text-slate-300">Chart Engine</span>
              <span className="font-mono-cyber text-white">Chart.js (Doughnut / Bar / Line)</span>
            </div>

            <div className="flex items-center justify-between py-1 text-[11px]">
              <span className="text-slate-300">Pulsing Severity Beacons</span>
              <span className="font-mono-cyber text-emerald-400 font-bold">ENABLED</span>
            </div>
          </div>

          {savedToast && (
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-center font-mono-cyber text-xs flex items-center justify-center gap-2">
              <Check size={14} /> Preferences synchronized!
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono-cyber text-slate-400">CyberWatch v2.6 Core</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs text-white font-semibold shadow-md shadow-red-950"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
