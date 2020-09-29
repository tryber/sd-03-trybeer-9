const { Router } = require('express');
const adminOrderDetailService = require('../services/adminOrderDetailService');

const admin = Router();

admin.get('/orders/:id', adminOrderDetailService);

module.exports = admin;
