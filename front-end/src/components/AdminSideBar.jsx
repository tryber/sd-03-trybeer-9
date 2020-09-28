import React from 'react';

const AdminSideBar = () => {
  return (
    <div>
      <div><a data-testid="side-menu-item-orders" href="/admin/orders">Pedidos</a></div>
      <div><a data-testid="side-menu-item-profile" href="/admin/profile">Perfil</a></div>
      <div><a data-testid="side-menu-item-logout" href="/login">Sair</a></div>
    </div>
  );
};

export default AdminSideBar;
