import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './style/Products.css';
import { Redirect, Link } from 'react-router-dom';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';
import CardProducts from './CardProducts';

const instance = axios.create({ baseURL: 'http://localhost:3001' });

const addTobascket = (price, name, setCart) => {
  const item = { name, price };
  setCart((currentState) => [...currentState, item]);
  const cart = localStorage.getItem('cart');
  if (cart) {
    localStorage.setItem('cart', JSON.stringify([
      ...JSON.parse(cart), {
        name, price,
      }]));
  } else {
    localStorage.setItem('cart', JSON.stringify([{
      name, price,
    }]));
  }
};

const removeToBascket = (cart, name, setCart) => {
  if (cart.length === 0) return;
  const remove = cart.reduce((acc, e) => {
    if (e.name === name) {
      if (acc.counter > 0) {
        acc.arr = [...acc.arr, e];
        return acc;
      }
      acc.counter = 1;
      return acc;
    }
    acc.arr = [...acc.arr, e];
    return acc;
  }, { arr: [], counter: 0 });
  localStorage.setItem('cart', JSON.stringify(remove.arr));
  setCart(remove.arr);
};

const renderProducts = (dataApi, cart, setCart) => dataApi.map(({
  id, name, price, urlImage,
}, index) => (
    <div key={id} className="card-products">
      <CardProducts
        index={index}
        name={name}
        price={price}
        urlImage={urlImage}
        classImg="img-products"
      />
      <button
        type="button"
        onClick={() => addTobascket(price, name, setCart)}
        data-testid={`${index}-product-plus`}
      >
        +
    </button>
      <button
        type="button"
        onClick={() => removeToBascket(cart, name, setCart)}
        data-testid={`${index}-product-minus`}
      >
        -
    </button>
      <p data-testid={`${index}-product-qtd`}>{cart.filter((e) => e.name === name).length}</p>
    </div>
  ));

const cartInStorage = (cart) => {
  if (!cart) return 0;
  const total = cart.reduce((acc, actual) => acc + actual.price, 0);
  return total;
};

const filterProduct = (product, dataApi, setDataApi, allProducts) => {
  const filteredProducts = allProducts.filter(({ name }) => name.toLowerCase().includes(product.toLowerCase()));
  setDataApi(filteredProducts);
};

const orderProducts = (ord, dataApi, setDataApi) => {
    if (ord === 'desc')  {dataApi.sort((a, b) => (a.price > b.price) ? 1 : -1)
    setDataApi(dataApi)} else {dataApi.sort((a, b) => (a.price > b.price) ? -1 : 1)}
}
const sorter = (dataApi, setDataApi, orderer, setOrderer) => {
  return (
    <div>
      <p>Ordenar por</p>
      <select onChange={(e) => {setOrderer(e.target.value); orderProducts(e.target.value, dataApi, setDataApi)}} value={orderer}>
        <option value=""></option>
        <option value="desc">Maior para Menor</option>
        <option value="asc">Menor para Maior</option>
      </select>
    </div>

  )
}

function Products() {
  const [dataApi, setDataApi] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchedItem, setSearchedItem] = useState('');
  const { cart, setCart, setTitle } = useContext(BeerContext);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [orderer, setOrderer] = useState('');
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    setTitle('TryBeer');
    instance.get('/profile', { headers: { Authorization: token } }).catch(() => setRedirectLogin(true));
    instance.get('/products')
      .then(({ data }) => { setDataApi(data); setAllProducts(data); });
  }, [token, setTitle]);

  const sumLocalStorage = localStorage.getItem('cart');
  const newCart = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <div>
      {redirectLogin && <Redirect to="/login" />}
      <MenuTop />
      <div>
        {sorter(dataApi, setDataApi, orderer, setOrderer)}
        <p>Buscar Produto</p>
        <input onChange={(event) => { setSearchedItem(event.target.value); filterProduct(event.target.value, dataApi, setDataApi, allProducts); }} value={searchedItem} />
      </div>
      <div className="render-cards">
        {renderProducts(dataApi, newCart, setCart)}
        <p data-testid="checkout-bottom-btn-value">{`R$ ${cartInStorage(JSON.parse(sumLocalStorage)).toFixed(2).toLocaleString().replace('.', ',')}`}</p>
      </div>
      {cart.length === 0
        ? <button disabled type="button" data-testid="checkout-bottom-btn">Ver Carrinho</button>
        : <button type="button" data-testid="checkout-bottom-btn"><Link to="/checkout">Ver Carrinho</Link></button>}
    </div>
  );
}

export default Products;
