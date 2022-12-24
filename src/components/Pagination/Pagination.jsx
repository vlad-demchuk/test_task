import React from 'react';
import './Pagination.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions as paginationActions } from '../../redux/redusers/pagination';

export const Pagination = () => {
  const dispatch = useDispatch();
  const { currPage, coinsPerPage  } = useSelector(state => state.pagination);
  const coins = useSelector(state => state.coins);

  let pageNumbers = [];
  const totalCoins = coins.length;
  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  const totalPages = pageNumbers.length;
  if (totalPages > 10) {
    let fromPage = currPage;
    let toPage = null;
    
    if (currPage >= totalPages - 2) {
      pageNumbers = [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    
    if (currPage >= 3 && currPage <= totalPages - 3) {
      fromPage = currPage - 2;
      toPage  = currPage + 1;
      const range = pageNumbers.slice(fromPage, toPage);
      pageNumbers = [1, ...range, totalPages];
    }
    
    if (currPage < 3) {
      pageNumbers = [1,2,3,4, totalPages];
    }
  }

  const handleSetCurrentPage = (pageNumber) => {
    if (pageNumber === currPage) {
      return;
    }

    dispatch(paginationActions.setCurrPage(pageNumber));
  };

  const handlePrevPage = () => {
    if (currPage === 1) {
      return;
    }

    dispatch(paginationActions.setPrevPage())
  }

  const handleNextPage = () => {
    if (currPage === totalPages) {
      return;
    }

    dispatch(paginationActions.setNextPage())
  }

  return(
    <nav className='pagination'>
      <ul className='pagination__list'>
        <li className='pagination__item'>
          <button 
            className='pagination__button button'
            onClick={handlePrevPage}
          >
            {'<'}
          </button>
        </li>

        {pageNumbers.map(pageNumber => (
          <li className='pagination__item' key={pageNumber}>
            <button className={cn(
              'pagination__button', 'button',
              { 'pagination__button--active': currPage === pageNumber }
              )}
              onClick={() => handleSetCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        <li className='pagination__item'>
          <button 
            className='pagination__button button'
            onClick={handleNextPage}
          >
            {'>'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
