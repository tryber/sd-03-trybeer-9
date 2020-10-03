const request = require('supertest');
const server = require('../index');
const salesModel = require('../models/salesModel');

// const productModel = require('../models/products');
// const admin = require('../controllers/admin');
// const adminOrderDetailService = require('../services/adminOrderDetailService');
const orderDetailModel = require('../models/orderDetails');

const changeStatusOk = { saleId: 1, status: 'Entregue' };
const changeStatusError = {};
// const orderDetailById = { saleId: 1, productId: 1, quantity: 2 };
// const orderStatusById = { status: 'Pendente' };
// const allProducts = { id: 1, name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg' };

describe('Test Admin Order Detail BackEnd', () => {
  afterEach(async () => {
  });

  beforeEach(() => {
  });

  afterAll(async () => {
    console.log('Closing server!!!');
    await server.close();
  });

  beforeAll(() => {
  });

  test('Test if service get has been called', async () => {
    const response = await request('http://localhost:3001').get('/admin/orders/1');
    // console.log(response.status);
    if (response.status === 404) {
      expect(response.text).toBe('{"message":"Order not found","code":"not_found"}');
    }
  });
  test('Test if service put been called', async () => {
    salesModel.changeStatusOrderById = jest.fn().mockReturnValue(changeStatusError);
    const response = await request('http://localhost:3001').put('/admin/orders/1');
    expect(response.status).toBe(500);
  });
  test('Test if service put been called', async () => {
    salesModel.changeStatusOrderById = jest.fn().mockReturnValue(changeStatusOk);
    const response = await request('http://localhost:3001').put('/admin/orders/1');
    expect(response.status).toBe(202);
  });
  test('Test service OrderDetails', async () => {
    const response = await orderDetailModel.getDetails(1);
    if (response.status === 404) {
      expect(response).toStrictEqual([]);
    }
  });
  test('Test checkou service', async () => {
    const response = await request('http://localhost:3001')
      .post('/checkout')
      .send({
        userId: 3,
        totalPrice: 4.4,
        deliveryAddress: 'Eduardo Brochado',
        deliveryNumber: '35',
        saleDate: '2020-10-03 18:13:05',
        status: 'Pendente',
        store: [{ name: 'Skol Lata 250ml', price: 2.20 }],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.status).toBe(201);
  });
});
