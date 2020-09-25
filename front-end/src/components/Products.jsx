import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './style/Products.css';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';
import { Redirect, Link } from 'react-router-dom';

const addTobascket = (price, name, setCart) => {
  const item = { name, price };
  setCart(currentState => [...currentState, item]);
  const cart = localStorage.getItem('cart');
  if (cart) {
    localStorage.setItem('cart', JSON.stringify([
      ...JSON.parse(cart), {
        [name]: price,
      }]));
  } else {
    localStorage.setItem('cart', JSON.stringify([{
      [name]: price,
    }]));
  }
}

const removeToBascket = (cart, name, setCart, index) => {
  if (cart.length === 0) return;


  // var a = cart.filter((e) => {
  //   for (let i = 0; i < cart.length; i++) {
  //     if (cart[i] === index) {
  //       const newCart = cart.splice(i, 1)
  //       return newCart
  //     }
  //   }
  // })
  const remove = cart.filter(e => e.name !== name)
  console.log(remove)

  setCart(remove)

  // cart.findIndex(e => e.name === name)
  // .splice(0, 1)
  // const h = keyLocalStorage.map((e, i) => ({ nome: e, index: i })).filter((e) => e.index === i); 
  // console.log('Carrinho antes da remoção: ', cart);
  // const quantityArray = cart.map((e) => Object.keys(e));
  // const quantityKeysArray = quantityArray.map((e) => e[0])
  // let removeItem = 'Skol Lata 250ml';
  // const itemRemoveIndex = quantityKeysArray.findIndex((e) => e === removeItem);
  // const keyLocalStorage = JSON.parse(localStorage.getItem('cart'));
  // cart.splice(itemRemoveIndex, 1);
  // console.log('Carrinho depois da exclusão: ');

  // localStorage.setItem('cartt', JSON.stringify())
}

const cardProducts = (id, name, price, photo, setCart, cart, total, i) => (
  <div
    data-testid={`${i}-product-price`}
    className="card-products"
    key={id}>
    <img
      data-testid={`${i}-product-img`}
      className="img-products"
      src={photo} />
    <p data-testid={`${i}-product-name`}>{name}</p>
    <span data-testid={`${i}-product-price`} >R${price}</span>
    {cart.length === 0
      ? <button disabled data-testid={`${i}-product-qtd`} >Ver Carrinho: {cart.length}</button>
      : <button data-testid={`${i}-product-qtd`} >Ver Carrinho: {cart.length}</button>}
    <div>
      <button data-testid={`${i}-product-plus`} onClick={() => addTobascket(price, name, setCart)} >+</button>
      <button data-testid={`${i}-product-minus`} onClick={() => removeToBascket(cart, name, setCart, i)}>-</button>
    </div>
  </div>
);

function Products() {
  const [dataApi, setDataApi] = useState([])
  const { cart, setCart } = useContext(BeerContext);
  const total = cart.reduce((acc, actual) => acc + actual.price, 0)

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(({ data }) => setDataApi(data))
  }, []);

  const reload = JSON.parse(localStorage.getItem('cart'))?.length;

  console.log('cart', cart)
  return (
    <>
      {false && <Redirect to="/login" />}
      <MenuTop />
      <div className="render-cards">
        {dataApi.map(({ id, name, price, urlImage }, i) => cardProducts(id, name, price, urlImage, setCart, cart, total, i))}
        <div>
          <a href="/checkout" data-testid="checkout-bottom-btn" >Ver Carrinho</a>
          <p data-testid={`${0}-product-qtd`}> total: {reload}</p>
          <p data-testid="checkout-bottom-btn-value">{total.toFixed(2)} </p>
        </div>
      </div>
    </>
  );
}

export default Products;
