import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { PaymentPagesTypes } from './types';
import { callApiPost, callApiGet } from '../../utils/api';
import { PaymentPage } from '../../interfaces';
import {
  addPaymentPageSuccess,
  addPaymentPageFailure,
  updatePaymentPageSuccess,
  updatePaymentPageFailure,
  deletePaymentPageSuccess,
  deletePaymentPageFailure,
  getPaymentPagesSuccess,
  getPaymentPagesFailure,
} from './actions';

function* addPaymentPage({ payload }: { type: string; payload: PaymentPage }) {
  try {
    const res = yield call(callApiPost, 'payments/addpaymentpage', payload);
    yield put(addPaymentPageSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(addPaymentPageFailure(err.response.data));
    } else {
      yield put(
        addPaymentPageFailure('An error occured when making request to server')
      );
    }
  }
}

function* updatePaymentPage({
  payload,
}: {
  type: string;
  payload: PaymentPage;
}) {
  try {
    const res = yield call(callApiPost, '', payload);
    yield put(updatePaymentPageSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(updatePaymentPageFailure(err.response.data));
    } else {
      yield put(
        updatePaymentPageFailure(
          'An error occured when making request to server'
        )
      );
    }
  }
}

function* deletePaymentPage({ payload }: { type: string; payload: string }) {
  try {
    yield call(callApiPost, '', payload);
    yield put(deletePaymentPageSuccess(payload));
  } catch (err) {
    if (err && err.response) {
      yield put(deletePaymentPageFailure(err.response.data));
    } else {
      yield put(
        deletePaymentPageFailure(
          'An error occured when making request to server'
        )
      );
    }
  }
}

function* getPaymentPages() {
  try {
    const res = yield call(callApiGet, 'payments/merchantpaymentpages');
    if (res.status === 200) {
      yield put(getPaymentPagesSuccess(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getPaymentPagesFailure(err.response.data));
    } else {
      yield put(getPaymentPagesFailure('An unknwon error occurred'));
    }
  }
}

function* watchAddPaymentPage() {
  yield takeEvery(PaymentPagesTypes.ADD_PAYMENT_PAGE_REQUEST, addPaymentPage);
}

function* watchUpdatePaymentPage() {
  yield takeEvery(
    PaymentPagesTypes.UPDATE_PAYMENT_PAGE_REQUEST,
    updatePaymentPage
  );
}

function* watchDeletePaymentPage() {
  yield takeEvery(
    PaymentPagesTypes.DELETE_PAYMENT_PAGE_REQUEST,
    deletePaymentPage
  );
}

function* watchGetPaymentPages() {
  yield takeEvery(PaymentPagesTypes.GET_PAYMENT_PAGES_REQUEST, getPaymentPages);
}

function* paymentPagesSaga(): Generator {
  yield all([
    fork(watchAddPaymentPage),
    fork(watchUpdatePaymentPage),
    fork(watchDeletePaymentPage),
    fork(watchGetPaymentPages),
  ]);
}

export { paymentPagesSaga };
