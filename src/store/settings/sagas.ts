import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { SettingsTypes } from './types'
import {
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUserSuccess,
  updateUserFailure,
  changePasswordSuccess,
  changePasswordFailure,
  createMerchantSuccess,
  createMerchantFailure,
  logError,
  getAllMerchantsSuccess,
  getAllMerchantsFailure,
  updateMerchantStatusSuccess,
  updateMerchantStatusFailure
} from './actions'
import { callApiGet, callApiPost } from '../../utils/api'
import { Client, MerchantActivation, Register } from '../../interfaces'
import { path } from '../../helpers/path'
import { logout } from '../auth'

function* getUser({ payload }: { type: string; payload: number }): any {
  try {
    const res = yield call(callApiGet, `payments/clientdetails/${payload}`)
    if (res.status === 200) {
      yield put(getCurrentUserSuccess(res.data))
    } else {
      yield put(getCurrentUserFailure('An unknown error occurred'))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getCurrentUserFailure(err.response.data))
      }
    } else {
      yield put(getCurrentUserFailure('An unknown error occurred'))
    }
  }
}

function* updateUser({ payload }: { type: string; payload: Client }): any {
  try {
    const res = yield call(callApiPost, 'payments/clientdetails', payload)
    if (res.status === 200) {
      yield put(updateUserSuccess(res.data))
    } else {
      yield put(updateUserFailure(res.data))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(updateUserFailure(err.response.data))
      }
    } else {
      yield put(updateUserFailure('An unknown error occurred'))
    }
  }
}

function* changePassword({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'login/changepassword', payload)
    if (res.status === 200) {
      yield put(changePasswordSuccess())
    } else {
      yield put(changePasswordSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(changePasswordFailure(err.response.data))
      }
    } else {
      yield put(changePasswordFailure('An unknown error occurred'))
    }
  }
}

function* createMerchant({
  payload
}: {
  type: string
  payload: Register
}): any {
  try {
    const res = yield call(callApiPost, 'login/register', payload)
    yield put(createMerchantSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        if (err.response.data.status) {
          yield put(createMerchantFailure(err.response.data))
        } else {
          yield put(logError(err.response.data))
        }
      }
    } else {
      throw err
    }
  }
}

function* getAllMerchants(): any {
  try {
    const res = yield call(callApiGet, 'payments/getmerchants')
    yield put(getAllMerchantsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getAllMerchantsFailure(err.response.data))
      }
    } else {
      yield put(getAllMerchantsFailure('An unknown error occurred'))
    }
  }
}

function* updateMerchantStatus({
  payload
}: {
  type: string
  payload: MerchantActivation
}): any {
  try {
    const res = yield call(callApiPost, 'payments/updateuserstatus', payload)
    if (res.data) {
      yield put(updateMerchantStatusSuccess(payload))
    } else {
      yield put(
        updateMerchantStatusFailure(
          'Status update was not performed. Please try again'
        )
      )
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(updateMerchantStatusFailure(err.response.data))
      }
    } else {
      yield put(updateMerchantStatusFailure('An unknown error occurred'))
    }
  }
}

function* watchGetUser() {
  yield takeEvery(SettingsTypes.GET_CURRENT_USER, getUser)
}

function* watchUpdateUser() {
  yield takeEvery(SettingsTypes.EDIT_ACCOUNT_REQUEST, updateUser)
}

function* watchChangePassword() {
  yield takeEvery(SettingsTypes.CHANGE_PASSWORD_REQUEST, changePassword)
}

function* watchCreateMerchant() {
  yield takeEvery(SettingsTypes.REGISTER_MERCHANT_REQUEST, createMerchant)
}
function* watchGetAllMerchants() {
  yield takeEvery(SettingsTypes.GET_MERCHANTS_REQUEST, getAllMerchants)
}

function* watchUpdateMerchantStatus() {
  yield takeEvery(
    SettingsTypes.UPDATE_MERCHANT_STATUS_REQUEST,
    updateMerchantStatus
  )
}

function* settingsSaga(): Generator {
  yield all([
    fork(watchGetUser),
    fork(watchUpdateUser),
    fork(watchChangePassword),
    fork(watchCreateMerchant),
    fork(watchGetAllMerchants),
    fork(watchUpdateMerchantStatus)
  ])
}

export { settingsSaga }
