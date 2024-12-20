import React, { createContext, useState, useEffect } from 'react';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payment, setPayment] = useState(() => {
    const savedPayment = localStorage.getItem('payment');
    return savedPayment ? JSON.parse(savedPayment) : {
      cardNumber: '',
      nameOnCard: '',
      expirationMonth: '',
      expirationYear: '',
    };
  });

  const [tempPayment, setTempPayment] = useState(null);

  useEffect(() => {
    localStorage.setItem('payment', JSON.stringify(payment));
  }, [payment]);

  return (
    <PaymentContext.Provider value={{ payment, setPayment, tempPayment, setTempPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
