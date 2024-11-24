import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
let DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Create car icon using a direct URL to a car icon image
const CarIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3097/3097144.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
  className: 'car-marker'
});

// Initial car positions around Accra - more cars added in different areas
const initialCars = [
  // Central Accra
  { id: 1, position: [5.6037, -0.1870], status: 'Available' },
  { id: 2, position: [5.6137, -0.1770], status: 'Available' },
  { id: 3, position: [5.5937, -0.1970], status: 'Available' },
  
  // Osu area
  { id: 4, position: [5.5550, -0.1850], status: 'Available' },
  { id: 5, position: [5.5580, -0.1830], status: 'Available' },
  { id: 6, position: [5.5520, -0.1870], status: 'Available' },
  
  // Airport area
  { id: 7, position: [5.6050, -0.1710], status: 'Available' },
  { id: 8, position: [5.6080, -0.1690], status: 'Available' },
  { id: 9, position: [5.6020, -0.1730], status: 'Available' },
  
  // Labadi area
  { id: 10, position: [5.5600, -0.1500], status: 'Available' },
  { id: 11, position: [5.5620, -0.1520], status: 'Available' },
  { id: 12, position: [5.5580, -0.1480], status: 'Available' },
  
  // Cantonments
  { id: 13, position: [5.5800, -0.1750], status: 'Available' },
  { id: 14, position: [5.5820, -0.1730], status: 'Available' },
  { id: 15, position: [5.5780, -0.1770], status: 'Available' },
  
  // East Legon
  { id: 16, position: [5.6350, -0.1550], status: 'Available' },
  { id: 17, position: [5.6370, -0.1530], status: 'Available' },
  { id: 18, position: [5.6330, -0.1570], status: 'Available' },
  
  // Adabraka
  { id: 19, position: [5.5600, -0.2100], status: 'Available' },
  { id: 20, position: [5.5620, -0.2080], status: 'Available' },
  
  // Random positions
  { id: 21, position: [5.5900, -0.1650], status: 'Available' },
  { id: 22, position: [5.6200, -0.1800], status: 'Available' },
  { id: 23, position: [5.5700, -0.1900], status: 'Available' },
  { id: 24, position: [5.6100, -0.1600], status: 'Available' },
  { id: 25, position: [5.5800, -0.1950], status: 'Available' }
];

// Randomly set some cars as "On Trip"
const carsWithRandomStatus = initialCars.map(car => ({
  ...car,
  status: Math.random() > 0.7 ? 'On Trip' : 'Available' // 30% chance to be on trip
}));

const Map = ({ pickup, dropoff }) => {
  const [cars, setCars] = useState(carsWithRandomStatus);
  const defaultPosition = [5.6037, -0.1870];

  // Add console log to verify cars are updating
  useEffect(() => {
    console.log('Initial cars:', cars);

    const moveInterval = setInterval(() => {
      setCars(prevCars => {
        const newCars = prevCars.map(car => ({
          ...car,
          position: [
            car.position[0] + (Math.random() - 0.5) * 0.002, // Increased movement
            car.position[1] + (Math.random() - 0.5) * 0.002
          ]
        }));
        console.log('Updated cars:', newCars); // Debug log
        return newCars;
      });
    }, 1000); // Reduced to 1 second

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer 
        center={defaultPosition} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Car markers with car icon */}
        {cars.map(car => (
          <Marker 
            key={car.id}
            position={car.position}
            icon={CarIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Driver #{car.id}</p>
                <p className={`${
                  car.status === 'Available' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {car.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Keep pickup and dropoff markers with DefaultIcon */}
        {pickup && (
          <Marker position={pickup} icon={DefaultIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}
        {dropoff && (
          <Marker position={dropoff} icon={DefaultIcon}>
            <Popup>Dropoff Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map; 