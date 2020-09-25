import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Products from './components/Products';
import UserRegisterPage from './pages/User-Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/orders" />
        <Route path="/login" component={ Login } />
        <Route path="/profile" component={ Profile } />
        <Route path="/products" component={ Products } />
        <Route path="/register" component={ UserRegisterPage } />
        <Route path="/orders" component={ Products } />
        {/* fake ^^ */}
        <Route path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
