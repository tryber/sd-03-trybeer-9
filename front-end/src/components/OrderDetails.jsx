import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';

const decimal = 2;

function OrderDetails() {
  const { orderNumber, setTitle, orderInfo } = useContext(BeerContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user')) || [];

  useEffect(() => {
    setTitle('Detalhes de Pedido');
    axios.get(`http://localhost:3001/orderDetails/${orderNumber}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => setOrderDetails(response.data.details));
  }, [orderNumber, setTitle, token]);
  return (
    <div>
      <MenuTop />
      <h3 data-testid="order-number">{`Pedido ${orderNumber}`}</h3>
      <h3 data-testid="order-date">{orderInfo.date}</h3>
      {orderDetails.map(({ name, quantity, price }, index) => (
        <div key={ name }>
          <span data-testid={ `${index}-product-qtd` }>{`test${quantity}`}</span>
          <span data-testid={ `${index}-product-name` }>{name}</span>
          <span data-testid={ `${index}-product-total-value` }>{quantity * price}</span>
        </div>
      ))}
      <h3 data-testid="order-total-value">{`RS${Number(orderInfo.total).toFixed(decimal).replace('.', ',')}`}</h3>
    </div>
  );
}

export default OrderDetails;
