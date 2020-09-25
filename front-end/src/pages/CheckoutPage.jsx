import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MenuTop from '../components/MenuTop';
import { BeerContext } from '../context/context';
import Checkout from '../components/Checkout.jsx';

const { token } = JSON.parse(localStorage.getItem('user')) || [];

function CheckoutPage() {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { setTitle } = useContext(BeerContext);
  
  useEffect(() => {
    setTitle('Finalizar Pedido');
  });

  useEffect(() => {
    axios.get('http://localhost:3001/profile', {
      headers: {
        Authorization: token,
      },
    })
      .catch(() => { setRedirectToLogin(true); });
  }, [token]);

  // if (redirectToLogin) return (<Redirect to="/login" />);

  return (
    <div>
      <MenuTop />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
