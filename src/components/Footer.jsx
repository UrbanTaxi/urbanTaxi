import React from 'react';
import { Facebook, Twitter, Instagram, Smartphone, Mail, MapPin, Car, Shield, Clock, CreditCard } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">URBAN TAXI</span>
            </div>
            <p className="text-sm">
              Your reliable ride partner. Available 24/7 for safe and comfortable journeys across the city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Book a Ride', 'Driver Partner', 'Safety', 'FAQs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-yellow-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Safe Rides</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">24/7 Service</span>
              </li>
              <li className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Secure Payments</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Live Tracking</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">+233 555053342/ +233 241494115</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">support@urbantaxi.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Osu close, Plot <n className="7"></n></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {currentYear} Urban Taxi. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:text-yellow-400">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-yellow-400">Terms of Service</a>
              <a href="#" className="text-sm hover:text-yellow-400">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;