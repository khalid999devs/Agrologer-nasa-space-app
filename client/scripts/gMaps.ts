const apiKey = process.env.EXPO_PUBLIC_GMAP_API_KEY;

export const getPlaceName = (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const placeName = data.results[0].formatted_address;
        resolve(placeName);
      } else {
        console.log('No results found.');
        resolve(null);
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
      reject(error);
    }
  });
};
