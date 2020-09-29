const { createOrder } = require('../models/salesModel');
const { saveOrderWithProductDetails } = require('../models/saveOrderDetails');

const checkoutService = async (req, res) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
    store,
  } = req.body;
  // Validações

  const obj = {};
  store.forEach(({ name }) => {
    if (Object.keys(obj).includes(name)) { obj[name] += 1; } else { obj[name] = 1; }
  });
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const finalStore = keys.map((e, i) => ({ name: e, quantity: values[i] }));

  // Salva no banco
  const response = await createOrder(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  );
  await saveOrderWithProductDetails(finalStore);
  res.status(201).send(response);
};

module.exports = checkoutService;
