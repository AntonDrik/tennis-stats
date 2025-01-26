import { useState } from 'react';

export interface IUsePaginator {
  currentPage: number;
  pageCount: number;
  handlePageClick: (page: number) => void;
}

function usePagination(itemsPerPage: number, itemsLength: number): IUsePaginator {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    pageCount: Math.ceil(itemsLength / itemsPerPage),
    handlePageClick,
  };
}

export default usePagination;
