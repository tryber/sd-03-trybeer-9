const { Router } = require('express');
const model = require('../models/login');
const service = require('../services');

const login = Router();

login.get('/', async (req, res) => {
  const result = await model.getAll();
  return res.status(200).json(result);
});

login.post('/', async (req, res) => {
  const { email, password } = req.body;
  const { code, message, token, name, role } = await service.login.login({ email, password });
  if (message) return res.status(code).json({ message });
  return res.status(200).json({ name, email, token, role });
});

module.exports = login;
