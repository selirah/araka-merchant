import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { HomeTypes } from './types'
import { callApiPost, callApiGet } from '../../utils/api'
import { Merchant } from '../../interfaces'
import {
  paymentSuccess,
  paymentFailure,
  getOverviewFailure,
  getOverviewSuccess,
  paymentSuccessAlt,
  paymentFailureAlt,
  mobilePaymentSuccess,
  mobilePaymentFailure,
  checkMobileStatusSuccess,
  checkMobileStatusFailure
} from './actions'
import { path } from '../../helpers/path'
import { logout } from '../auth'

function* getOverview({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      'reports/getperiodictotaltransactionoverview',
      payload
    )
    if (res.status === 200) {
      yield put(getOverviewSuccess(res.data))
    } else {
      yield put(getOverviewFailure('An unknwon error occurred'))
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
        yield put(getOverviewFailure(err.response.data))
      }
    } else {
      yield put(getOverviewFailure('An unknwon error occurred'))
    }
  }
}

function* processOrderRequest({
  payload
}: {
  type: string
  payload: Merchant
}): any {
  try {
    const res = yield call(callApiPost, 'payments/getpaymentpage', payload)
    yield put(paymentSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(paymentFailure(err.response.data))
      }
    } else {
      yield put(
        paymentFailure('An error occured when making request to server')
      )
    }
  }
}

function* processPayment({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/', payload)
    if (res.status === 200) {
      yield put(paymentSuccessAlt())
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
        yield put(paymentFailureAlt(err.response.data))
      }
    } else {
      throw err
    }
  }
}

function* mobilePayment({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/momopaymentpage', payload)
    yield put(mobilePaymentSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(mobilePaymentFailure('An error occured during payment.'))
      }
    } else {
      throw err
    }
  }
}

function* mobileStatus({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiGet,
      `payments/gettransactionstatus/${payload}`
    )
    yield put(checkMobileStatusSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(checkMobileStatusFailure('An error occured during payment.'))
      }
    } else {
      throw err
    }
  }
}

function* watchProcessOrderRequest() {
  yield takeEvery(HomeTypes.REQUEST_PAYMENT, processOrderRequest)
}

function* watchGetOverviewRequest() {
  yield takeEvery(HomeTypes.GET_OVERVIEW_REQUEST, getOverview)
}

function* watchProcessPayment() {
  yield takeEvery(HomeTypes.PAYMENT_REQUEST, processPayment)
}

function* watchMobilePayment() {
  yield takeEvery(HomeTypes.MOBILE_PAYMENT_REQUEST, mobilePayment)
}

function* watchMobileStatus() {
  yield takeEvery(HomeTypes.MOBILE_STATUS_REQUEST, mobileStatus)
}

function* homeSaga(): Generator {
  yield all([
    fork(watchProcessOrderRequest),
    fork(watchGetOverviewRequest),
    fork(watchProcessPayment),
    fork(watchMobilePayment),
    fork(watchMobileStatus)
  ])
}

export { homeSaga }
