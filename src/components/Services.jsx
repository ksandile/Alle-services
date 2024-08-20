import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Services.css';

// Import your service components
import CarWash from './CarWash';
import HouseCleaning from './HouseCleaning';
import GardenMaintenance from './GardenMaintenance';
import Laundry from './Laundry';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASb3wPvq4cksVCM3OzLE_s74gzpwdPC1E",
  authDomain: "gggg-2164a.firebaseapp.com",
  databaseURL: "https://gggg-2164a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gggg-2164a",
  storageBucket: "gggg-2164a.appspot.com",
  messagingSenderId: "383686120816",
  appId: "1:383686120816:web:70c4d29740d9cc95322bb5",
  measurementId: "G-QL58FC4WP5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Example function to send request data to Firestore
const sendRequest = async (requestData) => {
  try {
    await addDoc(collection(firestore, 'requests'), {
      ...requestData,
      timestamp: serverTimestamp() // Ensure timestamp is added
    });
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

function Services() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('');

  // Fetch addresses from Google Maps Places API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (searchInput.length > 2) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
            params: {
              query: searchInput,
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
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

  const handleRequestClick = (serviceType) => {
    setSelectedServiceType(serviceType);
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

  const handleRequestSubmit = async () => {
    const requestData = {
      address: searchInput,
      serviceType: selectedServiceType,
      timestamp: serverTimestamp(),
    };

    await sendRequest(requestData);
    setRequestSubmitted(true);
  };

  return (
    <div className="services-container">
      <div className="services-row">
        <CarWash onRequestClick={() => handleRequestClick('Car Wash')} />
        <HouseCleaning onRequestClick={() => handleRequestClick('House Cleaning')} />
      </div>
      <div className="services-row">
        <GardenMaintenance onRequestClick={() => handleRequestClick('Garden Maintenance')} />
        <Laundry onRequestClick={() => handleRequestClick('Laundry')} />
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
