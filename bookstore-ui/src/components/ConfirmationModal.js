// src/components/ConfirmationModal.js
import React from 'react';
import '../stylesheets/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
        <p className="terms-text">Terms of Use & Privacy Policy</p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
