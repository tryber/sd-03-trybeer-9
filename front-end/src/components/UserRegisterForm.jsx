import React, { useEffect, useState } from 'react';

const UserRegisterForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const [nameWarning, setNameWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');

  useEffect(() => {
    if (name) {
      // Ref. https://stackoverflow.com/questions/4745112/javascript-regex-for-alphanumeric-string-with-length-of-3-5-chars
      const nameVerify = new RegExp(/^([a-zA-Z\s]){12}$/);
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
      const emailVerify = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
  }, [name, email, password]);

  return (
    <div>
      <form>
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
      /><br/>
      <label htmlFor="password">Senha</label>
      <input
        data-testid="signup-password" type="password" name="password"
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      /><br/>
      <input data-testid="signup-seller" type="checkbox" name="vendor" checked={check} onChange={(e) => setCheck(e.target.checked)}/><span>Quero vender</span><br/>
      <button data-testid="signup-btn" type="submit" onClick={() => console.log(name)}>CADASTRAR</button>
      </form>
    </div>
  );
};

export default UserRegisterForm;
