import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './style/Products.css';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';
import { Redirect, Link } from 'react-router-dom';
import CardProducts from './CardProducts';

const instance = axios.create({ baseURL: 'http://localhost:3001' });

const addTobascket = (price, name, setCart) => {
  const item = { name, price };
  setCart(currentState => [...currentState, item]);
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
}

// will
// const removeToBascket = (cart, name, setCart) => {
//   if (cart.length === 0) return;
//   const remove = cart.filter(e => e.name !== name);
//   localStorage.setItem('cart', JSON.stringify(remove))
//   setCart(remove);
// }

//Fabi
//const removeToBascket = (cart, name, setCart) => {
//   if (cart.length === 0) return;
//   const remove = cart.reduce((acc, e) => {
//     if (e.name === name) {
//       if (acc.counter > 0) {
//         acc.arr = [...acc.arr, e];
//         return acc;
//       }
//       acc.counter = 1;
//       return acc;
//     }
//     acc.arr = [...acc.arr, e];
//     return acc;
//   }, { arr: [], counter: 0 });
//   localStorage.setItem('cart', JSON.stringify(remove.arr));
//   setCart(remove.arr);
// };

// marco
const removeToBascket = (newCart, name, setCart) => {
  if (newCart.length === 0) return;
  const removeIndex = newCart.findIndex(e => e.name === name);
  if (removeIndex >= 0) {
    newCart.splice(removeIndex, 1);
    localStorage.setItem('cart', JSON.stringify(newCart))
    setCart(newCart);
  }
}

const renderProducts = (dataApi, cart, setCart, newCart) =>
  dataApi.map(({ id, name, price, urlImage }, index) => {
    return (
      <>
        <div key={id} className="card-products">
          <CardProducts
            index={index}
            name={name}
            price={price}
            urlImage={urlImage}
            classImg="img-products"
          />
          <button type="button"
            onClick={() => addTobascket(price, name, setCart)} data-testid={`${index}-product-plus`}>+</button>
          <button type="button"
            onClick={() => removeToBascket(newCart, name, setCart)} data-testid={`${index}-product-minus`}>-</button>
          <p type="button" data-testid={`${index}-product-qtd`}>{cart ? cart.filter((e) => e.name === name).length : 0}</p>
        </div>
      </>
    )
  });

const cartInStorage = (cart) => {
  if (!cart) return 0;
  const total = cart.reduce((acc, actual) => acc + actual.price, 0);
  return total;
}

function Products() {
  const [dataApi, setDataApi] = useState([])
  const { cart, setCart, setTitle } = useContext(BeerContext);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    setTitle('TryBeer');
    instance.get('/profile', { headers: { Authorization: token } }).catch(() => setRedirectLogin(true))
    instance.get('/products')
      .then(({ data }) => setDataApi(data))
  }, [token]);

  const newCart = JSON.parse(localStorage.getItem('cart'));

  return (
    <>
      {redirectLogin && <Redirect to="/login" />}
      <MenuTop />
      <div className="render-cards">
        {renderProducts(dataApi, cart, setCart, newCart)}
        <p data-testid="checkout-bottom-btn-value">{`R$ ${cartInStorage(newCart).toFixed(2).toLocaleString().replace('.', ',')}`}</p>
      </div>
      {cart.length === 0
        ? <button disabled type="button" data-testid="checkout-bottom-btn" >Ver Carrinho</button>
        : <button data-testid="checkout-bottom-btn" ><Link to="/checkout" >Ver Carrinho</Link></button>}
    </>
  );
}

export default Products;
