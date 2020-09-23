import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BeerProvider from './context/context';

ReactDOM.render(
  <React.StrictMode>
    <BeerProvider>
      <App />
    </BeerProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
