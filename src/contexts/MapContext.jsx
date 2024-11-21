import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedLocations, setSelectedLocations] = useState({
    pickup: null,
    dropoff: null
  });
  const [mapInstance, setMapInstance] = useState(null);

  const value = {
    selectedLocations,
    setSelectedLocations,
    mapInstance,
    setMapInstance
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}; 