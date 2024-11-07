import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AddressContext } from '../context/AddressContext';
import '../stylesheets/AddressBookPage.css';

function AddressBookPage() {
  const { t } = useTranslation();
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
      alert(t('pleaseFillInAllFields'));
    }
  };

  const handleCancel = () => {
    navigate('/accounts');
  };

  return (
    <div className="address-book-page">
      <h2>{t('manageAddressBook')}</h2>
      <h3 className="subheading">{t('addNewShippingAddress')}</h3>
      <form onSubmit={handleSubmit}>
        <input className="address-input" type="text" name="fullName" placeholder={t('fullName')} value={formData.fullName} onChange={handleChange} required />
        <input className="address-input" type="text" name="address" placeholder={t('address')} value={formData.address} onChange={handleChange} required />
        <input className="address-input" type="text" name="city" placeholder={t('city')} value={formData.city} onChange={handleChange} required />
        <div className="state-zip">
          <input className="address-input" type="text" name="state" placeholder={t('state')} value={formData.state} onChange={handleChange} required />
          <input className="address-input" type="text" name="zipCode" placeholder={t('zipCode')} value={formData.zipCode} onChange={handleChange} required pattern="\d*" />
        </div>
        <input className="address-input" type="text" name="phoneNumber" placeholder={t('phoneNumber')} value={formData.phoneNumber} onChange={handleChange} required pattern="\d*" maxLength="10" />
        <div className="buttons">
          <button type="submit" className="save-button">{t('save')}</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>{t('cancelButton')}</button>
        </div>
      </form>
    </div>
  );
}

export default AddressBookPage;
