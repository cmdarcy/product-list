import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PageNavigator from './components/PageNavigator';
import ProductsContainer from './components/ProductsContainer';
import { fetchProducts } from './store/productsSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h1>React Frontend for Products API</h1>
      <ProductsContainer />
      <PageNavigator />
    </>
  );
}

export default App;
