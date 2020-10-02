import React from 'react';
import renderWithRouter from './_tests_/renderWithRouter';
import App from './App';

test('Test redirection', () => {
  const app = renderWithRouter(<App />);
  const { history } = app;
  expect(history.location.pathname).toBe('/login');
});
