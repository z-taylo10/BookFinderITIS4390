import React from 'react';

function Header() {
  return (
    <header>
      <h1>Book Finder</h1>
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/books">Books</a></li>
          <li><a href="/account">Account</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
