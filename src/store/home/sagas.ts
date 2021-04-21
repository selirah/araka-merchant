import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { HomeTypes } from './types';
import { callApiPost } from '../../utils/api';
import { Merchant } from '../../interfaces';
import {
  paymentSuccess,
  paymentFailure,
  getOverviewFailure,
  getOverviewSuccess,
} from './actions';

function* getOverview({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      'payments/getmerchantoverview',
      payload
    );
    if (res.status === 200) {
      yield put(getOverviewSuccess(res.data));
    } else {
      yield put(getOverviewFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getOverviewFailure(err.response.data));
    } else {
      yield put(getOverviewFailure('An unknwon error occurred'));
    }
  }
}

function* processOrderRequest({
  payload,
}: {
  type: string;
  payload: Merchant;
}): any {
  try {
    const res = yield call(callApiPost, 'payments/getpaymentpage', payload);
    yield put(paymentSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(paymentFailure(err.response.data));
    } else {
      yield put(
        paymentFailure('An error occured when making request to server')
      );
    }
  }
}

function* watchProcessOrderRequest() {
  yield takeEvery(HomeTypes.REQUEST_PAYMENT, processOrderRequest);
}

function* watchGetOverviewRequest() {
  yield takeEvery(HomeTypes.GET_OVERVIEW_REQUEST, getOverview);
}

function* homeSaga(): Generator {
  yield all([fork(watchProcessOrderRequest), fork(watchGetOverviewRequest)]);
}

export { homeSaga };
