"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const dropoffIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Bonaire center coordinates
const BONAIRE_CENTER: [number, number] = [12.1443, -68.2655];

interface LeafletMapProps {
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
}

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

function RouteLayer({ pickupCoords, dropoffCoords }: LeafletMapProps) {
  const map = useMap();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) {
      setRouteCoords([]);
      return;
    }

    const [pLat, pLng] = pickupCoords;
    const [dLat, dLng] = dropoffCoords;

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${pLng},${pLat};${dLng},${dLat}?overview=full&geometries=polyline`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          const decoded = decodePolyline(data.routes[0].geometry);
          setRouteCoords(decoded);

          const bounds = L.latLngBounds(decoded);
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
      })
      .catch(() => {
        // Fallback: straight line
        setRouteCoords([pickupCoords, dropoffCoords]);
      });
  }, [map, pickupCoords, dropoffCoords]);

  if (routeCoords.length === 0) return null;

  return (
    <Polyline
      positions={routeCoords}
      pathOptions={{ color: "#0ea5e9", weight: 4, opacity: 0.8 }}
    />
  );
}

function FitBounds({ pickupCoords, dropoffCoords }: LeafletMapProps) {
  const map = useMap();

  useEffect(() => {
    // Only handle single-marker or no-marker cases.
    // When both are present, RouteLayer handles fitting.
    if (pickupCoords && dropoffCoords) return;

    if (pickupCoords) {
      map.setView(pickupCoords, 14);
    } else if (dropoffCoords) {
      map.setView(dropoffCoords, 14);
    } else {
      map.setView(BONAIRE_CENTER, 12);
    }
  }, [map, pickupCoords, dropoffCoords]);

  return null;
}

export default function LeafletMap({
  pickupCoords,
  dropoffCoords,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={BONAIRE_CENTER}
      style={{ zIndex: 0 }}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-64"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} />
      <RouteLayer pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} />

      {pickupCoords && (
        <Marker position={pickupCoords} icon={pickupIcon}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}

      {dropoffCoords && (
        <Marker position={dropoffCoords} icon={dropoffIcon}>
          <Popup>Dropoff Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
