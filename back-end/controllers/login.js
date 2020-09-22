const { Router } = require('express');
const { getAll } = require('../models/login');

const login = Router();

login.get('/', async (req, res) => {
  const result = await getAll();
  return res.status(200).json(result);
});

module.exports = login;
