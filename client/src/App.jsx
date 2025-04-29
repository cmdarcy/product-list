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
    <div className="grid place-content-center m-3 gap-2">
      <SearchForm />
      <ProductsContainer />
      <PageNavigator />
    </div>
  );
}

export default App;
