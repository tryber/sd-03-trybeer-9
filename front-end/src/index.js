import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BeerProvider from './context/context';

ReactDOM.render(
  <BeerProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BeerProvider>,
  document.getElementById('root'),
);
