import React from 'react';
import { cleanup, fireEvent, getByText, render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../src/App';
import Products from '../src/components/Products';

afterEach(cleanup);

test('verify route equal products', () => {
  const { getByText } = render(<Products/>);
  const trybeer = getByText('TryBeer');
  expect(trybeer).toBeInTheDocument();
});

test('test API return products', () => {
  const { getByText } = render(<Products/>)
});