const loginModel = require('../models/login');

const returnedObject = { id: 2, name: 'Teste', email: 'teste@teste', password: '124234', role: 'user' };

test('testing login model', async () => {
  loginModel.getUserInfo = jest.fn().mockReturnValue(returnedObject);
  expect(await loginModel.getUserInfo()).toEqual(returnedObject);
});
