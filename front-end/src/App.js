import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuTop from './components/MenuTop';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <MenuTop />
      <Route path="/login" component={ Login } />
    </Router>
  );
}

export default App;
