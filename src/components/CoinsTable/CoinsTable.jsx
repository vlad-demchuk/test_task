import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as coinsActions } from '../../redux/redusers/coins';
import './CoinsTable.scss';

export const CoinsTable = () => {
  const dispatch = useDispatch();
  const coins = useSelector(state => state.coins);
  const { currPage, coinsPerPage  } = useSelector(state => state.pagination);

  const [takenCoin, setTakenCoin] = useState(null);
  const [currentCoinIndex, setCurrentCoinIndex] = useState(null);

  const dragStartHandler = (e, takenCoin) => {
    const indexTakenCoin = coins.findIndex(coin => coin.id === takenCoin.id);
    setCurrentCoinIndex(indexTakenCoin);
    setTakenCoin(takenCoin);
  };

  const dropHandler = (e, underCoin) => {
    e.preventDefault();
    e.target.parentNode.style.background = 'transparent';
  
    const underCoinIndex = coins.findIndex(coin => coin.id === underCoin.id);
    const updatedCoins = [...coins];
    updatedCoins[currentCoinIndex] = underCoin;
    updatedCoins[underCoinIndex] = takenCoin;

    dispatch(coinsActions.setCoins(updatedCoins));
  };
  
  const onDragOverHandler = e => {
    e.preventDefault();
    e.target.parentNode.style.background = 'lightgray';
  };
  
  const onDragEndHandler = e => {
    e.target.parentNode.style.background = 'transparent';
  };

  const indexOfLastCoin = currPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const paginatedCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  return(
    <table className='coins-table coins-page__table'>
      <thead>
        <tr className='coins-table__row'>
          <th className='coins-table__column'>ID</th>
          <th className='coins-table__column'>Name</th>
          <th className='coins-table__column'>Symbol</th>
        </tr>
      </thead>
      
      <tbody>
        {paginatedCoins.map(coin => (
          <tr
            className='coins-table__row'
            key={coin.id}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, coin)}
            onDrop={(e) => dropHandler(e, coin)}
            onDragOver={onDragOverHandler}
            onDragLeave={ onDragEndHandler}
            onDragEnd={onDragEndHandler}
          >
            <td className='coins-table__column coins-table__column-id'>{coin.id}</td>
            <td className='coins-table__column coins-table__column-name'>{coin.name}</td>
            <td className='coins-table__column coins-table__column-symbol'>{coin.symbol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
