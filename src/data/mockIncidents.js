/**
 * CyberWatch - Global Cybercrime Intelligence Platform
 * Mock Data & API Service Simulation Layer
 * 
 * NOTE FOR BACKEND INTEGRATION:
 * This file encapsulates all data fetching and mock datasets.
 * To integrate with the future Flask API, replace the helper functions 
 * (fetchIncidents, fetchStats, etc.) with standard fetch/axios calls to 
 * the Flask endpoints (e.g. /api/incidents, /api/stats, /api/briefs)
 * without modifying any React UI components.
 */

export const MOCK_DATE = "03 October 2026";
export const MOCK_DATE_ISO = "2026-10-03";

export const CRIME_TYPES = [
  "All",
  "Financial Fraud",
  "Phishing",
  "Ransomware",
  "Data Breach",
  "Malware",
  "DDoS",
  "Identity Theft",
];

export const SEVERITY_LEVELS = ["All", "Critical", "High", "Medium", "Low"];

export const TIME_RANGES = ["Today", "Last 7 Days", "Last 30 Days"];

// Realistic Mock Incidents with full telemetry
export const MOCK_INCIDENTS = [
  {
    id: "INC-001",
    title: "Online Financial Fraud",
    crimeType: "Financial Fraud",
    severity: "High",
    country: "India",
    state: "Maharashtra",
    district: "Thane",
    locality: "Shilgaon",
    lat: 19.25,
    lng: 73.05,
    date: "2026-10-03",
    status: "Investigation Ongoing",
    summary: "Authorities are investigating a reported online financial fraud incident. Further details are currently being reviewed.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-001",
    sector: "Banking & Financial Services",
    vector: "Unauthorized UPI Sweep & Social Engineering",
    threatActor: "Syndicate UNK-FIN91",
    impactScore: "7.8 / 10",
    lossEstimate: "₹24.5 Lakhs",
    iocs: ["194.26.29.112", "upi-verify-support.in", "APK: Trojan.Banker.Hydra"],
    tacticalNote: "Advisory issued to local bank branches to freeze destination mule accounts."
  },
  {
    id: "INC-002",
    title: "Ransomware Incident",
    crimeType: "Ransomware",
    severity: "Critical",
    country: "India",
    state: "Maharashtra",
    district: "Mumbai",
    locality: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    date: "2026-10-03",
    status: "Investigation Ongoing",
    summary: "Targeted LockBit variant hit a tier-1 healthcare management network in Bandra-Kurla Complex. Backup drives encrypted, medical record pipeline frozen.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-002",
    sector: "Healthcare & Pharmaceuticals",
    vector: "Compromised VPN Endpoint via CVE-2026-3841",
    threatActor: "Tracked Actor: ShadowCrypt Group",
    impactScore: "9.2 / 10",
    lossEstimate: "$1.8M Ransom Demand",
    iocs: ["45.154.255.88", "c2-sync-vault.cc", "SHA256: 7f83b165...e924"],
    tacticalNote: "CERT-In notified; IR teams air-gapped critical life support subnetworks."
  },
  {
    id: "INC-003",
    title: "Credential Stuffing on Government Portal",
    crimeType: "Phishing",
    severity: "High",
    country: "India",
    state: "Delhi",
    district: "New Delhi",
    locality: "Central Secretariat",
    lat: 28.6139,
    lng: 77.209,
    date: "2026-10-03",
    status: "Investigation Ongoing",
    summary: "Automated botnet attack attempting 450,000 credential pairs per hour against regional administrative identity services.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-003",
    sector: "Public Administration",
    vector: "Distributed Residential Proxy Spraying",
    threatActor: "Botnet Cluster 'VoltMirage'",
    impactScore: "8.1 / 10",
    lossEstimate: "Undisclosed",
    iocs: ["103.208.220.14", "login-gov-in-auth.net", "User-Agent: Mozilla/5.0 (Spoofed headless)"],
    tacticalNote: "Rate limiting throttled to 5 req/min per IP and forced mandatory 2FA."
  },
  {
    id: "INC-004",
    title: "Cloud Infrastructure DDoS Attack",
    crimeType: "DDoS",
    severity: "Critical",
    country: "India",
    state: "Karnataka",
    district: "Bengaluru",
    locality: "Electronic City",
    lat: 12.9716,
    lng: 77.5946,
    date: "2026-10-03",
    status: "Mitigated",
    summary: "1.4 Tbps volumetric SYN-flood and DNS amplification aimed at regional SaaS hyperscale cluster hosting payment processors.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-004",
    sector: "Technology & Cloud Hosting",
    vector: "NTP/Memcached Reflection Amplification",
    threatActor: "Mirai Variant (KevlarNet)",
    impactScore: "9.0 / 10",
    lossEstimate: "Estimated $420k downtime",
    iocs: ["185.220.101.4", "ntp-monlist-probe.org"],
    tacticalNote: "BGP Anycast scrubbing centers absorbed traffic; core latency stabilized."
  },
  {
    id: "INC-005",
    title: "SaaS Vendor Token Exfiltration",
    crimeType: "Data Breach",
    severity: "Critical",
    country: "USA",
    state: "California",
    district: "San Francisco",
    locality: "SoMa Tech Corridor",
    lat: 37.7749,
    lng: -122.4194,
    date: "2026-10-02",
    status: "Investigation Ongoing",
    summary: "Stolen OAuth bearer refresh tokens used to compromise internal code repositories and cloud IAM keys of enterprise collaboration vendor.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-005",
    sector: "Enterprise Software",
    vector: "Session Hijacking via Malicious Chrome Extension",
    threatActor: "UNC3944 (Scattered Spider splinter)",
    impactScore: "9.4 / 10",
    lossEstimate: "3.2M user telemetry records",
    iocs: ["195.123.245.19", "oauth-gateway-sync.io", "Token: xoxb-telemetry-dump"],
    tacticalNote: "Global revocation of all active sessions and hard rotating AWS root secrets."
  },
  {
    id: "INC-006",
    title: "High-Frequency Algorithmic Spoofing & Intrusion",
    crimeType: "Financial Fraud",
    severity: "Critical",
    country: "USA",
    state: "New York",
    district: "New York City",
    locality: "Wall Street",
    lat: 40.7128,
    lng: -74.006,
    date: "2026-10-03",
    status: "Investigation Ongoing",
    summary: "Coordinated illicit microsecond order cancellations tied to unauthorized market maker gateway bridge intrusion.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-006",
    sector: "Securities & Capital Markets",
    vector: "Kernel-level DMA exploit on co-located trading node",
    threatActor: "FIN7 Derivative Group",
    impactScore: "9.6 / 10",
    lossEstimate: "$14.2M Disputed Trades",
    iocs: ["198.51.100.24", "raw-fix-telemetry.ch", "Payload: libtrade_intercept.so"],
    tacticalNote: "SEC & CFTC forensic taskforces deployed on-site; FIX protocol gateways paused."
  },
  {
    id: "INC-007",
    title: "Banking Core API Hijack Attempt",
    crimeType: "Financial Fraud",
    severity: "High",
    country: "UK",
    state: "Greater London",
    district: "City of London",
    locality: "Bishopsgate",
    lat: 51.5074,
    lng: -0.1278,
    date: "2026-10-02",
    status: "Mitigated",
    summary: "Adversaries attempted to inject fraudulent BACS payment instructions leveraging stolen third-party contractor credentials.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-007",
    sector: "Retail & Commercial Banking",
    vector: "Broken Object Level Authorization (BOLA) CVE-2026-1192",
    threatActor: "Carbanak Residual Cells",
    impactScore: "8.4 / 10",
    lossEstimate: "£1.2M Intercepted (0 Loss)",
    iocs: ["185.193.88.12", "bacs-secure-relay.co.uk"],
    tacticalNote: "Strict API gateway schema validation enabled; impacted contractor access revoked."
  },
  {
    id: "INC-008",
    title: "Phishing Campaign Targeting Public Sector Employees",
    crimeType: "Phishing",
    severity: "Medium",
    country: "India",
    state: "Maharashtra",
    district: "Thane",
    locality: "Majiwada",
    lat: 19.2183,
    lng: 72.9781,
    date: "2026-10-02",
    status: "Investigation Ongoing",
    summary: "Deceptive emails impersonating regional municipal tax clearance notices with malicious macro-enabled PDF attachments.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-008",
    sector: "Municipal Governance",
    vector: "Spear-phishing Email with PDF Lures",
    threatActor: "Actor Group TA-505",
    impactScore: "6.2 / 10",
    lossEstimate: "18 Workstations Quarantined",
    iocs: ["103.14.120.55", "thane-tax-receipts.org", "MD5: a9182c448d...19"],
    tacticalNote: "Thane Municipal IT pushed domain-level mail filters blocking '*.xyz' attachments."
  },
  {
    id: "INC-009",
    title: "FinTech Payment Gateway Compromise",
    crimeType: "Data Breach",
    severity: "High",
    country: "India",
    state: "Maharashtra",
    district: "Mumbai",
    locality: "Andheri East",
    lat: 19.1197,
    lng: 72.8468,
    date: "2026-10-02",
    status: "Investigation Ongoing",
    summary: "Magecart style digital skimming script injected into checkout web SDK of a merchant aggregator.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-009",
    sector: "Fintech & E-Commerce",
    vector: "Software Supply Chain Tampering",
    threatActor: "Magecart Group 12",
    impactScore: "8.7 / 10",
    lossEstimate: "120,000 Card CVVs At Risk",
    iocs: ["89.208.107.11", "cdn-analytics-tracker.js.pw"],
    tacticalNote: "Content Security Policy (CSP) hash lock forced across all merchant embeds."
  },
  {
    id: "INC-010",
    title: "Health Sector Database Ransomware",
    crimeType: "Ransomware",
    severity: "High",
    country: "India",
    state: "Telangana",
    district: "Hyderabad",
    locality: "HITEC City",
    lat: 17.4474,
    lng: 78.3762,
    date: "2026-10-01",
    status: "Under Analysis",
    summary: "PostgreSQL master cluster encrypted using Akira variant. Patient appointment scheduling paralyzed.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-010",
    sector: "Healthcare Systems",
    vector: "Unpatched SonicWall VPN Appliance",
    threatActor: "Akira Ransomware Affiliate",
    impactScore: "8.3 / 10",
    lossEstimate: "350,000 Records Encrypted",
    iocs: ["193.106.191.22", "akira-leak-node3.onion"],
    tacticalNote: "Offline cold backups verified; restore procedure initiated at 45% completion."
  },
  {
    id: "INC-011",
    title: "Automotive SCADA Network Malware",
    crimeType: "Malware",
    severity: "Critical",
    country: "Germany",
    state: "Berlin",
    district: "Berlin Mitte",
    locality: "Industrial Cluster",
    lat: 52.52,
    lng: 13.405,
    date: "2026-10-01",
    status: "Investigation Ongoing",
    summary: "BlackEnergy descendant trojan detected in industrial programmable logic controllers (PLCs) controlling robotic paint booth lines.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-011",
    sector: "Advanced Manufacturing",
    vector: "Malicious Vendor USB Firmware Flashing",
    threatActor: "Sandworm Variant / APT44",
    impactScore: "9.5 / 10",
    lossEstimate: "€4.5M Factory Stoppage",
    iocs: ["185.176.27.104", "scada-firmware-patch.de", "SHA256: 4fbc...991a"],
    tacticalNote: "BSI dispatched operational technology incident team; assembly line isolated."
  },
  {
    id: "INC-012",
    title: "Cross-Border Remittance Synthetic Identity Fraud",
    crimeType: "Identity Theft",
    severity: "High",
    country: "Singapore",
    state: "Singapore",
    district: "Downtown Core",
    locality: "Marina Bay",
    lat: 1.3521,
    lng: 103.8198,
    date: "2026-10-02",
    status: "Investigation Ongoing",
    summary: "Deepfake facial biometric bypass used in conjunction with forged Singpass credentials to orchestrate laundering passes.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-012",
    sector: "Cross-Border Remittance",
    vector: "Generative AI Video Spoofing against eKYC",
    threatActor: "South-East Asian Transnational Syndicate",
    impactScore: "8.6 / 10",
    lossEstimate: "SGD 3.8M",
    iocs: ["103.111.45.9", "ekyc-bypass-engine.asia"],
    tacticalNote: "Monetary Authority of Singapore (MAS) enforced secondary human verification."
  },
  {
    id: "INC-013",
    title: "Port Terminal Logistics Ransomware",
    crimeType: "Ransomware",
    severity: "Critical",
    country: "Japan",
    state: "Tokyo",
    district: "Tokyo Port",
    locality: "Koto Ward",
    lat: 35.6762,
    lng: 139.6503,
    date: "2026-10-01",
    status: "Mitigated",
    summary: "Automated container crane scheduling operating system paralyzed. 12 container cargo vessels delayed in Tokyo Bay.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-013",
    sector: "Maritime Transportation",
    vector: "Remote Desktop Protocol (RDP) Brute Force",
    threatActor: "BlackSuit Operations",
    impactScore: "9.3 / 10",
    lossEstimate: "¥280M Logistics Backlog",
    iocs: ["91.240.118.7", "rdp-broker-gate.jp"],
    tacticalNote: "Manual crane operations deployed while redundant air-gapped system restored."
  },
  {
    id: "INC-014",
    title: "Commercial Supply Chain Ransomware",
    crimeType: "Ransomware",
    severity: "Critical",
    country: "India",
    state: "Maharashtra",
    district: "Thane",
    locality: "Wagle Estate",
    lat: 19.195,
    lng: 72.951,
    date: "2026-10-01",
    status: "Investigation Ongoing",
    summary: "ERP software server of major pharmaceutical distribution hub in Wagle Industrial Estate locked with custom ransomware.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-014",
    sector: "Logistics & Warehousing",
    vector: "Phishing lure to finance manager with weaponized spreadsheet",
    threatActor: "BianLian Affiliate",
    impactScore: "8.9 / 10",
    lossEstimate: "₹1.4 Crores",
    iocs: ["193.32.162.8", "erp-update-pack.in"],
    tacticalNote: "Thane Cyber Crime Cell retrieved partial decryption keys from c2 memory dump."
  },
  {
    id: "INC-015",
    title: "Industrial Malware Intrusion",
    crimeType: "Malware",
    severity: "High",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
    locality: "Hinjawadi",
    lat: 18.5913,
    lng: 73.7389,
    date: "2026-09-29",
    status: "Mitigated",
    summary: "Infostealer trojan (RedLine variant) exfiltrating developer SSH keys and API secrets from a high-profile IT campus.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-015",
    sector: "Information Technology",
    vector: "Compromised npm package installed during build pipeline",
    threatActor: "Lazarus Subgroup (Andariel)",
    impactScore: "7.9 / 10",
    lossEstimate: "Internal Repo Secrets",
    iocs: ["178.62.204.11", "registry-npm-mirror.top"],
    tacticalNote: "Package removed from npm registry; CI/CD token revocation completed."
  },
  {
    id: "INC-016",
    title: "Entertainment Streaming DDoS Wave",
    crimeType: "DDoS",
    severity: "Medium",
    country: "USA",
    state: "California",
    district: "Los Angeles",
    locality: "Burbank",
    lat: 34.0522,
    lng: -118.2437,
    date: "2026-09-30",
    status: "Mitigated",
    summary: "Layer-7 HTTP/2 Rapid Reset attack targeting video CDN authentication gateway during major live broadcast.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-016",
    sector: "Media & Streaming",
    vector: "CVE-2023-44487 HTTP/2 Rapid Reset",
    threatActor: "Anonymous Collective Faction",
    impactScore: "6.8 / 10",
    lossEstimate: "$150,000 SLA Penalties",
    iocs: ["194.87.139.11", "stream-flood-node.net"],
    tacticalNote: "Adaptive rate-limit rules deployed at Cloudflare edge proxies."
  },
  {
    id: "INC-017",
    title: "Semiconductor Supply Chain Firmware Tampering",
    crimeType: "Malware",
    severity: "High",
    country: "USA",
    state: "Texas",
    district: "Austin",
    locality: "Silicon Hills",
    lat: 30.2672,
    lng: -97.7431,
    date: "2026-09-28",
    status: "Under Analysis",
    summary: "Cryptographic signing server breached; signed malicious microcode updates distributed to 4,000 server motherboards.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-017",
    sector: "Hardware & Microelectronics",
    vector: "Hardware HSM side-channel extraction",
    threatActor: "APT41 (Barium)",
    impactScore: "9.7 / 10",
    lossEstimate: "$35M Recall & Patching",
    iocs: ["167.99.14.90", "firmware-sign-auth.org"],
    tacticalNote: "CISA emergency advisory issued; hardware vendors instructed to freeze auto-flash."
  },
  {
    id: "INC-018",
    title: "Parliamentary Staff Credential Harvest",
    crimeType: "Identity Theft",
    severity: "Medium",
    country: "UK",
    state: "Greater London",
    district: "Westminster",
    locality: "Whitehall",
    lat: 51.4975,
    lng: -0.1357,
    date: "2026-09-29",
    status: "Mitigated",
    summary: "Spear-phishing QR code lures posted in conference rooms leading to adversary-in-the-middle (AiTM) proxy.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-018",
    sector: "Government & Diplomacy",
    vector: "Quishing (QR Code Phishing) + Evilginx2",
    threatActor: "APT28 (Fancy Bear)",
    impactScore: "7.1 / 10",
    lossEstimate: "14 Account Compromises",
    iocs: ["185.220.100.252", "login-microsoft-auth.link"],
    tacticalNote: "FIDO2 hardware security keys mandated for all parliamentary accounts."
  },
  {
    id: "INC-019",
    title: "Financial Clearing Settlement Disruption",
    crimeType: "DDoS",
    severity: "High",
    country: "Germany",
    state: "Hesse",
    district: "Frankfurt",
    locality: "Financial Centre",
    lat: 50.1109,
    lng: 8.6821,
    date: "2026-09-27",
    status: "Mitigated",
    summary: "Coordinated volumetric attack against interbank settlement gateways coinciding with monthly Euro clearing deadlines.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-019",
    sector: "Interbank Settlement",
    vector: "SSDP & CLDAP Reflection Amplification",
    threatActor: "NoName057(16)",
    impactScore: "8.2 / 10",
    lossEstimate: "€850,000",
    iocs: ["193.29.13.120", "ddos-target-relay.ru"],
    tacticalNote: "Traffic redirected through European central scrubbing centers; 100% orders settled."
  },
  {
    id: "INC-020",
    title: "Aviation Logistics Ransomware Outage",
    crimeType: "Ransomware",
    severity: "High",
    country: "France",
    state: "Île-de-France",
    district: "Paris",
    locality: "Roissy Charles de Gaulle",
    lat: 48.8566,
    lng: 2.3522,
    date: "2026-09-30",
    status: "Investigation Ongoing",
    summary: "Air freight dispatch manifest database encrypted. Automated baggage routing transitioned to manual contingency.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-020",
    sector: "Aviation & Freight",
    vector: "Compromised third-party HVAC remote telemetry portal",
    threatActor: "Medusa Ransomware Group",
    impactScore: "8.5 / 10",
    lossEstimate: "€2.1M Delay Penalties",
    iocs: ["185.195.236.19", "medusa-publish-leak.site"],
    tacticalNote: "ANSSI lead responders isolating legacy baggage control subnets."
  },
  {
    id: "INC-021",
    title: "Diplomatic Mission Spearfishing Cascade",
    crimeType: "Phishing",
    severity: "Critical",
    country: "USA",
    state: "District of Columbia",
    district: "Washington",
    locality: "Embassy Row",
    lat: 38.9072,
    lng: -77.0369,
    date: "2026-10-01",
    status: "Investigation Ongoing",
    summary: "Diplomatic communications spoofed using stolen SPF/DKIM keys from allied embassy, delivering zero-click Windows LNK payload.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-021",
    sector: "Foreign Affairs & Defense",
    vector: "Weaponized LNK file in ISO container via spoofed diplomatic cable",
    threatActor: "APT29 (Cozy Bear)",
    impactScore: "9.8 / 10",
    lossEstimate: "Classified Telemetry",
    iocs: ["82.102.23.4", "embassy-docs-exchange.org", "SHA256: 31ee...aa09"],
    tacticalNote: "Federal civilian executive branch agencies directed to implement emergency hunt."
  },
  {
    id: "INC-022",
    title: "Telecommunications Customer Data Breach",
    crimeType: "Data Breach",
    severity: "High",
    country: "Australia",
    state: "New South Wales",
    district: "Sydney",
    locality: "Barangaroo",
    lat: -33.8688,
    lng: 151.2093,
    date: "2026-10-01",
    status: "Investigation Ongoing",
    summary: "Internal customer service database dumped onto darknet forum containing passport scans, driver licenses, and IMSI numbers.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-022",
    sector: "Telecommunications",
    vector: "Privilege Escalation via compromised Okta admin session",
    threatActor: "Tracked Broker: IntelBroker",
    impactScore: "8.9 / 10",
    lossEstimate: "4.8M Customer Records",
    iocs: ["104.244.42.1", "breached-forum-dump.to"],
    tacticalNote: "Australian Cyber Security Centre (ACSC) coordinating public breach response."
  },
  {
    id: "INC-023",
    title: "Energy Grid Gateway Probing & DDoS",
    crimeType: "DDoS",
    severity: "Medium",
    country: "Australia",
    state: "Victoria",
    district: "Melbourne",
    locality: "Docklands",
    lat: -37.8136,
    lng: 144.9631,
    date: "2026-09-28",
    status: "Mitigated",
    summary: "Substation IEC 61850 protocol gateway flooded with malformed GOOSE messages triggering safety watchdog trips.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-023",
    sector: "Critical Energy Infrastructure",
    vector: "Protocol fuzzing targeting SCADA relay controllers",
    threatActor: "Dragonfly / Energetic Bear Variant",
    impactScore: "7.5 / 10",
    lossEstimate: "No blackout occurred",
    iocs: ["185.161.248.10", "scada-telemetry-relay.net"],
    tacticalNote: "Substation perimeter firewalls switched to fail-safe airgap isolation mode."
  },
  {
    id: "INC-024",
    title: "Synthetic Identity Fraud Ring",
    crimeType: "Identity Theft",
    severity: "Low",
    country: "India",
    state: "Maharashtra",
    district: "Thane",
    locality: "Thane West",
    lat: 19.205,
    lng: 72.971,
    date: "2026-09-29",
    status: "Investigation Ongoing",
    summary: "Local ring fabricating Aadhaar biometric registrations to acquire instant credit lines from peer-to-peer lending platforms.",
    source: "Demo Cybercrime Report",
    sourceUrl: "https://cybercrime.gov.in/demo-report/INC-024",
    sector: "Micro-Finance & Lending",
    vector: "Forged Aadhaar card scans and synthetic KYC submissions",
    threatActor: "Local Syndicate Thane-W",
    impactScore: "5.1 / 10",
    lossEstimate: "₹8.5 Lakhs",
    iocs: ["103.21.244.0", "p2p-credit-portal.biz"],
    tacticalNote: "3 suspects apprehended by Thane Cyber Police; 85 fraudulent accounts frozen."
  }
];

