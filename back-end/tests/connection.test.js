let connection = require('../models/connection');

test('testing connection', () => {
  connection = jest.fn();
  connection();
  expect(connection).toHaveBeenCalled();
});
