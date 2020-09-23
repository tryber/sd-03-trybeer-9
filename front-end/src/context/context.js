import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [price, setTotalPrice] = useState('0');

  const context = {
    shopCart: {
      basket,
      setBasket,
      price,
      setTotalPrice,
    },
  };

  return (
    <BeerContext.Provider value={ context }>
      {children}
    </BeerContext.Provider>
  );
};

BeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BeerProvider;
