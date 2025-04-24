import React, { useEffect, useState } from 'react';

function ProductsContainer() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/products');
      const data = await response.json();
      setProducts(data.products);
    }
    fetchData();
  }, []);
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
