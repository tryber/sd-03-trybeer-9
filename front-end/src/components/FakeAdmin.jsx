import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BeerContext } from '../context/context';

// requisito 9 ? MenuTopAdmin : FakeAdmin

const cardOrders = (numOrder, adress, total, status, i) => (
  <Link to="/admin/orders/:id">
    <div>
      <p data-testid={`${i}-order-number`}>Pedido: {numOrder}</p>
      <p data-testid={`${i}-order-address`}>Endereço: {adress}</p>
      <p data-testid={`${i}-order-total-value`}>R$ {total}</p>
      <label data-testid={`${i}-order-status`}>{status}</label>
    </div>
  </Link>
);

const FakeAdmin = () => {
  const { cart } = useContext(BeerContext);

  return (
    <div>
      <Link data-testid="side-menu-item-profile" to="/admin/profile" >Profile</Link>
      {cart?.map((e, i) => cardOrders(e.pedido, e.endereco, e.total, e.status, i))}
    </div>
  );
}

export default FakeAdmin;
