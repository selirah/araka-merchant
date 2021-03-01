import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { SettingsTypes } from './types';
import {
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUserSuccess,
  updateUserFailure,
  changePasswordSuccess,
  changePasswordFailure,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';
import { Client } from '../../interfaces';

function* getUser({ payload }: { type: string; payload: number }) {
  try {
    const res = yield call(callApiGet, `payments/clientdetails/${payload}`);
    if (res.status === 200) {
      yield put(getCurrentUserSuccess(res.data));
    } else {
      yield put(getCurrentUserFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getCurrentUserFailure(err.response.data));
    } else {
      yield put(getCurrentUserFailure('An unknwon error occurred'));
    }
  }
}

function* updateUser({ payload }: { type: string; payload: Client }) {
  try {
    const res = yield call(callApiPost, 'payments/clientdetails', payload);
    if (res.status === 200) {
      yield put(updateUserSuccess(res.data));
    } else {
      yield put(updateUserFailure(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(updateUserFailure(err.response.data));
    } else {
      yield put(updateUserFailure('An unknwon error occurred'));
    }
  }
}

function* changePassword({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'login/changepassword', payload);
    console.log(res);
    if (res.status === 200) {
      yield put(changePasswordSuccess());
    } else {
      yield put(changePasswordSuccess());
    }
  } catch (err) {
    if (err && err.response) {
      yield put(changePasswordFailure(err.response.data));
    } else {
      yield put(changePasswordFailure('An unknwon error occurred'));
    }
  }
}

function* watchGetUser() {
  yield takeEvery(SettingsTypes.GET_CURRENT_USER, getUser);
}

function* watchUpdateUser() {
  yield takeEvery(SettingsTypes.EDIT_ACCOUNT_REQUEST, updateUser);
}

function* watchChangePassword() {
  yield takeEvery(SettingsTypes.CHANGE_PASSWORD_REQUEST, changePassword);
}

function* settingsSaga(): Generator {
  yield all([
    fork(watchGetUser),
    fork(watchUpdateUser),
    fork(watchChangePassword),
  ]);
}

export { settingsSaga };
