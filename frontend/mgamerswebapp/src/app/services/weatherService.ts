export const fetchWeatherData = async () => {
    const response = await fetch('http://localhost:8080/weatherforecast');
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  };
  