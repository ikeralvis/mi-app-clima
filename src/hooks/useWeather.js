// src/hooks/useWeather.js

import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const useWeather = ({ city, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // Nuevo estado para el pronóstico
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city && !coords) {
        setWeatherData(null);
        setForecastData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setWeatherData(null);
      setForecastData(null);

      try {
        let currentUrl = '';
        let forecastUrl = '';

        if (city) {
          currentUrl = `${CURRENT_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
          forecastUrl = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
        } else if (coords) {
          currentUrl = `${CURRENT_WEATHER_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;
          forecastUrl = `${FORECAST_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;
        }

        // Realizamos ambas peticiones en paralelo
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(currentUrl),
          fetch(forecastUrl),
        ]);
        
        if (!weatherRes.ok || !forecastRes.ok) {
          throw new Error('No se pudo obtener el clima para esta ubicación.');
        }

        const weatherJson = await weatherRes.json();
        const forecastJson = await forecastRes.json();
        
        setWeatherData(weatherJson);
        setForecastData(forecastJson);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, coords]);

  return { weatherData, forecastData, loading, error };
};

export default useWeather;