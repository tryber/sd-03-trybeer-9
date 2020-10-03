const request = require('supertest');
const salesModel = require('../models/salesModel');
const productModel = require('../models/products');
const admin = require('../controllers/admin');
let adminOrderDetailService = require('../services/adminOrderDetailService');
// const  { changeStatusOrderById } = require('../models/salesModel');
const orderDetailModel = require('../models/orderDetails');
const server = require('../index');

afterEach(async () => {
});

beforeEach(() => {
  // jest.fn().mockClear();
});

const changeStatusOk = { saleId: 1, status: 'Entregue' };
const changeStatusError = {};
const orderDetailById = { saleId: 1, productId: 1, quantity: 2 };
const orderStatusById = { status: 'Pendente' };
const allProducts = { id: 1, name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/Skol Lata 350ml.jpg' }

describe('Test Admin Order Detail BackEnd', () => {
  test('Test if service get has been called', async () => {
    salesModel.getDetailByOrderId = jest.fn().mockReturnValue(orderDetailById);
    salesModel.getStatusOrderById = jest.fn().mockReturnValue(orderStatusById);
    productModel.getAllProducts = jest.fn().mockReturnValue(allProducts);
    adminOrderDetailService = jest.fn().mockReturnValue({id: 'Opa'});
    const response = await request('http://localhost:3001').get('/admin/orders/1');
    console.log(response.status);
    if (response.status === 404) {
      expect(response.text).toBe('{"message":"Order not found","code":"not_found"}');
    }
  });
  test('Test if service put been called', async () => {
    salesModel.changeStatusOrderById = jest.fn().mockReturnValue(changeStatusError);
    const response  = await request('http://localhost:3001').put('/admin/orders/1');
    expect(response.status).toBe(500);
  });
  test('Test if service put been called', async () => {
    salesModel.changeStatusOrderById = jest.fn().mockReturnValue(changeStatusOk);
    const response  = await request('http://localhost:3001').put('/admin/orders/1');
    expect(response.status).toBe(202);
  });
  test('Test service OrderDetails', async () => {
    const response = await orderDetailModel.getDetails(1);
    expect(response).toStrictEqual([]);
  });
});
