import React, { useState, useEffect } from 'react';
import { MapPin, Car, Navigation, Clock, CircleCheck } from 'lucide-react';

const RideInProgress = () => {
  const [rideStatus, setRideStatus] = useState({
    pickup: 'Main Street, Downtown',
    destination: '123 Tech Park Drive',
    estimatedArrival: '15 mins',
    driverName: 'John Smith',
    driverRating: 4.8,
    vehicleModel: 'Toyota Camry',
    licensePlate: 'ABC 123'
  });

  const [travelProgress, setTravelProgress] = useState({
    distanceCovered: 3.5,
    totalDistance: 12.2,
    progressPercentage: 28
  });

  const [eta, setEta] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-md mx-auto bg-black text-yellow-400 min-h-screen flex flex-col m-[5rem]">
      {/* Map Placeholder */}
      <div className="bg-yellow-600 h-64 flex items-center justify-center">
        <Navigation size={50} className="text-black" />
        <p className="ml-2 text-black">Live Route Tracking</p>
      </div>

      {/* Ride Details */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MapPin className="mr-2 text-yellow-500" />
            <div>
              <p className="text-sm">Pickup</p>
              <p className="font-bold">{rideStatus.pickup}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Car className="mr-2 text-yellow-500" />
            <div className="text-right">
              <p className="text-sm">Destination</p>
              <p className="font-bold">{rideStatus.destination}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-yellow-700 rounded-full h-2.5">
          <div 
            className="bg-yellow-400 h-2.5 rounded-full" 
            style={{width: `${travelProgress.progressPercentage}%`}}
          ></div>
        </div>

        {/* Driver & ETA Info */}
        <div className="bg-yellow-900/30 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <CircleCheck className="mr-2 text-yellow-500" />
              <p>Driver: {rideStatus.driverName}</p>
            </div>
            <p className="text-yellow-300">Rating: {rideStatus.driverRating}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="mr-2 text-yellow-500" />
              <p>ETA: {formatTime(eta)}</p>
            </div>
            <p>{rideStatus.vehicleModel} - {rideStatus.licensePlate}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-400">
            Share Trip
          </button>
          <button className="bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-400">
            Contact Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideInProgress;