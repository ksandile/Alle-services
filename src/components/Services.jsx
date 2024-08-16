import React, { useState } from 'react';
import CarWash from './CarWash';
import HouseCleaning from './HouseCleaning';
import GardenMaintenance from './GardenMaintenance';
import Laundry from './Laundry';
import './Services.css';

function Services() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [recentAddresses, setRecentAddresses] = useState([
    '123 Main St',
    '456 Elm St',
    '789 Maple Ave',
  ]);

  const handleRequestClick = () => {
    setShowSearchBar(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredAddresses = recentAddresses.filter((address) =>
    address.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="services-container">
      <div className="services-row">
        <CarWash onRequestClick={handleRequestClick} />
        <HouseCleaning onRequestClick={handleRequestClick} />
      </div>
      <div className="services-row">
        <GardenMaintenance onRequestClick={handleRequestClick} />
        <Laundry onRequestClick={handleRequestClick} />
      </div>

      {showSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your address..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <div className="recent-addresses">
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map((address, index) => (
                <div key={index} className="address-item">
                  {address}
                </div>
              ))
            ) : (
              <div>No recent addresses found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
