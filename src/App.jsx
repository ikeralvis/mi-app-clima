// src/App.jsx

import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import FavoriteList from './components/FavoriteList';
import ForecastDisplay from './components/ForecastDisplay';
import useWeather from './hooks/useWeather';

function App() {
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const { weatherData, forecastData, loading, error } = useWeather({ city, coords });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setCity('');
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
          setPermissionDenied(true);
        }
      );
    }
  }, []);

  const handleSearch = (searchTerm) => {
    setCity(searchTerm);
    setCoords(null);
  };
  
  const addFavorite = (cityName) => {
    if (cityName && !favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (cityName) => {
    const newFavorites = favorites.filter(fav => fav !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  
  const handleSelectFavorite = (favCity) => {
    setCity(favCity);
    setCoords(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <Header />
      <main className="mt-8 w-full max-w-sm md:max-w-4xl flex flex-col items-center">
        <SearchBar onSearch={handleSearch} />
        
        <div className="w-full mt-8 md:grid md:grid-cols-2 md:gap-8">
          <div className="md:col-span-1 flex flex-col items-center">
            {loading && <p className="text-xl">Cargando...</p>}
            {error && <p className="text-xl text-red-300">{error}</p>}
            {!loading && !error && !weatherData && !city && !permissionDenied && (
              <p className="text-xl text-center">Esperando la ubicación o la búsqueda...</p>
            )}
            {!loading && !error && !weatherData && permissionDenied && (
              <p className="text-xl text-center">No se pudo obtener la ubicación. Por favor, introduce una ciudad.</p>
            )}
            {weatherData && (
              <WeatherDisplay 
                data={weatherData} 
                onAddFavorite={addFavorite}
                isFavorite={favorites.includes(weatherData.name)}
              />
            )}
          </div>
          
          <div className="md:col-span-1 mt-8 md:mt-0 flex flex-col items-center">
            {forecastData && <ForecastDisplay data={forecastData} />}
            <FavoriteList favorites={favorites} onSelectFavorite={handleSelectFavorite} onRemoveFavorite={removeFavorite} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;