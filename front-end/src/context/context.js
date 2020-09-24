import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // const [price, setTotalPrice] = useState('0');

  const context = {
    cart,
    setCart,
  };

  return (
    <BeerContext.Provider value={context}>
      {children}
    </BeerContext.Provider>
  );
};

BeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BeerProvider;
