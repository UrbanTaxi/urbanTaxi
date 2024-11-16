import React, { useState } from 'react';
import { Bell, Menu, MessageSquare, Search, MapPin, Clock, Car } from 'lucide-react';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  const [messageCount] = useState(2);
  const [activeRide] = useState(true); // For demonstration of active ride status

  return (
    <nav className="bg-yellow-400 border-b border-yellow-500 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Menu Button */}
            <button className="p-2 rounded-md text-gray-800 hover:bg-yellow-500">
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo */}
            <div className="ml-4 flex items-center space-x-2">
              <Car className="h-8 w-8 text-gray-800" />
              <span className="text-2xl font-bold text-gray-800">URBAN TAXI</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-4 flex items-center">
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border-2 border-gray-800 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Active Ride Status */}
            {activeRide && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gray-800 text-yellow-400 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Ride in Progress</span>
              </div>
            )}

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-800 hover:bg-yellow-500">
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-gray-800 text-yellow-400 text-xs font-medium flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Messages */}
            <button className="relative p-2 rounded-full text-gray-800 hover:bg-yellow-500">
              <MessageSquare className="h-6 w-6" />
              {messageCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-gray-800 text-yellow-400 text-xs font-medium flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-yellow-500">
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-800 overflow-hidden">
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-800">
                John Doe
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;