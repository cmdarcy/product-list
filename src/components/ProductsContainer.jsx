import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productsSlice';

function ProductsContainer() {
  const products = useSelector(selectProducts);
  return (
    <div>
      <h2>ProductsContainer</h2>
      {
        // TODO add logic to display message if no products found
      }
      {products.map((p) => (
        <h3>{p.name}</h3>
      ))}
    </div>
  );
}

export default ProductsContainer;
