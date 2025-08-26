// src/components/Header.jsx

import React from 'react';
import logo from '/icons/logo.png'

const Header = () => {
  return (
    <header className="py-4 px-8 bg-white/30 backdrop-blur-md rounded-b-3xl shadow-xl w-full max-w-sm mx-auto flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105">
      <img src={logo} alt="Logo" className="h-8 w-8" />
      <h1 className="text-3xl font-semibold text-white text-center">Weather App</h1>
    </header>
  );
};

export default Header;