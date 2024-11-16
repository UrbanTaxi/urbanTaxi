import React, { useState } from 'react';
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
  User
} from 'lucide-react';

const RiderSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [recentLocations] = useState([
    { name: 'Home', address: '123 Home Street', type: 'home' },
    { name: 'Office', address: '456 Work Avenue', type: 'work' },
    { name: 'Gym', address: '789 Fitness Road', type: 'recent' }
  ]);

  return (
    <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
      isExpanded ? 'w-64' : 'w-20'
    }`}>
      <div className="flex flex-col h-full">
        {/* Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 ${!isExpanded && 'justify-center'}`}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {isExpanded && (
              <div>
                <h3 className="font-semibold text-gray-800">Alex Rider</h3>
                <p className="text-sm text-gray-500">★ 4.9</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`p-4 border-b border-gray-200 ${!isExpanded && 'text-center'}`}>
          <div className="flex justify-between items-center mb-4">
            {isExpanded && <h4 className="font-medium text-gray-700">Quick Actions</h4>}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-1"
            >
              {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>
          <div className={`grid ${isExpanded ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
            <button className="p-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              {isExpanded && <span>Book Now</span>}
            </button>
            <button className="p-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {isExpanded && <span>Schedule</span>}
            </button>
          </div>
        </div>

        {/* Recent Locations */}
        {isExpanded && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3">Recent Places</h4>
            <div className="space-y-3">
              {recentLocations.map((location) => (
                <button
                  key={location.name}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{location.name}</p>
                    <p className="text-xs text-gray-500">{location.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { icon: Home, label: 'Home' },
              { icon: Clock, label: 'My Rides' },
              { icon: Heart, label: 'Saved Places' },
              { icon: CreditCard, label: 'Payments' },
              { icon: Gift, label: 'Promotions' },
              { icon: Star, label: 'Rate Drivers' },
              { icon: Settings, label: 'Settings' },
              { icon: HelpCircle, label: 'Help & Support' }
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 p-2 w-full hover:bg-gray-100 rounded-lg ${
                  !isExpanded && 'justify-center'
                }`}
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                {isExpanded && <span className="text-gray-700">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Promotion Banner */}
        {isExpanded && (
          <div className="p-4 m-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg">
            <p className="text-sm font-medium text-gray-800">Get 20% off</p>
            <p className="text-xs text-gray-700">Use code: URBANTAXI20</p>
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
  );
};

export default RiderSidebar;