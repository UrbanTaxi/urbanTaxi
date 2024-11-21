import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Settings, 
  LogOut, 
  Edit, 
  Star, 
  Car,
  ArrowLeft,
  Phone,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    totalRides: 0,
    rating: 4.8
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserProfile({
        name: user.name || user.username,
        email: user.email,
        phone: user.phone || '',
        totalRides: user.totalRides || 0,
        rating: user.rating || 4.8
      });
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EAB308', // yellow-500
      cancelButtonColor: '#EF4444', // red-500
      confirmButtonText: 'Yes, logout',
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.scrollTo(0, 0);
        
        // Show success message
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          confirmButtonColor: '#EAB308',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'rounded-lg',
            title: 'text-gray-800 font-semibold',
            content: 'text-gray-600',
            confirmButton: 'rounded-lg px-4 py-2'
          }
        }).then(() => {
          navigate('/');
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Back Button */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard/rider')}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <div className="w-32"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Main Content with padding for fixed header */}
      <div className="max-w-2xl mx-auto pt-20 px-4 pb-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User size={32} className="text-gray-600" />
              </div>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                <Edit className="w-5 h-5 text-white" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-white/90">
              <span className="text-sm flex items-center gap-1">
                <Mail className="w-4 h-4" /> {userProfile.email}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-800">{userProfile.rating}</span>
              </div>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Car className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-800">{userProfile.totalRides}</span>
              </div>
              <p className="text-sm text-gray-600">Rides</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/rider/settings')}
              className="w-full bg-gray-50 text-gray-800 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Account Settings</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center">
          <p className="text-sm text-gray-500">Urban Taxi v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;