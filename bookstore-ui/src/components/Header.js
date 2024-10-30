import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { mainGenres } from './Genres'; // Import genres
import axios from 'axios';
import '../stylesheets/Header.css';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/search', { state: { query } });
  };

  const handleGenreClick = async (genre) => {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: `subject:${genre}`,
      maxResults: 12,
      startIndex: 0,
    };

    try {
      const response = await axios.get(baseUrl, { params });
      navigate('/search', { state: { query: genre, books: response.data.items || [] } });
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }
  };

  const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);
  const itemCount = cart.length;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src="/bookstorelogo.png" alt="Logo" /></Link>
      </div>
      <div className="nav-buttons">
        <div className="nav-button">
          <button>Home</button>
          <div className="home-dropdown">
            <ul>
              <li><a href="/landing-page">About</a></li>
              <li><a href="/landing-page">Recommended</a></li>
              <li><a href="/landing-page">News / Blog</a></li>
              <li><a href="/landing-page">Store Policies</a></li>
              <li><a href="/landing-page">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="nav-button">
          <button>Books</button>
          <div className="books-dropdown">
            <ul>
              {mainGenres.slice(0, 3).map((genre, index) => (
                <li key={index}>
                  <a href="#" onClick={() => handleGenreClick(genre)}>{genre}</a>
                </li>
              ))}
              <li><a href="/non-books">Non Book Item</a></li>
              {mainGenres.slice(3, 6).map((genre, index) => (
                <li key={index + 3}>
                  <a href="#" onClick={() => handleGenreClick(genre)}>{genre}</a>
                </li>
              ))}
              <li><a href="/non-books">Non Book Item</a></li>
              {mainGenres.slice(6, 9).map((genre, index) => (
                <li key={index + 6}>
                  <a href="#" onClick={() => handleGenreClick(genre)}>{genre}</a>
                </li>
              ))}
              <li><a href="/non-books">Non Book Item</a></li>
            </ul>
          </div>
        </div>
      </div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="cart-profile">
        <Link to="/cart">
          <img src="/dummy-cart.png" alt="Cart" />
          <span>${totalAmount} ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        </Link>
        <Link to="/accounts">
          <img src="/dummy-profile.png" alt="Profile" />
        </Link>
      </div>
    </header>
  );
}

export default Header;