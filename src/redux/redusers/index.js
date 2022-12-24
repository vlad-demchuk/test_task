import { combineReducers } from "redux";
import coinsReduser from "./coins";
import paginationReduser from "./pagination";

const reducer = combineReducers({
  pagination: paginationReduser,
  coins: coinsReduser
});

export default reducer;