// Location Hierarchy Data
export const LOCATION_HIERARCHY = [
  {
    id: "world",
    name: "World",
    level: "world",
    flag: "🌍",
    center: [22.0, 15.0],
    zoom: 2,
    children: [
      {
        id: "india",
        name: "India",
        level: "country",
        flag: "🇮🇳",
        center: [20.5937, 78.9629],
        zoom: 5,
        children: [
          {
            id: "maharashtra",
            name: "Maharashtra",
            level: "state",
            center: [19.7515, 75.7139],
            zoom: 7,
            children: [
              {
                id: "thane",
                name: "Thane",
                level: "district",
                center: [19.2183, 72.9781],
                zoom: 11,
                children: [
                  {
                    id: "shilgaon",
                    name: "Shilgaon",
                    level: "locality",
                    center: [19.25, 73.05],
                    zoom: 13,
                  }
                ]
              },
              {
                id: "mumbai",
                name: "Mumbai",
                level: "district",
                center: [19.076, 72.8777],
                zoom: 11,
              },
              {
                id: "pune",
                name: "Pune",
                level: "district",
                center: [18.5204, 73.8567],
                zoom: 11,
              }
            ]
          },
          {
            id: "delhi",
            name: "Delhi",
            level: "state",
            center: [28.6139, 77.209],
            zoom: 11,
          },
          {
            id: "karnataka",
            name: "Karnataka",
            level: "state",
            center: [12.9716, 77.5946],
            zoom: 7,
          },
          {
            id: "telangana",
            name: "Telangana",
            level: "state",
            center: [17.4474, 78.3762],
            zoom: 8,
          }
        ]
      },
      {
        id: "usa",
        name: "USA",
        level: "country",
        flag: "🇺🇸",
        center: [37.0902, -95.7129],
        zoom: 4,
        children: [
          {
            id: "california",
            name: "California",
            level: "state",
            center: [36.7783, -119.4179],
            zoom: 6,
          },
          {
            id: "new york",
            name: "New York",
            level: "state",
            center: [40.7128, -74.006],
            zoom: 7,
          },
          {
            id: "texas",
            name: "Texas",
            level: "state",
            center: [31.9686, -99.9018],
            zoom: 6,
          }
        ]
      },
      {
        id: "uk",
        name: "UK",
        level: "country",
        flag: "🇬🇧",
        center: [55.3781, -3.436],
        zoom: 5,
        children: [
          {
            id: "greater london",
            name: "Greater London",
            level: "state",
            center: [51.5074, -0.1278],
            zoom: 10,
          }
        ]
      },
      {
        id: "germany",
        name: "Germany",
        level: "country",
        flag: "🇩🇪",
        center: [51.1657, 10.4515],
        zoom: 6,
      },
      {
        id: "singapore",
        name: "Singapore",
        level: "country",
        flag: "🇸🇬",
        center: [1.3521, 103.8198],
        zoom: 11,
      },
      {
        id: "japan",
        name: "Japan",
        level: "country",
        flag: "🇯🇵",
        center: [36.2048, 138.2529],
        zoom: 5,
      },
      {
        id: "australia",
        name: "Australia",
        level: "country",
        flag: "🇦🇺",
        center: [-25.2744, 133.7751],
        zoom: 4,
      }
    ]
  }
];

