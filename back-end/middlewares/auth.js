const jwt = require('jsonwebtoken');

const secret = 'trybeer-grupo9';

module.exports = (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) return res.status(200).send('logado');
  } catch (err) {
    return res.status(400).send('não logado');
  }
};
