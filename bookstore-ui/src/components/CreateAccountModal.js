import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/CreateAccountModal.css';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

function CreateAccountModal({ isOpen, closeAllModals }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleCreateAccount = () => {
    const firstName = document.querySelector('input[data-testid="firstName"]').value;
    const lastName = document.querySelector('input[data-testid="lastName"]').value;
    const email = document.querySelector('input[data-testid="email"]').value;
    const password = document.querySelector('input[data-testid="password"]').value;
    const confirmPassword = document.querySelector('input[data-testid="confirmPassword"]').value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert(t('pleaseFillInAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      alert(t('The passwords do not match. Try again.'));
      return;
    }

    // Check if email already exists in localStorage
    if (localStorage.getItem(email)) {
      setErrorMessage(t('The email account already exits. '));
      return;
    }

    // Save account details in localStorage
    localStorage.setItem(email, JSON.stringify({ firstName, lastName, password }));
    
    setUser({ firstName, lastName, email });
    signIn();
    closeAllModals();
    navigate('/accounts');
  };

  return (
    <div className="modal1">
      <div className="modal-content1">
        <button className="close1" onClick={closeAllModals}>
          <img className="close-icon1" src="/X.png" alt="Close" />
        </button>
        <h2>{t('createAccountTitle')}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input type="text" data-testid="firstName" placeholder={t('firstName')} />
        <input type="text" data-testid="lastName" placeholder={t('lastName')} />
        <input type="email" data-testid="email" placeholder={t('email')} />
        <input type="password" data-testid="password" placeholder={t('password')} />
        <input type="password" data-testid="confirmPassword" placeholder={t('confirmPassword')} />
        <div className="actions1">
          <input type="checkbox" id="offers" />
          <label htmlFor="offers">{t('receiveOffers')}</label>
        </div>
        <button className="create-account-button1" onClick={handleCreateAccount}>
          {t('createAccountButton')}
        </button>
        <button className="cancel-button1" onClick={closeAllModals}>
          {t('cancelButton')}
        </button>
        <a href="/" className="terms1">{t('termsOfUse')}</a>
      </div>
    </div>
  );
}

export default CreateAccountModal;
