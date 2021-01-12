import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { TransactionTypes } from './types';
import {
  getTransactionsSuccess,
  getTransactionsFailure,
  getCurrenciesSuccess,
  getCurrenciesFailure,
  exportTranxSuccess,
  exportTranxFailure,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';
import { DataStream, Search } from '../../interfaces';

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

function* getExportTransactions({
  payload,
}: {
  type: string;
  payload: Search;
}) {
  try {
    const res = yield call(
      callApiPost,
      `payments/exportmerchanttransactions`,
      payload
    );
    if (res.status === 200) {
      yield put(exportTranxSuccess(res.data));

      // console.log(res.data);

      let file: DataStream = res.data;
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${file.fileContents}`;
      link.download = file.fileDownloadName;
      link.click();
    }
  } catch (err) {
    if (err && err.response) {
      yield put(exportTranxFailure(err.response.data));
    } else {
      yield put(exportTranxFailure('An unknwon error occurred'));
    }
  }
}

function* watchGetTransactions() {
  yield takeEvery(TransactionTypes.GET_TRANSACTIONS, getTransactions);
}

function* watchGetCurrencies() {
  yield takeEvery(TransactionTypes.GET_CURRENCIES, getCurrencies);
}

function* watchExportTransactions() {
  yield takeEvery(
    TransactionTypes.EXPORT_TRANSACTIONS_REQUEST,
    getExportTransactions
  );
}

function* transactionSaga(): Generator {
  yield all([
    fork(watchGetTransactions),
    fork(watchGetCurrencies),
    fork(watchExportTransactions),
  ]);
}

export { transactionSaga };
