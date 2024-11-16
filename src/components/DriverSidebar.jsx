import React, { useState } from 'react';
import { UserCircle, MapPin, Clock, Battery, ToggleLeft, Settings, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

const DriverSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [earnings, setEarnings] = useState({
    today: 124.50,
    trips: 8,
    hours: 6.5
  });

  return (
    <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
      isExpanded ? 'w-64' : 'w-20'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header with toggle */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className={`flex items-center gap-3 ${!isExpanded && 'justify-center w-full'}`}>
            <UserCircle className="w-8 h-8 text-gray-600" />
            {isExpanded && <span className="font-semibold">John Driver</span>}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-gray-500 hover:bg-gray-100 rounded-full p-1 ${!isExpanded && 'hidden'}`}
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Online/Offline Toggle */}
        <div className={`p-4 border-b border-gray-200 ${!isExpanded && 'flex justify-center'}`}>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full w-full justify-center ${
              isOnline ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <ToggleLeft className="w-5 h-5" />
            {isExpanded && (isOnline ? 'Online' : 'Offline')}
          </button>
        </div>

        {/* Stats Section */}
        {isExpanded && (
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Today's Earnings</span>
                <span className="font-semibold">${earnings.today}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Trips Completed</span>
                <span className="font-semibold">{earnings.trips}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Hours Online</span>
                <span className="font-semibold">{earnings.hours}h</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { icon: MapPin, label: 'Navigation' },
              { icon: Clock, label: 'Trip History' },
              { icon: Battery, label: 'Battery Status' },
              { icon: DollarSign, label: 'Earnings' },
              { icon: Settings, label: 'Settings' }
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

        {/* Footer Status */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center gap-2 ${!isExpanded && 'justify-center'}`}>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {isExpanded && <span className="text-sm text-gray-600">Connected</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSidebar;