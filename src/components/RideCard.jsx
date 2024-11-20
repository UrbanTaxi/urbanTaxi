// src/components/RideCard.jsx
import React from 'react';

function RideCard({ pickup, dropoff, fare, status }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition mb-4">
      <h3 className="text-lg font-semibold mb-2">Ride Details</h3>
      
      {/* Ride Information */}
      <div className="text-gray-600 mb-1">
        <strong>Pickup:</strong> {pickup}
      </div>
      <div className="text-gray-600 mb-1">
        <strong>Dropoff:</strong> {dropoff}
      </div>
      <div className="text-gray-800 font-semibold mb-1">
        <strong>Fare:</strong> ${fare}
      </div>
      
      {/* Status */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
          status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export default RideCard;
