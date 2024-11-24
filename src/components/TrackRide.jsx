import React, { useState, useEffect, useRef } from 'react';
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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const TrackRide = () => {
  const navigate = useNavigate();
  const [activeRide, setActiveRide] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [distance, setDistance] = useState(0);
  const [rideStatus, setRideStatus] = useState('in_progress');
  const [directions, setDirections] = useState(null);
  const [carPosition, setCarPosition] = useState(null);
  const [libraries] = useState(['places', 'directions']);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const routingControlRef = useRef(null);
  const carMarkerRef = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentCoordinateIndex, setCurrentCoordinateIndex] = useState(0);
  const routePointsRef = useRef([]);
  const currentPointIndexRef = useRef(0);
  const animationFrameRef = useRef(null);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const lastPositionRef = useRef(null);

  useEffect(() => {
    const currentRide = localStorage.getItem('currentRide');
    if (currentRide) {
      const parsedRide = JSON.parse(currentRide);
      console.log('Active Ride Data:', {
        pickup: parsedRide.pickup,
        dropoff: parsedRide.dropoff,
        pickupCoordinates: parsedRide.pickupCoordinates,
        dropoffCoordinates: parsedRide.dropoffCoordinates
      });
      setActiveRide(parsedRide);
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

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current && activeRide) {
      // Default coordinates for Accra
      const defaultPickup = [5.6037, -0.1870];
      const defaultDropoff = [5.6057, -0.1890];

      // Get coordinates from activeRide or use defaults
      const pickupCoords = activeRide.pickupCoordinates || defaultPickup;
      const dropoffCoords = activeRide.dropoffCoordinates || defaultDropoff;

      // Initialize map
      mapRef.current = L.map(mapContainerRef.current).setView(pickupCoords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Create pickup marker (green)
      const pickupIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Create dropoff marker (red)
      const dropoffIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Add pickup and dropoff markers
      L.marker(pickupCoords, { icon: pickupIcon })
        .bindPopup('Pickup Location')
        .addTo(mapRef.current);

      L.marker(dropoffCoords, { icon: dropoffIcon })
        .bindPopup('Dropoff Location')
        .addTo(mapRef.current);

      // Create car icon
      const carIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-4v5a1 1 0 001 1h3V8a1 1 0 00-1-1z" />
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      // Add car marker
      carMarkerRef.current = L.marker(pickupCoords, { 
        icon: carIcon,
        zIndexOffset: 1000 
      }).addTo(mapRef.current);

      // Add routing control
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(pickupCoords[0], pickupCoords[1]),
          L.latLng(dropoffCoords[0], dropoffCoords[1])
        ],
        lineOptions: {
          styles: [{ color: '#EAB308', weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: true,
        createMarker: function() { return null; }
      }).addTo(mapRef.current);

      // Listen for route calculation
      routingControlRef.current.on('routesfound', function(e) {
        const routes = e.routes;
        if (routes && routes[0]) {
          const coordinates = routes[0].coordinates;
          const duration = routes[0].summary.totalTime;
          const distance = routes[0].summary.totalDistance / 1000; // Convert to kilometers
          setTotalDistance(distance);
          setCurrentDistance(0);
          moveCarAlongRoute(coordinates, duration);
        }
      });

      // Fit bounds to show both markers
      const bounds = L.latLngBounds([pickupCoords, dropoffCoords]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeRide]);

  // Function to move car along route
  const moveCarAlongRoute = (coordinates, totalDuration) => {
    let currentIndex = 0;
    const totalPoints = coordinates.length;
    const delayBetweenPoints = (totalDuration * 1000) / totalPoints;
    let lastTime = performance.now();
    
    // Initialize last position
    lastPositionRef.current = coordinates[0];

    const calculateDistance = (pos1, pos2) => {
      const R = 6371; // Earth's radius in km
      const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
      const dLon = (pos2.lng - pos1.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const lerp = (start, end, t) => {
      return {
        lat: start.lat + (end.lat - start.lat) * t,
        lng: start.lng + (end.lng - start.lng) * t
      };
    };

    const animate = (currentTime) => {
      if (currentIndex >= coordinates.length - 1) {
        return;
      }

      const deltaTime = currentTime - lastTime;
      const progress = Math.min(deltaTime / delayBetweenPoints, 1);

      if (carMarkerRef.current && coordinates[currentIndex]) {
        const currentPosition = coordinates[currentIndex];
        const nextPosition = coordinates[currentIndex + 1];

        if (nextPosition) {
          // Calculate interpolated position
          const interpolatedPosition = lerp(lastPositionRef.current, nextPosition, progress);
          
          // Update car position
          carMarkerRef.current.setLatLng([interpolatedPosition.lat, interpolatedPosition.lng]);

          // Calculate and update distance
          const segmentDistance = calculateDistance(lastPositionRef.current, interpolatedPosition);
          setCurrentDistance(prev => prev + segmentDistance);

          // Update last position for next calculation
          lastPositionRef.current = interpolatedPosition;

          // Calculate bearing for car rotation
          const bearing = calculateBearing(
            lastPositionRef.current.lat,
            lastPositionRef.current.lng,
            nextPosition.lat,
            nextPosition.lng
          );

          // Rotate car icon
          const carElement = carMarkerRef.current.getElement();
          if (carElement) {
            const iconDiv = carElement.querySelector('div');
            if (iconDiv) {
              iconDiv.style.transform = `rotate(${bearing}deg)`;
            }
          }

          if (progress >= 1) {
            lastTime = currentTime;
            currentIndex++;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Reset distance at start
    setCurrentDistance(0);
    
    // Start animation
    animate(performance.now());
  };

  // Enhanced bearing calculation for smoother rotation
  const calculateBearing = (startLat, startLng, destLat, destLng) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    const startLatRad = toRad(startLat);
    const startLngRad = toRad(startLng);
    const destLatRad = toRad(destLat);
    const destLngRad = toRad(destLng);

    const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
    const x = Math.cos(startLatRad) * Math.sin(destLatRad) -
             Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);

    let bearing = toDeg(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  // Simulate distance updates (replace with actual distance updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(prev => Math.max(0, prev - 0.1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, end ride'
    }).then((result) => {
      if (result.isConfirmed) {
        // Update ride status
        const rides = JSON.parse(localStorage.getItem('userRides') || '[]');
        if (rides.length > 0) {
          const updatedRides = rides.map((ride, index) => {
            if (index === 0) {
              return { ...ride, status: 'Completed' };
            }
            return ride;
          });
          localStorage.setItem('userRides', JSON.stringify(updatedRides));
        }

        // Show completion message and redirect
        Swal.fire({
          icon: 'success',
          title: 'Ride Completed!',
          text: 'Thank you for riding with us.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/dashboard/rider');
        });
      }
    });
  };

  const handleCancelRide = () => {
    Swal.fire({
      title: 'Cancel Ride?',
      text: "Are you sure you want to cancel this ride?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, end ride'
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the latest ride status in localStorage
        const rides = JSON.parse(localStorage.getItem('userRides') || '[]');
        if (rides.length > 0) {
          const updatedRides = rides.map((ride, index) => {
            if (index === 0) { // Update the most recent ride
              return { ...ride, status: 'Cancelled' };
            }
            return ride;
          });
          
          localStorage.setItem('userRides', JSON.stringify(updatedRides));
        }

        Swal.fire(
          'Ride Cancelled',
          'Your ride has been cancelled.',
          'success'
        ).then(() => {
          navigate('/dashboard/rider'); // Redirect to My Rides page
        });
      }
    });
  };

  useEffect(() => {
    if (estimatedDuration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / estimatedDuration);
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [estimatedDuration]);

  if (!activeRide) return null;

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
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

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Distance Covered</span>
                    <span className="font-medium text-gray-800">
                      {currentDistance.toFixed(2)} km
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-yellow-500 transition-all duration-300 ease-out"
                      style={{ 
                        width: `${Math.min((currentDistance / totalDistance) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total Distance</span>
                    <span className="font-medium text-gray-800">
                      {totalDistance.toFixed(2)} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>

                <div className="flex justify-between mt-4 pt-4 border-t">
                  <button
                    onClick={handleCancelRide}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Cancel Ride
                  </button>
                  <button
                    onClick={handleEndRide}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    End Ride
                  </button>
                </div>
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
                {/* Pickup location */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium text-gray-800">{activeRide.pickup}</p>
                  </div>
                </div>
                
                {/* Distance indicator with badge style */}
                <div className="ml-5 border-l-2 border-dashed border-gray-200 py-2">
                  <div className="ml-4 bg-yellow-50 rounded-full px-4 py-2 inline-flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-yellow-600">
                        {currentDistance.toFixed(1)} km
                      </span>
                      <span className="text-gray-400 mx-1">of</span>
                      <span className="font-medium text-gray-600">
                        {totalDistance.toFixed(1)} km
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Dropoff location */}
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
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-8rem)] relative z-0">
            <div 
              ref={mapContainerRef} 
              id="map" 
              className="w-full h-full" 
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRide; 