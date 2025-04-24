import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectPagination } from '../store/productsSlice';

function PageNavigator() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectPagination);
  const pageButtons = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );
  const pageClickHandler = (pageNum) => {
    dispatch(fetchProducts(pageNum));
  };
  return (
    <div>
      <h2>PageNavigator</h2>
      <ul>
        {pageButtons.map((pageNumber, i) => (
          <button
            type="button"
            key={i}
            onClick={() => pageClickHandler(pageNumber)}
          >
            Page {pageNumber}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default PageNavigator;
