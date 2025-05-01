import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectSearchParams,
  setSearchParams,
} from '../store/productsSlice';
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
  const dispatch = useDispatch();
  const searchParams = useSelector(selectSearchParams);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchProducts({
        ...searchParams,
        pageNum: 1,
      }),
    );
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col sm:flex-row justify-center gap-3.5 p-4"
    >
      <div className="w-full sm:w-auto">
        <Input
          onChange={(e) =>
            dispatch(setSearchParams({ searchProduct: e.target.value }))
          }
          name="searchProduct"
          id="searchProduct"
          value={searchParams.searchProduct}
          placeholder="Search for Product"
          className="w-full"
        />
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(val) =>
            dispatch(setSearchParams({ searchCategory: val }))
          }
          name="searchCategory"
          id="searchCategory"
          value={searchParams.searchCategory}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
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
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(val) => dispatch(setSearchParams({ sortPrice: val }))}
          name="sortPrice"
          id="sortPrice"
          value={searchParams.sortPrice}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
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
      </div>

      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchForm;
