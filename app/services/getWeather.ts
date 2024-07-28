
export async function getWeather(lat: number, lon: number): Promise<any> {
  const API_KEY =process.env.NEXT_PUBLIC_API_SECRET;
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${API_KEY}`);
  const data = await response.json();
  return data;
}
export async function getWeatherByCity(city: string): Promise<any> {
  const API_KEY =process.env.NEXT_PUBLIC_API_SECRET;
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`);
  const data = await response.json();
  return data;
}