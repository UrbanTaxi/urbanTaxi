import React from 'react';
import { Star, ThumbsUp, Car, Shield, MapPin, Award } from 'lucide-react';
import { Badge, Avatar } from '@mui/material';

const DriverProfile = () => {
  const driverData = {
    name: "John Smith",
    rating: 4.8,
    totalRides: 1248,
    acceptanceRate: "95%",
    completionRate: "98%",
    yearJoined: 2022,
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2021",
      color: "Silver",
      plateNumber: "ABC 123"
    },
    badges: ["Top Rated", "Excellent Service", "Quick Response"],
    recentLocations: ["Downtown", "Airport", "Shopping District"],
    status: "Active"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="card">
        <div className="card-content">
          <div className="flex items-start gap-6">
            <Avatar alt={driverData.name} src="/api/placeholder/150/150" className="h-24 w-24" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{driverData.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg">{driverData.rating}</span>
                  </div>
                </div>
                <Badge color={driverData.status === 'Active' ? 'success' : 'default'}>{driverData.status}</Badge>
              </div>
              <div className="mt-4 flex gap-4">
                {driverData.badges.map((badge, index) => (
                  <Badge key={index} variant="outlined">
                    <Award className="h-4 w-4 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Other Sections */}
      {/* Stats, Vehicle Info, Recent Activity */}
    </div>
  );
};

export default DriverProfile;
