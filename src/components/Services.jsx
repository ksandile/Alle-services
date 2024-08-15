// src/components/Services.jsx
import React from 'react';
import CarWash from './CarWash';
import HouseCleaning from './HouseCleaning';
import GardenMaintenance from './GardenMaintenance';
import Laundry from './Laundry';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      <div className="services-row">
        <CarWash />
        <HouseCleaning />
      </div>
      <div className="services-row">
        <GardenMaintenance />
        <Laundry />
      </div>
    </div>
  );
}

export default Services;
