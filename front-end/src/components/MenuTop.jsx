import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/MenuTop.css';

function MenuTop() {
  const [open, setOpen] = useState(true);

  const showAside = () => {
    return (
      <div className="showAside">
        <Link className="link-aside" data-testid="side-menu-item-products" to="/products">Produtos</Link>
        <Link className="link-aside" data-testid="side-menu-item-my-orders" to="/orders">Meus pedidos</Link>
        <Link className="link-aside" data-testid="side-menu-item-my-profile" to="/profile">Meu Perfil</Link>
        <Link className="link-aside-sair" data-testid="side-menu-item-logout" to="/login">Sair</Link>
      </div>
    )
  }

  const asideLinks = () => (
    <button
      data-testid="top-hamburguer"
      className="menu-btn"
      type="button" onClick={() => setOpen(true)}>
      <div className="menu-toggle"></div>
      <div className="menu-toggle" ></div>
      <div className="menu-toggle" ></div>
    </ button>
  );

  const MenuToggle = () => (
    <button
      data-testid="top-hamburguer"
      className="menu-btn"
      type="button" onClick={() => setOpen(false)}>
      <div className="menu-toggle"></div>
      <div className="menu-toggle" ></div>
      <div className="menu-toggle" ></div>
      <div>
        {showAside()}
      </div>
    </ button>
  );

  return (
    <header className="header">
      {open ? MenuToggle() : asideLinks()}
      <h1 className="top-title" data-testid="top-title">Trybeer</h1>
    </header>
  );
}

export default MenuTop;
