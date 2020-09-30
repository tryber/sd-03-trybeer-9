import React from 'react';
import adminOrderDetailCSS from './CSS/AdminOrderDetail.css';

const adminOrderDetail = ({Children, OrderNumber}) => {
  return (
    <div>
      { Children &&
      <div>
        <div>
          <span data-testid="order-number">Pedido {OrderNumber}</span> - <span data-testid="order-status">{Children.orderStatus[0].status}</span>
        </div>
        {Children.orderProducts.map((e, i) =>
          <div className="list-container" key={e.name}>
            <div data-testid={`${i}-product-qtd`}>{e.quantity}</div>
            <div>{` - `}</div>
            <div data-testid={`${i}-product-name`}>{e.name}</div>
            <div data-testid={`${i}-product-total-value`}>{`R$ ${(e.quantity*e.price).toFixed(2).replace('.',',')}`}</div>
            <div data-testid={`${i}-order-unit-price`}>{`(R$ ${(e.price).toFixed(2).replace('.',',')})`}</div>
          </div>
        )}
        <div data-testid="order-total-value">
          {
          `Total R$ ${(Children.orderProducts.reduce(((acc, e) =>
              acc = e.price * e.quantity), 0)).toFixed(2).replace('.',',')}`
          }
        </div>
        <div><button data-testid="mark-as-delivered-btn">Marcar como entregue</button></div>
      </div>
      }
    </div>
  );
};

export default adminOrderDetail;
