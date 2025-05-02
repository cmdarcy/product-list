import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectCategories,
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
  const categories = useSelector(selectCategories);

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
          className="w-full text-slate-200"
        />
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(val) => {
            const searchCategory = val === 'default' ? '' : val;
            dispatch(setSearchParams({ searchCategory }));
          }}
          name="searchCategory"
          id="searchCategory"
          value={searchParams.searchCategory}
        >
          <SelectTrigger className="w-full sm:w-[180px] hover:cursor-pointer text-slate-200">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem className="text-gray-400" value="default">
                Default
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(val) => {
            const sortPrice = val === 'default' ? '' : val;
            dispatch(setSearchParams({ sortPrice }));
          }}
          name="sortPrice"
          id="sortPrice"
          value={searchParams.sortPrice}
        >
          <SelectTrigger className="w-full sm:w-[180px] hover:cursor-pointer text-slate-200">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Price Sort</SelectLabel>
              <SelectItem className="text-gray-400" value="default">
                Default
              </SelectItem>
              <SelectItem value="highest">Highest</SelectItem>
              <SelectItem value="lowest">Lowest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button className="hover:cursor-pointer" type="submit">
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
