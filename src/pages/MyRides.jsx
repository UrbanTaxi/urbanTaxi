import { useState, useEffect } from 'react';
import { FiClock, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  // Fetch rides and set up status update interval
  useEffect(() => {
    const loadRides = () => {
      const savedRides = localStorage.getItem('userRides');
      if (savedRides) {
        // Filter out any status updates for completed or cancelled rides
        const rides = JSON.parse(savedRides);
        const updatedRides = rides.map(ride => {
          if (ride.status === 'Completed' || ride.status === 'Cancelled') {
            return ride; // Keep completed/cancelled rides as is
          }
          return ride; // Allow other rides to update normally
        });
        setRides(updatedRides);
        localStorage.setItem('userRides', JSON.stringify(updatedRides));
      }
    };

    // Load initial rides
    loadRides();

    // Set up event listener for storage changes
    window.addEventListener('storage', loadRides);

    return () => {
      window.removeEventListener('storage', loadRides);
    };
  }, []);

  const handleDelete = (rideId) => {
    Swal.fire({
      title: 'Delete Ride?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRides = rides.filter(ride => ride.id !== rideId);
        setRides(updatedRides);
        localStorage.setItem('userRides', JSON.stringify(updatedRides));
        
        Swal.fire(
          'Deleted!',
          'The ride has been deleted.',
          'success'
        );
      }
    });
  };

  const handleCancel = (rideId) => {
    Swal.fire({
      title: 'Cancel Ride?',
      text: "Are you sure you want to cancel this ride?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRides = rides.map(ride => {
          if (ride.id === rideId) {
            return { 
              ...ride, 
              status: 'Cancelled',
              endTime: new Date().toLocaleString() // Add end time
            };
          }
          return ride;
        });
        setRides(updatedRides);
        localStorage.setItem('userRides', JSON.stringify(updatedRides));
        
        Swal.fire(
          'Cancelled!',
          'Your ride has been cancelled.',
          'success'
        );
      }
    });
  };

  const handleDeleteAll = () => {
    if (rides.length === 0) {
      Swal.fire({
        title: 'No Rides',
        text: 'There are no rides to delete.',
        icon: 'info'
      });
      return;
    }

    Swal.fire({
      title: 'Delete All Rides?',
      text: "This will permanently delete all your ride history. This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete all',
      cancelButtonText: 'Cancel',
      footer: `<span class="text-gray-500">This will delete ${rides.length} rides</span>`
    }).then((result) => {
      if (result.isConfirmed) {
        setRides([]);
        localStorage.setItem('userRides', JSON.stringify([]));
        
        Swal.fire(
          'Deleted!',
          'All rides have been deleted.',
          'success'
        );
      }
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Driver Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'On The Way':
        return 'bg-yellow-100 text-yellow-800';
      case 'Arriving':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Searching Driver':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/dashboard/rider')}
            className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 gap-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {rides.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full p-6 inline-block mb-4">
                <FiClock className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No rides yet
              </h2>
              <p className="text-gray-600 max-w-sm mx-auto">
                Your completed rides will appear here. Book a ride to get started!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">My Rides</h1>
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete All Rides</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {rides.map((ride) => (
                <div 
                  key={ride.id} 
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {new Date(ride.id).toLocaleString()}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          From: <span className="font-medium">{ride.pickup}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          To: <span className="font-medium">{ride.dropoff}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusStyle(ride.status)}`}>
                        {ride.status}
                      </p>
                      {/* Only show Cancel button if ride is not completed or cancelled */}
                      {ride.status !== 'Completed' && 
                       ride.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancel(ride.id)}
                          className="mt-2 text-sm text-red-500 hover:text-red-700"
                        >
                          Cancel Ride
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Middle Section - Fare and Payment Details */}
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Estimated Time</p>
                      <p className="text-sm font-medium text-gray-800">
                        {ride.estimatedTime || '15'} mins
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estimated Fare</p>
                      <p className="text-sm font-medium text-gray-800">
                        ₵{ride.estimatedFare || ride.fare}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Actual Fare</p>
                      <p className="text-sm font-medium text-gray-800">
                        ₵{ride.fare}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="text-sm font-medium text-gray-800">
                        {ride.paymentType || 'Cash'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section - Delete Button */}
                  <div className="border-t pt-3 flex justify-end">
                    <button
                      onClick={() => handleDelete(ride.id)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors px-3 py-1 rounded-md hover:bg-red-50"
                      title="Delete ride"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-sm">Delete Ride</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRides; 