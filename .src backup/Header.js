import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <header>
      <h1>Book Finder</h1>
      <nav>
        <ul>
          <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
          <li><Link to="/genres">Genres</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
