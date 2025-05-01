import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectSearchParams,
  selectPagination,
} from '../store/productsSlice';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from './ui/pagination';

function PageNavigator() {
  const dispatch = useDispatch();
  const searchParams = useSelector(selectSearchParams);
  const pagination = useSelector(selectPagination);
  const { currentPage } = pagination;
  const pageButtons = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );
  const pageClickHandler = (pageNum) => {
    dispatch(fetchProducts({ ...searchParams, pageNum }));
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {pageButtons.map((pageNumber, i) => (
              <PaginationLink
                className="hover:cursor-pointer"
                isActive={parseInt(currentPage) === pageNumber}
                key={i}
                onClick={() => pageClickHandler(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            ))}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PageNavigator;
