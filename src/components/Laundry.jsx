// src/components/Laundry.jsx
import React from 'react';
import './Services.css';
import laundryImage from '../assets/laundry.jpeg';

function Laundry() {
  return (
    <div className="service-container">
      <img src={laundryImage} alt="Laundry" />
      <h2>Laundry</h2>
      <p>Request a laundry service.</p>
      <button>Request Laundry</button>
    </div>
  );
}

export default Laundry;
