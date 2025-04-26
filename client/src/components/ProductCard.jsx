import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  return (
    <div>
      <div>
        <p>Category: {product.category}</p>
        <p>{product.price}</p>
      </div>
      <img src={product.image} alt="product" />
      <h4>{product.name}</h4>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

export default ProductCard;
