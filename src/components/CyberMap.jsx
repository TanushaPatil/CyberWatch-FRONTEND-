import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Layers, 
  Compass, 
  Crosshair, 
  ShieldAlert, 
  Info,
  ChevronRight,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { QUICK_LOCATION_OPTIONS } from '../data/mockIncidents';

// Tile layer presets
const TILE_LAYERS = {
  darkMatter: {
    name: 'CartoDB Dark Matter (Tactical)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>',
    className: ''
  },
  osmDark: {
    name: 'OpenStreetMap (Cyber Inverted)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    className: 'cyber-osm-tiles'
  },
  voyagerDark: {
    name: 'CartoDB Midnight Contrast',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    className: 'cyber-osm-tiles'
  }
};

export default function CyberMap({
  incidents = [],
  selectedLocation = 'world',
  onSelectIncident,
  height = '620px',
  showHeading = true
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeTileKey, setActiveTileKey] = useState('darkMatter');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [hudCoords, setHudCoords] = useState({ lat: '19.2500', lng: '73.0500', zoom: 2 });
  const [selectedPinId, setSelectedPinId] = useState(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Find initial center & zoom
      const locMatch = QUICK_LOCATION_OPTIONS.find(
        l => l.id.toLowerCase() === selectedLocation.toLowerCase()
      ) || QUICK_LOCATION_OPTIONS[0];

      const map = L.map(mapContainerRef.current, {
        center: locMatch.center,
        zoom: locMatch.zoom,
        zoomControl: false, // We render custom HUD zoom buttons
        attributionControl: true,
        maxBounds: [[-85, -180], [85, 180]],
        minZoom: 2,
        maxZoom: 18,
      });

      // Add default tile layer
      const layerConfig = TILE_LAYERS[activeTileKey];
      const tiles = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        className: layerConfig.className,
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      tileLayerRef.current = tiles;

      // Group layer for markers
      const markerGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markerGroup;

      // Track mouse coordinates for HUD
      map.on('mousemove', (e) => {
        setHudCoords({
          lat: e.latlng.lat.toFixed(4),
          lng: e.latlng.lng.toFixed(4),
          zoom: map.getZoom()
        });
      });

      map.on('zoomend', () => {
        setHudCoords(prev => ({
          ...prev,
          zoom: map.getZoom()
        }));
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Clean up on component unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Switch Tile Layers
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const map = mapInstanceRef.current;
    map.removeLayer(tileLayerRef.current);

    const layerConfig = TILE_LAYERS[activeTileKey];
    const newTiles = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      className: layerConfig.className,
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    tileLayerRef.current = newTiles;
  }, [activeTileKey]);

  // Handle Location flyTo animation
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const locMatch = QUICK_LOCATION_OPTIONS.find(
      l => l.id.toLowerCase() === selectedLocation.toLowerCase()
    );

    if (locMatch) {
      map.flyTo(locMatch.center, locMatch.zoom, {
        duration: 1.4,
        easeLinearity: 0.25
      });
    }
  }, [selectedLocation]);

  // Render & Update Incident Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markerGroup = markersLayerRef.current;
    markerGroup.clearLayers();

    incidents.forEach((inc) => {
      if (!inc.lat || !inc.lng) return;

      const severity = inc.severity || 'Medium';
      const isCritical = severity === 'Critical';
      const isHigh = severity === 'High';
      const isMedium = severity === 'Medium';

      const color = isCritical ? '#ef4444' : isHigh ? '#f97316' : isMedium ? '#eab308' : '#38bdf8';
      const pulseClass = isCritical ? 'pulse-critical' : isHigh ? 'pulse-high' : '';

      // Custom DivIcon with cybersecurity target pin
      const customIcon = L.divIcon({
        className: 'cyber-marker-wrapper',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 cursor-pointer group" style="transform: translate(-50%, -50%);">
            <!-- Pulsing outer ring -->
            <div class="absolute inset-0 rounded-full ${pulseClass}" style="background-color: ${color}33; border: 1px solid ${color};"></div>
            <!-- Inner core beacon -->
            <div class="relative w-4 h-4 rounded-full flex items-center justify-center shadow-lg" style="background-color: ${color};">
              <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <!-- Pin label tooltip on hover -->
            <div class="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2 py-0.5 rounded bg-black/90 text-[10px] text-white whitespace-nowrap font-mono-cyber border border-slate-700 shadow-xl z-50">
              ${inc.id} | ${inc.locality || inc.district}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([inc.lat, inc.lng], { icon: customIcon });

      // Create clean popup matching Section 7 requirements
      const popupHtml = document.createElement('div');
      popupHtml.className = 'p-3.5 space-y-2.5 font-sans min-w-[220px] max-w-[260px] text-slate-200';
      popupHtml.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <span class="font-mono-cyber text-xs font-bold text-white tracking-wider">${inc.id}</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono-cyber uppercase flex items-center gap-1 ${
            isCritical
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : isHigh
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              : isMedium
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
          }">
            <span>${isCritical ? '🔴' : isHigh ? '🟠' : isMedium ? '🟡' : '🔵'}</span>
            <span>${inc.severity}</span>
          </span>
        </div>

        <div>
          <h4 class="text-xs font-bold text-white leading-snug hover:text-red-400 transition-colors">
            ${inc.title}
          </h4>
          <div class="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
            <span>📍</span>
            <span class="truncate">${inc.locality}, ${inc.district}, ${inc.state}</span>
          </div>
          <div class="flex items-center gap-1 text-[10px] text-slate-400 font-mono-cyber pt-0.5">
            <span>📅</span>
            <span>${inc.date === '2026-10-03' ? '03 October 2026' : inc.date}</span>
          </div>
        </div>

        <div class="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span class="text-slate-400">Category:</span>
          <span class="font-semibold text-slate-300 font-mono-cyber">${inc.crimeType}</span>
        </div>

        <button 
          id="btn-view-${inc.id}" 
          class="w-full mt-2 py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-950 hover:shadow-red-900/50 cursor-pointer"
        >
          <span>View Incident</span>
          <span>→</span>
        </button>
      `;

      // Attach event handler to the button inside popup
      const btn = popupHtml.querySelector(`#btn-view-${inc.id}`);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onSelectIncident) {
            onSelectIncident(inc);
          }
        });
      }

      marker.bindPopup(popupHtml, {
        closeButton: true,
        className: 'cyber-popup',
        maxWidth: 280,
      });

      marker.addTo(markerGroup);
    });
  }, [incidents, onSelectIncident]);

  // Map Controls Helpers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetMap = () => {
    if (!mapInstanceRef.current) return;
    const locMatch = QUICK_LOCATION_OPTIONS.find(
      l => l.id.toLowerCase() === selectedLocation.toLowerCase()
    ) || QUICK_LOCATION_OPTIONS[0];

    mapInstanceRef.current.flyTo(locMatch.center, locMatch.zoom, { duration: 1 });
  };

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    const el = mapContainerRef.current.parentElement;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="space-y-4">
      {/* Above the map header (Section 5 requirement) */}
      {showHeading && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono-cyber flex items-center gap-2">
              <span className="text-red-500">🛡️</span>
              <span>Global Cybercrime Map</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore reported cyber incidents by geographic location.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono-cyber">
              Target: <strong className="text-white uppercase">{selectedLocation}</strong>
            </span>
            <div className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono-cyber text-red-400">
              {incidents.length} Markers Plotted
            </div>
          </div>
        </div>
      )}

      {/* Main Map Container */}
      <div 
        className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl bg-[#070b12]"
        style={{ height }}
      >
        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Map Overlay Controls - Top Right */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Zoom Buttons */}
          <div className="flex flex-col rounded-xl bg-[#0b1220]/90 backdrop-blur-md border border-slate-700/80 overflow-hidden shadow-xl">
            <button
              onClick={handleZoomIn}
              className="p-2.5 text-slate-200 hover:text-red-400 hover:bg-slate-800/80 transition-colors border-b border-slate-800"
              title="Zoom In"
            >
              <span className="text-base font-bold leading-none">+</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2.5 text-slate-200 hover:text-red-400 hover:bg-slate-800/80 transition-colors"
              title="Zoom Out"
            >
              <span className="text-base font-bold leading-none">−</span>
            </button>
          </div>

          {/* Reset View Button */}
          <button
            onClick={handleResetMap}
            className="p-2.5 rounded-xl bg-[#0b1220]/90 backdrop-blur-md border border-slate-700/80 text-slate-200 hover:text-red-400 hover:bg-slate-800/80 transition-colors shadow-xl"
            title="Reset to Active Location"
          >
            <RotateCcw size={16} />
          </button>

          {/* Layer Selector Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="p-2.5 rounded-xl bg-[#0b1220]/90 backdrop-blur-md border border-slate-700/80 text-slate-200 hover:text-red-400 hover:bg-slate-800/80 transition-colors shadow-xl"
              title="Switch Map Layers"
            >
              <Layers size={16} />
            </button>

            {showLayerMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowLayerMenu(false)} />
                <div className="absolute right-full mr-2 top-0 w-64 rounded-xl bg-[#0a0f1c] border border-slate-700/90 shadow-2xl p-2 z-40 backdrop-blur-md text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] font-mono-cyber uppercase text-slate-400 border-b border-slate-800">
                    Tile Layers
                  </div>
                  {Object.entries(TILE_LAYERS).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTileKey(key);
                        setShowLayerMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        activeTileKey === key
                          ? 'bg-red-500/20 text-red-400 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      {config.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-[#0b1220]/90 backdrop-blur-md border border-slate-700/80 text-slate-200 hover:text-red-400 hover:bg-slate-800/80 transition-colors shadow-xl"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* Legend Overlay - Top Left */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#080d16]/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono-cyber shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-slate-300">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-slate-300">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="text-slate-300">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span className="text-slate-300">Low</span>
          </div>
        </div>

        {/* Telemetry Coordinates HUD - Bottom Left */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 sm:gap-3 px-3 py-1 rounded-lg bg-[#070b13]/90 backdrop-blur-md border border-slate-800/80 text-[10px] font-mono-cyber text-slate-400 shadow-md">
          <Crosshair size={12} className="text-red-400" />
          <span>LAT: <strong className="text-slate-200">{hudCoords.lat}°</strong></span>
          <span>LNG: <strong className="text-slate-200">{hudCoords.lng}°</strong></span>
          <span className="hidden md:inline">ZOOM: <strong className="text-slate-200">{hudCoords.zoom}</strong></span>
          <span className="hidden lg:inline text-slate-400">GRID: WGS84</span>
        </div>
      </div>
    </div>
  );
}
