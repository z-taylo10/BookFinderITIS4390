import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentContext } from '../context/PaymentContext';
import { AddressContext } from '../context/AddressContext';
import { CartContext } from '../context/CartContext';
import '../stylesheets/PaymentInfoPage.css';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

function PaymentInfoPage() {
  const { payment, setTempPayment } = useContext(PaymentContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
  });
  const { address } = useContext(AddressContext);
  const { isPickup } = useContext(CartContext);
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setFormData(payment);
  }, [payment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setTempPayment(formData);
    if (isPickup) {
      navigate('/pickup-confirmation');
    } else {
      navigate('/purchase-confirmation');
    }
  };

  const handleBack = () => {
    console.log('isPickup:', isPickup);
    console.log('address:', address);
    console.log('address.fullName:', address.fullName);

    if (isPickup) {
      navigate('/cart');
    } else {
      if (!isAuthenticated || !address.fullName) {
        navigate('/shipping-info');
      } else {
        navigate('/cart');
      }
    }
  };

  return (
    <div className="payment-page">
      <h2>{t('enterPaymentInformation')}</h2>
      <form onSubmit={handleNext}>
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
          <button type="submit" className="next-button">{t('next')}</button>
          <button type="button" className="back-button" onClick={handleBack}>{t('back')}</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentInfoPage;
