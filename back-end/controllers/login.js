const model = require('../models/login');
const { Router } = require('express');

const login = Router();

login.get('/', async (req, res) => {
  const result = await model.getAll();
  return res.status(200).json(result)
}); 

module.exports = login;
