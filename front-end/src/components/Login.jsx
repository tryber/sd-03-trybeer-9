import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './CSS/Login.css';

const doLogin = (password, email, setMessage, setRedirectToHome, setRedirectToAdminHome) => {
  axios.post('http://localhost:3001/login', { password, email })
    .then(({
      data: {
        token, name, email: _email, role,
      },
    }) => {
      localStorage.setItem('user', JSON.stringify({
        token, name, email: _email, role,
      }));
      return (role === 'administrator') ? setRedirectToAdminHome(true) : setRedirectToHome(true);
    })
    .catch((err) => setMessage(err.response.data.message));
};

const verifyInput = (email, password, setDisabled) => {
  const minLenght = 4;
  const regex = /^\S+@\S+$/;
  if ((email.match(regex)) && (password.length > minLenght)) { setDisabled(false); }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToAdminHome, setRedirectToAdminHome] = useState(false);
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="login-page">
      <h1>Trybeer</h1>
      <div className="login-form">
        <div>
          <p>Email</p>
          <input data-testid="email-input" onChange={ (event) => { setEmail(event.target.value); verifyInput(email, password, setDisabled); } } value={ email } />
        </div>
        <div>
          <p>Password</p>
          <input data-testid="password-input" onChange={ (event) => { setPassword(event.target.value); verifyInput(email, password, setDisabled); } } value={ password } />
        </div>
        {(message) && <p>{message}</p>}
        <button disabled={ disabled } data-testid="signin-btn" onClick={ () => doLogin(password, email, setMessage, setRedirectToHome, setRedirectToAdminHome) } type="button">ENTRAR</button>
        <button onClick={ () => setRedirectToRegister(true) } data-testid="no-account-btn" type="button">Ainda não tenho conta</button>
        {redirectToHome && <Redirect to="/products" />}
        {redirectToAdminHome && <Redirect to="/admin/orders" />}
        {redirectToRegister && <Redirect to="/register" />}
      </div>
    </div>
  );
}

export default Login;
