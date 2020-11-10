// import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
// import { DashboardTypes } from './types';
// import { callApiGet } from '../../utils/api';

// function* getTransactions() {
//   try {
//     const res = yield call(callApiGet, 'payments/transactionhistory');
//     if (res.status === 200) {
//       yield put(getTransactionsSuccess(res.data));
//     } else {
//       yield put(getTransactionsFailure('An unknwon error occurred'));
//     }
//   } catch (err) {
//     if (err && err.response) {
//       yield put(getTransactionsFailure(err.response.data));
//     } else {
//       yield put(getTransactionsFailure('An unknwon error occurred'));
//     }
//   }

//   function* watchGetTransactions() {
//     yield takeEvery(DashboardTypes.TOPBAR_HEADER, getTransactions);
//   }

//   function* dashboardSaga(): Generator {
//     yield all([fork(watchGetTransactions)]);
//   }
// }

// export { dashboardSaga };

export const hi = 'hi';
