export const GET_COINS = 'GET_COINS';
const SET_COINS = 'SET_COINS';

const getCoins = () => ({ type: GET_COINS });
const setCoins = (coins) => ({ type: SET_COINS, payload: coins });

export const actions = { getCoins, setCoins };

const coinsReduser = (coins = [], action) => {
  switch (action.type) {
    case SET_COINS:
      return action.payload;
  
    default:
      return coins;
    }
};

export default coinsReduser;
