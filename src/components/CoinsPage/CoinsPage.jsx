import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as coinsActions } from '../../redux/redusers/coins';
import { CoinsTable } from '../CoinsTable';
import { Pagination } from '../Pagination/Pagination';
import './CoinsPage.scss';

export const CoinsPage = () => {
  const dispatch = useDispatch();
  const coins = useSelector(state => state.coins);

  const handleCoins = () => {
    dispatch(coinsActions.getCoins())
  };

  return(
    <section className='coins-page App__coins-page'>
      {coins.length > 0 
        ? (
            <>
              <CoinsTable />
              <Pagination />
            </>
          )
        : (
            <button
              className='coins-page__fetch button'
              onClick={handleCoins}>Fetch
            </button>
          )
      }
    </section>
  );
};
