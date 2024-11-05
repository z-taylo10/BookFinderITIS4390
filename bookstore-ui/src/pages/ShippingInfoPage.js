import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '../context/AddressContext';
import { PaymentContext } from '../context/PaymentContext';
import { AuthContext } from '../context/AuthContext';
import '../stylesheets/AddressBookPage.css';

function ShippingInfoPage() {
  const { address, setTempAddress } = useContext(AddressContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });
  const { payment } = useContext(PaymentContext);

  useEffect(() => {
    setFormData(address);
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { fullName, address, city, state, zipCode, phoneNumber } = formData;
    if (fullName && address && city && state && zipCode && phoneNumber) {
      setTempAddress(formData);
      if (!isAuthenticated || !payment.cardNumber) {
        navigate('/payment-info');
      } else {
        navigate('/purchase-confirmation');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleBack = () => {
    navigate('/cart');
  };

  return (
    <div className="address-book-page">
      <h2>Enter Shipping Information</h2>
      <form onSubmit={handleNext}>
        <input className="address-input" type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input className="address-input" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input className="address-input" type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <div className="state-zip">
          <input className="address-input" type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          <input className="address-input" type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required pattern="\d*" />
        </div>
        <input className="address-input" type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required pattern="\d*" maxLength="10" />
        <div className="buttons">
          <button type="submit" className="next-button">Next</button>
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
}

export default ShippingInfoPage;
