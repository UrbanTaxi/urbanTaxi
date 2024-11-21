import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const RiderMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);

  // Default center (Ghana)
  const defaultCenter = {
    lat: 5.6037,
    lng: -0.1870
  };

  const mapStyles = {
    height: '100vh',
    width: '100%'
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation(defaultCenter);
        }
      );
    }
  }, []);

  if (loadError) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-red-500 font-medium">Error loading maps</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={currentLocation || defaultCenter}
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true
      }}
    >
      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />
      )}
    </GoogleMap>
  );
};

export default RiderMap; 