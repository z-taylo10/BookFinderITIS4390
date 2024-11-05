import React, { useContext, useEffect } from 'react';
import { PaymentContext } from '../context/PaymentContext';

function PickupConfirmationPage() {
  const { tempPayment, setTempPayment } = useContext(PaymentContext);

  useEffect(() => {
    if (tempPayment) {
      setTempPayment(null); // Clear temporary payment
    }
  }, [tempPayment, setTempPayment]);

  return (
    <div className="pickup-confirmation-page">
      <h2>Pickup Confirmation</h2>
      <p>Your order is ready for pickup at the store.</p>
      <p>Thank you for shopping with us!</p>
    </div>
  );
}

export default PickupConfirmationPage;
