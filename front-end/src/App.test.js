import React from 'react';
import renderWithRouter from './_tests_/renderWithRouter';
import App from './App';

test('renders Trybeer logo', () => {
  const { getByText } = renderWithRouter(<App />);
  const tag = getByText(/Trybeer/i);
  expect(tag).toBeInTheDocument();
});
