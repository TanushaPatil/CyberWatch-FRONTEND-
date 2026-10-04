import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import IncidentModal from './components/IncidentModal';
import SettingsModal from './components/SettingsModal';
import ProfileModal from './components/ProfileModal';

// Pages
import Dashboard from './pages/Dashboard';
import GlobalIncidents from './pages/GlobalIncidents';
import CyberMapPage from './pages/CyberMap';
import TrendsPage from './pages/Trends';
import DailyBriefPage from './pages/DailyBrief';
import SavedReportsPage from './pages/SavedReports';

// Data layer
import { filterIncidents, MOCK_INCIDENTS, MOCK_DATE } from './data/mockIncidents';
import { ShieldAlert, AlertTriangle, CheckCircle, Bell, X, ExternalLink } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Global Filter & Search State
  const [selectedLocation, setSelectedLocation] = useState('world');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapFilters, setMapFilters] = useState({
    location: 'world',
    crimeType: 'All',
    severity: 'All',
    timeRange: 'All',
  });

  // Incident Modal State
  const [selectedIncident, setSelectedIncident] = useState(null);

  // System Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Keep mapFilters.location synchronized with selectedLocation when changed
  const handleLocationChange = (newLoc) => {
    setSelectedLocation(newLoc);
    setMapFilters(prev => ({ ...prev, location: newLoc }));
  };

  const handleMapFilterChange = (newFilters) => {
    setMapFilters(newFilters);
    if (newFilters.location !== selectedLocation) {
      setSelectedLocation(newFilters.location);
    }
  };

  const handleResetFilters = () => {
    setSelectedLocation('world');
    setMapFilters({
      location: 'world',
      crimeType: 'All',
      severity: 'All',
      timeRange: 'All',
    });
    setSearchQuery('');
  };

  // Filtered dataset computed centrally
  const filteredIncidents = useMemo(() => {
    return filterIncidents({
      location: selectedLocation,
      crimeType: mapFilters.crimeType,
      severity: mapFilters.severity,
      timeRange: mapFilters.timeRange,
      query: searchQuery,
    });
  }, [selectedLocation, mapFilters, searchQuery]);

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 flex flex-col font-sans">
      {/* 1. Sidebar Navigation (Section 2 requirement) */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 2. Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <Topbar
          selectedLocation={selectedLocation}
          onLocationClick={() => {
            if (activePage !== 'map' && activePage !== 'dashboard') {
              setActivePage('map');
            }
          }}
          setIsMobileOpen={setIsMobileOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          incidentCount={filteredIncidents.length}
        />

        {/* Global Search Results Alert Bar if query active */}
        {searchQuery && (
          <div className="bg-red-950/40 border-b border-red-800/50 px-4 py-2 text-xs flex items-center justify-between text-red-300 font-mono-cyber">
            <span>
              Searching for: "<strong className="text-white">{searchQuery}</strong>" — matched {filteredIncidents.length} incident records
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white underline text-[11px]"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Dynamic Page Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <Dashboard
              selectedLocation={selectedLocation}
              setSelectedLocation={handleLocationChange}
              filteredIncidents={filteredIncidents}
              onSelectIncident={setSelectedIncident}
              onNavigatePage={setActivePage}
            />
          )}

          {activePage === 'map' && (
            <CyberMapPage
              incidents={filteredIncidents}
              selectedLocation={selectedLocation}
              setSelectedLocation={handleLocationChange}
              filters={mapFilters}
              setFilters={handleMapFilterChange}
              onResetFilters={handleResetFilters}
              onSelectIncident={setSelectedIncident}
            />
          )}

          {activePage === 'incidents' && (
            <GlobalIncidents
              incidents={filteredIncidents}
              onSelectIncident={setSelectedIncident}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activePage === 'trends' && (
            <TrendsPage />
          )}

          {activePage === 'brief' && (
            <DailyBriefPage
              onSelectIncidentById={(id) => {
                const match = MOCK_INCIDENTS.find(i => i.id === id);
                if (match) setSelectedIncident(match);
              }}
            />
          )}

          {activePage === 'saved' && (
            <SavedReportsPage
              onSelectIncidentById={(id) => {
                const match = MOCK_INCIDENTS.find(i => i.id === id);
                if (match) setSelectedIncident(match);
              }}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-[#070b13] px-6 py-4 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-bold font-mono-cyber">🛡️ CYBERWATCH</span>
            <span>— Global Cybercrime Intelligence SOC Terminal</span>
            <span className="text-slate-400">|</span>
            <span className="font-mono-cyber text-[11px]">DATE: {MOCK_DATE}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono-cyber">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              ALL SYSTEMS ONLINE
            </span>
            <span className="text-slate-400">DATA SOURCE: MOCK INTELLIGENCE FEED</span>
          </div>
        </footer>
      </div>

      {/* 3. Incident Detail Modal (Section 8 requirement) */}
      <IncidentModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />

      {/* 4. Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* 5. User Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* 6. Notification Flyout Drawer */}
      {isNotificationsOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
          <div className="fixed top-16 right-4 sm:right-8 z-50 w-80 sm:w-96 rounded-2xl bg-[#090e18] border border-slate-700 shadow-2xl p-4 space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-red-400" />
                <h4 className="text-xs font-bold text-white font-mono-cyber uppercase">
                  SOC Real-Time Alerts
                </h4>
              </div>
              <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div 
                onClick={() => {
                  setSelectedIncident(MOCK_INCIDENTS.find(i => i.id === 'INC-002'));
                  setIsNotificationsOpen(false);
                }}
                className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 hover:border-red-500/50 cursor-pointer space-y-1 transition-colors"
              >
                <div className="flex items-center justify-between font-mono-cyber text-[10px]">
                  <span className="text-red-400 font-bold">🔴 CRITICAL ALERT</span>
                  <span className="text-slate-400">10m ago</span>
                </div>
                <p className="font-semibold text-white">INC-002: Ransomware Incident in Mumbai</p>
                <p className="text-[11px] text-slate-300">LockBit variant targeting tier-1 healthcare facility.</p>
              </div>

              <div 
                onClick={() => {
                  setSelectedIncident(MOCK_INCIDENTS.find(i => i.id === 'INC-001'));
                  setIsNotificationsOpen(false);
                }}
                className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-900/40 hover:border-orange-500/50 cursor-pointer space-y-1 transition-colors"
              >
                <div className="flex items-center justify-between font-mono-cyber text-[10px]">
                  <span className="text-orange-400 font-bold">🟠 HIGH ALERT</span>
                  <span className="text-slate-400">25m ago</span>
                </div>
                <p className="font-semibold text-white">INC-001: Online Financial Fraud in Shilgaon</p>
                <p className="text-[11px] text-slate-300">Thane district cyber cell investigating UPI sweep.</p>
              </div>

              <div 
                onClick={() => {
                  setSelectedIncident(MOCK_INCIDENTS.find(i => i.id === 'INC-004'));
                  setIsNotificationsOpen(false);
                }}
                className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 cursor-pointer space-y-1 transition-colors"
              >
                <div className="flex items-center justify-between font-mono-cyber text-[10px]">
                  <span className="text-sky-400 font-bold">🔵 MITIGATED</span>
                  <span className="text-slate-400">1h ago</span>
                </div>
                <p className="font-semibold text-white">INC-004: Cloud DDoS in Bengaluru</p>
                <p className="text-[11px] text-slate-300">1.4 Tbps volumetric attack scrubbed.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
