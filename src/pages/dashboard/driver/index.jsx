import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  // Mock data - replace with actual API calls
  const earnings = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 145 },
    { day: 'Wed', amount: 135 },
    { day: 'Thu', amount: 160 },
    { day: 'Fri', amount: 180 },
    { day: 'Sat', amount: 200 },
    { day: 'Sun', amount: 170 }
  ];

  const recentTrips = [
    { id: 1, pickup: 'Downtown', dropoff: 'Airport', fare: 45, time: '2:30 PM' },
    { id: 2, pickup: 'Mall', dropoff: 'Residential Area', fare: 25, time: '4:15 PM' },
    { id: 3, pickup: 'Station', dropoff: 'Hotel Zone', fare: 30, time: '5:45 PM' },
  ];

  const stats = {
    todayEarnings: 180,
    totalTrips: 12,
    acceptanceRate: '95%',
    averageRating: 4.8,
    onlineHours: 6.5
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Online Status Toggle */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2 rounded-md ${
            isOnline ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Today's Earnings</p>
              <h3 className="text-2xl font-bold">${stats.todayEarnings}</h3>
            </div>
            <span className="text-green-500">$</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Trips</p>
              <h3 className="text-2xl font-bold">{stats.totalTrips}</h3>
            </div>
            <span className="text-blue-500">🚗</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Online Hours</p>
              <h3 className="text-2xl font-bold">{stats.onlineHours}h</h3>
            </div>
            <span className="text-purple-500">⏰</span>
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Weekly Earnings</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#2563eb" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Trips</h2>
        <div className="space-y-4">
          {recentTrips.map((trip) => (
            <div 
              key={trip.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📍</span>
                <div>
                  <p className="font-medium">
                    {trip.pickup} → {trip.dropoff}
                  </p>
                  <p className="text-sm text-gray-500">{trip.time}</p>
                </div>
              </div>
              <div className="font-medium">${trip.fare}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Schedule', 'Earnings', 'Settings', 'Support'].map((action) => (
          <button
            key={action}
            className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">
                {action === 'Schedule' ? '📅' : 
                 action === 'Earnings' ? '📈' : 
                 action === 'Settings' ? '⚙️' : '❓'}
              </span>
              <span>{action}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-center gap-2 text-blue-700">
          <span>ℹ️</span>
          <p>High demand in your area! Consider going online to maximize earnings.</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;