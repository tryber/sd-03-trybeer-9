const { getOrderById } = require('../models/salesModel');

const adminOrderDetailService = async (req, res) => {
  const { id } = req.params;
  const result =  await getOrderById(id);
  if (result) {
    res.status(200).send(result);
  }
  /*
  if (result) {
    // const orderDetail = getProductsById(result.productId); // Array de produtos
    // crie um objeto resposta
    // const response = [{ name: orderDetail.name[0], quantity: result.quantity[0], price: orderDetail.price[0] }];
    const response = [{ name: 'Skol Lata 250ml', quantity: 1, price: 2.20 }];
    res.status(200).send(response);
  }*/ else {
    res.status(404).send({ message: 'Order not found', code: 'not_found'});
  }
};

module.exports = adminOrderDetailService;