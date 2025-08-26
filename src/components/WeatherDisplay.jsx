// src/components/WeatherDisplay.jsx

import React from 'react';
import { motion } from 'framer-motion';

const WeatherDisplay = ({ data, onAddFavorite, isFavorite }) => {
  if (!data) return null;

  const { name, main, weather, wind } = data;

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('lluvia') || desc.includes('chubasco')) {
      return '🌧️';
    } else if (desc.includes('nubes') || desc.includes('nublado') || desc.includes('muy nuboso')) {
      return '☁️';
    } else if (desc.includes('despejado') || desc.includes('sol')) {
      return '☀️';
    } else if (desc.includes('niebla') || desc.includes('neblina')) {
      return '🌫️';
    } else if (desc.includes('tormenta')) {
      return '⛈️';
    }
    else if (desc.includes('parcialmente nublado') || desc.includes('nubes y claros') || desc.includes('intervalos nubosos')) {
      return '🌤️';
    }
    return '🌤️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full max-w-sm text-white relative border border-white/30"
    >
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        {!isFavorite && (
          <button 
            onClick={() => onAddFavorite(name)}
            className="text-white hover:text-red-300 transition-colors"
            title="Añadir a favoritos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.25 5.25 0 018.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3A5.25 5.25 0 0124 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        )}
      </div>

      <h2 className="text-4xl md:text-5xl font-semibold mb-2 drop-shadow-lg">{name}</h2>
      <div className="flex items-center justify-center text-7xl md:text-[10rem] mb-4 drop-shadow-lg">
        <span>{getWeatherIcon(weather[0].description)}</span>
      </div>
      <p className="text-5xl md:text-7xl font-light mb-4 drop-shadow-lg">{Math.round(main.temp)}°C</p>
      <p className="text-2xl md:text-3xl capitalize mb-2 drop-shadow-lg">{weather[0].description}</p>
      
      <div className="border-t border-white/30 pt-4 mt-4 md:pt-6 md:mt-6">
        <p className="text-base md:text-lg">Sensación térmica: {Math.round(main.feels_like)}°C</p>
        <p className="text-base md:text-lg">Humedad: {main.humidity}%</p>
        <p className="text-base md:text-lg">Viento: {Math.round(wind.speed * 3.6)} km/h</p>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;