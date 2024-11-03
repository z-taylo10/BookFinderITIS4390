import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/AccountsPage.css';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { AddressContext } from '../context/AddressContext';
import { PaymentContext } from '../context/PaymentContext';
import { UserContext } from '../context/UserContext';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phoneNumber;
};

function AccountsPage() {
  const { signOut } = useContext(AuthContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { address, setAddress } = useContext(AddressContext);
  const { payment, setPayment } = useContext(PaymentContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/');
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
          <div className="user-image">[User Image]</div>
          <div className="user-details">
            <p>NAME: {user.firstName} {user.lastName}</p>
            <p>EMAIL: {user.email}</p>
            <p>PHONE NUMBER: {formatPhoneNumber(address.phoneNumber)}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>LOG OUT</button>
      </div>
      <div className="account-content">
        <div className="left-column">
          <div className="digital-library">
            <h3>My Digital Library</h3>
            <div className="wishlist">
              <div className="wishlist-header">
                <h4>My Wishlist:</h4>
                <img src="/expand.png" alt="Expand" className="expand-icon" onClick={toggleExpand} />
              </div>
              {(isExpanded ? wishlist : wishlist.slice(0, 2)).map((item, index) => (
                <div key={index} className="wishlist-item">
                  <span>{item.title}: {item.authors}, ${parseFloat(item.price).toFixed(2)}</span>
                  <button onClick={() => addToCart(item)} className="accounts-page add-to-cart-button">
                    <img src="/blackcart.png" alt="Add to Cart" className="cart-icon" />
                    <span className="add-text">ADD</span>
                  </button>
                  <button onClick={() => removeFromWishlist(index)} className="remove-button">
                    <img src="/trash.png" alt="Remove from Wishlist" className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
            <div className="order-history">
              <h4>Order History</h4>
              <div className="order-item">Title</div>
              <div className="order-item">Title</div>
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="shipping-info">
            <div className="shipping-header">
              <h4>Shipping Information</h4>
              <div className="add-container" onClick={handleAddShipping}>
                <span className="add-text">{address.fullName ? 'EDIT' : 'ADD'}</span>
                <img src={address.fullName ? '/edit.png' : '/add.png'} alt="Add/Edit" className="add-icon" />
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
                <img src="/remove.png" alt="Remove" className="remove-icon shipping-remove-icon" onClick={handleRemoveAddress} />
              </div>
            )}
          </div>
          <div className="payment-method">
            <div className="payment-header">
              <h4>Payment Method</h4>
              <div className="add-container" onClick={() => navigate('/payment')}>
                <span className="add-text">{payment.cardNumber ? 'EDIT' : 'ADD'}</span>
                <img src={payment.cardNumber ? '/edit.png' : '/add.png'} alt="Add/Edit" className="add-icon" />
              </div>
            </div>
            {payment.cardNumber && (
              <div className="payment-details">
                <p>Card Number: **** **** **** {payment.cardNumber.slice(-4)}</p>
                <p>Name on Card: {payment.nameOnCard}</p>
                <p>Expires: {payment.expirationMonth}/{payment.expirationYear}</p>
                <img src="/remove.png" alt="Remove" className="remove-icon payment-remove-icon" onClick={handleRemovePayment} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;

