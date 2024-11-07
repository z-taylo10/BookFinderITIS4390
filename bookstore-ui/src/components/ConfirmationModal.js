// src/components/ConfirmationModal.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../stylesheets/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-content">
        <h2>{t('confirmLogout')}</h2>
        <p>{t('logoutMessage')}</p>
        <div className="confirmation-modal-buttons">
          <button className="confirmation-confirm-button" onClick={onConfirm}>{t('yes')}</button>
          <button className="confirmation-cancel-button" onClick={onCancel}>{t('no')}</button>
        </div>
        <p className="confirmation-terms-text">{t('termsOfUse')}</p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
