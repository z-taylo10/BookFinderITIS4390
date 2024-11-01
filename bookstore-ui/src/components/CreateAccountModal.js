import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/CreateAccountModal.css';
import { AuthContext } from '../context/AuthContext';

function CreateAccountModal({ isOpen, closeAllModals }) {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleCreateAccount = () => {
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

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
        <h2>Create an Account</h2>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <div className="actions1">
          <input type="checkbox" id="offers" />
          <label htmlFor="offers">I would like to receive offers and promotional emails</label>
        </div>
        <button className="create-account-button1" onClick={handleCreateAccount}>CREATE ACCOUNT</button>
        <button className="cancel-button1" onClick={closeAllModals}>CANCEL</button>
        <a href="/" className="terms1">Terms of Use & Privacy Policy</a>
      </div>
    </div>
  );
}

export default CreateAccountModal;
