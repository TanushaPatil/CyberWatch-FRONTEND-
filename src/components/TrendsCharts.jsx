import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { getTrendsData } from '../data/mockIncidents';
import { PieChart, BarChart3, TrendingUp } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler
);

export default function TrendsCharts({ showTimeline = false }) {
  const trendsData = getTrendsData();

  // Dark SOC Dashboard Chart Options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#cbd5e1',
          font: { family: 'Inter', size: 11 },
          boxWidth: 12,
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: '#090e18',
        borderColor: '#ef4444',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        padding: 10,
        boxPadding: 4,
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw} incidents`
        }
      },
    },
    cutout: '68%',
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { family: 'Inter', size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#090e18',
        borderColor: '#38bdf8',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { family: 'Inter', size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#090e18',
        borderColor: '#ef4444',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#e2e8f0',
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Cybercrime by Type (Section 12 requirement) */}
        <div className="cyber-card p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <PieChart size={16} className="text-red-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
                Cybercrime by Type
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono-cyber">
              Chart.js Engine
            </span>
          </div>

          <div className="h-64 sm:h-72 relative">
            <Doughnut data={trendsData.crimeTypeDistribution} options={doughnutOptions} />
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono-cyber">
            <span>Primary Vector: <strong className="text-red-400">Financial Fraud</strong></span>
            <span>Fastest Growing: <strong className="text-amber-400">Ransomware (+15%)</strong></span>
          </div>
        </div>

        {/* Chart 2: Incidents by Region (Section 12 requirement) */}
        <div className="cyber-card p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
                Incidents by Region
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono-cyber">
              Geographic Volume
            </span>
          </div>

          <div className="h-64 sm:h-72 relative">
            <Bar data={trendsData.regionalIncidents} options={barOptions} />
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono-cyber">
            <span>Highest Density: <strong className="text-sky-400">India & USA</strong></span>
            <span>Mitigation Rate: <strong className="text-emerald-400">72.4% avg</strong></span>
          </div>
        </div>
      </div>

      {/* Optional Full Timeline for dedicated Trends Page */}
      {showTimeline && (
        <div className="cyber-card p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-red-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-cyber">
                7-Day Attack Velocity & Critical Escalation
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono-cyber">
              Rolling 168h Telemetry
            </span>
          </div>

          <div className="h-72 sm:h-80 relative">
            <Line data={trendsData.timelineData} options={lineOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
