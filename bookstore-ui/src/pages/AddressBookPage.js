import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressContext } from '../context/AddressContext';
import '../stylesheets/AddressBookPage.css';

function AddressBookPage() {
  const { address, setAddress } = useContext(AddressContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setFormData(address);
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, address, city, state, zipCode, phoneNumber } = formData;
    if (fullName && address && city && state && zipCode && phoneNumber) {
      setAddress(formData);
      navigate('/accounts');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleCancel = () => {
    navigate('/accounts');
  };

  return (
    <div className="address-book-page">
      <h2>Manage Address Book</h2>
      <h3 className="subheading">Add a New Shipping Address</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <div className="state-zip">
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required pattern="\d*" />
        </div>
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required pattern="\d*" maxLength="10" />
        <div className="buttons">
          <button type="submit" className="save-button">SAVE</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>CANCEL</button>
        </div>
      </form>
    </div>
  );
}

export default AddressBookPage;
