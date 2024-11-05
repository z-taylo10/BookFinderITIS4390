import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../stylesheets/CartPage.css';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isPickup, setIsPickup] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  const tax = isPickup ? totalPrice * 0.08 : 0;
  const totalWithTax = (totalPrice + tax).toFixed(2);

  const handlePickupToggle = () => {
    setIsPickup(!isPickup);
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
          <button className="ship-button">Ship to You</button>
          <button onClick={handlePickupToggle} className={`pickup-button ${isPickup ? 'active' : ''}`}>
            Pick up at Store
          </button>
          {isPickup && (
            <span className="cart-tax">Tax 8%: ${tax.toFixed(2)}</span>
          )}
        </div>
        <div className="cart-subtotal">
          <span className={isPickup ? 'total-text' : ''}>
            {isPickup ? 'Total:' : 'Subtotal:'}
          </span> ${isPickup ? totalWithTax : totalPrice.toFixed(2)}
          {isPickup && <button className="purchase-button">Purchase</button>}
        </div>
      </div>
    </div>
  );
}

export default Cart;
