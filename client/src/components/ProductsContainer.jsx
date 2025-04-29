import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productsSlice';
import ProductCard from './ProductCard';

function ProductsContainer() {
  const products = useSelector(selectProducts);
  return (
    <div className="grid grid-cols-3 gap-3">
      {products.length === 0 ? (
        <h2> No products found. Try another search!</h2>
      ) : (
        products.map((product) => <ProductCard product={product} />)
      )}
    </div>
  );
}

export default ProductsContainer;
