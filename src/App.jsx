import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PageNavigator from './components/PageNavigator';
import ProductsContainer from './components/ProductsContainer';
import { fetchProducts } from './store/productsSlice';
import SearchForm from './components/SearchForm';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);
  return (
    <>
      <h1>React Frontend for Products API</h1>
      <SearchForm />
      <ProductsContainer />
      <PageNavigator />
    </>
  );
}

export default App;
