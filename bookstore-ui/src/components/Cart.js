import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  console.log('Rendering cart with items:', cart); // Debugging line

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);

  const handleShipToYou = () => {
    navigate('/shipping');
  };

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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={handleShipToYou} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Ship to You</button>
        <button style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Pick up at Store</button>
      </div>
    </div>
  );
}

export default Cart;
