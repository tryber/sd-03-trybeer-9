import React, { createContext } from 'react';

const BeerContext = createContext();

const ContextProvider = ({ children }) => {
  
  const context = {
    state: 'grupo09',
  }

  return (
    <BeerContext.Provider value={context}>
      {children}
    </BeerContext.Provider>
  );
}
