import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AuthActionTypes } from './types'
import {
  loginError,
  loginSuccess,
  logError,
  forgottenPasswordSuccess,
  forgottenPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure
} from './actions'
import { callApiPost } from '../../utils/api'
import { Login, ForgottenPassword, ResetPassword } from '../../interfaces'
import { authorization } from '../../utils/authorization'
import { secure } from '../../utils/secure'

function* login({ payload }: { type: string; payload: Login }): any {
  try {
    const res = yield call(callApiPost, 'login', payload)
    secure.set('user', res.data)
    yield authorization(res.data.token)
    yield put(loginSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(loginError(err.response.data))
      } else {
        yield put(logError(err.response.data))
      }
    } else {
      throw err
    }
  }
}

function* forgotten({
  payload
}: {
  type: string
  payload: ForgottenPassword
}): any {
  try {
    const res = yield call(callApiPost, 'login/requestpasswordreset', payload)
    if (res.status === 200) {
      yield put(forgottenPasswordSuccess(res.data))
    } else {
      yield put(forgottenPasswordFailure(res.data))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(forgottenPasswordFailure(err.response.data))
      } else {
        yield put(forgottenPasswordFailure(err.response.data))
      }
    }
  }
}

function* reset({ payload }: { type: string; payload: ResetPassword }): any {
  try {
    const res = yield call(callApiPost, 'login/resetpassword', payload)
    if (res.status === 200) {
      yield put(resetPasswordSuccess(res.data))
    } else {
      yield put(resetPasswordFailure(res.data))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(resetPasswordFailure(err.response.data))
      } else {
        yield put(resetPasswordFailure(err.response.data))
      }
    }
  }
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGIN_SUBMIT, login)
}

function* watchForgottenPassword() {
  yield takeEvery(AuthActionTypes.FORGOTTEN_PASSWORD_REQUEST, forgotten)
}

function* watchResetPassword() {
  yield takeEvery(AuthActionTypes.RESET_PASSWORD_REQUEST, reset)
}

function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchForgottenPassword),
    fork(watchResetPassword)
  ])
}

export { authSaga }
