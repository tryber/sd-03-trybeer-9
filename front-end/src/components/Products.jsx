import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './style/Products.css';
import { BeerContext } from '../context/context';
import MenuTop from './MenuTop';
import { Redirect, Link } from 'react-router-dom';
import CardProducts from './CardProducts';

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

const removeToBascket = (cart, name, setCart) => {
  if (cart.length === 0) return;
  const remove = cart.filter(e => e.name !== name)
  setCart(remove)
}

// const cardProducts = (id, name, price, photo, setCart, cart, total, i) => (
//   <div
//     data-testid={`${i}-product-price`}
//     className="card-products"
//     key={id}>
//     <img
//       data-testid={`${i}-product-img`}
//       className="img-products"
//       src={photo} />
//     <p data-testid={`${i}-product-name`}>{name}</p>
//     <span data-testid={`${i}-product-price`}>R${price}</span>
//     {cart.length === 0
//       ? <button disabled data-testid={`${i}-product-qtd`} >Ver Carrinho: {cart.length}</button>
//       : <button data-testid={`${i}-product-qtd`} >Ver Carrinho: {cart.length}</button>}
//     <div>
//       <button data-testid={`${i}-product-plus`} onClick={() => addTobascket(price, name, setCart)} >+</button>
//       <button data-testid={`${i}-product-minus`} onClick={() => removeToBascket(cart, name, setCart, i)}>-</button>
//     </div>
//   </div>
// );

const renderProducts = (dataApi, cart, setCart) =>
  dataApi.map(({ id, name, price, urlImage }, index) => {
    
    return (
      <div className="card-products">
        <CardProducts
          index={index}
          key={id}
          name={name}
          price={price}
          urlImage={urlImage}
          classImg="img-products"
        />
        <button type="button"
          onClick={() => addTobascket(price, name, setCart)} data-testid={`${index}-product-plus`}>+</button>
        <button type="button"
          onClick={() => removeToBascket(cart, name, setCart)} data-testid={`${index}-product-minus`}>-</button>
        <button data-testid={`${index}-product-qtd`} >qtd: {cart.length}</button>
        {cart.length === 0
          ? <button disabled type="button" data-testid="checkout-bottom-btn" >Ver Carrinho</button>
          : <Link to="/checkout" data-testid="checkout-bottom-btn" >Ver Carrinho</Link>}
      </div>
    )
  });

function Products() {
  const [dataApi, setDataApi] = useState([])
  const { cart, setCart } = useContext(BeerContext);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(({ data }) => setDataApi(data))
  }, []);

  // const reload = JSON.parse(localStorage.getItem('cart')).length;

  const total = cart.reduce((acc, actual) => acc + actual.price, 0)
  return (
    <>
      {false && <Redirect to="/login" />}
      <MenuTop />
      <div className="render-cards">
        {renderProducts(dataApi, cart, setCart)}
        <p data-testid="checkout-bottom-btn-value">{`R$ ${total.toFixed(2)}`} </p>
      </div>
    </>
  );
}

{/* <p data-testid={`${0}-product-qtd`}> total: {reload}</p> */ }
{/* {dataApi.map(({ id, name, price, urlImage }, i) => cardProducts(id, name, price, urlImage, setCart, cart, total, i))} */ }

export default Products;
