// src/components/FavoriteList.jsx

import React from 'react';

const FavoriteList = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Ciudades favoritas</h3>
      <ul className="list-none p-0 m-0">
        {favorites.map((favCity, index) => (
          <li key={index} className="flex justify-between items-center bg-white/20 text-white rounded-lg p-3 my-2 transition-all duration-300 hover:bg-white/30">
            <button
              onClick={() => onSelectFavorite(favCity)}
              className="flex-grow text-left focus:outline-none"
            >
              {favCity}
            </button>
            <button
              onClick={() => onRemoveFavorite(favCity)}
              className="text-white hover:text-red-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;