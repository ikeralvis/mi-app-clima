// src/components/ForecastDisplay.jsx

import React from 'react';

const ForecastDisplay = ({ data }) => {
  if (!data) return null;

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'short' });
  };

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
    <div className="mt-8 w-full max-w-sm md:max-w-full">
      <h3 className="text-xl font-semibold text-white mb-2 text-center">Pronóstico (5 días)</h3>
      <div className="flex justify-between md:justify-around overflow-x-auto gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg">
        {dailyForecasts.map(item => (
          <div key={item.dt} className="flex-none w-20 flex flex-col items-center p-3 text-white bg-white/10 rounded-2xl">
            <p className="text-sm font-semibold">{getDayName(item.dt_txt)}</p>
            <span className="text-3xl my-2">{getWeatherIcon(item.weather[0].description)}</span>
            <p className="text-lg font-bold">{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;