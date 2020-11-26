import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { TransactionTypes } from './types';
import {
  getTransactionsSuccess,
  getTransactionsFailure,
  getCurrenciesSuccess,
  getCurrenciesFailure,
} from './actions';
import { callApiGet } from '../../utils/api';

function* getTransactions() {
  try {
    const res = yield call(callApiGet, 'payments/getmerchanttransactions');
    if (res.status === 200) {
      yield put(getTransactionsSuccess(res.data));
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getTransactionsFailure(err.response.data));
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'));
    }
  }
}

function* getCurrencies() {
  try {
    const res = yield call(callApiGet, 'payments/currencycodes');
    if (res.status === 200) {
      yield put(getCurrenciesSuccess(res.data));
    } else {
      yield put(getCurrenciesFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getCurrenciesFailure(err.response.data));
    } else {
      yield put(getCurrenciesFailure('An unknwon error occurred'));
    }
  }
}

function* watchGetTransactions() {
  yield takeEvery(TransactionTypes.GET_TRANSACTIONS, getTransactions);
}

function* watchGetCurrencies() {
  yield takeEvery(TransactionTypes.GET_CURRENCIES, getCurrencies);
}

function* transactionSaga(): Generator {
  yield all([fork(watchGetTransactions), fork(watchGetCurrencies)]);
}

export { transactionSaga };