// Flat list of selectable locations for the dropdown hierarchy requested
export const QUICK_LOCATION_OPTIONS = [
  { id: "world", label: "World", flag: "🌍", level: "world", center: [22.0, 15.0], zoom: 2 },
  { id: "india", label: "India", flag: "🇮🇳", level: "country", center: [20.5937, 78.9629], zoom: 5 },
  { id: "maharashtra", label: "Maharashtra", flag: "🇮🇳", level: "state", center: [19.7515, 75.7139], zoom: 7 },
  { id: "thane", label: "Thane", flag: "📍", level: "district", center: [19.2183, 72.9781], zoom: 11 },
  { id: "shilgaon", label: "Shilgaon", flag: "🎯", level: "locality", center: [19.25, 73.05], zoom: 14 },
  { id: "mumbai", label: "Mumbai", flag: "📍", level: "district", center: [19.076, 72.8777], zoom: 11 },
  { id: "usa", label: "USA", flag: "🇺🇸", level: "country", center: [37.0902, -95.7129], zoom: 4 },
  { id: "uk", label: "UK", flag: "🇬🇧", level: "country", center: [55.3781, -3.436], zoom: 5 },
  { id: "germany", label: "Germany", flag: "🇩🇪", level: "country", center: [51.1657, 10.4515], zoom: 6 },
  { id: "japan", label: "Japan", flag: "🇯🇵", level: "country", center: [36.2048, 138.2529], zoom: 5 },
  { id: "australia", label: "Australia", flag: "🇦🇺", level: "country", center: [-25.2744, 133.7751], zoom: 4 },
];

