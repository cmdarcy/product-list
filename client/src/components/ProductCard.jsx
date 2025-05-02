import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardTitle } from './ui/card';

const DEFAULTIMAGE = '/default-image-1.jpg';

function ProductCard({ product }) {
  return (
    <Card className="bg-gradient-to-t from-slate-400 to-slate-200">
      <div className="flex justify-between px-1.5">
        <p>
          Category: <strong>{product.category}</strong>
        </p>
        <p className="text-xl font-bold">${product.price}</p>
      </div>
      <CardContent>
        <div className="relative aspect-square w-full">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = DEFAULTIMAGE;
              e.currentTarget.onerror = null;
            }}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
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
