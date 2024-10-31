import React from 'react';
import '../stylesheets/CreateAccountModal.css';

function CreateAccountModal({ isOpen, closeAllModals }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={closeAllModals}>
          <img className="close-icon" src="/X.png" alt="Close" />
        </button>
        <h2>Create an Account</h2>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <div className="actions">
          <input type="checkbox" id="offers" />
          <label htmlFor="offers">I would like to receive offers and promotional emails</label>
        </div>
        <button className="create-account-button">CREATE ACCOUNT</button>
        <button className="cancel-button" onClick={closeAllModals}>CANCEL</button>
        <a href="/" className="terms">Terms of Use & Privacy Policy</a>
      </div>
    </div>
  );
}

export default CreateAccountModal;
