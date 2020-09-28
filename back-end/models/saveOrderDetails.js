const connection = require('./connection');

const saveOrderWithProductDetails = async (products) => {
  const saleInfo = await connection()
    .then((db) => db.getTable('sales')
      .select()
      .execute())
    .then((result) => result.fetchAll().pop() || []);
  const [saleId] = saleInfo;

  products.map(async ({ name, quantity }) => {
    const productInfo = await connection()
      .then((db) => db.getTable('products')
        .select()
        .where('name = :name')
        .bind('name', name)
        .execute())
      .then((result) => result.fetchAll()[0] || []);
    const [id] = productInfo;

    await connection()
      .then((db) => db.getTable('sales_products')
        .insert(['sales_id', 'product_id', 'quantity'])
        .values([saleId, id, quantity])
        .execute());
  });
};

module.exports = {
  saveOrderWithProductDetails,
};
