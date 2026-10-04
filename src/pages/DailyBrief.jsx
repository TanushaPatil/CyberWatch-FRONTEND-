import React from 'react';
import { 
  Radio, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  ChevronRight,
  UserX,
  Target,
  FileCheck2,
  Lock
} from 'lucide-react';
import { DAILY_BRIEF_DATA } from '../data/mockIncidents';

export default function DailyBriefPage({ onSelectIncidentById }) {
  const { date, headline, executiveSummary, cards, threatActorsSpotlight, tacticalRecommendations } = DAILY_BRIEF_DATA;

  const downloadBrief = () => {
    const briefText = `CYBERWATCH DAILY CYBER INTELLIGENCE BRIEF\nDATE: ${date}\nHEADLINE: ${headline}\n\nEXECUTIVE SUMMARY:\n${executiveSummary}\n\nTACTICAL RECOMMENDATIONS:\n${tacticalRecommendations.join('\n- ')}\n`;
    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberWatch-DailyBrief-${date.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(a);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[11px] font-mono-cyber font-bold text-red-400 uppercase tracking-widest">
              Daily Intelligence Release // 08:00 UTC
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-cyber flex items-center gap-2.5">
            <Radio className="text-red-500" size={28} />
            <span>Daily Cyber Intelligence Brief</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Curated threat actor bulletins, tactical advisories, and active cybercrime investigations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-cyber text-slate-300">
            <Calendar size={14} className="text-red-400" />
            <span>{date}</span>
          </div>

          <button
            onClick={downloadBrief}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors shadow-md shadow-red-950"
          >
            <Download size={14} />
            <span>Export Briefing</span>
          </button>
        </div>
      </div>

      {/* Executive Headline & Abstract */}
      <div className="cyber-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono-cyber font-bold">
            TLP:AMBER
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {headline}
          </h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {executiveSummary}
        </p>
      </div>

      {/* 3 Hot Intelligence Incident Alerts */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400" />
          <span>Priority Alert Dossiers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => {
            const isCritical = card.severity === 'Critical';
            const isHigh = card.severity === 'High';

            return (
              <div
                key={card.id}
                onClick={() => onSelectIncidentById(card.incidentRef)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isCritical
                    ? 'bg-red-950/20 border-red-900/50 hover:border-red-500/70'
                    : isHigh
                    ? 'bg-orange-950/20 border-orange-900/50 hover:border-orange-500/70'
                    : 'bg-yellow-950/15 border-yellow-900/50 hover:border-yellow-500/70'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-cyber font-bold uppercase ${
                      isCritical ? 'bg-red-500/20 text-red-400' : isHigh ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {card.severity}
                    </span>
                    <span className="text-[11px] font-mono-cyber text-slate-400">
                      {card.incidentRef}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {card.title}
                  </h4>

                  <p className="text-xs text-slate-400 font-mono-cyber flex items-center gap-1">
                    <span>📍</span> {card.location}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {card.summary}
                  </p>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-200">Impact:</strong> {card.impact}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-mono-cyber">{card.tag}</span>
                  <span className="text-red-400 group-hover:translate-x-1 transition-transform font-semibold flex items-center gap-1">
                    Examine →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Threat Actor Spotlight */}
      <div className="cyber-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserX size={18} className="text-red-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
              Active Threat Actors in Focus
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono-cyber">
            Attribution Registry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {threatActorsSpotlight.map((actor, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{actor.name}</h4>
                <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  {actor.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">Origin: <strong className="text-slate-300">{actor.origin}</strong></p>
              <p className="text-xs text-slate-400">Targets: <strong className="text-slate-300">{actor.targetSectors}</strong></p>
              <div className="pt-1 text-[11px] font-mono-cyber text-slate-400 flex items-center gap-1">
                <span>Active C2:</span>
                <code className="text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded">{actor.activeC2}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tactical Recommendations */}
      <div className="cyber-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck size={18} className="text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
            Recommended Tactical SOC Countermeasures
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tacticalRecommendations.map((rec, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono-cyber font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
