import RegisterUserAPI from '../UserRegisterService';

const createUserAPI = async (name, email, password, role) => RegisterUserAPI(
  name,
  email,
  password,
  role,
)
  .then((data) => data)
  .catch((error) => error);

export default createUserAPI;
