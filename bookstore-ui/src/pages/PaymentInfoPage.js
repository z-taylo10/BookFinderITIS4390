import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentContext } from '../context/PaymentContext';
import { AddressContext } from '../context/AddressContext';
import { CartContext } from '../context/CartContext';
import '../stylesheets/PaymentInfoPage.css';

function PaymentInfoPage() {
  const { payment, setPayment, tempPayment, setTempPayment } = useContext(PaymentContext);
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

  useEffect(() => {
    setFormData(payment);
  }, [payment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setTempPayment(formData); // Store temporarily
    if (isPickup) {
      navigate('/pickup-confirmation');
    } else {
      navigate('/purchase-confirmation');
    }
  };

  const handleBack = () => {
    if (address.fullName) {
      navigate('/cart');
    } else {
      navigate('/shipping-info');
    }
  };

  return (
    <div className="payment-page">
      <h2>Enter Payment Information</h2>
      <form onSubmit={handleNext}>
        <div className="card-details">
          <input className="payment-input" type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required pattern="\d*" maxLength="16" />
          <input className="payment-input" type="text" name="securityCode" placeholder="SRC" value={formData.securityCode} onChange={handleChange} required pattern="\d*" maxLength="3" />
        </div>
        <input className="payment-input" type="text" name="nameOnCard" placeholder="Name on Card" value={formData.nameOnCard} onChange={handleChange} required pattern="[a-zA-Z\s]*" />
        <div className="expiration">
          <input className="payment-input" type="text" name="expirationMonth" placeholder="Expiration Month" value={formData.expirationMonth} onChange={handleChange} required pattern="\d*" maxLength="2" />
          <input className="payment-input" type="text" name="expirationYear" placeholder="Expiration Year" value={formData.expirationYear} onChange={handleChange} required pattern="\d*" maxLength="4" />
        </div>
        <div className="buttons">
          <button type="submit" className="next-button">Next</button>
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentInfoPage;
