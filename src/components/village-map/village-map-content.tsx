"use client";

import { MapConfig } from "@/config/map-config";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";

interface VillageMapContentProps {
  config: MapConfig;
}

// Fix Leaflet's default icon issue
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Category-specific icons from Icons8
const categoryIcons: Record<string, L.Icon> = {
  temple: L.icon({
    iconUrl:
      "https://img.icons8.com/?size=96&id=5akoLXg0WREL&format=png&color=AC2626",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  school: L.icon({
    iconUrl:
      "https://img.icons8.com/?size=96&id=sNtcuXhW2nYo&format=png&color=2563EB",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  sport: L.icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=Noxc13gYD50M&format=png&color=0000FF",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  restaurant: L.icon({
    iconUrl: "https://img.icons8.com/?size=96&id=8694&format=png&color=EA580C",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  government: L.icon({
    iconUrl: "https://img.icons8.com/?size=96&id=20996&format=png&color=7C3AED",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  hospital: L.icon({
    iconUrl: "https://img.icons8.com/?size=96&id=90920&format=png&color=EC4899",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  market: L.icon({
    iconUrl: "https://img.icons8.com/?size=96&id=8717&format=png&color=FBBF24",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  other: L.icon({
    iconUrl: "https://img.icons8.com/?size=96&id=23262&format=png&color=6B7280",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};

const getMarkerIcon = (category: string): L.Icon => {
  return categoryIcons[category] || defaultIcon;
};

export default function VillageMapContent({ config }: VillageMapContentProps) {
  const center: LatLngExpression = [config.center.lat, config.center.lng];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-border shadow-md">
      <MapContainer
        center={center}
        zoom={config.zoom}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Map Tile Layer */}
        <TileLayer
          url={config.tileLayer}
          attribution={config.attribution}
          maxZoom={19}
        />

        {/* Village Boundary (if provided) */}
        {config.boundary && config.boundary.length > 0 && (
          <Polygon
            positions={config.boundary as LatLngExpression[]}
            pathOptions={{
              color: config.villageColor,
              weight: 2,
              opacity: 0.7,
              fillOpacity: 0.1,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.2 });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 0.1 });
              },
            }}
          ></Polygon>
        )}

        {/* Points of Interest */}
        {config.pointsOfInterest &&
          config.pointsOfInterest.length > 0 &&
          config.pointsOfInterest.map((poi, index) => (
            <Marker
              key={index}
              position={[poi.lat, poi.lng]}
              icon={getMarkerIcon(poi.category)}
            >
              <Popup>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold">{poi.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {poi.category}
                    </p>
                  </div>
                  {poi.name === "Kalusidh Temple" && (
                    <a
                      href="https://kaluwala.in/blog/the-legend-of-the-siddh-finding-peace-at-kalusidh-temple"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                    >
                      Read about it →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
