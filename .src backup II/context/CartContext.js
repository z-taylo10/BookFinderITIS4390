import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    console.log('Loaded cart from localStorage:', storedCart); // Debugging line
    if (storedCart && Array.isArray(storedCart)) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    console.log('Saving cart to localStorage:', cart); // Debugging line
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    console.log('Removing from cart:', index);
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
