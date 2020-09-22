const jwt = require('jsonwebtoken');

const secret = 'trybeer-grupo9';
const header = { alg: 'HS256', typ: 'jwt' };

module.exports = (req, res, next) => {
  const { email, password } = req;
  const token = jwt.sign({ email, password }, secret, header);
  res.token = token;
  next();
};
