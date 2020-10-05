import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import createUserAPI from '../services/functions/createUserAPI';

const UserRegisterForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const [nameWarning, setNameWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');
  const [redirectTo, setRedirectTo] = useState('');
  let role = 'client';

  useEffect(() => {
    if (check) {
      role = 'administrator';
    } else {
      role = 'client';
    }
  }, [check]);

  useEffect(() => {
    // habilita botao
    let inputsAreFilled = false;
    if (name && email && password) inputsAreFilled = true;
    let inputsAreValids = false;
    if (!nameWarning && !emailWarning && !passwordWarning) inputsAreValids = true;
    if (inputsAreFilled && inputsAreValids) setShowButton(true);
    if (!(inputsAreFilled && inputsAreValids)) setShowButton(false);
  }, [nameWarning, emailWarning, passwordWarning]);

  useEffect(() => {
    // Valida as entradas
    if (name) {
      // Ref. https://stackoverflow.com/questions/4745112/javascript-regex-for-alphanumeric-string-with-length-of-3-5-chars
      const nameVerify = new RegExp(/^([a-zA-Z\s]){12,100}$/);
      if (!nameVerify.test(name)) {
        setNameWarning('O nome deve conter 12 caracters e apenas letras');
      }
      if (nameVerify.test(name)) {
        setNameWarning('');
      }
    }
    if (!name) {
      setNameWarning('');
    }
    if (email) {
      // Ref. Regex email obtida em https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
      const emailVerify = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
      if (!emailVerify.test(email)) {
        setEmailWarning('Digite um email válido');
      }
      if (emailVerify.test(email)) {
        setEmailWarning('');
      }
    }
    if (!email) {
      setEmailWarning('');
    }
    if (password) {
      // Regex criada por mim mesmo
      const passwordVerify = new RegExp(/([0-9]){6,50}$/);
      if (!passwordVerify.test(password)) {
        setPasswordWarning('A senha deve conter apenas número e ter tamanho mínimo de 6 caracteres');
      }
      if (passwordVerify.test(password)) {
        setPasswordWarning('');
      }
    }
    if (!password) {
      setPasswordWarning('');
    }
  }, [name, email, password]);

  if (redirectTo) {
    return (<Redirect to={redirectTo} />);
  }

  return (
    <div>
      <fieldset>
      <label htmlFor="name">Nome</label>
      <input
        data-testid="signup-name" type="text" name="name"
        onChange={(e) => setName(e.target.value)}
        required={true}
      /><span>{nameWarning}</span><br/>
      <label htmlFor="email">Email</label>
      <input
        data-testid="signup-email" type="email" name="email" 
        onChange={(e) => setEmail(e.target.value)}
        required={true}
      /><span>{emailWarning}</span><br/>
      <label htmlFor="password">Password</label>
      <input
        data-testid="signup-password" type="password" name="password"
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      /><span>{passwordWarning}</span><br/>
      <input
        data-testid="signup-seller" type="checkbox" name="vendor"
        checked={check} onChange={(e) => setCheck(e.target.checked)}
      /><span>Quero Vender</span><br/>
      <button
        data-testid="signup-btn" type="submit"
        onClick={ async () => {
          const result = await createUserAPI(name, email, password, role);
          if (result) {
            if (result.message) {
              return setBackendResponse('E-mail already in database.');
            }
            if (role === 'administrator') {
              return setRedirectTo('/admin/orders');
            }
            return setRedirectTo('/products');
            }
          }
        }
        disabled={!showButton}
      >Cadastrar</button>
      </fieldset>
      <div><span>{backendResponse}</span></div>
    </div>
  );
};

export default UserRegisterForm;
