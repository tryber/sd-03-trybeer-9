const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.getTable('users')
  .select()
  .execute())
  .then((result) => result.fetchAll())

module.exports = {
  getAll,
}
