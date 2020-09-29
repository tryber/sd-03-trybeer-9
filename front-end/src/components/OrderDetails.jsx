import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';

const decimal = 2;

function OrderDetails() {
  const { orderNumber, setTitle, orderInfo } = useContext(BeerContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const [orderDetails, setOrderDetails] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user')) || [];

  useEffect(() => {
    setTitle('Detalhes de Pedido');
    axios.get(`http://localhost:3001/orderDetails/${orderNumber}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => setOrderDetails(response.data.details))
      .catch(() => { setRedirectToLogin(true); });
  }, [orderNumber, setTitle, token]);
  return (
    <div>
      <MenuTop />
      {redirectToLogin && <Redirect to="/login" />}
      <h3 data-testid="order-number">{`Pedido ${orderNumber}`}</h3>
      <h3 data-testid="order-date">{orderInfo.date}</h3>
      {orderDetails.map(({ name, quantity, price }, index) => (
        <div key={ name }>
          <span data-testid={ `${index}-product-qtd` }>{`${quantity}`}</span>
          <span data-testid={ `${index}-product-name` }>{name}</span>
          <span data-testid={ `${index}-product-total-value` }>{`R$ ${(quantity * price).toFixed(decimal).replace('.', ',')}`}</span>
        </div>
      ))}
      <h3 data-testid="order-total-value">{`R$ ${Number(orderInfo.total).toFixed(decimal).replace('.', ',')}`}</h3>
    </div>
  );
}

export default OrderDetails;
