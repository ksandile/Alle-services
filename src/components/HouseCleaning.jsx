// src/components/HouseCleaning.jsx
import React from 'react';
import './Services.css';
import houseCleaningImage from '../assets/housecleaning.jpeg';

function HouseCleaning({ onRequestClick }) {
  return (
    <div className="service-container">
      <img src={houseCleaningImage} alt="House Cleaning" />
      <h2>House Cleaning</h2>
      <p>Request a house cleaning service.</p>
      <button onClick={onRequestClick}>Request House Cleaning</button>
    </div>
  );
}

export default HouseCleaning;
