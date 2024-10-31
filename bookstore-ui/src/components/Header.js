import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { mainGenres } from './Genres';
import '../stylesheets/Header.css';

function Header() {
  const [query, setQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/search', { state: { query } });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
          <button onClick={() => navigate('/')}>Home</button>
          <div className="home-dropdown">
            <ul>
              <li><button onClick={() => navigate('/')}>About</button></li>
              <li><button onClick={() => navigate('/')}>Recommended</button></li>
              <li><button onClick={() => navigate('/')}>News / Blog</button></li>
              <li><button onClick={() => navigate('/')}>Store Policies</button></li>
              <li><button onClick={() => navigate('/')}>Contact Us</button></li>
            </ul>
          </div>
        </div>
        <div className="nav-button">
          <button onClick={() => navigate('/genres')}>Books</button>
          <div className="books-dropdown">
            <ul>
              {mainGenres.slice(0, 3).map((genre, index) => (
                <li key={index}>
                  <button onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>{genre}</button>
                </li>
              ))}
              <li><button onClick={() => navigate('/non-books')} style={{ color: 'red' }}>Non Book Item</button></li>
              {mainGenres.slice(3, 6).map((genre, index) => (
                <li key={index + 3}>
                  <button onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>{genre}</button>
                </li>
              ))}
              <li><button onClick={() => navigate('/non-books')} style={{ color: 'red' }}>Non Book Item</button></li>
              {mainGenres.slice(6, 9).map((genre, index) => (
                <li key={index + 6}>
                  <button onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>{genre}</button>
                </li>
              ))}
              <li><button onClick={() => navigate('/non-books')} style={{ color: 'red' }}>Non Book Item</button></li>
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
        <div className="profile-dropdown-container">
          <img src="/generic_avatar.png" alt="Profile" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="profile-dropdown">
              <button className="sign-in">Sign In</button>
              <button onClick={() => navigate('/create-account')}>Create an Account</button>
              <button onClick={() => navigate('/manage-account')}>Manage Account</button>
              <button onClick={() => navigate('/digital-library')}>My Digital Library</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;