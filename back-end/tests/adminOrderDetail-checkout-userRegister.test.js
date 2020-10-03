const request = require('supertest');
const server = require('../index');
// const salesModel = require('../models/salesModel');

// const productModel = require('../models/products');
// const admin = require('../controllers/admin');
// const adminOrderDetailService = require('../services/adminOrderDetailService');
const orderDetailModel = require('../models/orderDetails');

// const changeStatusOk = { saleId: 1, status: 'Entregue' };
// const changeStatusError = {};
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

  test('Register an user with invalid name', async () => {
    const response = await request('http://localhost:3001').post('/register')
      .send({
        name: 'Marco',
        email: 'marco.meireles.b@gmail.com',
        password: 123456,
        role: 'client',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.text).toBe('{"message":"Name must be only letters and greather than 12 characters length","code":"invalid_data"}');
  });
  test('Register an user with invalid email', async () => {
    const response = await request('http://localhost:3001').post('/register')
      .send({
        name: 'Marco Barbosa',
        email: 'marco.meireles.b.com',
        password: 123456,
        role: 'client',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.text).toBe('{"message":"Email must be a valid email","code":"invalid_data"}');
  });
  test('Register an user with invalid password', async () => {
    const response = await request('http://localhost:3001').post('/register')
      .send({
        name: 'Marco Barbosa',
        email: 'marco.meireles.b@gmail.com',
        password: 12345,
        role: 'client',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.text).toBe('{"message":"Password must be a number and greather than 6 characters length","code":"invalid_data"}');
  });
  test('Register an user', async () => {
    const response = await request('http://localhost:3001').post('/register')
      .send({
        name: 'Marco Barbosa',
        email: 'marco.meireles.b@gmail.com',
        password: 123456,
        role: 'client',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.text).toBe('{"name":"Marco Barbosa","email":"marco.meireles.b@gmail.com","role":"client"}');
  });
  test('Register an user with same e-mail', async () => {
    const response = await request('http://localhost:3001').post('/register')
      .send({
        name: 'Marco Barbosa',
        email: 'marco.meireles.b@gmail.com',
        password: 123456,
        role: 'client',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.text).toBe('{"message":"E-mail already in database.","code":"invalid_data"}');
  });
  test('Test if have admin orders', async () => {
    const response = await request('http://localhost:3001').get('/admin/orders/1');
    expect(response.text).toBe('{"message":"Order not found","code":"not_found"}');
  });
  test('Test change an invalid order', async () => {
    const response = await request('http://localhost:3001').put('/admin/orders/1');
    expect(response.status).toBe(404);
  });
  test('Test checkout service new sale single product', async () => {
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
  test('Test checkout service sale with twice products', async () => {
    const response = await request('http://localhost:3001')
      .post('/checkout')
      .send({
        userId: 3,
        totalPrice: 4.4,
        deliveryAddress: 'Eduardo Brochado',
        deliveryNumber: '35',
        saleDate: '2020-10-03 18:13:05',
        status: 'Pendente',
        store: [{ name: 'Skol Lata 250ml', price: 2.20 }, { name: 'Skol Lata 250ml', price: 2.20 }],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.status).toBe(201);
  });
  test('Test if have admin orders', async () => {
    const response = await request('http://localhost:3001').get('/admin/orders/1');
    expect(response.status).toBe(200);
  });
  test('Test change status of a valid order', async () => {
    const response = await request('http://localhost:3001').put('/admin/orders/1');
    expect(response.status).toBe(202);
  });
  test('Test service OrderDetails', async () => {
    const response = await orderDetailModel.getDetails(1);
    if (response.status === 404) {
      expect(response).toStrictEqual([]);
    }
  });
});
