import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ searchProduct, searchCategory, sortPrice, pageNum = 1 }) => {
    console.log(searchProduct, searchCategory, sortPrice);
    const baseURL = 'http://localhost:8000/products';
    let fetchURL = `${baseURL}?page=${pageNum}`;
    if (searchProduct) {
      fetchURL += `&query=${searchProduct}`;
    }
    if (searchCategory) {
      fetchURL += `&category=${searchCategory}`;
    }
    if (sortPrice) {
      fetchURL += `&price=${sortPrice}`;
    }
    console.log(fetchURL);
    try {
      const response = await fetch(fetchURL);
      if (!response.ok) {
        throw new Error(`Invalid request: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  },
);

const initialState = {
  products: [],
  pagination: {
    currentPage: null,
    totalPages: null,
    totalProducts: null,
    perPage: null,
  },
  status: 'idle',
  error: null,
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const selectProducts = (state) => state.products;
export const selectPagination = (state) => state.pagination;

export default productsSlice.reducer;
