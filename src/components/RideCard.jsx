// src/components/RideCard.jsx
import React, { useState, useEffect } from 'react';
import { User, Star, X, MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function RideCard({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [locations, setLocations] = useState({
    pickup: '',
    dropoff: ''
  });
  const [fare, setFare] = useState({
    amount: 0,
    time: 0
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [mobileNumber, setMobileNumber] = useState('');

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

  const handleBooking = async () => {
    // Validate mobile money number if that payment method is selected
    if (paymentMethod === 'mobile' && !mobileNumber.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Mobile Number Required',
        text: 'Please enter your mobile money number',
        confirmButtonColor: '#EAB308'
      });
      return;
    }

    try {
      await Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: 'Looking for nearby drivers...',
        timer: 2000,
        showConfirmButton: false,
        position: 'center',
        background: '#fff',
        iconColor: '#EAB308',
      });

      onClose();
      navigate('/searchingdriver', { 
        state: { 
          pickup: locations.pickup, 
          dropoff: locations.dropoff,
          estimatedFare: fare.amount,
          paymentMethod: paymentMethod,
          mobileNumber: mobileNumber
        } 
      });
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Unable to book your ride. Please try again.',
        confirmButtonColor: '#EAB308'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md m-4 animate-fade-in">
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
                  onChange={(e) => setLocations({ ...locations, pickup: e.target.value })}
                  placeholder="Enter pickup location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
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
                  onChange={(e) => setLocations({ ...locations, dropoff: e.target.value })}
                  placeholder="Enter destination"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
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
                  {fare.time > 0 ? `₵{fare.time} mins` : '--'}
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
              onClick={handleBooking}
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
