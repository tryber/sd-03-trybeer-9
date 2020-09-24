import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BeerProvider from './context/context';

ReactDOM.render(
  <BeerProvider>
    <App />
  </BeerProvider>,
  document.getElementById('root'),
);
