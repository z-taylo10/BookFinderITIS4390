import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (storedWishlist && Array.isArray(storedWishlist)) {
      setWishlist(storedWishlist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => [...prevWishlist, item]);
  };

  const removeFromWishlist = (index) => {
    setWishlist((prevWishlist) => prevWishlist.filter((_, i) => i !== index));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
