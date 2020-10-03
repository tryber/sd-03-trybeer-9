const { changeStatusOrderById, getDetailByOrderId } = require('../models/salesModel');

const adminOrderDetailChangeService = async (req, res) => {
  const { id } = req.params;
  const response = await getDetailByOrderId(id);
  if (!response.length) {
    res.status(404).send({ message: 'Order not found', code: 'invalid_data' });
  } else {
    const result = await changeStatusOrderById(id);
    res.status(202).send(result);
  }
};

module.exports = adminOrderDetailChangeService;
