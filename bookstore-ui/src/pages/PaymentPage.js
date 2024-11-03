import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentContext } from '../context/PaymentContext';
import '../stylesheets/PaymentPage.css';

function PaymentPage() {
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
      alert('Card number must be 16 digits.');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(nameOnCard)) {
      alert('Name on card must contain only letters and spaces.');
      return;
    }
    if (!/^\d{1,2}$/.test(expirationMonth) || expirationMonth < 1 || expirationMonth > 12) {
      alert('Expiration month must be a number between 1 and 12.');
      return;
    }
    if (expirationMonth.length === 1) {
      expirationMonth = '0' + expirationMonth;
    }
    if (!/^\d{4}$/.test(expirationYear)) {
      alert('Expiration year must be a 4-digit number.');
      return;
    }
    if (!/^\d{3}$/.test(securityCode)) {
      alert('Security code must be exactly 3 digits.');
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
      <h2>Manage Payment Methods</h2>
      <h3 className="subheading">Add a New Payment Method</h3>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="save-button">SAVE</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>CANCEL</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentPage;
