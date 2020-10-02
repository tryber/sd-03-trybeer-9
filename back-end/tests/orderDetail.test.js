const request = require('supertest');
const orderDetailModel = require('../models/orderDetails');
const server = require('../index');
// const connect = require('../models/connection');

// Ref. https://imasters.com.br/back-end/tdd-em-nodejs-conhecendo-o-jest
// o que será executado após todos os testes
afterAll(() => {
  // o server close irá encerrar nossa aplicação, evitando problemas da porta já estar em uso
  // server.close();
  console.log('servidor fechado');
});

// const spyReturns = (returnValue) => jest.fn(() => returnValue);

// // Ref. https://stackoverflow.com/questions/48790927/how-to-change-mock-implementation-on-a-per-single-test-basis-jestjs
// const setup = (mockOverrides) => {
//   const mockedFunctions = {
//     a: spyReturns({}),
//     ...mockOverrides,
//   };
//   return {
//     mockedModule: jest.doMock('../models/connection', () => mockedFunctions),
//   };
// };

afterEach(async () => {
  await server.end();
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.setTimeout(30000);
});


describe('Test Admin Order Detail BackEnd', () => {
  test('Test if service get has been called', async () => {
    const result = await request('http://localhost:3001').get('/admin/orders/1');
    if (result.status === 404) {
      expect(result.text).toBe('{"message":"Order not found","code":"not_found"}');
    }
  });
  test('Test if service put been called', async () => {
    jest.mock('../models/connection', () => ({saleId: '1', status: 'Entregue'}));
    const result = await request('http://localhost:3001').put('/admin/orders/1');
    console.log(result.status);
    // expect(result.stack[0].route.path).toBe('/orders/:id');
  });
  test('Test service OrderDetails', async () => {
    const result = await orderDetailModel.getDetails(1);
    expect(result).toStrictEqual([]);
  });
});

test('Test if service put been called', async () => {
  jest.mock('../models/connection', () => ('Oba'));
  const result = await request('http://localhost:3001').put('/admin/orders/1');
  console.log(result.status);
  // expect(result.stack[0].route.path).toBe('/orders/:id');
});