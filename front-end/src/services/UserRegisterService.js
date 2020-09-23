import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
}

const RegisterUserAPI = axios.post(`localhost:3001/register`, {json: "Eu sou um josn"}, headers)
.then(res => res.data);

export default RegisterUserAPI;
