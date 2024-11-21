import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Home,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    phone: '',
    homeAddress: '',
    workAddress: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setSettings({
        name: user.name || user.username,
        email: user.email,
        phone: user.phone || '',
        homeAddress: user.homeAddress || '',
        workAddress: user.workAddress || ''
      });
    }
  }, []);

  const handleSave = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...user, ...settings };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/rider/profile');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Back Button */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/rider/profile')}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Profile</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Account Settings</h1>
          <div className="w-32"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Main Content with padding for fixed header */}
      <div className="max-w-2xl mx-auto pt-20 px-4 pb-6">
        {/* Settings Form */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Saved Addresses</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={settings.homeAddress}
                    onChange={(e) => setSettings({ ...settings, homeAddress: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Address</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={settings.workAddress}
                    onChange={(e) => setSettings({ ...settings, workAddress: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-yellow-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors"
          >
            <span className="font-medium">Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 