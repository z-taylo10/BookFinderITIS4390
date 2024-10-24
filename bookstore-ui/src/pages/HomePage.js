import React from 'react';
import SearchBar from '../components/SearchBar';

function HomePage({ onSearch }) {
  return (
    <div>
      <h1>Welcome to Book Finder</h1>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default HomePage;

