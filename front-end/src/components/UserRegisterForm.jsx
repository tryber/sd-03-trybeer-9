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
      const nameVerify = new RegExp(/^([a-zA-Z\s]){12-100}$/);
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
      const passwordVerify = new RegExp(/([0-9]){6-50}$/);
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

  let lock = false;
  if (name && email && password) lock = true;
  let lock2 = false;
  if (!nameWarning && !emailWarning && !passwordWarning) lock2 = true;
  console.log('locks: ', lock, lock2);
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
      /><span>{emailWarning}</span><br/>
      <label htmlFor="password">Senha</label>
      <input
        data-testid="signup-password" type="password" name="password"
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      /><span>{passwordWarning}</span><br/>
      <input data-testid="signup-seller" type="checkbox" name="vendor" checked={check} onChange={(e) => setCheck(e.target.checked)}/><span>Quero vender</span><br/>
      <button
        data-testid="signup-btn" type="submit"
        onClick={() => console.log(name)}
        enable={1}
      >CADASTRAR</button>
      </form>
    </div>
  );
};

export default UserRegisterForm;
