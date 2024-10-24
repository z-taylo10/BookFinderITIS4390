import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  console.log('Rendering cart with items:', cart); // Debugging line

  const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cart.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '70%', margin: '0 auto', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <img src={item.thumbnail} alt={`${item.title} cover`} style={{ width: '80px', marginRight: '20px' }} />
            <div style={{ flexGrow: 1 }}>
              <p><strong>Title:</strong> {item.title}</p>
              <p><strong>Author(s):</strong> {item.authors || 'N/A'}</p>
            </div>
            <div style={{ marginRight: '20px' }}>${item.price}</div>
            <button onClick={() => removeFromCart(index)} style={{ marginLeft: '10px' }}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}

export default Cart;
