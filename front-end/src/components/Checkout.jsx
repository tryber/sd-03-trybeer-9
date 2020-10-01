import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SaleOrderAPI from '../services/SaleOrderService';

// Commit inicial

const createOrderAPI = async ({
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status,
      store,

}) => {
  return await SaleOrderAPI(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
    store,
  )
    .then((data) =>  data)
    .catch((error) => error);
};

let localStorageCart = [];
// let total = 0;
const Checkout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryNumber, setDeliveryNumber] = useState();
  const [message, setMessage] = useState('');
  const [localStorageActualized, setLocalStorageActualized] = useState(false);

  useEffect(() => {
    // Inicializacao do sensor de mudança do localStorage
    setLocalStorageActualized(() => false);
  });

  useEffect(() => {
    // Se o localStorage existe
    const cart = localStorage.getItem('cart');
    if (cart && cart !== '[]') {
      localStorageCart = [...JSON.parse(cart)]; 
    } else {
      // Testes
      // localStorageCart = [
      //   { name:'Skol Lata 250ml', price: 2.20 },
      //   { name:'Heineken 600ml', price: 7.50 },
      //   { name: 'Antarctica Pilsen 300ml', price: 2.49 },
      //   { name: 'Brahma 600ml', price: 7.50 },
      //   { name: 'Skol Lata 250ml', price: 2.20 },
      // ];
  }

// Se o localStorage não existe
// const localStorageCart = [];
  });

  // Criando um array com os nomes das keys das chaves
  const quantityKeysArray = localStorageCart.map((e) => e.name);
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
        price: localStorageCart[i]['price'],
      })
  }
  // Calcula o valor total do pedido
  let totalPrice = listCart.reduce(((accum, { quantity, price }) =>
  accum + quantity * price), 0);
  
  // O quê será exibido
  let showDisplay = false;
  if (localStorageCart.length) showDisplay = true;


  // Funcao para enviar pedido
  const sendOrder = async () => {
    // Ref. https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    const saleDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!deliveryAddress || !deliveryNumber) {
      return setMessage('Todos os campos devem ser preenchidos!');
    }
    const store = JSON.parse(localStorage.getItem('cart'));

    const orderJson = 
    {
      userId: 2,
      store,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status: 'Pendente',
    };
    const response = await createOrderAPI(orderJson);
    if (response.status === 201) {
      // delete o localStorage
      // Sobreescreva o localStorage como novo conteudo de cart
      localStorage.setItem('cart', JSON.stringify([]));
      // Atualize o estado
      // setLocalStorageActualized(true);
      return setMessage('Compra realizada com sucesso!');
    }
  };

  const removeItem = (item) => {
    const newCart = [];
    const numberOfItems = [];
    quantityKeysArray.forEach((e, i) => {
      if (e === item) numberOfItems.push(i);
    });

    // Se quiser excluir todas as quantidades use o laço for
    for (let i = 0; i < numberOfItems.length; i += 1 ) {
      // Achando o indice dele na lista
      newCart.push(quantityKeysArray.findIndex((e) => e === item));
      // Excluindo do array
      localStorageCart.splice(newCart[0], 1);
    }

    // Se quiser excluir uma quantidade de cada vez,
    // comente o laço for e descomente as linhas abaixo
    // Achando o indice dele na lista
    // newCart.push(quantityKeysArray.findIndex((e) => e === item));
    // Excluindo do array
    // localStorageCart.splice(newCart[0], 1);

    // Sobreescreva o localStorage como novo conteudo de cart
    localStorage.setItem('cart', JSON.stringify(localStorageCart));
    // Atualize o estado
    setLocalStorageActualized(true);
  };

  if (message === 'Compra realizada com sucesso!') {
    setTimeout(() => {
      setMessage('Redirecionando');
    }, 2000);
  }
  if (message === 'Redirecionando') {
    return (<Redirect to="/products" />);
  }

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
              <span data-testid={`${i}-product-qtd-input`}>{e.quantity}</span>{' '}
              <span data-testid={`${i}-product-name`}>{e.name}</span>{' '}
              <span
                data-testid={`${i}-product-unit-price`}
              >
              {`(R$ ${e.price.toFixed(2).replace('.',',')} un)`}
              </span>{' '}
              <span
                data-testid={`${i}-product-total-value`}
              >
                {`R$ ${(e.quantity * e.price).toFixed(2).replace('.',',')}`}</span>{' '}
              <button
                data-testid={`${i}-removal-button`}
                onClick={() => removeItem(e.name)}
              >X</button>
          </p>)
        }
      </div>
      <div>
        <span>Total:{' '}</span>
        <span data-testid="order-total-value">
          R${' '}{
          totalPrice.toFixed(2).replace('.',',')}
        </span>
      </div>
      <div>
        <fieldset>
          <legend>Endereço para entrega</legend>
          <label htmlFor="delivery_address">Rua{' '}</label>
          <input
            type="text" name="delivery_address" data-testid="checkout-street-input"
            onChange={(e) => setDeliveryAddress(e.target.value)}
          /><br />
          <label htmlFor="delivery_number">Número da casa{' '}</label>
          <input
            type="text" name="delivery_number" data-testid="checkout-house-number-input"
            onChange={(e) => setDeliveryNumber(e.target.value)}
          /><br />
          <button
            type="button" data-testid="checkout-finish-btn"
            disabled={
              !localStorageCart.length ||
              (message === 'Compra realizada com sucesso!') ||
              !deliveryAddress ||
              !deliveryNumber
            }
            onClick={() => sendOrder()}
          >Finalizar Pedido
          </button><br />
        </fieldset>
        <div><h3 style={{color: '#ff0000'}}>{message}</h3></div>
      </div>
    </div>
  );
};

export default Checkout;
