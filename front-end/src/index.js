import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BeerProvider from './context/context';

ReactDOM.render(
  <BrowserRouter>
    <BeerProvider>
      <App />
    </BeerProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
