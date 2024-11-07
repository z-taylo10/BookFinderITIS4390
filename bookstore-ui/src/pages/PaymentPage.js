import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PaymentContext } from '../context/PaymentContext';
import '../stylesheets/PaymentPage.css';

function PaymentPage() {
  const { t } = useTranslation();
  const { payment, setPayment } = useContext(PaymentContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
  });

  useEffect(() => {
    setFormData(payment);
  }, [payment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { cardNumber, nameOnCard, expirationMonth, expirationYear, securityCode } = formData;

    if (!/^\d{16}$/.test(cardNumber)) {
      alert(t('cardNumberError'));
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(nameOnCard)) {
      alert(t('nameOnCardError'));
      return;
    }
    if (!/^\d{1,2}$/.test(expirationMonth) || expirationMonth < 1 || expirationMonth > 12) {
      alert(t('expirationMonthError'));
      return;
    }
    if (expirationMonth.length === 1) {
      expirationMonth = '0' + expirationMonth;
    }
    if (!/^\d{4}$/.test(expirationYear)) {
      alert(t('expirationYearError'));
      return;
    }
    if (!/^\d{3}$/.test(securityCode)) {
      alert(t('securityCodeError'));
      return;
    }

    setPayment({ ...formData, expirationMonth });
    navigate('/accounts');
  };

  const handleCancel = () => {
    navigate('/accounts');
  };

  return (
    <div className="payment-page">
      <h2>{t('managePaymentMethods')}</h2>
      <h3 className="subheading">{t('addNewPaymentMethod')}</h3>
      <form onSubmit={handleSubmit}>
        <div className="card-details">
          <input className="payment-input" type="text" name="cardNumber" placeholder={t('cardNumber')} value={formData.cardNumber} onChange={handleChange} required pattern="\d*" maxLength="16" />
          <input className="payment-input" type="text" name="securityCode" placeholder={t('securityCode')} value={formData.securityCode} onChange={handleChange} required pattern="\d*" maxLength="3" />
        </div>
        <input className="payment-input" type="text" name="nameOnCard" placeholder={t('nameOnCard')} value={formData.nameOnCard} onChange={handleChange} required pattern="[a-zA-Z\s]*" />
        <div className="expiration">
          <input className="payment-input" type="text" name="expirationMonth" placeholder={t('expirationMonth')} value={formData.expirationMonth} onChange={handleChange} required pattern="\d*" maxLength="2" />
          <input className="payment-input" type="text" name="expirationYear" placeholder={t('expirationYear')} value={formData.expirationYear} onChange={handleChange} required pattern="\d*" maxLength="4" />
        </div>
        <div className="buttons">
          <button type="submit" className="save-button">{t('save')}</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>{t('cancelButton')}</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentPage;
