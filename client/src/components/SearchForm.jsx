import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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
      <Input
        onChange={(e) => setSearchProduct(e.target.value)}
        type="text"
        name="searchProduct"
        id="searchProduct"
        value={searchProduct}
        placeholder="Search for Product"
      />

      <Select
        onValueChange={(val) => setSearchCategory(val)}
        name="searchCategory"
        id="searchCategory"
        value={searchCategory}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="Automotive">Automotive</SelectItem>
            <SelectItem value="Tools">Tools</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Outdoors">Outdoors</SelectItem>
            <SelectItem value="Garden">Garden</SelectItem>
            <SelectItem value="Shoes">Shoes</SelectItem>
            <SelectItem value="Industrial">Industrial</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Music">Music</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Movies">Movies</SelectItem>
            <SelectItem value="Jewelery">Jewelery</SelectItem>
            <SelectItem value="Computers">Computers</SelectItem>
            <SelectItem value="Baby">Baby</SelectItem>
            <SelectItem value="Toys">Toys</SelectItem>
            <SelectItem value="Kids">Kids</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(val) => setSortPrice(val)}
        name="sortPrice"
        id="sortPrice"
        value={sortPrice}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Price Sort</SelectLabel>
            <SelectItem value="highest">Highest</SelectItem>
            <SelectItem value="lowest">Lowest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchForm;
