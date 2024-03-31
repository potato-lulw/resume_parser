// currJobContext.js

import React, { createContext, useState, useContext } from 'react';

// Create context
const CurrJobContext = createContext();

// Create provider
export const CurrJobProvider = ({ children }) => {
  const [currJob, setCurrJob] = useState("");

  return (
    <CurrJobContext.Provider value={{ currJob, setCurrJob }}>
      {children}
    </CurrJobContext.Provider>
  );
};

// Custom hook to use the context
export const useCurrJob = () => useContext(CurrJobContext);
