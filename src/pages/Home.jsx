import React from 'react';
import Services from '../components/Services';
import MapView from '../components/MapView'; // Import MapView
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Alle Services</h1>
      <MapView />  {/* Render the map */}
      <Services />
    </div>
  );
}

export default Home;
