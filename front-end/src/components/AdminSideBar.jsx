import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const AdminSideBar = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const unlogging = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    user = {...user, token: []};
    localStorage.setItem('user', JSON.stringify(user));
    setRedirectToLogin(true);
  };
  return (
    <div>{ redirectToLogin && <Redirect to="/login" /> }
      <div><a data-testid="side-menu-item-orders" href="/admin/orders">Pedidos</a></div>
      <div><a data-testid="side-menu-item-profile" href="/admin/profile">Perfil</a></div>
      <div><a data-testid="side-menu-item-logout" href="#" onClick={() => unlogging()}>Sair</a></div>
    </div>
  );
};

export default AdminSideBar;
