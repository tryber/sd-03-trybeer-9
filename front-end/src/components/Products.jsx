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
  const removeIndex = cart.findIndex((e) => e.name === name);
  if (removeIndex >= 0) {
    cart.splice(removeIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
  }
}

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
      <p data-testid={`${index}-product-qtd`}>{!cart ? 0 : cart.filter((e) => e.name === name).length}</p>
    </div>
  ));

const cartInStorage = (cart) => {
  if (!cart) return 0;
  const total = cart.reduce((acc, actual) => acc + actual.price, 0);
  return total;
};

function Products() {
  const [dataApi, setDataApi] = useState([]);
  const { cart, setCart, setTitle } = useContext(BeerContext);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    setTitle('TryBeer');
    instance.get('/profile', { headers: { Authorization: token } }).catch(() => setRedirectLogin(true));
    instance.get('/products')
      .then(({ data }) => setDataApi(data));
  }, [token, setTitle]);

  const newCart = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <div>
      {redirectLogin && <Redirect to="/login" />}
      <MenuTop />
      <div className="render-cards">
        {renderProducts(dataApi, newCart, setCart)}
        <p data-testid="checkout-bottom-btn-value">{`R$ ${cartInStorage(newCart).toFixed(2).replace('.', ',')}`}</p>
      </div>
      {cart.length === 0
        ? <button disabled type="button" data-testid="checkout-bottom-btn">Ver Carrinho</button>
        : <button type="button" data-testid="checkout-bottom-btn"><Link to="/checkout">Ver Carrinho</Link></button>}
    </div>
  );
}

export default Products;
