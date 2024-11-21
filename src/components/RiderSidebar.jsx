import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Clock, 
  Heart, 
  CreditCard, 
  Gift, 
  Settings, 
  HelpCircle, 
  Star, 
  MapPin, 
  ChevronLeft,
  ChevronRight,
  User,
  Navigation
} from 'lucide-react';
import RideCard from './RideCard';
import { useNavigate } from 'react-router-dom';
// import BookRideModal from './BookRideModal';

const RiderSidebar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    rating: '4.9'
  });

  useEffect(() => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const currentRide = JSON.parse(localStorage.getItem('currentRide'));
    
    if (user) {
      setUserData({
        name: user.name || user.username,
        rating: '4.9'
      });
    }

    if (currentRide) {
      setActiveRide(currentRide);
    }

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      const updatedRide = JSON.parse(localStorage.getItem('currentRide'));
      setActiveRide(updatedRide);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleTrackRide = () => {
    navigate('/rider/track-ride');
  };

  // Navigation items with onClick handlers
  const navigationItems = [
    { icon: Home, label: 'Home', onClick: () => navigate('/rider/dashboard') },
    { icon: Clock, label: 'My Rides', onClick: () => navigate('/rider/rides') },
    { icon: Heart, label: 'Saved Places', onClick: () => {} },
    { icon: CreditCard, label: 'Payments', onClick: () => {} },
    { icon: Gift, label: 'Promotions', onClick: () => {} },
    { icon: Star, label: 'Rate Drivers', onClick: () => {} },
    { icon: Settings, label: 'Settings', onClick: () => navigate('/rider/profile') },
    { icon: HelpCircle, label: 'Help & Support', onClick: () => {} }
  ];

  // Quick Actions Section
  const QuickActions = () => (
    <div className={`p-4 border-b border-gray-200 ${!isExpanded && 'text-center'}`}>
      <div className="flex justify-between items-center mb-2">
        {isExpanded && <h4 className="text-sm font-medium text-gray-700">Quick Actions</h4>}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
      <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
        <button 
          className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          onClick={() => setIsModalOpen(true)}
        >
          <MapPin className="w-4 h-4" />
          {isExpanded && <span>Book Now</span>}
        </button>
        {activeRide ? (
          <button 
            onClick={handleTrackRide}
            className="p-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Navigation className="w-4 h-4" />
            {isExpanded && <span>Track Ride</span>}
          </button>
        ) : (
          <button className="p-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4" />
            {isExpanded && <span>Schedule</span>}
          </button>
        )}
      </div>
      
      {/* Active Ride Status - Only show if expanded and there's an active ride */}
      {isExpanded && activeRide && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-green-800">Active Ride</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-600">In Progress</span>
            </div>
          </div>
          <p className="text-xs text-green-700 truncate">
            To: {activeRide.dropoff}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 shadow-sm ${
        isExpanded ? 'w-72' : 'w-20'
      }`}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-4 border-b border-gray-200">
            <div className={`flex items-center gap-3 ${!isExpanded && 'justify-center'}`}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {isExpanded && (
                <div>
                  <h3 className="font-semibold text-gray-800">{userData.name || 'Charlotte'}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {userData.rating}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Updated Quick Actions */}
          <QuickActions />

          {/* Updated Navigation Menu */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`flex items-center gap-2 p-2 w-full hover:bg-gray-100 rounded-lg transition-colors ${
                    !isExpanded && 'justify-center'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                  {isExpanded && <span className="text-sm text-gray-700">{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>

          {/* Promotion Banner */}
          {isExpanded && (
            <div className="mx-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg">
                <p className="text-sm font-semibold text-gray-800">Get 20% off</p>
                <p className="text-xs text-gray-700">Use code: URBANTAXI20</p>
              </div>
            </div>
          )}

          {/* Version Info */}
          <div className="p-4 border-t border-gray-200">
            <div className={`flex items-center gap-2 ${!isExpanded && 'justify-center'}`}>
              {isExpanded ? (
                <span className="text-xs text-gray-500">Urban Taxi v1.0.0</span>
              ) : (
                <span className="text-xs text-gray-500">v1.0</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <RideCard 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pickup=""
        dropoff=""
        fare="25.00"
        status="Available"
        date={new Date().toLocaleDateString()}
        time={new Date().toLocaleTimeString()}
        driver={{
          name: "John Doe",
          rating: "4.9"
        }}
      />
    </>
  );
};

export default RiderSidebar;