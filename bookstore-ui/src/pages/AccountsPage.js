import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../stylesheets/AccountsPage.css';
import ConfirmationModal from '../components/ConfirmationModal';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { AddressContext } from '../context/AddressContext';
import { PaymentContext } from '../context/PaymentContext';
import { UserContext } from '../context/UserContext';
import { OrderHistoryContext } from '../context/OrderHistoryContext';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phoneNumber;
};

function AccountsPage() {
  const { t } = useTranslation();
  const { signOut } = useContext(AuthContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { address, setAddress } = useContext(AddressContext);
  const { payment, setPayment } = useContext(PaymentContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const orderHistoryContext = useContext(OrderHistoryContext);

  if (!orderHistoryContext) {
    console.error("OrderHistoryContext is undefined");
    return null; // or handle the error appropriately
  }

  const { orderHistory, removeOrder } = orderHistoryContext;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOut();
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddShipping = () => {
    navigate('/address-book');
  };

  const handleRemoveAddress = () => {
    setAddress({
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    });
  };

  const handleRemovePayment = () => {
    setPayment({
      cardNumber: '',
      nameOnCard: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: '',
    });
  };

  return (
    <div className="accounts-page">
      <div className="account-header">
        <div className="user-info">
          <div className="user-image">
            <img src="/generic_avatar.png" alt="User Icon" className="user-icon" />
          </div>
          <div className="user-details">
            <p>{t('name')}: {user.firstName} {user.lastName}</p>
            <p>{t('email')}: {user.email}</p>
            <p>{t('phoneNumber')}: {formatPhoneNumber(address.phoneNumber)}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>{t('logOut')}</button>
      </div>
      <div className="account-content">
        <div className="left-column">
          <div className="digital-library">
            <h3>{t('myDigitalLibrary')}</h3>
            <div className="wishlist">
              <div className="wishlist-header">
                <h4>{t('wishlist')}:</h4>
                <img src="/expand.png" alt={t('expand')} className="expand-icon" onClick={toggleExpand} />
              </div>
              {(isExpanded ? wishlist : wishlist.slice(0, 2)).map((item, index) => (
                <div key={index} className="wishlist-item">
                  <span>{item.title}: {item.authors}, ${parseFloat(item.price).toFixed(2)}</span>
                  <button onClick={() => addToCart(item)} className="accounts-page add-to-cart-button">
                    <img src="/blackcart.png" alt={t('addToCart')} className="cart-icon" />
                    <span className="add-text">{t('buy')}</span>
                  </button>
                  <button onClick={() => removeFromWishlist(index)} className="remove-button">
                    <img src="/trash.png" alt={t('removeFromWishlist')} className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
            <div className="order-history">
              <h4>{t('orderHistory')}</h4>
              {orderHistory.map((order, index) => (
                <div key={index} className="order-item">
                  <span>{t('orderType')}: {order.type === 'Shipped' ? t('orderTypee.shipped') : t('orderTypee.pickup')}</span>
                  <span>{t('date')}: {order.date}</span>
                  <span>{t('items')}: {order.items.length}</span>
                  <span>{t('total')}: ${order.total}</span>
                  <button onClick={() => removeOrder(index)} className="remove-button">
                    <img src="/trash.png" alt={t('remove')} className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="shipping-info">
            <div className="shipping-header">
              <h4>{t('shippingInformation')}</h4>
              <div className="add-container" onClick={handleAddShipping}>
                <span className="add-text">{address.fullName ? t('edit') : t('add')}</span>
                <img src={address.fullName ? '/edit.png' : '/add.png'} alt={t('addEdit')} className="add-icon" />
              </div>
            </div>
            {(address.fullName || address.address || address.city || address.state || address.zipCode || address.phoneNumber) && (
              <div className="shipping-details">
                {address.fullName && <p>{address.fullName}</p>}
                {address.address && <p>{address.address}</p>}
                {(address.city || address.state || address.zipCode) && (
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                )}
                {address.phoneNumber && <p>{formatPhoneNumber(address.phoneNumber)}</p>}
                <img src="/remove.png" alt={t('remove')} className="remove-icon shipping-remove-icon" onClick={handleRemoveAddress} />
              </div>
            )}
          </div>
          <div className="payment-method">
            <div className="payment-header">
              <h4>{t('paymentMethod')}</h4>
              <div className="add-container" onClick={() => navigate('/payment')}>
                <span className="add-text">{payment.cardNumber ? t('edit') : t('add')}</span>
                <img src={payment.cardNumber ? '/edit.png' : '/add.png'} alt={t('addEdit')} className="add-icon" />
              </div>
            </div>
            {payment.cardNumber && (
              <div className="payment-details">
                <p>{t('cardNumber')}: **** **** **** {payment.cardNumber.slice(-4)}</p>
                <p>{t('nameOnCard')}: {payment.nameOnCard}</p>
                <p>{t('expires')}: {payment.expirationMonth}/{payment.expirationYear}</p>
                <img src="/remove.png" alt={t('remove')} className="remove-icon payment-remove-icon" onClick={handleRemovePayment} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}

export default AccountsPage;

