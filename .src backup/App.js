import React, { useState } from 'react';
import './App.css';
import './styles.css';
import Header from './Header';
import BookSearch from './BookSearch';
import Genres from './Genres';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Cart from './Cart';

function App() {
  const [searchQuery, setSearchQuery] = useState(null);

  const GenrePage = () => {
    const navigate = useNavigate();

    const searchByGenre = (genre) => {
      setSearchQuery(genre);
      navigate('/');
    };

    return <Genres onGenreClick={searchByGenre} />;
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header setSearchQuery={setSearchQuery} />
          <main>
            <Routes>
              <Route path="/genres" element={<GenrePage />} />
              <Route path="/" element={<BookSearch initialQuery={searchQuery} />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
