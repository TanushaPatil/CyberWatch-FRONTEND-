import React, { useState } from 'react';
import { 
  Bookmark, 
  Download, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  ExternalLink, 
  Plus, 
  Check, 
  Share2,
  Lock,
  Layers
} from 'lucide-react';
import { MOCK_SAVED_REPORTS, MOCK_DATE } from '../data/mockIncidents';

export default function SavedReportsPage({ onSelectIncidentById }) {
  const [reports, setReports] = useState(MOCK_SAVED_REPORTS);
  const [activeReportModal, setActiveReportModal] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownload = (report) => {
    const content = `CYBERWATCH INTELLIGENCE REPORT\nID: ${report.id}\nTITLE: ${report.title}\nDATE: ${report.date}\nCLASSIFICATION: ${report.classification}\nAUTHOR: ${report.author}\n\nSUMMARY:\n${report.summary}\n\nINCIDENTS REFERENCED:\n${report.incidentsCovered.join(', ')}\n\nEND OF FILE - CYBERWATCH INTEL CORE`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}_${report.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(a);
    showToast(`Downloaded ${report.id}`);
  };

  const handleCreateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newReport = {
        id: `REP-2026-CUSTOM-${Math.floor(100 + Math.random() * 900)}`,
        title: "Ad-hoc Thane & Maharashtra Perimeter Assessment",
        date: MOCK_DATE,
        classification: "TLP:AMBER",
        author: "Analyst Terminal (Clearance Level 4)",
        incidentsCovered: ["INC-001", "INC-002", "INC-014"],
        status: "Verified",
        size: "1.8 MB PDF",
        summary: "Automated synthesis of high-risk threat vectors in Shilgaon, Thane, and Mumbai."
      };
      setReports([newReport, ...reports]);
      setIsGenerating(false);
      showToast("Generated new custom report dossier!");
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono-cyber shadow-2xl flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-mono-cyber font-bold text-emerald-400 uppercase tracking-widest">
              Archived Dossiers & Publications
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-cyber flex items-center gap-2.5">
            <Bookmark className="text-red-500" size={28} />
            <span>Saved Intelligence Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Exported forensic briefs, incident post-mortems, and periodic threat assessments.
          </p>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handleCreateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-xs font-semibold text-white transition-all shadow-lg shadow-red-950/60"
        >
          <Plus size={16} />
          <span>{isGenerating ? "Compiling Dossier..." : "Generate New Report"}</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="cyber-card p-5 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-cyber text-[11px] font-bold text-red-400">
                  {report.id}
                </span>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono-cyber font-bold ${
                  report.classification === 'TLP:RED'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : report.classification === 'TLP:AMBER'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {report.classification}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                {report.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {report.summary}
              </p>

              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400 font-mono-cyber text-[11px]">
                <div className="flex items-center justify-between">
                  <span>Author:</span>
                  <span className="text-slate-200">{report.author}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Date:</span>
                  <span className="text-slate-200">{report.date}</span>
                </div>
              </div>

              {/* Incidents Covered Tags */}
              <div className="pt-1 flex flex-wrap gap-1 items-center">
                <span className="text-[10px] text-slate-400 font-mono-cyber mr-1">Linked:</span>
                {report.incidentsCovered.map((incId) => (
                  <button
                    key={incId}
                    onClick={() => onSelectIncidentById(incId)}
                    className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-red-500/20 text-[10px] font-mono-cyber text-slate-300 hover:text-red-300 border border-slate-800"
                  >
                    {incId}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono-cyber text-[10px]">
                {report.size}
              </span>

              <button
                onClick={() => handleDownload(report)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white transition-colors text-xs font-semibold"
              >
                <Download size={13} />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
