import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './style/Products.css';
import { BeerContext } from '../context/context';

const addTobascket = (basket, setBasket, price, name) => {
  setBasket({
    ...basket,
    price,
    name,
  })
}

const cardProducts = (id, name, price, photo, basket, setBasket) => (
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
    {/* <div data-testid="0-product-qtd" >{basket}</div> */}
    <div>
      <button data-testid="0-product-plus" onClick={() => addTobascket(basket, setBasket, price, name)} >+</button>
      <button data-testid="0-product-minus" onClick={() => setBasket(setBasket - 1)}>-</button>
    </div>
    <button data-testid="checkout-bottom-btn" >Ver carrinho</button>
    {/* <p data-testid="checkout-bottom-btn-value"> total ?</p> */}
  </div>
);

function Products() {
  const { shopCart: { basket, setBasket } } = useContext(BeerContext);

  const [dataApi, setDataApi] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(({ data }) => setDataApi(data));
  }, []);

  console.log(basket)

  return (
    <div className="render-cards">
      {dataApi.map(({ id, name, price, url_image }) => cardProducts(id, name, price, url_image, basket, setBasket))}
      <button></button>
    </div>
  )
}

export default Products;
