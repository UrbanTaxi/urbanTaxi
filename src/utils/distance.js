export const calculateDistance = (pickup, dropoff) => {
  // Simple haversine formula to calculate distance between two points
  const R = 6371; // Earth's radius in km
  const dLat = (dropoff[0] - pickup[0]) * Math.PI / 180;
  const dLon = (dropoff[1] - pickup[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pickup[0] * Math.PI / 180) * Math.cos(dropoff[0] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  // Estimate time based on average speed of 30 km/h
  const timeInHours = distance / 30;
  const timeInMinutes = Math.ceil(timeInHours * 60);
  
  return {
    distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
    time: timeInMinutes
  };
}; 