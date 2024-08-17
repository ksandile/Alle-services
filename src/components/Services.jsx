import React, { useState } from 'react';
import CarWash from './CarWash';
import HouseCleaning from './HouseCleaning';
import GardenMaintenance from './GardenMaintenance';
import Laundry from './Laundry';
import './Services.css';

function Services() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [recentAddresses] = useState([
    '123 Main St',
    '456 Elm St',
    '789 Maple Ave',
  ]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleRequestClick = () => {
    setShowSearchBar(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
    setSearchInput(''); // Reset search input when closing
    setRequestSubmitted(false); // Reset the request state when closing
  };

  const handleRequestSubmit = () => {
    setRequestSubmitted(true);
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
        <div className="search-bar-overlay">
          <div className="search-bar">
            <button className="close-btn" onClick={handleCloseSearchBar}>×</button>
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
            {!requestSubmitted ? (
              <button
                className="request-btn"
                onClick={handleRequestSubmit}
                disabled={!searchInput}
              >
                Request
              </button>
            ) : (
              <div className="waiting-message">
                Wait for the driver to accept your request.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
