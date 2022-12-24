import { takeEvery, put, call } from 'redux-saga/effects'
import { getCoins } from "../../api/coins";
import { actions as coinsActions, GET_COINS } from "../redusers/coins";

export function* handleCoins() {
  const coins = yield call(getCoins);

  yield put(coinsActions.setCoins(coins));
}

export function* watchClickSaga() {
  yield takeEvery(GET_COINS, handleCoins);
}

export default function* rootSaga() {
  yield watchClickSaga();
}