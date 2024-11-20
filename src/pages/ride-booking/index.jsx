import React, { useState } from 'react';
import { MapPin, Navigation, Car, Clock, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RideBooking = () => {
  const [booking, setBooking] = useState({
    pickup: '',
    destination: '',
    rideType: 'standard',
    estimatedTime: null,
    estimatedPrice: null,
  });

  const [bookingStep, setBookingStep] = useState('location'); // location, confirmation, booked

  const rideTypes = {
    economy: { multiplier: 1, name: 'Economy', description: 'Affordable rides for everyday' },
    standard: { multiplier: 1.2, name: 'Standard', description: 'Comfortable sedans' },
    premium: { multiplier: 1.8, name: 'Premium', description: 'Luxury vehicles' },
  };

  // Simulate price calculation - in real app would call backend API
  const calculateEstimates = () => {
    // Dummy calculation - replace with actual distance/time calculation
    const basePrice = 10;
    const baseTime = 15;
    
    setBooking(prev => ({
      ...prev,
      estimatedTime: baseTime,
      estimatedPrice: basePrice * rideTypes[booking.rideType].multiplier
    }));
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (booking.pickup && booking.destination) {
      calculateEstimates();
      setBookingStep('confirmation');
    }
  };

  const handleBooking = () => {
    // In real app, would make API call to create booking
    setBookingStep('booked');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book a Ride</CardTitle>
      </CardHeader>
      <CardContent>
        {bookingStep === 'location' && (
          <form onSubmit={handleLocationSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" />
              <Input
                placeholder="Pickup location"
                value={booking.pickup}
                onChange={(e) => setBooking(prev => ({...prev, pickup: e.target.value}))}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Navigation className="text-gray-500" />
              <Input
                placeholder="Destination"
                value={booking.destination}
                onChange={(e) => setBooking(prev => ({...prev, destination: e.target.value}))}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Find Rides
            </Button>
          </form>
        )}

        {bookingStep === 'confirmation' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">From: {booking.pickup}</p>
              <p className="text-sm text-gray-500">To: {booking.destination}</p>
            </div>

            <div className="space-y-3">
              {Object.entries(rideTypes).map(([type, details]) => (
                <div
                  key={type}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    booking.rideType === type ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setBooking(prev => ({...prev, rideType: type}))}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Car className="inline-block mr-2" />
                      <span className="font-medium">{details.name}</span>
                      <p className="text-sm text-gray-500">{details.description}</p>
                    </div>
                    <span className="font-bold">
                      ${(booking.estimatedPrice * details.multiplier).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Est. {booking.estimatedTime} mins</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Final price may vary</span>
              </div>
            </div>

            <Button onClick={handleBooking} className="w-full">
              Confirm Booking
            </Button>
          </div>
        )}

        {bookingStep === 'booked' && (
          <div className="text-center space-y-4">
            <div className="text-green-500 font-medium">Ride Booked Successfully!</div>
            <div className="space-y-2">
              <p className="text-sm">Your ride will arrive in approximately {booking.estimatedTime} minutes</p>
              <p className="text-sm text-gray-500">Estimated fare: ${booking.estimatedPrice.toFixed(2)}</p>
            </div>
            <Button 
              onClick={() => {
                setBookingStep('location');
                setBooking({
                  pickup: '',
                  destination: '',
                  rideType: 'standard',
                  estimatedTime: null,
                  estimatedPrice: null,
                });
              }}
              variant="outline"
              className="w-full"
            >
              Book Another Ride
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RideBooking;