/**
 * Filter Incidents based on multi-dimensional filters
 */
export function filterIncidents({
  location = "world",
  crimeType = "All",
  severity = "All",
  timeRange = "All",
  query = ""
} = {}) {
  return MOCK_INCIDENTS.filter((item) => {
    // 1. Location filter
    const locLower = (location || "world").toLowerCase();
    if (locLower !== "world") {
      const matchCountry = item.country.toLowerCase() === locLower;
      const matchState = item.state.toLowerCase() === locLower;
      const matchDistrict = item.district.toLowerCase() === locLower;
      const matchLocality = item.locality.toLowerCase() === locLower;
      if (!matchCountry && !matchState && !matchDistrict && !matchLocality) {
        return false;
      }
    }

    // 2. Crime Type filter
    if (crimeType && crimeType !== "All") {
      if (item.crimeType.toLowerCase() !== crimeType.toLowerCase()) {
        return false;
      }
    }

    // 3. Severity filter
    if (severity && severity !== "All") {
      if (item.severity.toLowerCase() !== severity.toLowerCase()) {
        return false;
      }
    }

    // 4. Time Range filter (simulated logic based on date)
    if (timeRange && timeRange !== "All") {
      if (timeRange === "Today" && item.date !== "2026-10-03") {
        return false;
      }
      if (timeRange === "Last 7 Days") {
        // All demo records are within last 7 days of 2026-10-03
      }
    }

    // 5. Query Search
    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      const matchText =
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.crimeType.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.sector && item.sector.toLowerCase().includes(q)) ||
        (item.threatActor && item.threatActor.toLowerCase().includes(q));

      if (!matchText) return false;
    }

    return true;
  });
}

