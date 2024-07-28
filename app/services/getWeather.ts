
function getWeather(lat: number, lon: number): Promise<any> {
  const API_KEY =process.env.NEXT_PUBLIC_API_SECRET;
  return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => data);
}
export default getWeather;