import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="logo">
        <a href="/"><img src="/BookWiz.png" alt="Book Finder Logo" /> </a>
      </div>
      <h1>Book Finder</h1>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/books">Books</a></li>
          <li>
          <form className="search-bar">
            <input type="text" placeholder="Search"/>
            <button type="submit">Search</button>
          </form>
          </li>
          <li>
          <a href="/cart">
         <img src="/cart.png" alt="Cart" style={{ verticalAlign: 'right', marginRight: '5px' }} /> 
           Cart ($0.00) No items added
          </a>
          </li>
          <li><a href="/profile">Profile</a>
          <img src="/profilepic.png" alt="ProfilePic"/>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;