/**
 * Calculate dynamic statistics based on location
 */
export function getStatsForLocation(location = "world") {
  const filtered = filterIncidents({ location });
  const locLower = location.toLowerCase();

  // If World, provide the requested top-level global figures
  if (locLower === "world") {
    return {
      totalIncidents: "1,284",
      totalChange: "+12.4% this week",
      critical: "48",
      criticalChange: "+8% this week",
      ransomware: "126",
      ransomwareChange: "+15.2% this week",
      dataBreaches: "214",
      dataBreachesChange: "+4.1% this week",
      countriesAffected: "67",
      countriesChange: "+3 new countries",
      isFiltered: false,
      sampleSize: filtered.length
    };
  }

  // If filtered by location, compute counts from mock dataset
  const criticalCount = filtered.filter(i => i.severity === "Critical").length;
  const ransomwareCount = filtered.filter(i => i.crimeType === "Ransomware").length;
  const dataBreachCount = filtered.filter(i => i.crimeType === "Data Breach").length;
  const countries = new Set(filtered.map(i => i.country)).size;

  // Realistic multipliers for the specific location drilldown
  const multiplier = locLower === "india" ? 18 : (locLower === "maharashtra" ? 6 : (locLower === "thane" ? 2 : 1));

  return {
    totalIncidents: String(filtered.length * multiplier),
    totalChange: locLower === "shilgaon" ? "1 active investigation" : "+6.2% localized",
    critical: String(Math.max(criticalCount, 1)),
    criticalChange: "High alert",
    ransomware: String(ransomwareCount),
    ransomwareChange: ransomwareCount > 0 ? "Under containment" : "No active strain",
    dataBreaches: String(dataBreachCount),
    dataBreachesChange: "Audit ongoing",
    countriesAffected: String(Math.max(countries, 1)),
    countriesChange: `Focus: ${location.toUpperCase()}`,
    isFiltered: true,
    sampleSize: filtered.length
  };
}

