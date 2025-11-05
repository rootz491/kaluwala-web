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
          >
            <Popup>
              <p className="font-semibold">Kaluwala Village</p>
              <p className="text-sm text-muted-foreground">
                Click to explore the village
              </p>
            </Popup>
          </Polygon>
        )}

        {/* Village Center Marker */}
        <Marker position={center}>
          <Popup>
            <p className="font-semibold">Kaluwala Village Center</p>
            <p className="text-sm text-muted-foreground">
              Lat: {config.center.lat.toFixed(4)}, Lng:{" "}
              {config.center.lng.toFixed(4)}
            </p>
          </Popup>
        </Marker>

        {/* Points of Interest */}
        {config.pointsOfInterest &&
          config.pointsOfInterest.length > 0 &&
          config.pointsOfInterest.map((poi, index) => (
            <Marker key={index} position={[poi.lat, poi.lng]}>
              <Popup>
                <p className="font-semibold">{poi.name}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {poi.category}
                </p>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
