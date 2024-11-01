import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/SignInModal.css';
import CreateAccountModal from './CreateAccountModal';
import { AuthContext } from '../context/AuthContext';

function SignInModal({ isOpen, toggleModal }) {
  const navigate = useNavigate();
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const { signIn } = useContext(AuthContext);

  const closeAllModals = () => {
    toggleModal();
    setIsCreateAccountOpen(false);
  };

  if (!isOpen) return null;

  const handleSignIn = () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (email && password) {
      signIn();
      toggleModal();
      navigate('/accounts');
    } else {
      alert('Please enter both email and password.');
    }
  };

  const openCreateAccount = () => {
    setIsCreateAccountOpen(true);
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <button className="close" onClick={closeAllModals}>
            <img className="close-icon" src="/X.png" alt="Close" />
          </button>
          <h2>Sign in or Create an Account</h2>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <div className="actions">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="/">Forgot Password?</a>
          </div>
          <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
          <button className="create-account-button" onClick={openCreateAccount}>Create an Account</button>
          <a href="/" className="underline">Continue as a Guest</a>
          <a href="/" className="terms">Terms of Use & Privacy Policy</a>
        </div>
      </div>
      <CreateAccountModal isOpen={isCreateAccountOpen} closeAllModals={closeAllModals} />
    </>
  );
}

export default SignInModal;