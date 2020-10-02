import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import RegisterPage from '../pages/User-Register';

const spyReturns = (returnValue) => jest.fn(() => returnValue);

describe('scenario', () => {
  // Ref. https://stackoverflow.com/questions/48790927/how-to-change-mock-implementation-on-a-per-single-test-basis-jestjs
  const setup = (mockOverrides) => {
    const mockedFunctions = {
      a: spyReturns({
        name: 'Marco Barbosa',
        email: 'marco.meireles.b',
        password: 123456,
        role: 'client',
      }),
      ...mockOverrides,
    };
    return {
      mockedModule: jest.doMock('../services/functions/createUserAPI', () => mockedFunctions),
    };
  };

  afterEach(() => {
    cleanup();
  });

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
    const { getByTestId, getByText } = renderWithRouter(<RegisterPage />);
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

  test('test api return role client', () => {
    const { getByTestId } = renderWithRouter(<RegisterPage />);
    const { mockedModule } = setup();
    console.log(mockedModule);
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
    fireEvent.click(signup);
  });

  test('test api return role administrator', () => {
    const { getByTestId } = renderWithRouter(<RegisterPage />);
    const { mockedModule } = setup();
    console.log(mockedModule);
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
    fireEvent.click(signup);
  });

  test('test api return error', () => {
    const { getByTestId } = renderWithRouter(<RegisterPage />);
    const { mockedModule } = setup({ a: spyReturns({ message: 'error' }) });
    console.log(mockedModule);
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
    fireEvent.click(signup);
  });
});
