import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cardOrders = (orders) => (
  orders.map(({ numberDelivery, addressDelivery, totalPrice, status }, i) => (
    <Link to={`/admin/orders/${i}`}>
      <div style={{ border: '1px solid black' }} key={numberDelivery}>
        <p data-testid={`${i}-order-number`}>Pedido {numberDelivery}</p>
        <p data-testid={`${i}-order-address`}>Endereço {addressDelivery}</p>
        <p data-testid={`${i}-order-total-value`}>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
        <label data-testid={`${i}-order-status`}>{status}</label>
      </div>
    </Link>
  ))
);

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/adminOrders').then(({ data }) => setOrders(data));
  }, []);

  console.log(orders);

  return (
    <div>
      {cardOrders(orders)}
    </div>
  );
}

export default AdminOrders;
