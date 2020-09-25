import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [title, setTitle] = useState('');

  const context = {
    cart,
    setCart,
    title,
    setTitle,
    teste: 2,
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
