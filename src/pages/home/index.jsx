import React from 'react';
import { MapPin, ChevronRight, Star, Shield, Clock, Car, Phone } from 'lucide-react';

// Main hero section component
const Hero = () => (
  <div className="relative bg-yellow-50 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
          Your ride, on <span className="text-yellow-500">demand</span>
        </h1>
        <p className="text-xl text-gray-800 mb-8">
          Safe, reliable rides in minutes. Download the app now and experience
          seamless transportation at your fingertips.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="inline-flex items-center px-6 py-3 text-lg font-medium bg-black text-yellow-400 hover:bg-gray-800 rounded-md">
            Book a Ride
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
          <button className="inline-flex items-center px-6 py-3 text-lg font-medium border-2 border-black text-black hover:bg-yellow-100 rounded-md">
            Download App
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Features section component
const Features = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "Safe & Secure",
      description: "Verified drivers and real-time trip monitoring"
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "Always On Time",
      description: "Quick pickups and optimal routes"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Top Rated",
      description: "Experienced and highly rated drivers"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border-2 border-yellow-400 rounded-lg shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// How it works section
const HowItWorks = () => {
  const steps = [
    {
      icon: <MapPin className="w-6 h-6 text-black" />,
      title: "Set Location",
      description: "Enter your pickup and drop-off locations"
    },
    {
      icon: <Car className="w-6 h-6 text-black" />,
      title: "Select Ride",
      description: "Choose from various ride options"
    },
    {
      icon: <Phone className="w-6 h-6 text-black" />,
      title: "Get Moving",
      description: "Track your ride in real-time"
    }
  ];

  return (
    <div className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials section
const Testimonials = () => {
  const testimonials = [
    {
      text: "The most reliable ride-hailing service I've ever used. Always on time!",
      author: "Sarah Johnson",
      role: "Regular User"
    },
    {
      text: "Great drivers and excellent customer service. Highly recommended!",
      author: "Mike Peters",
      role: "Business Traveler"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 border-2 border-yellow-400 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div>
                <p className="font-semibold text-black">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Download app section
const DownloadApp = () => (
  <div className="bg-black text-white py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Get Started Today</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Download our app and join millions of satisfied users who trust us for their daily rides.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="px-6 py-3 text-lg font-medium border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-md transition-colors">
          Download for iOS
        </button>
        <button className="px-6 py-3 text-lg font-medium border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-md transition-colors">
          Download for Android
        </button>
      </div>
    </div>
  </div>
);

// Main Homepage component
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <DownloadApp />
    </div>
  );
};

export default HomePage;