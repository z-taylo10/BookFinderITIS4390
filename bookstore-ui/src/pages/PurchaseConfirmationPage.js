import React, { useState, useEffect } from 'react';

function PurchaseConfirmationPage() {
  const [tempAddress, setTempAddress] = useState(null);
  const [tempPayment, setTempPayment] = useState(null);

  useEffect(() => {
    if (tempAddress) {
      setTempAddress(null); // Clear temporary address
    }
    if (tempPayment) {
      setTempPayment(null); // Clear temporary payment
    }
  }, []);

  return (
    <div className="purchase-confirmation-page">
      <h2>Purchase Confirmation</h2>
      <p>Your order has been successfully placed!</p>
      <p>Thank you for shopping with us!</p>
    </div>
  );
}

export default PurchaseConfirmationPage; 