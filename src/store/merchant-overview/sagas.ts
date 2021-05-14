import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { MerchantsOverviewTypes } from './types';
import {
  getMerchantsOverviewSuccess,
  getMerchantsOverviewFailure,
  exportOverviewSuccess,
  exportOverviewFailure,
} from './actions';
import { callApiPost } from '../../utils/api';
import { DataStream } from '../../interfaces';

function* getOverview({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      'reports/getmerchantsoverview',
      payload
    );
    if (res.status === 200) {
      yield put(getMerchantsOverviewSuccess(res.data));
    } else {
      yield put(getMerchantsOverviewFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getMerchantsOverviewFailure(err.response.data));
    } else {
      yield put(getMerchantsOverviewFailure('An unknwon error occurred'));
    }
  }
}

function* getExportOverview({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      `payments/exportmerchantsoverview`,
      payload
    );
    if (res.status === 200) {
      yield put(exportOverviewSuccess(res.data));

      // console.log(res.data);

      let file: DataStream = res.data;
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${file.fileContents}`;
      link.download = file.fileDownloadName;
      link.click();
    }
  } catch (err) {
    if (err && err.response) {
      yield put(exportOverviewFailure(err.response.data));
    } else {
      yield put(exportOverviewFailure('An unknwon error occurred'));
    }
  }
}

function* watchGetOverview() {
  yield takeEvery(MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW, getOverview);
}

function* watchExportOverview() {
  yield takeEvery(
    MerchantsOverviewTypes.EXPORT_OVERVIEW_REQUEST,
    getExportOverview
  );
}

function* overviewSaga(): Generator {
  yield all([fork(watchGetOverview), fork(watchExportOverview)]);
}

export { overviewSaga };
