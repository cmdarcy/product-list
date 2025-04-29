import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardTitle } from './ui/card';

function ProductCard({ product }) {
  return (
    <Card>
      <div className="flex justify-between">
        <p>
          Category: <strong>{product.category}</strong>
        </p>
        <p className="text-xl font-bold">${product.price}</p>
      </div>
      <CardContent>
        <img src={product.image} alt="product" />
        <CardTitle className="text-3xl font-extrabold">
          {product.name}
        </CardTitle>
      </CardContent>
    </Card>
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
