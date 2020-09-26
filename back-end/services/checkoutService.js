const { createOrder } = require('../models/salesModel');

const checkoutService = async (req, res) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  } = req.body;
  // Validações

  // Salva no banco
  const response = await createOrder(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  );
  res.status(201).send(response);
};

module.exports = checkoutService;
