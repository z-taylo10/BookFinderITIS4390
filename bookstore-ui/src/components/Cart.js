import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { AddressContext } from '../context/AddressContext';
import { PaymentContext } from '../context/PaymentContext';
import SignInModal from './SignInModal';
import '../stylesheets/CartPage.css';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { address } = useContext(AddressContext);
  const { payment } = useContext(PaymentContext);
  const navigate = useNavigate();
  const [isPickup, setIsPickup] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  const tax = (isPickup || isShipping) ? totalPrice * 0.08 : 0;
  const shipping = isShipping ? cart.length * 0.05 * totalPrice : 0;
  const totalWithTaxAndShipping = (totalPrice + tax + shipping).toFixed(2);

  const handlePickupToggle = () => {
    setIsPickup(!isPickup);
    setIsShipping(false);
  };

  const handleShippingToggle = () => {
    setIsShipping(!isShipping);
    setIsPickup(false);
  };

  const toggleSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
  };

  const handlePurchase = () => {
    if (isShipping) {
      if (!isAuthenticated) {
        navigate('/shipping-info');
      } else if (!address.fullName) {
        navigate('/shipping-info');
      } else if (!payment.cardNumber) {
        navigate('/payment-info');
      } else {
        navigate('/purchase-confirmation'); // Redirect to the purchase confirmation page
      }
    } else if (isPickup) {
      if (isAuthenticated && payment.cardNumber) {
        navigate('/pickup-confirmation');
      } else {
        navigate('/payment-info');
      }
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-container">
        <div className="cart-header">
          <span>Price</span>
        </div>
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <button onClick={() => removeFromCart(index)} className="remove-button">
                <img src="/remove.png" alt="Remove" />
              </button>
              <div className="cart-item-image">
                <img src={item.thumbnail} alt={`${item.title} cover`} />
              </div>
              <div className="cart-item-details">
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Author(s):</strong> {item.authors || 'N/A'}</p>
              </div>
              <div className="cart-item-price">${item.price}</div>
            </li>
          ))}
        </ul>
        <div className="cart-actions">
          <button onClick={handleShippingToggle} className={`ship-button ${isShipping ? 'active' : ''}`}>
            Ship to You
          </button>
          {isShipping ? (
            <button
              onClick={() => isAuthenticated ? handlePickupToggle() : toggleSignInModal()}
              className={`pickup-button ${isPickup ? 'active' : ''}`}
            >
              {isAuthenticated ? 'Pick up at Store' : 'Log In'}
            </button>
          ) : (
            <button
              onClick={handlePickupToggle}
              className={`pickup-button ${isPickup ? 'active' : ''}`}
            >
              Pick up at Store
            </button>
          )}
          {(isPickup || isShipping) && (
            <span className="cart-tax">Tax 8%: ${tax.toFixed(2)}</span>
          )}
        </div>
        {isShipping && isAuthenticated && address.fullName && (
          <div className="cart-shipping-row">
            <span className="cart-shipping">Shipping: ${shipping.toFixed(2)}</span>
          </div>
        )}
        <div className="cart-subtotal">
          <span className={isPickup || isShipping ? 'total-text' : ''}>
            {isPickup || isShipping ? 'Total:' : 'Subtotal:'}
          </span> ${isPickup || isShipping ? totalWithTaxAndShipping : totalPrice.toFixed(2)}
          {(isPickup || isShipping) && (
            <button className="purchase-button" onClick={handlePurchase}>
              {isShipping && !isAuthenticated ? 'Purchase Now' : 'Purchase'}
            </button>
          )}
        </div>
      </div>
      <SignInModal isOpen={isSignInModalOpen} toggleModal={toggleSignInModal} />
    </div>
  );
}

export default Cart;
