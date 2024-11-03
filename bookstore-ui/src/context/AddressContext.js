import React, { createContext, useState, useEffect } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(() => {
    const savedAddress = localStorage.getItem('address');
    return savedAddress ? JSON.parse(savedAddress) : {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address));
  }, [address]);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
