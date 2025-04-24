import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts } from '../store/productsSlice';

function ProductsContainer() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      <h2>ProductsContainer</h2>
      {products.map((p) => (
        <h3>{p.name}</h3>
      ))}
    </div>
  );
}

export default ProductsContainer;
