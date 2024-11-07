import React, { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import '../stylesheets/PickupConfirmationPage.css';

function PickupConfirmationPage() {
  const { payment, tempPayment } = useContext(PaymentContext);
  const { cart } = useContext(CartContext);
  const { t } = useTranslation();

  const name = payment?.nameOnCard || tempPayment?.nameOnCard || 'John Doe';
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  const tax = totalPrice * 0.08;
  const totalWithTax = (totalPrice + tax).toFixed(2);

  return (
    <div className="pickup-confirmation-page">
      <h2 className="purchase-title-pickup">{t('yourPurchase')}</h2>
      <div className="pickup-box-pickup">
        <h3>{t('pickupAt')} <span className="store-name-pickup">BookWiz</span></h3>
        <p><strong>{t('name')}:</strong> {name}</p>
        <p className="not-ready-pickup">{t('notReadyForPickup')}</p>
        <div className="book-list-pickup">
          {cart.map((item, index) => (
            <div key={index} className="book-item-pickup">
              <span>{index + 1}. {item.title}</span>
              <span>{t('price')}: ${parseFloat(item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="total-row-pickup">
          <span>{t('tax')}: ${tax.toFixed(2)}</span>
          <span style={{ marginLeft: '20px' }}>{t('total')}: ${totalWithTax}</span>
        </div>
      </div>
    </div>
  );
}

export default PickupConfirmationPage;
