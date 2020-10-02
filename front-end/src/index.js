import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import BeerProvider from './context/context';

ReactDOM.render(
  <BeerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BeerProvider>,
  document.getElementById('root'),
);
