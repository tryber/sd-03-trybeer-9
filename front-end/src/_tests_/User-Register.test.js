import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import RegisterPage from '../pages/User-Register';

afterEach(cleanup);

test('renders correct inputs', () => {
  const { getByTestId, getByText } = renderWithRouter(<RegisterPage />);
  const name = getByTestId('signup-name');
  const labelForName = getByText('Nome');
  expect(name).toBeInTheDocument();
  expect(name.name).toBe('name');
  expect(labelForName).toBeInTheDocument();

  const email = getByTestId('signup-email');
  const labelForEmail = getByText('Email');
  expect(email).toBeInTheDocument();
  expect(email.name).toBe('email');
  expect(labelForEmail).toBeInTheDocument();

  const password = getByTestId('signup-password');
  const labelForPassword = getByText('Password');
  expect(password).toBeInTheDocument();
  expect(password.name).toBe('password');
  expect(labelForPassword).toBeInTheDocument();

  const seller = getByTestId('signup-seller');
  const labelForSeller = getByText('Quero Vender');
  expect(seller).toBeInTheDocument();
  expect(seller.name).toBe('vendor');
  expect(labelForSeller).toBeInTheDocument();

  const signup = getByTestId('signup-btn');
  const labelForSignup = getByText('Cadastrar');
  expect(signup).toBeInTheDocument();
  expect(labelForSignup).toBeInTheDocument();  
});

test('test api return role client', () => {
  const { getByTestId, history } = renderWithRouter(<RegisterPage />);
  const axios = require('axios');
  jest.mock('axios');
  axios.post.mockResolvedValue({
    name: 'Marco Barbosa',
    email: 'marco.meireles.b@gmail.com',
    password: 123456,
    role: 'client',
  });
  const name = getByTestId('signup-name');
  const email = getByTestId('signup-email');
  const password = getByTestId('signup-password');
  const seller = getByTestId('signup-seller');
  const signup = getByTestId('signup-btn');
  fireEvent.change(name, { target: { value: 'Marco Barbosa' } });
  fireEvent.change(email, { target: { value: 'marco.meireles.b@gmail.com' } });
  fireEvent.change(password, { target: { value: 123456 } });
  fireEvent.click(signup);
});

test('test api return role administrator', () => {
  const { getByTestId, history } = renderWithRouter(<RegisterPage />);
  const axios = require('axios');
  jest.mock('axios');
  axios.post.mockResolvedValue({
    name: 'Marco Barbosa',
    email: 'marco.meireles.b@gmail.com',
    password: 123456,
    role: 'administrator',
  });
  const name = getByTestId('signup-name');
  const email = getByTestId('signup-email');
  const password = getByTestId('signup-password');
  const seller = getByTestId('signup-seller');
  const signup = getByTestId('signup-btn');
  fireEvent.change(name, { target: { value: 'Marco Barbosa' } });
  fireEvent.change(email, { target: { value: 'marco.meireles.b@gmail.com' } });
  fireEvent.change(password, { target: { value: 123456 } });
  fireEvent.click(signup);
  console.log(global.window.location.pathname);
});