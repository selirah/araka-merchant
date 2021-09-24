import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ReportsActionTypes } from './types'
import { callApiPost, callApiGet } from '../../utils/api'
import { PayoutNewRecord, DataStream } from '../../interfaces'
import {
  getPCESFailure,
  getPCESSuccess,
  getPendingTransactionsSuccess,
  getPendingTransactionsFailure,
  getPayoutFailure,
  getPayoutSuccess,
  getProxyPaySubscribersSuccess,
  getProxyPayTransactionsSuccess,
  getProxyPayVolumesSuccess,
  getProxyPayRevenuesSuccess,
  getProxyPayOpexSuccess,
  getProxyPayEbitdaSuccess,
  getProxyPaySubscribersFailure,
  getProxyPayTransactionsFailure,
  getProxyPayVolumesFailure,
  getProxyPayRevenuesFailure,
  getProxyPayOpexFailure,
  getProxyPayEbitdaFailure,
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
  exportPCESFailure,
  exportPCESSuccess
} from './actions'
import { isEmpty } from '../../helpers/isEmpty'
import { proxyPayDataTypes } from '../../helpers/constants'
import { path } from '../../helpers/path'
import { logout } from '../auth'

function* getPCESReport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'reports/getpcesreports', payload)
    yield put(getPCESSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getPCESFailure(err.response.data))
      }
    } else {
      yield put(getPCESFailure('An unknwon error occurred'))
    }
  }
}

function* getPendingTransactionsReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    const res = yield call(
      callApiPost,
      'reports/getpendingtransactions',
      payload
    )
    yield put(getPendingTransactionsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getPendingTransactionsFailure(err.response.data))
      }
    } else {
      yield put(getPendingTransactionsFailure('An unknwon error occurred'))
    }
  }
}

function* getProxyPaySubReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    payload.reportType = proxyPayDataTypes.subscribers
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload)
    yield put(getProxyPaySubscribersSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getProxyPaySubscribersFailure(err.response.data))
      }
    } else {
      yield put(getProxyPaySubscribersFailure('An unknwon error occurred'))
    }
  }
}

function* getProxyPayTrxReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    payload.reportType = proxyPayDataTypes.transactions
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload)
    yield put(getProxyPayTransactionsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getProxyPayTransactionsFailure(err.response.data))
      }
    } else {
      yield put(getProxyPayTransactionsFailure('An unknwon error occurred'))
    }
  }
}

function* getProxyPayVolReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    payload.reportType = proxyPayDataTypes.volumes
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload)
    yield put(getProxyPayVolumesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getProxyPayVolumesFailure(err.response.data))
      }
    } else {
      yield put(getProxyPayVolumesFailure('An unknwon error occurred'))
    }
  }
}

function* getProxyPayRevReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    payload.reportType = proxyPayDataTypes.revenues
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload)
    yield put(getProxyPayRevenuesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getProxyPayRevenuesFailure(err.response.data))
      }
    } else {
      yield put(getProxyPayRevenuesFailure('An unknwon error occurred'))
    }
  }
}

function* getProxyPayOpexReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    payload.reportType = proxyPayDataTypes.opex
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload)
    yield put(getProxyPayOpexSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getProxyPayOpexFailure(err.response.data))
      }
    } else {
      yield put(getProxyPayOpexFailure('An unknwon error occurred'))
    }
  }
}

function* getProxyPayEbitdaReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    payload.reportType = proxyPayDataTypes.ebitda
    const res = yield call(callApiPost, 'payments/getproxypayreports', payload)
    yield put(getProxyPayEbitdaSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getProxyPayEbitdaFailure(err.response.data))
      }
    } else {
      yield put(getProxyPayEbitdaFailure('An unknwon error occurred'))
    }
  }
}

function* getPayoutReport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getproxypayouts', payload)
    if (isEmpty(res.data)) {
      yield put(getPayoutSuccess(null))
    } else {
      yield put(getPayoutSuccess(res.data))
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
        yield put(getPayoutFailure(err.response.data))
      }
    } else {
      yield put(getPayoutFailure('An unknwon error occurred'))
    }
  }
}

function* postNewRecord({
  payload
}: {
  type: string
  payload: PayoutNewRecord
}): any {
  try {
    yield call(callApiPost, 'payments/newrecordpayout', payload)
    yield put(postPayoutSuccess())
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(postPayoutFailure(err.response.data))
      }
    } else {
      yield put(
        postPayoutFailure('An error occured when making request to server')
      )
    }
  }
}

function* getMerchants(): any {
  try {
    const res = yield call(callApiGet, 'payments/getmerchants')
    yield put(getMerchantsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(getMerchantsFailure(err.response.data))
      }
    } else {
      yield put(getMerchantsFailure('An unknwon error occurred'))
    }
  }
}

