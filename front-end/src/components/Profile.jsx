import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MenuTop from './MenuTop';
import { BeerContext } from '../context/context';

const saveNewUserInfo = (name, email, token, role, setMessage) => {
  axios.post('http://localhost:3001/profile', { name, email })
    .then(() => setMessage(true));
  localStorage.setItem('user', JSON.stringify({
    name, email, token, role,
  }));
};

function Profile() {
  const { setTitle } = useContext(BeerContext);
  const {
    email, name, token, role,
  } = JSON.parse(localStorage.getItem('user')) || [];
  const [newName, setNewName] = useState(name);
  const [disabled, setIsDisabled] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/profile', {
      headers: {
        Authorization: token,
      },
    })
      .catch(() => { setRedirectToLogin(true); });
    setTitle('Meu perfil');
  }, [token, setTitle]);

  return (
    <div>
      {redirectToLogin && <Redirect to="/login" />}
      <MenuTop />
      <div>
        <section className="login-page">
          <div>
            <p>Email</p>
            <input readOnly data-testid="profile-email-input" value={ email } />
          </div>
          <div>
            <p>Name</p>
            <input data-testid="profile-name-input" onChange={ (event) => { setNewName(event.target.value); setIsDisabled(false); } } value={ newName } />
          </div>
          <button disabled={ disabled } onClick={() => saveNewUserInfo(newName, email, token, role, setMessage) } type="button" data-testid="profile-save-btn">Salvar</button>
          {message && <p>Atualização concluída com sucesso</p>}
        </section>
      </div>
    </div>
  );
}

export default Profile;
