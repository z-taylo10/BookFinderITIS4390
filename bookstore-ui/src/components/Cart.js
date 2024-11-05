import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../stylesheets/CartPage.css'; // Import the new stylesheet

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);

  const handleShipToYou = () => {
    navigate('/shipping');
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-container">
        <div className="cart-header">
          <span>Price:</span>
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
          <button onClick={handleShipToYou} className="ship-button">Ship to You</button>
          <button className="pickup-button">Pick up at Store</button>
        </div>
        <div className="cart-subtotal">
          <span>Subtotal:</span> ${totalPrice}
        </div>
      </div>
    </div>
  );
}

export default Cart;
