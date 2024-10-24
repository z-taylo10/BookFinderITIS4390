import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}

export default Cart;
