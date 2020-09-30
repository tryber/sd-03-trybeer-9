import React from 'react';
import adminOrderDetailCSS from './CSS/AdminOrderDetail.css';

const adminOrderDetail = ({Children, OrderNumber}) => {
  return (
    <div>
      { Children &&
      <div>
        <div>Pedido {OrderNumber} - {Children.orderStatus[0].status}</div>
        {Children.orderProducts.map((e, i) =>
          <div className="list-container" key={e.name}>
            <div data-testid={`${i}-product-qtd`}>{e.quantity}</div>
            <div>{` - `}</div>
            <div data-testid={`${i}-product-name`}>{e.name}</div>
            <div data-testid={`${i}-product-total-value`}>{`R$ ${(e.quantity*e.price).toFixed(2).replace('.',',')}`}</div>
            <div data-testid={`${i}-order-unit-price`}>{`(R$ ${e.price})`}</div>
          </div>
        )}
      </div>
      }
    </div>
  );
};

export default adminOrderDetail;
