// src/components/RideCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { User, Star, X, MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ghanaLocations } from '../data/ghanaLocations';

function RideCard({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [locations, setLocations] = useState({
    pickup: '',
    dropoff: ''
  });
  const [suggestions, setSuggestions] = useState({
    pickup: [],
    dropoff: []
  });
  const [isLoading, setIsLoading] = useState({
    pickup: false,
    dropoff: false
  });
  const [activeInput, setActiveInput] = useState(null);
  const dropdownRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const [fare, setFare] = useState({
    amount: 0,
    time: 0
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [mobileNumber, setMobileNumber] = useState('');

  // Search locations from API
  const searchLocationsAPI = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}+ghana&format=json&limit=5`
      );
      const data = await response.json();
      return data.map(item => ({
        name: item.display_name,
        source: 'api',
        coordinates: [item.lat, item.lon]
      }));
    } catch (error) {
      console.error('Error fetching API locations:', error);
      return [];
    }
  };

  // Search locations from local data
  const searchLocationsLocal = (query) => {
    return ghanaLocations
      .filter(location => 
        location.toLowerCase().includes(query.toLowerCase())
      )
      .map(location => ({
        name: location,
        source: 'local'
      }))
      .slice(0, 5);
  };

  // Combine both local and API results
  const getCombinedLocations = async (query) => {
    if (!query || query.length < 2) return [];

    setIsLoading(prev => ({ ...prev, [activeInput]: true }));

    try {
      // Get local results immediately
      const localResults = searchLocationsLocal(query);

      // Get API results
      const apiResults = await searchLocationsAPI(query);

      // Combine and remove duplicates (prefer API results for duplicates)
      const combinedResults = [...apiResults];
      
      localResults.forEach(localResult => {
        if (!apiResults.some(apiResult => 
          apiResult.name.toLowerCase() === localResult.name.toLowerCase()
        )) {
          combinedResults.push(localResult);
        }
      });

      return combinedResults.slice(0, 8); // Limit to 8 total results
    } catch (error) {
      console.error('Error getting locations:', error);
      return searchLocationsLocal(query); // Fallback to local results
    } finally {
      setIsLoading(prev => ({ ...prev, [activeInput]: false }));
    }
  };

  // Handle input change with debounce
  const handleInputChange = (type, value) => {
    setLocations(prev => ({ ...prev, [type]: value }));
    setActiveInput(type);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(async () => {
      const results = await getCombinedLocations(value);
      setSuggestions(prev => ({ ...prev, [type]: results }));
    }, 300); // 300ms debounce
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (type, suggestion) => {
    setLocations(prev => ({ ...prev, [type]: suggestion.name }));
    setSuggestions(prev => ({ ...prev, [type]: [] }));
    setActiveInput(null);
  };

  // Suggestion dropdown component
  const SuggestionsDropdown = ({ type, suggestions }) => {
    if (activeInput !== type || (!suggestions.length && !isLoading[type])) return null;

    return (
      <div 
        ref={dropdownRef}
        className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto"
      >
        {isLoading[type] ? (
          <div className="px-4 py-2 text-gray-500 text-sm">
            Searching locations...
          </div>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
              onClick={() => handleSelectSuggestion(type, suggestion)}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-700">{suggestion.name}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {suggestion.source === 'api' ? '(Maps)' : '(Local)'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-2 text-gray-500 text-sm">
            No locations found
          </div>
        )}
      </div>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveInput(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Calculate fare based on location input changes
  useEffect(() => {
    if (locations.pickup && locations.dropoff) {
      // Calculate approximate distance
      const calculateDistance = (pickup, dropoff) => {
        // This is still a simulation but more varied than before
        const pickupLength = pickup.length;
        const dropoffLength = dropoff.length;
        const randomFactor = Math.random() * 0.8 + 0.9; // Random factor between 0.8 and 1.3
        return Math.max(3, ((pickupLength + dropoffLength) * randomFactor)); // Minimum 3km
      };

      const distance = calculateDistance(locations.pickup, locations.dropoff);
      
      // Fare calculation
      const baseRate = 10.00; // Base fare in Ghana Cedis
      const perKmRate = 2.50;  // Rate per kilometer
      const calculatedFare = baseRate + (distance * perKmRate);

      // Time calculation with traffic consideration
      const calculateTime = (distance) => {
        const timeOfDay = new Date().getHours();
        let averageSpeed;
        
        // Adjust speed based on time of day (simulating traffic conditions)
        if (timeOfDay >= 7 && timeOfDay <= 9) {
          // Morning rush hour
          averageSpeed = 20;
        } else if (timeOfDay >= 16 && timeOfDay <= 18) {
          // Evening rush hour
          averageSpeed = 15;
        } else if (timeOfDay >= 22 || timeOfDay <= 5) {
          // Night time - faster speeds
          averageSpeed = 40;
        } else {
          // Normal daytime traffic
          averageSpeed = 30;
        }

        // Add some randomness to make it more realistic
        const randomDelay = Math.floor(Math.random() * 10); // 0-10 minutes random delay
        const estimatedTimeInHours = distance / averageSpeed;
        const estimatedTimeInMinutes = Math.ceil(estimatedTimeInHours * 60) + randomDelay;
        
        return estimatedTimeInMinutes;
      };

      const estimatedTime = calculateTime(distance);

      setFare({
        amount: calculatedFare.toFixed(2),
        time: estimatedTime
      });
    } else {
      setFare({
        amount: 0,
        time: 0
      });
    }
  }, [locations.pickup, locations.dropoff]);

  const handleBookRide = async () => {
    try {
      // Create new ride with actual locations from the form
      const newRide = {
        id: Date.now(),
        pickup: locations.pickup.address || locations.pickup, // Make sure we get the full address
        dropoff: locations.dropoff.address || locations.dropoff,
        fare: fare.amount,
        estimatedFare: fare.amount,
        estimatedTime: fare.time,
        status: 'Searching Driver',
        paymentType: paymentMethod,
        date: new Date().toLocaleString()
      };

      // Save to localStorage with the actual locations
      const existingRides = JSON.parse(localStorage.getItem('userRides') || '[]');
      const updatedRides = [newRide, ...existingRides];
      localStorage.setItem('userRides', JSON.stringify(updatedRides));

      // Show searching for driver dialog
      Swal.fire({
        title: 'Searching for Driver',
        html: 'Please wait while we connect you with a driver...',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      }).then(() => {
        // After driver found, update the ride status but keep locations
        const rides = JSON.parse(localStorage.getItem('userRides'));
        const updatedRides = rides.map((ride, index) => {
          if (index === 0) {
            return { ...ride, status: 'Driver Assigned' };
          }
          return ride;
        });
        localStorage.setItem('userRides', JSON.stringify(updatedRides));

        navigate('/searchingdriver');
      });

    } catch (error) {
      console.error('Booking error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Unable to book your ride. Please try again.',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Book a Ride</h3>
              <p className="text-sm text-gray-500">Enter your pickup and destination</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Available
            </span>
          </div>

          {/* Route Information with Input Fields */}
          <div className="relative pl-6 mb-6">
            {/* Vertical Line */}
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200"></div>
            
            {/* Pickup Location */}
            <div className="mb-4 relative">
              <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full border-2 border-green-500 bg-white"></div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={locations.pickup}
                  onChange={(e) => handleInputChange('pickup', e.target.value)}
                  onFocus={() => setActiveInput('pickup')}
                  placeholder="Enter pickup location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <SuggestionsDropdown type="pickup" suggestions={suggestions.pickup} />
              </div>
            </div>
            
            {/* Dropoff Location */}
            <div className="relative">
              <div className="absolute left-[-24px] top-1 w-4 h-4 rounded-full border-2 border-red-500 bg-white"></div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={locations.dropoff}
                  onChange={(e) => handleInputChange('dropoff', e.target.value)}
                  onFocus={() => setActiveInput('dropoff')}
                  placeholder="Enter destination"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <SuggestionsDropdown type="dropoff" suggestions={suggestions.dropoff} />
              </div>
            </div>
          </div>

          {/* Estimated Fare and Payment Method Section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Estimated Fare</p>
                <p className="text-xl font-semibold text-gray-800">
                ₵{fare.amount > 0 ? fare.amount : '--'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Estimated Time</p>
                <p className="text-sm font-medium text-gray-800">
                  {fare.time > 0 ? `${fare.time} mins` : '--'}
                </p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-800"
              >
                <option value="cash">Cash</option>
                <option value="mobile">Mobile Money</option>
              </select>
            </div>

            {/* Mobile Money Number Input */}
            {paymentMethod === 'mobile' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Money Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile money number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBookRide}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!locations.pickup || !locations.dropoff || (paymentMethod === 'mobile' && !mobileNumber)}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideCard;
