import React from 'react';
import './Services.css';
import gardenMaintenanceImage from '../assets/garden.jpg';

function GardenMaintenance({ onRequestClick }) {
  return (
    <div className="service-container">
      <img src={gardenMaintenanceImage} alt="Garden Maintenance" />
      <h2>Garden Maintenance</h2>
      <p>Request garden maintenance service.</p>
      <button onClick={onRequestClick}>Request Garden Maintenance</button>
    </div>
  );
}

export default GardenMaintenance;
