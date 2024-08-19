import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';
import './MapView.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MapView() {
  const [position, setPosition] = useState(null);
  const zoom = 17;

  useEffect(() => {
    const defaultPosition = [51.505, -0.09];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error(err);
          setPosition(defaultPosition);
        }
      );
    } else {
      setPosition(defaultPosition);
    }
  }, []);

  if (!position) {
    return <div>Loading map...</div>;
  }

  const locationIcon = new L.DivIcon({
    html: '<i class="fas fa-map-marker-alt" style="font-size: 24px; color: red;"></i>',
    className: 'custom-icon',
  });

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=AIzaSyDVyOceqNs7uP_HSTymlpPLWHl-pdpHqZM`}
        />
        <Marker position={position} icon={locationIcon}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
