import React, { useState } from 'react';
import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AddressProvider } from './context/AddressContext';
import { PaymentProvider } from './context/PaymentContext';
import { UserProvider } from './context/UserContext';
import { OrderHistoryProvider } from './context/OrderHistoryContext';
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
import AddressBookPage from './pages/AddressBookPage';
import PaymentPage from './pages/PaymentPage';
import PaymentInfoPage from './pages/PaymentInfoPage';
import PickupConfirmationPage from './pages/PickupConfirmationPage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import PurchaseConfirmationPage from './pages/PurchaseConfirmationPage';

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
              <OrderHistoryProvider>
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
                      <Route path="/payment-info" element={<PaymentInfoPage />} />
                      <Route path="/pickup-confirmation" element={<PickupConfirmationPage />} />
                      <Route path="/shipping-info" element={<ShippingInfoPage />} />
                      <Route path="/purchase-confirmation" element={<PurchaseConfirmationPage />} />
                    </Routes>
                    <Footer />
                  </div>
                </Router>
              </OrderHistoryProvider>
            </PaymentProvider>
          </AddressProvider>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
