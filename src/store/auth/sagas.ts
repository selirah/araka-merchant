import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes } from './types';
import { loginError, loginSuccess, logError } from './actions';
import { callApiPost } from '../../utils/api';
import { Login } from '../../interfaces';
import { authorization } from '../../utils/authorization';
import { secure } from '../../utils/secure';

function* login({ payload }: { type: string; payload: Login }) {
  try {
    const res = yield call(callApiPost, 'login', payload);
    secure.set('user', res.data);
    yield authorization(res.data.token);
    yield put(loginSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(loginError(err.response.data));
      } else {
        yield put(logError(err.response.data));
      }
    } else {
      throw err;
    }
  }
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGIN_SUBMIT, login);
}

function* authSaga() {
  yield all([fork(watchLogin)]);
}

export { authSaga };
