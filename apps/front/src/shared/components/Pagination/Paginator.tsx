import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { IUsePaginator } from './hooks/usePagination';

import './styles.scss';

interface IProps {
  paginator: IUsePaginator;
}

function Paginator({ paginator }: IProps) {
  return (
    <ResponsivePagination
      className={'navigation'}
      pageItemClassName={'navigation__page'}
      activeItemClassName={'selected'}
      previousClassName={'navigation__page previous'}
      nextClassName={'navigation__page next'}
      current={paginator.currentPage}
      total={paginator.pageCount}
      onPageChange={paginator.handlePageClick}
    />
  );
}

export default Paginator;
