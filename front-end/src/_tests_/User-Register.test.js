import React from 'react';
import { cleanup, fireEvent, getByText } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import RegisterPage from '../pages/User-Register';
// import userRegisterAPI from '../services/UserRegisterService';
import axios from 'axios';

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

test('test input warnings', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const newRegister = getByTestId('no-account-btn');
  fireEvent.click(newRegister); 
  const name = getByTestId('signup-name');
  const email = getByTestId('signup-email');
  const password = getByTestId('signup-password');
  const seller = getByTestId('signup-seller');
  const signup = getByTestId('signup-btn');
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(seller).toBeInTheDocument();
  expect(signup).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Marco' } });
  fireEvent.change(email, { target: { value: 'marco.meireles.bx' } });
  fireEvent.change(password, { target: { value: 'xyz' } });
  const nameWarning = getByText('O nome deve conter 12 caracters e apenas letras');
  const emailWarning = getByText('Digite um email válido');
  const passwordWarning = getByText('A senha deve conter apenas número e ter tamanho mínimo de 6 caracteres');
  expect(nameWarning).toBeInTheDocument();
  expect(emailWarning).toBeInTheDocument();
  expect(passwordWarning).toBeInTheDocument();
});

// jest.mock('../services/UserRegisterService', () => ({
//   name: 'Marco Barbosa',
//   email: 'marco.meireles.b@gmail.com',
//   password: 123456,
//   role: 'administrator',  
// }));

jest.mock('./helper/simpleFunction', () => {console.log('Fui clickada estando mockada')});

test('test api return role client', async () => {
  const { getByTestId, history } = renderWithRouter(<App />);
  const newRegister = getByTestId('no-account-btn');
  fireEvent.click(newRegister); 
  const name = getByTestId('signup-name');
  const email = getByTestId('signup-email');
  const password = getByTestId('signup-password');
  const seller = getByTestId('signup-seller');
  const signup = getByTestId('signup-btn');
  
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(seller).toBeInTheDocument();
  expect(signup).toBeInTheDocument();
  
  fireEvent.change(name, { target: { value: 'Marco Barbosa' } });
  fireEvent.change(email, { target: { value: 'marco.meireles.b@gmail.com' } });
  fireEvent.change(password, { target: { value: 123456 } });
  await fireEvent.click(signup);
  console.log(history.location.pathname);
});

test('test api return role administrator', async () => {
  const { getByTestId, history } = renderWithRouter(<App />);
  const newRegister = getByTestId('no-account-btn');
  fireEvent.click(newRegister);  
  const name = getByTestId('signup-name');
  const email = getByTestId('signup-email');
  const password = getByTestId('signup-password');
  const seller = getByTestId('signup-seller');
  const signup = getByTestId('signup-btn');
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(seller).toBeInTheDocument();
  expect(signup).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Marco Barbosa' } });
  fireEvent.change(email, { target: { value: 'marco.meireles.b@gmail.com' } });
  fireEvent.change(password, { target: { value: 123456 } });
  fireEvent.click(seller);
  await fireEvent.click(signup);
  console.log(history.location.pathname);
});
