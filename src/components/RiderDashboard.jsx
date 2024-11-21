import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  DollarSign, 
  Car, 
  MessageSquare, 
  Phone, 
  Star, 
  Clock, 
  Navigation,
  CheckCircle 
} from 'lucide-react';
import Swal from 'sweetalert2';

const RiderDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRide, setActiveRide] = useState(null);
  const [rideStatus, setRideStatus] = useState('picking_up');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [distance, setDistance] = useState('0.0');

  useEffect(() => {
    const currentRide = localStorage.getItem('currentRide');
    if (location.state?.rideInProgress || currentRide) {
      setActiveRide(location.state?.rideDetails || JSON.parse(currentRide));
      
      // Simulate distance updates
      const distanceTimer = setInterval(() => {
        setDistance(prev => (parseFloat(prev) + 0.1).toFixed(1));
      }, 10000); // Update every 10 seconds

      // Simulate time updates
      const timeTimer = setInterval(() => {
        setEstimatedTime(prev => {
          if (prev <= 0) {
            clearInterval(timeTimer);
            handleRideComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute

      return () => {
        clearInterval(distanceTimer);
        clearInterval(timeTimer);
      };
    }
  }, [location]);

  // Enhanced ride status simulation
  useEffect(() => {
    if (activeRide) {
      const statusUpdates = [
        { status: 'picking_up', delay: 0 },
        { status: 'driver_arrived', delay: 5000 },
        { status: 'in_progress', delay: 10000 },
        { status: 'near_destination', delay: 20000 },
        { status: 'arriving', delay: 25000 }
      ];

      statusUpdates.forEach(({ status, delay }) => {
        setTimeout(() => setRideStatus(status), delay);
      });
    }
  }, [activeRide]);

  const handleRideComplete = () => {
    Swal.fire({
      title: 'Ride Completed!',
      text: 'You have reached your destination',
      icon: 'success',
      confirmButtonColor: '#EAB308',
      confirmButtonText: 'Rate Driver',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-gray-800 font-semibold',
        content: 'text-gray-600',
        confirmButton: 'rounded-lg px-4 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear ride data and navigate to rating screen
        localStorage.removeItem('currentRide');
        navigate('/rate-driver', { state: { rideDetails: activeRide } });
      }
    });
  };

  const handleMessageDriver = () => {
    navigate('/chat', { 
      state: { 
        driver: activeRide.driver,
        pickup: activeRide.pickup,
        dropoff: activeRide.dropoff,
        returnPath: '/rider/dashboard',
        estimatedFare: activeRide.estimatedFare
      } 
    });
  };

  const getRideStatusInfo = () => {
    switch(rideStatus) {
      case 'picking_up':
        return {
          label: 'Driver is heading to pickup location',
          color: 'bg-blue-100 text-blue-800',
          icon: <Car className="w-5 h-5 text-blue-600" />
        };
      case 'driver_arrived':
        return {
          label: 'Driver has arrived at pickup',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />
        };
      case 'in_progress':
        return {
          label: 'On the way to destination',
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Navigation className="w-5 h-5 text-yellow-600" />
        };
      case 'near_destination':
        return {
          label: 'Approaching destination',
          color: 'bg-purple-100 text-purple-800',
          icon: <MapPin className="w-5 h-5 text-purple-600" />
        };
      case 'arriving':
        return {
          label: 'Almost there!',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />
        };
      default:
        return {
          label: 'In Progress',
          color: 'bg-gray-100 text-gray-800',
          icon: <Car className="w-5 h-5 text-gray-600" />
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {activeRide && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            {/* Enhanced Status Banner */}
            <div className={`${getRideStatusInfo().color} rounded-xl p-4 mb-6`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getRideStatusInfo().icon}
                  <span className="font-medium">{getRideStatusInfo().label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{estimatedTime} min</span>
                </div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Distance covered: {distance} km</span>
                <span>Estimated arrival: {new Date(Date.now() + estimatedTime * 60000).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-500 relative"
                style={{ 
                  width: `${((15 - estimatedTime) / 15) * 100}%`,
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>

            {/* Driver Info Card */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{activeRide.driver.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">{activeRide.driver.rating}</span>
                    <span className="text-sm text-gray-500">• {activeRide.driver.carModel}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{activeRide.driver.plateNumber}</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Call Driver</span>
                </button>
                <button 
                  onClick={() => handleMessageDriver()}
                  className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Message</span>
                </button>
              </div>
            </div>

            {/* Ride Details */}
            <div className="space-y-6">
              {/* Fare Info */}
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Fare</p>
                    <p className="text-2xl font-semibold text-gray-800">${activeRide.estimatedFare}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              {/* Route Info */}
              <div className="bg-gray-50 rounded-xl p-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;