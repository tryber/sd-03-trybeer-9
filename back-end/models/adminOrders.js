const connect = require('./connection');

const getOrdersAdmin = (id) => connect()
  .then((db) => db.getTable('sales')
    .select('total_price', 'delivery_address', 'delivery_number', 'status')
    .execute())
  .then((res) => res.fetchAll())
  .then((result) => result.map(([totalPrice, addressDelivery, numberDelivery, status]) =>
    ({ totalPrice, addressDelivery, numberDelivery, status })));

module.exports = { getOrdersAdmin };
