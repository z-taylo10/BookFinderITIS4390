import React, { useState } from 'react';
import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import GenrePage from './pages/GenrePage';
import Cart from './components/Cart';
import Header from './components/Header';
import Genres from './components/Genres';
import BooksPage from './components/BooksPage';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage onSearch={setSearchQuery} />} />
            <Route path="/search" element={<SearchResultsPage query={searchQuery} />} />
            <Route path="/genres" element={<Genres onGenreClick={handleGenreClick} />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/genre" element={<GenrePage genre={selectedGenre} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/books/:bookId" element={<BookDetailPage />} /> {/* Book detail route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
