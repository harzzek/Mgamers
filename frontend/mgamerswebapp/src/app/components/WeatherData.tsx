"use client";

import { useEffect, useState } from 'react';
import Weather from './Weather';
import { fetchWeatherData } from '../services/weatherService';

const WeatherData: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const weatherData = await fetchWeatherData();
        setData(weatherData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Weather data={data} />;
};

export default WeatherData;
