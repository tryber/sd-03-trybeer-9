// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



import React from 'react';
import renderWithRouter from '../tests/renderWithRouter';
import App from './App';
import { cleanup, fireEvent, getByText, render } from '@testing-library/react';
import Products from './components/Products';
import Checkout from './components/Checkout';


afterEach(cleanup);

jest.fn();

const products = jest.fn(() => ({
  name: 'Skol',
  price: 'R$ 2,20'
}))

test('verify router equal products', () => {
  const { getByText } = render(<Products />);
  const trybeer = getByText('TryBeer');
  expect(trybeer).toBeInTheDocument();
});

test('test add item in cart', () => {
  const { getByText } = render(<Products />)
  const verCarrinho = getByText('Ver Carrinho');
  fireEvent.click(verCarrinho);

  const addItem = getByText('+');
  fireEvent.click(addItem);
  fireEvent.click(verCarrinho);
  // const { getByText } = render(<Checkout />);
  const redirectToCheckout = getByText('Finalizar Pedido');
  expect(redirectToCheckout).toBeTrue();
});

test('test remove item in cart', () => {
  const { getByText, getByTestId } = render(<Products />);
  const addItem = getByText('+');
  fireEvent.click(addItem);
  const totalCart = getByTestId('checkout-bottom-btn-value');
  expect(totalCart.length).toEqual(1);

  const removeItem = getByText('-');
  fireEvent.click(removeItem);
  expect(totalCart).toEqual('R$ 0,00');
});
