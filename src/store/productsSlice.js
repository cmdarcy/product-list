import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  pagination: {
    currentPage: null,
    totalPages: null,
    totalProducts: null,
    perPage: null,
  },
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const selectProducts = (state) => state.products;
export const selectPagination = (state) => state.pagination;

export default productsSlice.reducer;
