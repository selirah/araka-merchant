import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ReportsActionTypes } from './types';
import { callApiPost, callApiGet } from '../../utils/api';
import { PayoutNewRecord, DataStream } from '../../interfaces';
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
  exportFailure,
  exportSuccess,
  downloadReceiptSuccess,
  downloadReceiptFailure,
} from './actions';
import { isEmpty } from '../../helpers/isEmpty';

function* getPCESReport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getpcesreports', payload);
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
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload);
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
    if (isEmpty(res.data)) {
      yield put(getPayoutSuccess(null));
    } else {
      yield put(getPayoutSuccess(res.data));
    }
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

function* getExport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, `payments/exportproxypayouts`, payload);
    yield put(exportSuccess(res.data));
    let file: DataStream = res.data;
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${file.fileContents}`;
    link.download = file.fileDownloadName;
    link.click();
  } catch (err) {
    if (err && err.response) {
      yield put(exportFailure(err.response.data));
    } else {
      yield put(exportFailure('An unknwon error occurred'));
    }
  }
}

function* getDownloadReceiptStream({
  payload,
}: {
  type: string;
  payload: number;
}): any {
  try {
    const res = yield call(callApiPost, 'payments/getpayoutreceipt', payload);
    if (res.status === 200) {
      yield put(downloadReceiptSuccess(res.data));

      let file: DataStream = res.data;
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${file.fileContents}`;
      link.download = file.fileDownloadName;
      link.click();
    }
  } catch (err) {
    if (err && err.response) {
      yield put(downloadReceiptFailure(err.response.data));
    } else {
      yield put(downloadReceiptFailure('An unknwon error occurred'));
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

function* watchExport() {
  yield takeEvery(ReportsActionTypes.EXPORT_REQUEST, getExport);
}

function* watchFetchGetDownloadReceiptStream() {
  yield takeEvery(
    ReportsActionTypes.DOWNLOAD_RECEIPT_REQUEST,
    getDownloadReceiptStream
  );
}

function* reportsSaga(): Generator {
  yield all([
    fork(watchGetPCESReport),
    fork(watchGetProxyPayReport),
    fork(watchGetPayoutReport),
    fork(watchPostNewRecord),
    fork(watchGetMerchants),
    fork(watchPostPayoutFee),
    fork(watchExport),
    fork(watchFetchGetDownloadReceiptStream),
  ]);
}

export { reportsSaga };
