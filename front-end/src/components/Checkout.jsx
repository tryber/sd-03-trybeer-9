import React, { useState } from 'react';
import SaleOrderAPI from '../services/SaleOrderService';

const createOrderAPI = async ({
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
}) => {
  return await SaleOrderAPI(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  )
    .then((data) =>  data)
    .catch((error) => error);
};

// Se o localStorage existe
const localStorageCart = [
  {'Skol Lata 250ml': 2.20},
  {'Heineken 600ml': 7.50},
  {'Antarctica Pilsen 300ml': 2.49},
  {'Brahma 600ml': 7.50},
  {'Skol Lata 250ml': 2.20},
];

// Se o localStorage não existe
// const localStorageCart = [];

const Checkout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryNumber, setDeliveryNumber] = useState();

  // Criando um array com os nomes das keys das chaves
  const quantityArray = localStorageCart.map((e) => Object.keys(e));
  const quantityKeysArray = quantityArray.map((e) => e[0]);

  // Contanto quantas vezes cada nome se repete
  // Ref. https://stackoverflow.com/questions/34615493/count-duplicates-in-an-array
  const counts = {};
  quantityKeysArray.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  // Criando um arrays final para fazer uma listagem dos produtos com quantidade e preço
  const listCart = [];
  const keys = Object.keys(counts);
  const values = Object.values(counts);
  // let pricesIndex = keys.map((e) => quantityKeysArray.findIndex((x) => x === e));
  for (let i = 0; i < keys.length; i += 1) {
    listCart.push(
      {
        quantity:values[i],
        name:keys[i],
        price: localStorageCart[i][`${keys[i]}`],
      })
  }
  // console.log('Listar Carrinho: ', listCart);

  // Calcula o valor total do pedido
  let totalPrice = listCart.reduce(((accum, { price }) =>
    accum + price), 0);

  // O quê será exibido
  let showDisplay = false;
  if (localStorageCart.length) showDisplay = true;

  // Funcao para enviar pedido
  const sendOrder = async () => {
    // Ref. https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    const saleDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const orderJson = 
    {
      userId: 2,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status: 'Pendente',
    };
    const response = await createOrderAPI(orderJson);
    console.log('Resposta: ', response);
  };

  return (
    <div><h2>Produtos</h2>
      <br />
      <div>
        {!showDisplay &&
          <h2>Não há produtos no carrinho</h2>
        }
      </div>
      <div>
      {showDisplay &&
        <p>
          <span>Qtd{' '}</span>
          <span>Descrição{' '}</span>
          <span>Valor unitário{' '}</span>
          <span>Valor Total{' '}</span>
        </p>
      }
      </div>
      <div>
        {showDisplay &&
          listCart.map((e, i) =>
           <p key={e.name}>
              {/*Ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString*/}
              <span data-testid={`${i}-product-qtd-input`}>{e.quantity}{' '}</span>
              <span data-testid={`${i}-product-name`}>{e.name}{' '}</span>              
              <span
                data-testid={`${i}-product-unit-price`}
              >
                R${' '}{e.price.toFixed(2).toLocaleString()}{' '}</span>
              <span
                data-testid={`${i}-product-total-value`}
              >
                R${' '}{(e.quantity * e.price).toFixed(2).toLocaleString()}{' '}</span>
              <button data-testid={`${i}-removal-button`}>X</button>
          </p>)
        }
      </div>
      <div>
        <span data-testid="order-total-value">
          Total:{' '}{
          totalPrice.toFixed(2)}
        </span>
      </div>
      <div>
        <fieldset>
          <legend>Endereço para entrega</legend>
          <label htmlFor="delivery_address">Rua</label>
          <input
            type="text" name="delivery_address" data-testid="checkout-street-input"
            onChange={(e) => setDeliveryAddress(e.target.value)}
          /><br />
          <label htmlFor="delivery_number">Número da casa</label>
          <input
            type="text" name="delivery_number" data-testid="checkout-house-number-input"
            onChange={(e) => setDeliveryNumber(e.target.value)}
          /><br />
          <button
            type="button" data-testid="checkout-finish-btn" disabled={!localStorageCart.length}
            onClick={() => sendOrder()}
          >Finalizar Pedido
          </button><br />
        </fieldset>
      </div>
    </div>
  );
};

export default Checkout;
