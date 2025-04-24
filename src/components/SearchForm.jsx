import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';

function SearchForm() {
  const [searchProduct, setSearchProduct] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchProducts({
        searchProduct,
        searchCategory,
        sortPrice,
        pageNum: 1,
      }),
    );
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="searchProduct">Product Search</label>
      <input
        onChange={(e) => setSearchProduct(e.target.value)}
        type="text"
        name="searchProduct"
        id="searchProduct"
        value={searchProduct}
      />

      <select
        onChange={(e) => setSearchCategory(e.target.value)}
        name="searchCategory"
        id="searchCategory"
        value={searchCategory}
      >
        <option value="">Sort by Category</option>
        <option value="Automotive">Automotive</option>
        <option value="Tools">Tools</option>
        <option value="Clothing">Clothing</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Garden">Garden</option>
        <option value="Shoes">Shoes</option>
        <option value="Industrial">Industrial</option>
        <option value="Health">Health</option>
        <option value="Music">Music</option>
        <option value="Books">Books</option>
        <option value="Movies">Movies</option>
        <option value="Jewelery">Jewelery</option>
        <option value="Computers">Computers</option>
        <option value="Baby">Baby</option>
        <option value="Toys">Toys</option>
        <option value="Kids">Kids</option>
        <option value="Home">Home</option>
      </select>

      <select
        onChange={(e) => setSortPrice(e.target.value)}
        name="sortPrice"
        id="sortPrice"
        value={sortPrice}
      >
        <option value="">Sort by Price</option>
        <option value="highest">Highest</option>
        <option value="lowest">Lowest</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
