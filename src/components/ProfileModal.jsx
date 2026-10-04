import React from 'react';
import { X, User, ShieldCheck, Key, Clock, Award, Terminal } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#090e18] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={18} className="text-red-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
              Security Analyst Profile
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 border border-red-500/40 flex items-center justify-center text-white font-extrabold text-base">
              AN
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Analyst Terminal</h4>
              <p className="text-[11px] text-slate-400 font-mono-cyber">Tanusha // SOC Threat Officer</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[10px] text-emerald-400 font-mono-cyber">SESSION ACTIVE (TLS 1.3)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 font-mono-cyber">
                <ShieldCheck size={14} className="text-red-400" /> Clearance Level
              </span>
              <span className="font-bold text-red-400 font-mono-cyber">LEVEL 4 // TOP SECRET</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 font-mono-cyber">
                <Award size={14} className="text-sky-400" /> Assigned Unit
              </span>
              <span className="font-semibold text-slate-200">Global & MMR Cyber Threat Cell</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1.5 font-mono-cyber">
                <Clock size={14} className="text-amber-400" /> Shift Cycle
              </span>
              <span className="text-slate-300 font-mono-cyber">0800 - 1800 IST</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono-cyber text-slate-400 uppercase">Cryptographic Identity Hash</span>
            <code className="text-[10px] text-emerald-400 block truncate font-mono-cyber">
              ed25519:SHA256:8f4c9103...cyberwatch-auth-valid
            </code>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
