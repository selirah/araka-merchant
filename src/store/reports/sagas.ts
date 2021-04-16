import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ReportsActionTypes } from './types';
import {
  callApiPost,
  callApiGet,
  callApiPostQueryParams,
} from '../../utils/api';
import { PayoutNewRecord } from '../../interfaces';
import {
  getPCESFailure,
  getPCESSuccess,
  getPayoutFailure,
  getPayoutSuccess,
  getProxyPayFailure,
  getProxyPaySuccess,
  postPayoutFailure,
  postPayoutSuccess,
  getMerchantsFailure,
  getMerchantsSuccess,
  getPayoutFeeSuccess,
  getPayoutFeeFailure,
} from './actions';

function* getPCESReport(): any {
  try {
    const res = yield call(callApiGet, '');
    yield put(getPCESSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(getPCESFailure(err.response.data));
    } else {
      yield put(getPCESFailure('An unknwon error occurred'));
    }
  }
}

function* getProxyPayReport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiGet, '');
    yield put(getProxyPaySuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(getProxyPayFailure(err.response.data));
    } else {
      yield put(getProxyPayFailure('An unknwon error occurred'));
    }
  }
}

function* getPayoutReport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getproxypayouts', payload);
    yield put(getPayoutSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(getPayoutFailure(err.response.data));
    } else {
      yield put(getPayoutFailure('An unknwon error occurred'));
    }
  }
}

function* postNewRecord({
  payload,
}: {
  type: string;
  payload: PayoutNewRecord;
}): any {
  try {
    yield call(callApiPost, 'payments/newrecordpayout', payload);
    yield put(postPayoutSuccess());
  } catch (err) {
    if (err && err.response) {
      yield put(postPayoutFailure(err.response.data));
    } else {
      yield put(
        postPayoutFailure('An error occured when making request to server')
      );
    }
  }
}

function* getMerchants(): any {
  try {
    const res = yield call(callApiGet, 'payments/getmerchants');
    yield put(getMerchantsSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(getMerchantsFailure(err.response.data));
    } else {
      yield put(getMerchantsFailure('An unknwon error occurred'));
    }
  }
}

function* postPayoutFee({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getpayoutfee', payload);
    yield put(getPayoutFeeSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(
        getPayoutFeeFailure('An error occured when making request to server')
      );
    } else {
      throw err;
    }
  }
}

function* watchGetPCESReport() {
  yield takeEvery(ReportsActionTypes.GET_PCES_REQUEST, getPCESReport);
}

function* watchGetProxyPayReport() {
  yield takeEvery(ReportsActionTypes.GET_PROXYPAY_REQUEST, getProxyPayReport);
}

function* watchGetPayoutReport() {
  yield takeEvery(ReportsActionTypes.GET_PAYOUT_REQUEST, getPayoutReport);
}

function* watchPostNewRecord() {
  yield takeEvery(ReportsActionTypes.POST_RECORD_REQUEST, postNewRecord);
}

function* watchGetMerchants() {
  yield takeEvery(ReportsActionTypes.GET_MERCHANTS_REQUEST, getMerchants);
}

function* watchPostPayoutFee() {
  yield takeEvery(ReportsActionTypes.POST_PAYOUT_FEE_REQUEST, postPayoutFee);
}

function* reportsSaga(): Generator {
  yield all([
    fork(watchGetPCESReport),
    fork(watchGetProxyPayReport),
    fork(watchGetPayoutReport),
    fork(watchPostNewRecord),
    fork(watchGetMerchants),
    fork(watchPostPayoutFee),
  ]);
}

export { reportsSaga };
