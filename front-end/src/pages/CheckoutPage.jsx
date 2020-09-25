import React, { useEffect, useContext } from 'react';
import MenuTop from '../components/MenuTop';
import { BeerContext } from '../context/context';
import Checkout from '../components/Checkout.jsx';

function CheckoutPage() {
  const { setTitle } = useContext(BeerContext);

  useEffect(() => {
    setTitle('Finalizar Pedido');
  });

  return (
    <div>
      <MenuTop />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
