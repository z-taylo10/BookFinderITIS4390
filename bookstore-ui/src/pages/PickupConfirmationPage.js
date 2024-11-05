import React, { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';
import { CartContext } from '../context/CartContext';
import '../stylesheets/PickupConfirmationPage.css';

function PickupConfirmationPage() {
  const { payment, tempPayment } = useContext(PaymentContext);
  const { cart } = useContext(CartContext);

  const name = payment?.nameOnCard || tempPayment?.nameOnCard || 'John Doe';
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  const tax = totalPrice * 0.08;
  const totalWithTax = (totalPrice + tax).toFixed(2);

  return (
    <div className="pickup-confirmation-page">
      <h2 className="purchase-title-pickup">Your Purchase</h2>
      <div className="pickup-box-pickup">
        <h3>Pick up at <span className="store-name-pickup">BookWiz</span> In Person Store</h3>
        <p><strong>Name:</strong> {name}</p>
        <p className="not-ready-pickup">Not Ready for Pick Up</p>
        <div className="book-list-pickup">
          {cart.map((item, index) => (
            <div key={index} className="book-item-pickup">
              <span>{index + 1}. {item.title}</span>
              <span>Price: ${parseFloat(item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="total-row-pickup">
          <span>Tax: ${tax.toFixed(2)}</span>
          <span style={{ marginLeft: '20px' }}>Total: ${totalWithTax}</span>
        </div>
      </div>
    </div>
  );
}

export default PickupConfirmationPage;
