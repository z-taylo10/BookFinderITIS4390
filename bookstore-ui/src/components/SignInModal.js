import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/SignInModal.css';

function SignInModal({ isOpen, toggleModal }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignIn = () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (email && password) {
      toggleModal();
      navigate('/accounts');
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={toggleModal}>
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
        <button className="create-account-button">Create an Account</button>
        <a href="/" className="underline">Continue as a Guest</a>
        <a href="/" className="terms">Terms of Use & Privacy Policy</a>
      </div>
    </div>
  );
}

export default SignInModal;