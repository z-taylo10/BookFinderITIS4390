import React from 'react';
import LandingPage from './LandingPage';
// import SearchBar from '../components/SearchBar';

function HomePage({ onSearch }) {
  return (
    <div>
      <h1>Welcome to Book Finder</h1>
      {/* <p>Landing page</p> */}
      <LandingPage />
    </div>
  );
}

export default HomePage;