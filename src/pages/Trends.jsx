import React from 'react';
import TrendsCharts from '../components/TrendsCharts';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  Activity, 
  Crosshair, 
  Flame, 
  AlertTriangle 
} from 'lucide-react';

export default function TrendsPage() {
  const topSectors = [
    { name: "Banking & Financial Services (BFSI)", count: "38%", risk: "Critical", vector: "UPI Sweeps & Core API Exploits" },
    { name: "Healthcare & Pharmaceuticals", count: "24%", risk: "Critical", vector: "LockBit & Akira Ransomware" },
    { name: "Public Governance & Municipalities", count: "16%", risk: "High", vector: "Credential Stuffing & Spear-Phishing" },
    { name: "Cloud & SaaS Providers", count: "14%", risk: "High", vector: "OAuth Session Exfiltration" },
    { name: "Critical Energy & Infrastructure", count: "8%", risk: "High", vector: "SCADA & GOOSE Protocol Probing" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span className="text-[11px] font-mono-cyber font-bold text-sky-400 uppercase tracking-widest">
              Strategic Threat Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-cyber flex items-center gap-2.5">
            <TrendingUp className="text-red-500" size={28} />
            <span>Cybercrime Trends & Forecasting</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Multi-vector statistical breakdown across global jurisdictions, threat groups, and attack surfaces.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-cyber text-slate-300">
          <Activity size={14} className="text-red-400" />
          <span>SAMPLING WINDOW: 168 HOURS</span>
        </div>
      </div>

      {/* Main Charts Section (Section 12 requirement + Full Timeline) */}
      <TrendsCharts showTimeline={true} />

      {/* Targeted Sectors Analysis Grid */}
      <div className="cyber-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Crosshair size={18} className="text-red-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
              Targeted Industrial Sectors & Exposure Surface
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono-cyber">
            Weighted Incident Impact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {topSectors.map((sector, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white line-clamp-1">
                  {sector.name}
                </span>
                <span className="text-xs font-mono-cyber font-extrabold text-red-400">
                  {sector.count}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full" 
                  style={{ width: sector.count }}
                />
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] font-mono-cyber">
                <span className="text-slate-400 truncate max-w-[180px]">{sector.vector}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                  sector.risk === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {sector.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
