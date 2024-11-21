import React, { useState, useEffect } from 'react';
import { Car, MapPin, Phone, MessageSquare, User, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SearchingDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pickup, dropoff, estimatedFare, returnFromChat } = location.state || {
    pickup: 'Current Location',
    dropoff: 'Destination',
    estimatedFare: '25.00',
    returnFromChat: false
  };

  const [status, setStatus] = useState(returnFromChat ? 'found' : 'searching');
  const [driver, setDriver] = useState(returnFromChat ? {
    name: 'John Doe',
    rating: 4.8,
    carModel: 'Toyota Camry',
    plateNumber: 'KBZ 123X',
    phone: '+254 712 345 678'
  } : null);
  const [searchDots, setSearchDots] = useState('');
  const [driverStatus, setDriverStatus] = useState(returnFromChat ? 'arrived' : 'accepting');
  const [rideStarted, setRideStarted] = useState(false);

  // Animate the searching dots
  useEffect(() => {
    if (status === 'searching') {
      const interval = setInterval(() => {
        setSearchDots(dots => dots.length >= 3 ? '' : dots + '.');
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Only run the driver finding simulation if not returning from chat
  useEffect(() => {
    if (!returnFromChat) {
      // First find the driver
      const findDriverTimer = setTimeout(() => {
        setStatus('found');
        setDriver({
          name: 'John Doe',
          rating: 4.8,
          carModel: 'Toyota Camry',
          plateNumber: 'KBZ 123X',
          phone: '+254 712 345 678'
        });
        setDriverStatus('accepted');

        // Then update driver status to moving
        const movingTimer = setTimeout(() => {
          setDriverStatus('moving');
          
          // Finally, update to arrived status
          const arrivedTimer = setTimeout(() => {
            setDriverStatus('arrived');
          }, 5000);

          return () => clearTimeout(arrivedTimer);
        }, 2000);

        return () => clearTimeout(movingTimer);
      }, 5000);

      return () => clearTimeout(findDriverTimer);
    }
  }, [returnFromChat]);

  const handleMessageDriver = () => {
    navigate('/chat', { 
      state: { 
        driver: driver,
        pickup: pickup,
        dropoff: dropoff,
        returnPath: '/searchingdriver',
        estimatedFare: estimatedFare
      } 
    });
  };

  // Fare Display Component
  const FareDisplay = () => (
    <div className="bg-yellow-50 rounded-xl p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Estimated Fare</p>
          <p className="text-2xl font-semibold text-gray-800">${estimatedFare}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Payment Method</p>
          <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
            {location.state?.paymentMethod === 'mobile' ? (
              <>
                <span>Mobile Money</span>
                <span className="text-xs text-gray-500">
                  ({location.state?.mobileNumber})
                </span>
              </>
            ) : (
              'Cash'
            )}
          </p>
        </div>
      </div>
    </div>
  );

  // Add function to handle starting ride
  const handleStartRide = () => {
    Swal.fire({
      title: 'Start Ride',
      text: 'Your driver is ready to start the ride. Proceed?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#EAB308',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Start Ride',
      cancelButtonText: 'Wait',
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
        // Store ride details in localStorage for dashboard
        const rideDetails = {
          driver,
          pickup,
          dropoff,
          estimatedFare,
          status: 'in_progress',
          startTime: new Date().toISOString()
        };
        localStorage.setItem('currentRide', JSON.stringify(rideDetails));
        
        // Navigate to dashboard
        navigate('/dashboard/rider', { 
          state: { 
            rideInProgress: true,
            rideDetails 
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        {status === 'searching' ? (
          // Searching State
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {/* Animated Car Icon */}
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto flex items-center justify-center">
                <Car className="w-10 h-10 text-white" />
              </div>
              {/* Animated Ripple Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20">
                <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-25 animate-ping"></div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Finding your driver{searchDots}
            </h2>
            <p className="text-gray-500 mb-8">
              Please wait while we connect you with the best driver nearby
            </p>
            
            {/* Add Fare Display */}
            <FareDisplay />
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
              <div className="h-full bg-yellow-500 rounded-full animate-progress"></div>
            </div>
            
            {/* Ride Details Card */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800">{pickup}</p>
                  </div>
                </div>
                
                <div className="ml-5 border-l-2 border-dashed border-gray-200 h-6"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Drop-off Location</p>
                    <p className="font-medium text-gray-800">{dropoff}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Driver Found/Moving/Arrived State
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${
                driverStatus === 'accepted' ? 'bg-green-100' : 
                driverStatus === 'arrived' ? 'bg-blue-100' :
                'bg-yellow-100'
              }`}>
                {driverStatus === 'accepted' ? (
                  <User className="w-10 h-10 text-green-600" />
                ) : driverStatus === 'arrived' ? (
                  <Car className="w-10 h-10 text-blue-600" />
                ) : (
                  <Car className="w-10 h-10 text-yellow-600" />
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {driverStatus === 'accepted' ? 'Driver Found!' : 
                 driverStatus === 'arrived' ? 'Driver has Arrived!' :
                 'Driver is on the way!'}
              </h2>
              <p className="text-gray-500">
                {driverStatus === 'accepted' ? 'Your driver has accepted the ride' :
                 driverStatus === 'arrived' ? 'Your driver is waiting at the pickup location' :
                 'Your driver is moving towards your location'}
              </p>
              
              {/* Animated Progress Indicator */}
              {driverStatus === 'moving' && (
                <div className="mt-4 flex justify-center items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}

              {/* Arrived Status Additional Info */}
              {driverStatus === 'arrived' && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">Driver has arrived at pickup location</p>
                    <p className="text-sm text-blue-600 mt-1">Your driver is waiting for you</p>
                  </div>
                  
                  {/* Start Ride Button */}
                  <button
                    onClick={handleStartRide}
                    className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors"
                  >
                    <Car className="w-5 h-5" />
                    <span className="font-medium">Start Ride</span>
                  </button>
                </div>
              )}
            </div>

            {/* Add Fare Display */}
            <FareDisplay />

            {/* Driver Info Card */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{driver.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600 ml-1">{driver.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">• {driver.carModel}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{driver.plateNumber}</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Call Driver</span>
                </button>
                <button 
                  onClick={handleMessageDriver}
                  className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Message</span>
                </button>
              </div>
            </div>

            {/* Ride Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800">{pickup}</p>
                  </div>
                </div>
                
                <div className="ml-5 border-l-2 border-dashed border-gray-200 h-6"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Drop-off Location</p>
                    <p className="font-medium text-gray-800">{dropoff}</p>
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

export default SearchingDriver; 