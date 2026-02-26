"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LeafletMapProps {
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
}

export default function LeafletMap({
  pickupCoords,
  dropoffCoords,
}: LeafletMapProps) {
  return (
    <MapContainer
      center={[23.8103, 90.4125]} // Default Dhaka
      style={{ zIndex: 0 }}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-64 "
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pickupCoords && (
        <Marker position={pickupCoords}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}

      {dropoffCoords && (
        <Marker position={dropoffCoords}>
          <Popup>Dropoff Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
