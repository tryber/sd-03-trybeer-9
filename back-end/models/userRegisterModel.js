const connection = require('./connection');

const getByEmail = async (email) => connection()
  .then((db) => db.getTable('users')
    .select(['id', 'name', 'email', 'password', 'role'])
    .where('email = :email')
    .bind('email', email)
    .execute())
  .then((results) => results.fetchAll()[0])
  .then((results) => {
    if (results) {
      return ({
        id: results[0],
        name: results[1],
        email: results[2],
        password: results[3],
        role: results[4],
      });
    }
    return undefined;
  });

const createUser = async (name, email, password, role) => connection()
  .then((db) => db.getTable('users')
    .insert(['name', 'email', 'password', 'role'])
    .values([name, email, password, role])
    .execute())
  .then(() => ({ name, email, role }));

module.exports = { getByEmail, createUser };
