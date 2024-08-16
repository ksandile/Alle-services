import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

// Import FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

function MapView() {
  const defaultPosition = [51.505, -0.09];
  const [position, setPosition] = useState(null); // Start with null to handle loading state
  const zoom = 13;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error(err);
          setPosition(defaultPosition); // If geolocation fails, use default position
        }
      );
    } else {
      setPosition(defaultPosition); // If geolocation is not supported, use default position
    }
  }, []);

  if (!position) {
    return <div>Loading map...</div>; // Loading state
  }

  // Create a custom DivIcon with FontAwesome
  const locationIcon = new L.DivIcon({
    html: '<i class="fas fa-map-marker-alt" style="font-size: 24px; color: red;"></i>',
    className: 'custom-icon', // Optional custom class for styling
  });

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={locationIcon}>
          <Popup>
            You are here.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
