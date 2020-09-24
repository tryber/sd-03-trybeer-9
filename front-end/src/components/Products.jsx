import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './style/Products.css';
import { BeerContext } from '../context/context';

const addTobascket = (price, name, setCart) => {
  const item = { price, name };
  setCart(currentState => [...currentState, item]);
  return localStorage.setItem('cart', name)
}

const removeToBascket = (price, name, setCart) => {
  const item = { price, name };

}



const cardProducts = (id, name, price, photo, setCart, cart, total) => (
  <div
    data-testid="0-product-price"
    className="card-products"
    key={id}>
    <img
      data-testid="0-product-img"
      className="img-products"
      src={photo} />
    <p data-testid="0-product-name">{name}</p>
    <span>R$ {price}</span>
    {/* <div ver data-testid="checkout-bottom-btn-value" >{basket}</div> */}
    <div>
      <button data-testid="0-product-plus" onClick={() => addTobascket(price, name, setCart)} >+</button>
      {/* <button data-testid="0-product-minus" onClick={() => setCart()}>-</button> */}
    </div>
  </div>
);

function Products() {
  const [dataApi, setDataApi] = useState([])
  const { cart, setCart } = useContext(BeerContext);
  const total = cart.reduce((acc, actual) => acc + actual.price, 0);

  useEffect(() => axios.get('http://localhost:3001/products')
    .then(({ data }) => setDataApi(data)), []);


  console.log('aqui', cart)

  return (
    <div className="render-cards">
      {dataApi.map(({ id, name, price, urlImage }) => cardProducts(id, name, price, urlImage, setCart, cart, total))}
      <div>
        <button data-testid="checkout-bottom-btn" >Ver carrinho: {total.toFixed(2)}</button>
        <p data-testid="0-product-qtd"> total: {cart.length}</p>
      </div>
    </div>
  );
}

export default Products;
