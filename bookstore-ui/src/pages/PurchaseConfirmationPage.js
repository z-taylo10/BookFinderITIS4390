import React, { useContext } from 'react';
import { AddressContext } from '../context/AddressContext';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import '../stylesheets/PurchaseConfirmationPage.css';

function PurchaseConfirmationPage() {
  const { address, tempAddress } = useContext(AddressContext);
  const { cart } = useContext(CartContext);
  const { t } = useTranslation();

  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const estimatedArrival = '09/11/2024'; // Dummy date
  const shippingCost = 5.00; // Example shipping cost
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  const tax = totalPrice * 0.08;
  const totalWithTaxAndShipping = (totalPrice + tax + shippingCost).toFixed(2);

  const currentAddress = tempAddress || address || {};

  return (
    <div className="purchase-confirmation-page">
      <h2 className="purchase-title">{t('yourPurchase')}</h2>
      <div className="confirmation-box">
        <h3>{t('orderNumber', { orderNumber })}</h3>
        <p><strong>{t('name')}:</strong> {currentAddress.fullName || 'John Doe'}</p>
        <p><strong>{t('estimatedArrival')}:</strong> {estimatedArrival}</p>
        <p><strong>{t('shippingAddress')}:</strong></p>
        <p>{currentAddress.address}, {currentAddress.city}, {currentAddress.state} {currentAddress.zipCode}</p>
        <div className="book-list-confirmation">
          {cart.map((item, index) => (
            <div key={index} className="book-item-confirmation">
              <span>{index + 1}. {item.title}</span>
              <span>{t('price1')}: ${parseFloat(item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="total-row-confirmation">
          <span>{t('tax1')}: ${tax.toFixed(2)}</span>
          <span>{t('shipping')}: ${shippingCost.toFixed(2)}</span>
          <span style={{ marginLeft: '20px' }}>{t('total')}: ${totalWithTaxAndShipping}</span>
        </div>
      </div>
    </div>
  );
}

export default PurchaseConfirmationPage; 