import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardTitle } from './ui/card';

const DEFAULTIMAGE = '/default-image-1.jpg';

function ProductCard({ product }) {
  const [productImg, setProductImg] = useState(product.image);

  return (
    <Card>
      <div className="flex justify-between px-1.5">
        <p>
          Category: <strong>{product.category}</strong>
        </p>
        <p className="text-xl font-bold">${product.price}</p>
      </div>
      <CardContent>
        <img
          src={productImg}
          alt="product"
          onError={() => setProductImg(DEFAULTIMAGE)}
        />
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
