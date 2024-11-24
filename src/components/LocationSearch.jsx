const searchLocation = async (query) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.map(item => ({
      label: item.display_name,
      value: [parseFloat(item.lat), parseFloat(item.lon)]
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    return [];
  }
}; 