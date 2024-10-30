import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../stylesheets/Header.css';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/search', { state: { query } });
  };

  const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);
  const itemCount = cart.length;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src="/bookstorelogo.png" alt="Logo" /></Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/genres">Books</Link></li>
        </ul>
      </nav>
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