import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  User, 
  Star, 
  Clock, 
  Car,
  ArrowLeft
} from 'lucide-react';
import Swal from 'sweetalert2';

const TrackRide = () => {
  const navigate = useNavigate();
  const [activeRide, setActiveRide] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [distance, setDistance] = useState('0.0');
  const [rideStatus, setRideStatus] = useState('in_progress');

  useEffect(() => {
    const currentRide = localStorage.getItem('currentRide');
    if (currentRide) {
      setActiveRide(JSON.parse(currentRide));
    } else {
      navigate('/dashboard/rider');
    }

    // Simulate progress updates
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
      setDistance(prev => (parseFloat(prev) + 0.1).toFixed(1));
    }, 30000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleMessageDriver = () => {
    navigate('/chat', {
      state: {
        driver: activeRide.driver,
        pickup: activeRide.pickup,
        dropoff: activeRide.dropoff,
        returnPath: '/rider/track-ride',
        estimatedFare: activeRide.estimatedFare
      }
    });
  };

  const handleBackToDashboard = () => {
    Swal.fire({
      title: 'Return to Dashboard?',
      text: "You'll still be able to track your ride from there",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#EAB308',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, go back',
      cancelButtonText: 'Stay here',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-gray-800 font-semibold',
        content: 'text-gray-600',
        confirmButton: 'rounded-lg px-4 py-2',
        cancelButton: 'rounded-lg px-4 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/dashboard/rider');
      }
    });
  };

  const handleEndRide = () => {
    Swal.fire({
      title: 'End Ride?',
      text: "Are you sure you want to end this ride?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444', // red color
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, end ride',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-gray-800 font-semibold',
        content: 'text-gray-600',
        confirmButton: 'rounded-lg px-4 py-2',
        cancelButton: 'rounded-lg px-4 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('currentRide');
        setActiveRide(null);
        navigate('/dashboard/rider');
      }
    });
  };

  if (!activeRide) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Track Ride</h1>
            {/* Back to Dashboard Button */}
            <button
              onClick={handleBackToDashboard}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-800">
                Ride in Progress
              </span>
            </div>
            <span className="text-sm text-yellow-700">
              Estimated arrival in {estimatedTime} minutes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ride Details Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Ride Status</h2>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  In Progress
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Estimated Time</span>
                  </div>
                  <span className="font-semibold text-gray-800">{estimatedTime} min</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Distance Covered</span>
                  </div>
                  <span className="font-semibold text-gray-800">{distance} km</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500 relative"
                    style={{ width: `${((15 - estimatedTime) / 15) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>

                <button
                  onClick={handleEndRide}
                  className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>End Ride</span>
                </button>
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{activeRide.driver.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">{activeRide.driver.rating}</span>
                    <span className="text-sm text-gray-500">• {activeRide.driver.carModel}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mt-1">{activeRide.driver.plateNumber}</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Call</span>
                </button>
                <button 
                  onClick={handleMessageDriver}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Message</span>
                </button>
              </div>
            </div>

            {/* Route Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Route Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800">{activeRide.pickup}</p>
                  </div>
                </div>
                
                <div className="ml-5 border-l-2 border-dashed border-gray-200 h-6"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drop-off Location</p>
                    <p className="font-medium text-gray-800">{activeRide.dropoff}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-8rem)]">
            <div className="h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <Car className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRide; 