import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const saveNewUserInfo = (name, email, token, role) => {
  axios.post('http://localhost:3001/profile', { name, email });
  localStorage.setItem('user', JSON.stringify({
    name, email, token, role,
  }));
};

function Profile() {
  const {
    email, name, token, role,
  } = JSON.parse(localStorage.getItem('user')) || [];
  const [newName, setNewName] = useState(name);
  const [disabled, setIsDisabled] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/profile', {
      headers: {
        Authorization: token,
      },
    })
      .catch(() => { setRedirectToLogin(true); });
  }, [token]);

  return (
    <div>
      {redirectToLogin && <Redirect to="/login" />}
      <h1 data-testid="top-title">Meu Perfil</h1>
      <section className="login-page">
        <div>
          <p>Email</p>
          <input data-testid="profile-email-input" value={ email } />
        </div>
        <div>
          <p>Name</p>
          <input data-testid="profile-name-input" onChange={ (event) => { setNewName(event.target.value); setIsDisabled(false); } } value={ newName } />
        </div>
        <button disabled={ disabled } onClick={ () => saveNewUserInfo(newName, email, token, role) } type="button" data-testid="profile-save-btn">Salvar</button>
      </section>
    </div>
  );
}

export default Profile;
