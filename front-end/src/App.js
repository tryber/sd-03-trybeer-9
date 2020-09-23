import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MenuTop from './components/MenuTop';
import Login from './components/Login';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <MenuTop />
      <Route path="/login" component={ Login } />
      <Route path="/products" component={ Products } />
    </Router>
  );
}

export default App;
