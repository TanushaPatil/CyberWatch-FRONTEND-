# 🛡️ CYBERWATCH — Global Cybercrime Intelligence Dashboard

CyberWatch is a modern, responsive, military-grade cyber threat intelligence and SOC (Security Operations Center) frontend platform. It provides real-time geospatial incident mapping, hierarchical location drill-down, threat categorization, 03 October 2026 daily intelligence briefings, and trend analytics.

Built strictly with **frontend technologies** and **realistic mock JSON datasets**, cleanly architected to integrate seamlessly with a future **Python Flask API** without refactoring UI components.

---

## 🌟 Key Features

### 1. Global Cybercrime Map (Leaflet.js)
- **Zero Google Maps dependency**: Powered by Leaflet.js with high-contrast CartoDB Dark Matter tiles and OpenStreetMap layers.
- **Pulsing Cyber Markers**: Custom animated SVG beacons for **Critical** (red pulse) and **High** (orange pulse) threat levels.
- **Rich Incident Popups**: Displays Incident ID, Severity Badge, Title, Geolocation (`Shilgaon, Thane, Maharashtra`), Date (`03 October 2026`), Crime Category, and `View Incident →` trigger.
- **Map HUD & Controls**: Custom zoom controls, Reset view button, Fullscreen toggle, Tile Layer switcher, and live mouse telemetry (Latitude, Longitude, Zoom Level, EPSG projection).
- **Interactive Fly-To**: Smooth camera transitions whenever a location is selected in the hierarchy.

### 2. Location Hierarchy Explorer
Supports deep geographic drill-down matching the specification:
```text
🌍 World
 └── 🇮🇳 India
      └── Maharashtra
           └── Thane
                └── Shilgaon
```
- Selecting **Maharashtra** dynamically filters mock statistics, map markers, and feeds to Maharashtra incidents.
- Selecting **Thane** focuses exclusively on Thane district incidents.
- Selecting **Shilgaon** narrows down strictly to Shilgaon focal incidents (e.g. `INC-001: Online Financial Fraud`).
- Selecting **World** aggregates all global nodes (USA, UK, Germany, Japan, Singapore, Australia, India).

### 3. Incident Dossier Modal
- Triggered by clicking `View Incident →` on any map popup, incident feed row, or briefing card.
- Displays:
  - **Incident ID** (e.g. `INC-001`)
  - **Severity & Status** (`High`, `Investigation Ongoing`)
  - **Location Breadcrumb** (`Shilgaon, Thane, Maharashtra, India`)
  - **Reported Date** (`03 October 2026`)
  - **Official Summary**
  - **Indicators of Compromise (IOCs)** with one-click copy to clipboard
  - **Source Attribution** (`Source: Demo Cybercrime Report`) with active `Open Source` simulated access.

### 4. 5 Statistics Telemetry Cards
- **Total Incidents** (e.g. `1,284` global, dynamically scaled when drill-down is active)
- **Critical Alerts** (`48`)
- **Ransomware Strains** (`126`)
- **Data Breaches** (`214`)
- **Countries Affected** (`67`)
- Includes icons, trend velocity badges (`+12.4% this week`), and glassmorphism styling.

### 5. Multi-Vector Map Filters & Global Search
- Filter by **Location**, **Crime Type** (Financial Fraud, Ransomware, Phishing, Data Breach, Malware, DDoS, Identity Theft), **Severity** (Critical, High, Medium, Low), and **Time Window** (Today, Last 7 Days, Last 30 Days).
- Instant global search bar filtering by incident title, ID, country, state, district, and locality.

### 6. Trend Analytics (Chart.js)
- **Cybercrime by Type**: Doughnut chart analyzing category distributions.
- **Incidents by Region**: Comparative bar chart of high-volume jurisdictions.
- **7-Day Velocity**: Line chart tracking escalation trends.

### 7. Daily Cyber Briefing (03 October 2026)
- Executive threat summary and 3 mock cards:
  - **Critical**: Ransomware incident reported (Mumbai BKC)
  - **High**: Financial fraud investigation (Shilgaon, Thane)
  - **Medium**: Phishing campaign detected (Majiwada, Thane)
- Threat actor spotlights (`ShadowCrypt`, `UNK-FIN91`, `VoltMirage`) and tactical SOC hardening countermeasures.

---

## 🏗️ Project Architecture

```text
cyberwatch/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Fixed navigation with DEFCON status & profile
│   │   ├── Topbar.jsx           # Global search, date indicator (03 Oct 2026), Defcon ticker
│   │   ├── StatCard.jsx         # 5 Telemetry metrics cards with hover glow
│   │   ├── CyberMap.jsx         # Leaflet.js interactive map with custom HUD & markers
│   │   ├── MapFilters.jsx       # Location, crime type, severity, & time selectors
│   │   ├── IncidentModal.jsx    # Complete incident dossier modal
│   │   ├── LocationSelector.jsx # Geographic hierarchy tree explorer
│   │   ├── DailyBrief.jsx       # 03 Oct 2026 Daily intelligence preview
│   │   ├── TrendsCharts.jsx     # Chart.js visualization engine
│   │   ├── SettingsModal.jsx    # Flask API endpoint configuration
│   │   └── ProfileModal.jsx     # Security clearance & analyst session
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx        # Command center overview
│   │   ├── GlobalIncidents.jsx  # Filterable incident database (Table & Cards)
│   │   ├── CyberMap.jsx         # Dedicated full-viewport cyber map
│   │   ├── Trends.jsx           # In-depth threat analytics & sector impact
│   │   ├── DailyBrief.jsx       # Intelligence briefing & defense advisories
│   │   └── SavedReports.jsx     # Archived reports & custom dossier generator
│   │
│   ├── data/
│   │   └── mockIncidents.js     # Data abstraction layer & mock API simulation
│   │
│   ├── App.jsx                  # Root application router & state sync
│   ├── main.jsx                 # Entrypoint
│   └── index.css                # Dark theme, glassmorphism, & Leaflet styles
│
├── package.json
└── vite.config.js
```

---

## 🔌 Connecting to Flask API in the Future (Requirement 16)

The data abstraction layer in [src/data/mockIncidents.js](file:///C:/Users/Tanusha/.gemini/antigravity/scratch/cyberwatch/src/data/mockIncidents.js) isolates all data logic from UI components.

To integrate with a Flask backend:
1. Open [src/data/mockIncidents.js](file:///C:/Users/Tanusha/.gemini/antigravity/scratch/cyberwatch/src/data/mockIncidents.js).
2. Replace `filterIncidents()` and `getStatsForLocation()` with API calls:
```javascript
export async function fetchIncidentsFromApi(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`http://127.0.0.1:5000/api/v1/incidents?${query}`);
  return await res.json();
}
```
3. None of the React components (`CyberMap`, `Dashboard`, `IncidentModal`, etc.) require any redesign or structural changes!

---

## 🚀 Running the Project

```bash
cd C:\Users\Tanusha\.gemini\antigravity\scratch\cyberwatch
npm run dev
```

Open **`http://localhost:5173/`** in your browser.
