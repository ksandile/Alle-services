import React from 'react';
import CarWash from '../components/CarWash';
import Laundry from '../components/Laundry';
import GardenMaintenance from '../components/GardenMaintenance';
import HouseCleaning from '../components/HouseCleaning';
import Subscription from '../components/Subscription';
import MapView from '../components/MapView';

function Home() {
  return (
    <div>
      <h1>Welcome to Alle Services</h1>
      <MapView />
      <CarWash />
      <Laundry />
      <GardenMaintenance />
      <HouseCleaning />
      <Subscription />
    </div>
  );
}

export default Home;
