import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const BeerContext = createContext();

const BeerProvider = ({ children }) => {
  const context = {
    state: 'grupo09',
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
