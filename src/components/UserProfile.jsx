import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut, 
  Edit, 
  Star, 
  Car 
} from 'lucide-react';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    phone: '+1 (555) 123-4567',
    totalRides: 87,
    rating: 4.8
  });

  const profileSections = [
    {
      icon: <MapPin className="text-yellow-500" />,
      title: 'Saved Addresses',
      items: [
        { name: 'Home', address: '123 Main Street' },
        { name: 'Work', address: '456 Tech Park Drive' }
      ]
    },
    {
      icon: <Car className="text-yellow-500" />,
      title: 'Ride History',
      items: [
        { date: 'Oct 15', from: 'Downtown', to: 'Airport' },
        { date: 'Oct 10', from: 'Home', to: 'University' }
      ]
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-black text-yellow-400 min-h-screen">
      {/* Profile Header */}
      <div className="bg-yellow-600 p-6 text-center relative">
        <div className="absolute top-4 right-4">
          <Edit className="text-black hover:text-yellow-900" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-4">
            <User size={60} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-black">{userProfile.name}</h2>
          <p className="text-black/70">{userProfile.email}</p>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="flex justify-around p-4 bg-yellow-700/20">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Star className="mr-2 text-yellow-500" />
            <span>{userProfile.rating}</span>
          </div>
          <p className="text-xs">Rider Rating</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Car className="mr-2 text-yellow-500" />
            <span>{userProfile.totalRides}</span>
          </div>
          <p className="text-xs">Total Rides</p>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="p-4 space-y-4">
        {profileSections.map((section, index) => (
          <div key={index} className="bg-yellow-900/20 rounded-lg p-4">
            <div className="flex items-center mb-3">
              {section.icon}
              <h3 className="ml-2 font-semibold">{section.title}</h3>
            </div>
            {section.items.map((item, itemIndex) => (
              <div 
                key={itemIndex} 
                className="flex justify-between py-2 border-t border-yellow-700"
              >
                <div>
                  <p className="font-medium">{item.name || item.date}</p>
                  <p className="text-sm text-yellow-300">
                    {item.address || `${item.from} → ${item.to}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <button className="w-full bg-yellow-500 text-black py-3 rounded-lg flex items-center justify-center hover:bg-yellow-400">
          <Settings className="mr-2" /> Account Settings
        </button>
        <button className="w-full bg-yellow-500 text-black py-3 rounded-lg flex items-center justify-center hover:bg-yellow-400">
          <LogOut className="mr-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;