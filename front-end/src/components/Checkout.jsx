import React from 'react';

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

  return (
    <div>Produtos
      <br />
      <div>
        {localStorageCart &&
          listCart.map((e, i) =>
           <p key={e.name}>
              {/*Ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString*/}
              <span data-testid={`${i}-product-qtd-input`}>{e.quantity}{' '}</span>
              <button data-testid={`${i}-removal-button`}>X</button>
              <span data-testid={`${i}-product-name`}>{e.name}{' '}</span>
              <button data-testid={`${i}-removal-button`}>X</button>
              <span
                data-testid={`${i}-product-unit-price`}
              >
                R${' '}{e.price.toFixed(2).toLocaleString()}{' '}</span>
              <button data-testid={`${i}-removal-button`}>X</button>
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
          listCart.reduce(((accum, { price }) =>
            accum + price), 0).toFixed(2)}
        </span>
      </div>
      <div>
        <fieldset>
          <legend>Endereço para entrega</legend>
          <label htmlFor="delivery_address">Rua</label>
          <input type="text" name="delivery_address" data-testid="checkout-street-input" /><br />
          <label htmlFor="delivery_number">Número da casa</label>
          <input type="text" name="delivery_number" data-testid="checkout-house-number-input" /><br />
          <button type="button" data-testid="checkout-finish-btn">Finalizar Pedido</button><br />
        </fieldset>
      </div>
    </div>
  );
};

export default Checkout;
