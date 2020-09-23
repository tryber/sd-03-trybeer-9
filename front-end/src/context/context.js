import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const BeerContext = createContext();

const ContextProvider = ({ children }) => {
  const context = {
    state: 'grupo09',
  };

  return (
    <BeerContext.Provider value={ context }>
      {children}
    </BeerContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
