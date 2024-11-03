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
import AccountsPage from './pages/AccountsPage';
import Footer from './components/Footer';
import BookDetailPage from './pages/BookDetailPage';
import BookRecommendationsPage from './pages/BookRecommendationsPage';
import Shipping from './components/Shipping';
import { WishlistProvider } from './context/WishlistContext';
import AddressBookPage from './pages/AddressBookPage';
import { AddressProvider } from './context/AddressContext';
import { PaymentProvider } from './context/PaymentContext';
import PaymentPage from './pages/PaymentPage';
import { UserProvider } from './context/UserContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <AddressProvider>
            <PaymentProvider>
              <Router>
                <div className="App">
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage onSearch={setSearchQuery} />} />
                    <Route path="/search" element={<SearchResultsPage query={searchQuery} />} />
                    <Route path="/genres" element={<Genres onGenreClick={handleGenreClick} />} />
                    <Route path="/genre" element={<GenrePage genre={selectedGenre} />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/accounts" element={<AccountsPage />} />
                    <Route path="/address-book" element={<AddressBookPage />} />
                    <Route path="/books/:bookId" element={<BookDetailPage />} />
                    <Route path="/genre/:genre" element={<GenrePage />} />
                    <Route path="/recommendations" element={<BookRecommendationsPage />} />
                    <Route path="/shipping" component={Shipping} />
                    <Route path="/payment" element={<PaymentPage />} />
                  </Routes>
                  <Footer />
                </div>
              </Router>
            </PaymentProvider>
          </AddressProvider>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
