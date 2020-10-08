import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const RegisterUserAPI = (name, email, password, role, street, number, city, district) => axios.post('https://trybeerbackend.herokuapp.com/register',
  {
    name,
    email,
    password,
    role,
    street,
    number,
    city,
    district,
  },
  headers)
  .then((res) => res)
  .catch((error) => error);

export default RegisterUserAPI;
