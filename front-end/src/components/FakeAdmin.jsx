import React from 'react';
import { Link } from 'react-router-dom';

// requisito 9 ? MenuTopAdmin : FakeAdmin

const FakeAdmin = () => {
  return (
    <div>
      ola admin
      <Link data-testid="side-menu-item-profile" to="/admin/profile" >Profile</Link>
    </div>
  );
}

export default FakeAdmin;
