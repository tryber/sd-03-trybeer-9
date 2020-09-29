import React from 'react';

const CardProducts = ({ name, price, urlImage, index, classImg }) => {
  return (
    <div>
      <div data-testid={`${index}-product-price`}>{`R$ ${price.toFixed(2).toString().replace('.', ',')}`}</div>
      <img className={classImg} data-testid={`${index}-product-img`} src={urlImage} />
      <div data-testid={`${index}-product-name`}>{name}</div>
    </div >
  );
}

export default CardProducts;
