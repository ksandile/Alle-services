import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import './Services.css';

// Import your service components
import CarWash from './CarWash';
import HouseCleaning from './HouseCleaning';
import GardenMaintenance from './GardenMaintenance';
import Laundry from './Laundry';

// Replace with your Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

function Services() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Fetch addresses from Google Maps Places API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (searchInput.length > 2) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
            params: {
              query: searchInput,
              key: GOOGLE_MAPS_API_KEY
            }
          });
          const addressesList = response.data.results.map(result => result.formatted_address);
          setAddresses(addressesList);
        }
      } catch (e) {
        console.error('Error fetching addresses:', e);
      }
    };

    fetchAddresses();
  }, [searchInput]);

  // Filter addresses based on search input using Fuse.js
  useEffect(() => {
    if (searchInput) {
      const fuse = new Fuse(addresses, { includeScore: true, threshold: 0.3 });
      const result = fuse.search(searchInput).map(({ item }) => item);
      setFilteredAddresses(result);
    } else {
      setFilteredAddresses([]);
    }
  }, [searchInput, addresses]);

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
                <div>No matching addresses found.</div>
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
