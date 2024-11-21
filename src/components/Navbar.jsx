import React, { useState, useEffect } from 'react';
import { Menu, MapPin, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-yellow-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Menu Button */}
            <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-black transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-gray-800'
            }`}>
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="ml-4 flex items-center space-x-2 group">
              <div className="relative">
                <Car className={`h-8 w-8 transition-colors ${
                  isScrolled ? 'text-yellow-500' : 'text-gray-800'
                }`} />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-full transition-opacity" />
              </div>
              <span className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}>
                URBAN TAXI
              </span>
            </Link>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-4 flex items-center">
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-4 py-2 border transition-all duration-300 rounded-full
                    ${isScrolled 
                      ? 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-500' 
                      : 'border-gray-800 focus:border-gray-900 focus:ring-gray-900'
                    } 
                    bg-white focus:outline-none focus:ring-2`}
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;