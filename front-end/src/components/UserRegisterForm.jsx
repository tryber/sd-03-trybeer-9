import React, { useEffect, useState } from 'react';

const userRegisterForm = () => {
  return (
    <div>
      <form method="post" enctype='application/json'>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="password"/>
      <input type="checkbox" name="vendor"/>
      </form>
    </div>
  );
};

export default userRegisterForm;
