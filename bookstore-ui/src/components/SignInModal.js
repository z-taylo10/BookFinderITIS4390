import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/SignInModal.css';
import CreateAccountModal from './CreateAccountModal';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

function SignInModal({ isOpen, toggleModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const { signIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const closeAllModals = () => {
    toggleModal();
    setIsCreateAccountOpen(false);
    setErrorMessage(''); // Clear error message when closing modal
  };

  if (!isOpen) return null;

  const handleSignIn = () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!email || !password) {
      alert(t('pleaseEnterEmailAndPassword'));
      return;
    }

    const storedUser = localStorage.getItem(email);
    
    if (storedUser) {
      const { password: storedPassword } = JSON.parse(storedUser);

      if (password === storedPassword) {
        signIn();
        toggleModal();
        if (window.location.pathname !== '/cart') {
          navigate('/accounts');
        }
      } else {
        setErrorMessage(t('incorrectPassword'));
      }
    } else {
      setErrorMessage(t('accountNotFound'));
    }
  };

  const openCreateAccount = () => {
    setIsCreateAccountOpen(true);
    setErrorMessage(''); // Clear error message when switching to create account
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <button className="close" onClick={closeAllModals}>
            <img className="close-icon" src="/X.png" alt="Close" />
          </button>
          <h2>{t('signInOrCreateAccount')}</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input type="email" placeholder={t('emailAddress')} />
          <input type="password" placeholder={t('password')} />
          <div className="actions">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">{t('rememberMe')}</label>
            </div>
            <a href="/">{t('forgotPassword')}</a>
          </div>
          <button className="sign-in-button" onClick={handleSignIn}>{t('signIn')}</button>
          <button className="create-account-button" onClick={openCreateAccount}>{t('createAccount')}</button>
          <a href="/" className="underline">{t('continueAsGuest')}</a>
          <a href="/" className="terms">{t('termsOfUse')}</a>
        </div>
      </div>
      <CreateAccountModal isOpen={isCreateAccountOpen} closeAllModals={closeAllModals} />
    </>
  );
}

export default SignInModal;
