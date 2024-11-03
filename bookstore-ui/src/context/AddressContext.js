import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};
