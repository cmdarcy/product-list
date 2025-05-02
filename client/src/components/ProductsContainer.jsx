import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productsSlice';
import ProductCard from './ProductCard';

function ProductsContainer() {
  const products = useSelector(selectProducts);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <h2 className="text-xl font-semibold text-slate-100">
            No products found. Try another search!
          </h2>
          <p className="text-slate-300">Try another search</p>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))
      )}
    </div>
  );
}

export default ProductsContainer;
