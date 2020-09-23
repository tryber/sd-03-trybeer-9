const { Router } = require('express');
const service = require('../services');
const auth = require('../middlewares/auth');

const profile = Router();

profile.get('/', auth);

profile.post('/', async (req, res) => {
  const { body } = req;
  service.profile.setNewName(body);
  return res.status(200).json({ message: 'ok' });
});

module.exports = profile;
