import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { mainGenres } from './Genres';
import SignInModal from './SignInModal';
import CreateAccountModal from './CreateAccountModal';
import ConfirmationModal from './ConfirmationModal';
import '../stylesheets/Header.css';
import { useTranslation } from 'react-i18next';

function Header() {
  const [query, setQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate('/search', { state: { query } });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
    setDropdownVisible(false);
  };

  const toggleCreateAccountModal = () => {
    setIsCreateAccountModalOpen(!isCreateAccountModalOpen);
    setDropdownVisible(false);
  };

  const toggleLogoutModal = () => setIsLogoutModalOpen(!isLogoutModalOpen);

  const confirmLogout = () => {
    signOut();
    setIsLogoutModalOpen(false);
    navigate('/');
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
          <button onClick={() => navigate('/')}>{t('home')}</button>
          <div className="home-dropdown">
            <ul>
              <li><button onClick={() => navigate('/')}>{t('about')}</button></li>
              <li><button onClick={() => navigate('/recommendations')}>{t('recommended')}</button></li>
              <li><button onClick={() => navigate('/')}>{t('blog')}</button></li>
              <li><button onClick={() => navigate('/')}>{t('storePolicies')}</button></li>
              <li><button onClick={() => navigate('/')}>{t('contactUs')}</button></li>
            </ul>
          </div>
        </div>
        <div className="nav-button">
          <button onClick={() => navigate('/genres')}>{t('books')}</button>
          <div className="books-dropdown">
            <ul>
              {mainGenres.slice(0, 3).map((genre, index) => (
                <li key={index}>
                  <button onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>{t(genre.toLowerCase())}</button>
                </li>
              ))}
              <li><button onClick={() => navigate('/non-books')} style={{ color: 'red' }}>{t('nonBookItem')}</button></li>
              {mainGenres.slice(3, 6).map((genre, index) => (
                <li key={index + 3}>
                  <button onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>{t(genre.toLowerCase())}</button>
                </li>
              ))}
              <li><button onClick={() => navigate('/non-books')} style={{ color: 'red' }}>{t('nonBookItem')}</button></li>
              {mainGenres.slice(6, 9).map((genre, index) => (
                <li key={index + 6}>
                  <button onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}>{t(genre.toLowerCase())}</button>
                </li>
              ))}
              <li><button onClick={() => navigate('/non-books')} style={{ color: 'red' }}>{t('nonBookItem')}</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="search-bar">
        <img
          src="/search.png"
          alt="Search Icon"
          className="search-icon"
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
        />
      </div>
      <div className="cart-profile">
        <Link to="/cart">
          <img className="cart-icon" src="/cart.png" alt="Cart"/>  
          <span>${totalAmount} ({itemCount} {itemCount === 1 ? t('item') : t('items')})</span>
        </Link>
        <div className="profile-dropdown-container" ref={dropdownRef}>
          <img className="profile-icon" src="/generic_avatar.png" alt="Profile" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="profile-dropdown">
              {isAuthenticated ? (
                <button onClick={toggleLogoutModal}>{t('logOut')}</button>
              ) : (
                <button className="sign-in" onClick={toggleSignInModal}>{t('signIn')}</button>
              )}
              {!isAuthenticated && (
                <button onClick={toggleCreateAccountModal}>{t('createAccount')}</button>
              )}
              <button onClick={() => {
                if (isAuthenticated) {
                  navigate('/accounts');
                } else {
                  toggleSignInModal();
                }
              }}>{t('manageAccount')}</button>
              <button onClick={() => {
                if (isAuthenticated) {
                  navigate('/accounts');
                } else {
                  toggleSignInModal();
                }
              }}>{t('myDigitalLibrary')}</button>
            </div>
          )}
        </div>
      </div>
      <SignInModal isOpen={isSignInModalOpen} toggleModal={toggleSignInModal} />
      <CreateAccountModal isOpen={isCreateAccountModalOpen} closeAllModals={toggleCreateAccountModal} />
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title={t('confirmLogout')}
        message={t('logoutMessage')}
        onConfirm={confirmLogout}
        onCancel={toggleLogoutModal}
      />
    </header>
  );
}

export default Header;