/**
 * Trends analytics mock data for Chart.js
 */
export function getTrendsData() {
  return {
    crimeTypeDistribution: {
      labels: ["Financial Fraud", "Data Breach", "Ransomware", "Phishing", "Malware", "DDoS", "Identity Theft"],
      datasets: [
        {
          label: "Reported Incidents",
          data: [385, 214, 126, 290, 168, 76, 125],
          backgroundColor: [
            "#ef4444", // Red
            "#38bdf8", // Sky Cyan
            "#f43f5e", // Rose
            "#f59e0b", // Amber
            "#a855f7", // Purple
            "#06b6d4", // Cyan
            "#10b981", // Emerald
          ],
          borderColor: "#070b12",
          borderWidth: 2,
        }
      ]
    },
    regionalIncidents: {
      labels: ["India", "USA", "UK", "Germany", "Australia", "Singapore", "Japan"],
      datasets: [
        {
          label: "Confirmed Cyber Attacks",
          data: [412, 345, 184, 142, 98, 72, 65],
          backgroundColor: "rgba(239, 68, 68, 0.75)",
          borderColor: "#ef4444",
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: "Mitigated Threats",
          data: [290, 260, 150, 110, 80, 60, 52],
          backgroundColor: "rgba(56, 189, 248, 0.5)",
          borderColor: "#38bdf8",
          borderWidth: 1,
          borderRadius: 4,
        }
      ]
    },
    timelineData: {
      labels: ["27 Sep", "28 Sep", "29 Sep", "30 Sep", "01 Oct", "02 Oct", "03 Oct"],
      datasets: [
        {
          label: "Daily Incidents (7-Day Velocity)",
          data: [142, 165, 188, 172, 210, 235, 258],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#ef4444",
          pointBorderColor: "#ffffff",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Critical Alerts",
          data: [18, 22, 19, 24, 32, 41, 48],
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56, 189, 248, 0.08)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#38bdf8",
          pointBorderColor: "#ffffff",
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    }
  };
}

/**
 * Daily Intelligence Briefing Preview Cards & Full Brief
 */
export const DAILY_BRIEF_DATA = {
  date: "03 October 2026",
  headline: "Global Cyber Threat Intelligence Advisory — 03 Oct 2026",
  executiveSummary: "Elevated targeting of critical infrastructure, municipal IT nodes, and algorithmic financial gateways has been observed over the preceding 24-hour cycle. Ransomware affiliates continue leveraging unpatched edge devices while automated credential stuffing surges in South Asia.",
  cards: [
    {
      id: "brief-1",
      severity: "Critical",
      title: "Ransomware incident reported",
      incidentRef: "INC-002",
      location: "Mumbai (BKC), India",
      summary: "LockBit variant targeting tier-1 healthcare management server. Incident response teams have isolated critical medical databases.",
      impact: "Clinical record operations delayed; IR airgap active.",
      tag: "Ransomware / LockBit"
    },
    {
      id: "brief-2",
      severity: "High",
      title: "Financial fraud investigation",
      incidentRef: "INC-001",
      location: "Shilgaon, Thane, Maharashtra",
      summary: "Unauthorized UPI sweeping syndicate identified. State cyber police coordinating freezing orders across mule accounts.",
      impact: "Multi-point payment vectors quarantined.",
      tag: "Financial Fraud / UPI"
    },
    {
      id: "brief-3",
      severity: "Medium",
      title: "Phishing campaign detected",
      incidentRef: "INC-008",
      location: "Majiwada, Thane, India",
      summary: "Spear-phishing wave impersonating municipal tax audit forms equipped with macro-laced PDF droppers.",
      impact: "Domain email quarantine rules applied across Thane district.",
      tag: "Phishing / Macro Lure"
    }
  ],
  threatActorsSpotlight: [
    {
      name: "ShadowCrypt Group",
      origin: "Eastern Europe / Transnational",
      targetSectors: "Healthcare, Logistics, Municipalities",
      activeC2: "45.154.255.88",
      status: "High Threat Level"
    },
    {
      name: "UNK-FIN91 Syndicate",
      origin: "South Asia Regional",
      targetSectors: "Retail Banking, UPI Gateways, Microfinance",
      activeC2: "194.26.29.112",
      status: "Active Surveillance"
    },
    {
      name: "VoltMirage",
      origin: "State-Sponsored Alignment",
      targetSectors: "Civil Services, Energy Grid, Public Portals",
      activeC2: "103.208.220.14",
      status: "Elevated Priority"
    }
  ],
  tacticalRecommendations: [
    "Enforce hardware-token 2FA across all administrative SaaS & VPN entry points.",
    "Inspect perimeter firewalls for anomalous outbound UDP bursts (NTP / SSDP reflection).",
    "Deploy immediate patch for CVE-2026-3841 across all enterprise VPN gateways.",
    "Verify integrity of offline immutable backups for critical healthcare & billing records."
  ]
};

/**
 * Saved Reports Mock Data
 */
export const MOCK_SAVED_REPORTS = [
  {
    id: "REP-2026-10-A",
    title: "Thane & MMR Regional Cybercrime Vector Analysis",
    date: "03 October 2026",
    classification: "TLP:AMBER",
    author: "CyberWatch SOC Intelligence Cell",
    incidentsCovered: ["INC-001", "INC-008", "INC-014", "INC-024"],
    status: "Verified",
    size: "2.4 MB PDF",
    summary: "Comprehensive breakdown of financial fraud rings operating in Shilgaon, Majiwada, and Wagle Estate."
  },
  {
    id: "REP-2026-09-Q3",
    title: "Global Ransomware Surge — Q3 Retrospective",
    date: "30 September 2026",
    classification: "TLP:WHITE",
    author: "Global Threat Research Group",
    incidentsCovered: ["INC-002", "INC-010", "INC-013", "INC-020"],
    status: "Archived",
    size: "6.1 MB PDF",
    summary: "Quarterly review of 126 ransomware incidents, ransom demands, and critical vulnerability root causes."
  },
  {
    id: "REP-2026-09-FIN",
    title: "Financial Sector API & HFT Exploitation Brief",
    date: "28 September 2026",
    classification: "TLP:RED",
    author: "FinTech Forensic Unit",
    incidentsCovered: ["INC-006", "INC-007", "INC-009", "INC-012"],
    status: "Active Action",
    size: "3.8 MB PDF",
    summary: "Investigation into Wall Street and City of London algorithmic intrusion patterns."
  }
];
