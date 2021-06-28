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
  paymentPageSuccess,
  paymentPageFailure,
  getPageTranxSuccess,
  getPageTranxFailure,
  postFeeSuccess,
  postFeeFailure,
  getProvidersSuccess,
  getProvidersFailure,
  mobilePaymentSuccess,
  mobilePaymentFailure,
  checkMobileStatusSuccess,
  checkMobileStatusFailure
} from './actions';

function* addPaymentPage({
  payload,
}: {
  type: string;
  payload: PaymentPage;
}): any {
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
}): any {
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

function* deletePaymentPage({
  payload,
}: {
  type: string;
  payload: string;
}): any {
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

function* getPaymentPages(): any {
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

function* paymentPage({ payload }: { type: string; payload: string }): any {
  try {
    const res = yield call(callApiGet, `payments/getpaymentpage/${payload}`);
    if (res.status === 200) {
      yield put(paymentPageSuccess(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(paymentPageFailure(err.response.data));
    } else {
      yield put(paymentPageFailure('An unknwon error occurred'));
    }
  }
}

function* pageTranx({ payload }: { type: string; payload: number }): any {
  try {
    const res = yield call(
      callApiGet,
      `payments/getproducttransactions/${payload}`
    );
    if (res.status === 200) {
      yield put(getPageTranxSuccess(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getPageTranxFailure(err.response.data));
    } else {
      yield put(getPageTranxFailure('An unknwon error occurred'));
    }
  }
}

function* processFeeRequest({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getfees', payload);
    if (res.status === 200) {
      yield put(postFeeSuccess(res.data));
    } else {
      yield put(postFeeFailure(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(
        postFeeFailure('An error occured when making request to server')
      );
    } else {
      throw err;
    }
  }
}

function* mobilePayment({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      'payments/processmobilewallet',
      payload
    );
    yield put(mobilePaymentSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(mobilePaymentFailure('An error occured during payment.'));
    } else {
      throw err;
    }
  }
}

function* mobileStatus({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiGet,
      `payments/gettransactionstatus/${payload}`
    );
    yield put(checkMobileStatusSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(checkMobileStatusFailure('An error occured during payment.'));
    } else {
      throw err;
    }
  }
}

function* getProviders(): any {
  try {
    const res = yield call(callApiGet, 'payments/getmobilewalletproviders');
    yield put(getProvidersSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(getProvidersFailure('An error occured during payment.'));
    } else {
      throw err;
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

function* watchGetPaymentPage() {
  yield takeEvery(PaymentPagesTypes.PAYMENT_PAGE_REQUEST, paymentPage);
}

function* watchGetPageTranx() {
  yield takeEvery(PaymentPagesTypes.GET_PAGE_TRANX_REQUEST, pageTranx);
}

function* watchPostFeeRequest() {
  yield takeEvery(PaymentPagesTypes.REQUEST_FEE_REQUEST, processFeeRequest);
}

function* watchGetProviders() {
  yield takeEvery(PaymentPagesTypes.GET_PROVIDERS_REQUEST, getProviders);
}

function* watchMobilePayment() {
  yield takeEvery(PaymentPagesTypes.MOBILE_PAYMENT_REQUEST, mobilePayment);
}

function* watchMobileStatus() {
  yield takeEvery(PaymentPagesTypes.MOBILE_STATUS_REQUEST, mobileStatus);
}

function* paymentPagesSaga(): Generator {
  yield all([
    fork(watchAddPaymentPage),
    fork(watchUpdatePaymentPage),
    fork(watchDeletePaymentPage),
    fork(watchGetPaymentPages),
    fork(watchGetPaymentPage),
    fork(watchGetPageTranx),
    fork(watchPostFeeRequest),
    fork(watchGetProviders),
    fork(watchMobilePayment),
    fork(watchMobileStatus)
  ]);
}

export { paymentPagesSaga };