function* postPayoutFee({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getpayoutfee', payload)
    yield put(getPayoutFeeSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(
          getPayoutFeeFailure('An error occured when making request to server')
        )
      }
    } else {
      throw err
    }
  }
}

function* getExport({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, `reports/exportproxypayouts`, payload)
    yield put(exportSuccess(res.data))
    let file: DataStream = res.data
    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${file.fileContents}`
    link.download = file.fileDownloadName
    link.click()
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(exportFailure(err.response.data))
      }
    } else {
      yield put(exportFailure('An unknwon error occurred'))
    }
  }
}

function* getExportPCESReport({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    const res = yield call(callApiPost, `reports/exportpcesreports`, payload)
    yield put(exportPCESSuccess(res.data))
    let file: DataStream = res.data
    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${file.fileContents}`
    link.download = file.fileDownloadName
    link.click()
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.status === 401) {
        yield put(logout())
        localStorage.removeItem('user')
        localStorage.removeItem('persist:root')
        localStorage.clear()
        window.location.href = path.login
      } else {
        yield put(exportPCESFailure(err.response.data))
      }
    } else {
      yield put(exportPCESFailure('An unknwon error occurred'))
    }
  }
}

function* getDownloadReceiptStream({
  payload
}: {
  type: string
  payload: number
}): any {
  try {
    const res = yield call(callApiPost, 'payments/getpayoutreceipt', payload)
    if (res.status === 200) {
      yield put(downloadReceiptSuccess(res.data))

      let file: DataStream = res.data
      const link = document.createElement('a')
      link.href = `data:application/pdf;base64,${file.fileContents}`
      link.download = file.fileDownloadName
      link.click()
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
        yield put(downloadReceiptFailure(err.response.data))
      }
    } else {
      yield put(downloadReceiptFailure('An unknwon error occurred'))
    }
  }
}

function* watchGetPCESReport() {
  yield takeEvery(ReportsActionTypes.GET_PCES_REQUEST, getPCESReport)
}

function* watchGetPendingTransactionsReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PENDING_TRANSACTIONS_REQUEST,
    getPendingTransactionsReport
  )
}

function* watchGetProxyPaySubReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_REQUEST,
    getProxyPaySubReport
  )
}

function* watchGetProxyPayTrxReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_REQUEST,
    getProxyPayTrxReport
  )
}

function* watchGetProxyPayVolReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PROXYPAY_VOLUMES_REQUEST,
    getProxyPayVolReport
  )
}

function* watchGetProxyPayRevReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PROXYPAY_REVENUES_REQUEST,
    getProxyPayRevReport
  )
}

function* watchGetProxyPayOpexReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PROXYPAY_OPEX_REQUEST,
    getProxyPayOpexReport
  )
}

function* watchGetProxyPayEbitdaReport() {
  yield takeEvery(
    ReportsActionTypes.GET_PROXYPAY_EBITDA_REQUEST,
    getProxyPayEbitdaReport
  )
}

function* watchGetPayoutReport() {
  yield takeEvery(ReportsActionTypes.GET_PAYOUT_REQUEST, getPayoutReport)
}

function* watchPostNewRecord() {
  yield takeEvery(ReportsActionTypes.POST_RECORD_REQUEST, postNewRecord)
}

function* watchGetMerchants() {
  yield takeEvery(ReportsActionTypes.GET_MERCHANTS_REQUEST, getMerchants)
}

function* watchPostPayoutFee() {
  yield takeEvery(ReportsActionTypes.POST_PAYOUT_FEE_REQUEST, postPayoutFee)
}

function* watchExport() {
  yield takeEvery(ReportsActionTypes.EXPORT_REQUEST, getExport)
}

function* watchPCESExport() {
  yield takeEvery(ReportsActionTypes.EXPORT_PCES_REQUEST, getExportPCESReport)
}

function* watchFetchGetDownloadReceiptStream() {
  yield takeEvery(
    ReportsActionTypes.DOWNLOAD_RECEIPT_REQUEST,
    getDownloadReceiptStream
  )
}

function* reportsSaga(): Generator {
  yield all([
    fork(watchGetPCESReport),
    fork(watchGetPendingTransactionsReport),
    fork(watchGetProxyPaySubReport),
    fork(watchGetProxyPayTrxReport),
    fork(watchGetProxyPayVolReport),
    fork(watchGetProxyPayRevReport),
    fork(watchGetProxyPayOpexReport),
    fork(watchGetProxyPayEbitdaReport),
    fork(watchGetPayoutReport),
    fork(watchPostNewRecord),
    fork(watchGetMerchants),
    fork(watchPostPayoutFee),
    fork(watchExport),
    fork(watchPCESExport),
    fork(watchFetchGetDownloadReceiptStream)
  ])
}

export { reportsSaga }
