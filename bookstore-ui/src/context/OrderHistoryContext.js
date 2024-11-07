import React, { createContext, useState, useEffect, useCallback } from 'react';

export const OrderHistoryContext = createContext();

export const OrderHistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addOrder = useCallback((order) => {
    setOrderHistory((prevOrders) => [...prevOrders, order]);
  }, []);

  const removeOrder = useCallback((index) => {
    setOrderHistory((prevOrders) => prevOrders.filter((_, i) => i !== index));
  }, []);

  return (
    <OrderHistoryContext.Provider value={{ orderHistory, addOrder, removeOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};