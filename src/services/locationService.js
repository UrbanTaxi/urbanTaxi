export const searchLocations = async (query) => {
  try {
    // Example using OpenStreetMap Nominatim API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}+ghana&format=json&limit=8`
    );
    const data = await response.json();
    return data.map(item => ({
      name: item.display_name,
      lat: item.lat,
      lon: item.lon
    }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}; 