// src/components/ConfirmationModal.js
import React from 'react';
import '../stylesheets/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="confirmation-modal-buttons">
          <button className="confirmation-confirm-button" onClick={onConfirm}>Yes</button>
          <button className="confirmation-cancel-button" onClick={onCancel}>No</button>
        </div>
        <p className="confirmation-terms-text">Terms of Use & Privacy Policy</p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
