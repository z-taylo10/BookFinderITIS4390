import React from 'react';
import '../stylesheets/CreateAccountModal.css';

function CreateAccountModal({ isOpen, closeAllModals }) {
  if (!isOpen) return null;

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
        <button className="create-account-button1">CREATE ACCOUNT</button>
        <button className="cancel-button1" onClick={closeAllModals}>CANCEL</button>
        <a href="/" className="terms1">Terms of Use & Privacy Policy</a>
      </div>
    </div>
  );
}

export default CreateAccountModal;
