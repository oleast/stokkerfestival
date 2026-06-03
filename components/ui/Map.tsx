'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default marker icon issue with bundlers
function fixMarkerIcon() {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const POSITION: [number, number] = [60.073, 11.102];

export default function Map() {
  useEffect(() => {
    fixMarkerIcon();
  }, []);

  return (
    <MapContainer
      center={POSITION}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[360px] w-full rounded-md border border-line md:h-[440px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={POSITION}>
        <Popup>
          <strong>Sørumsvegen 50, Gjerdrum</strong>
          <br />
          Stokkerfestivalen
        </Popup>
      </Marker>
    </MapContainer>
  );
}
