import React, { useEffect, useState } from 'react';

const UserRegisterForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [check, setCheck] = useState(false);
  const [nameWarning, setNameWarning] = useState('');
  // let nameWarning = '';

  useEffect(() => {
    if (name) {
      const nameVerify = new RegExp(/[a-z]/i);
      let checking = `${nameVerify.test(name)}${name.length > 12}`
      switch (checking) {
        case 'falsefalse':
          setNameWarning('O nome deve conter apenas letras e ter no mínimo 12 caracteres');
          break;
        case 'truefalse':
          setNameWarning('O nome deve ter no mínimo 12 caracteres');
          break;
        default:
          setNameWarning('');
      };
      console.log('Nome:', name, nameWarning, checking);
    }
    else {
      setNameWarning('');
    }
  }, [name]);

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
