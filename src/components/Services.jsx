import React, { useState, useEffect, useRef } from 'react';
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
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

function Services() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (showSearchBar) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
          types: ['geocode'], // Restrict to address results
          componentRestrictions: { country: 'us' } // Adjust to your country
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          setSearchInput(place.formatted_address);
        });
      };
      document.head.appendChild(script);
    }
  }, [showSearchBar]);

  const handleRequestClick = (serviceType) => {
    setSelectedServiceType(serviceType);
    setShowSearchBar(true);
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
              ref={autocompleteRef}
              type="text"
              placeholder="Enter your address..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
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
