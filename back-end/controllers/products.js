const { Router } = require('express');
const { getAllProducts } = require('../models/products');

const products = Router();

products.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  return res.status(200).json(allProducts);
});

module.exports = products;
