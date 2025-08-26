// src/components/SearchBar.jsx

import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-3xl p-3 shadow-lg transition-all duration-300 hover:scale-105">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar ciudad..."
        className="flex-grow p-3 bg-white/20 text-white rounded-2xl placeholder-white focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
      />
      <button 
        type="submit" 
        className="bg-white/30 text-white p-3 rounded-2xl font-semibold hover:bg-white/50 focus:outline-none transition-colors duration-300"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;