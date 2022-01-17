import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { TransactionTypes } from './types'
import {
  getTransactionsSuccess,
  getTransactionsFailure,
  getCurrenciesSuccess,
  getCurrenciesFailure,
  exportTranxSuccess,
  exportTranxFailure,
  downloadReceiptSuccess,
  downloadReceiptFailure
} from './actions'
import { callApiGet, callApiPost } from '../../utils/api'
import { DataStream } from '../../interfaces'
import { path } from '../../helpers/path'
import { logout } from '../auth'

function* getTransactions({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      'reports/gettransactionsoverview',
      payload
    )
    if (res.status === 200) {
      yield put(getTransactionsSuccess(res.data))
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'))
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
        yield put(getTransactionsFailure(err.response.data))
      }
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'))
    }
  }
}

function* getCurrencies(): any {
  try {
    const res = yield call(callApiGet, 'payments/currencycodes')
    if (res.status === 200) {
      yield put(getCurrenciesSuccess(res.data))
    } else {
      yield put(getCurrenciesFailure('An unknwon error occurred'))
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
        yield put(getCurrenciesFailure(err.response.data))
      }
    } else {
      yield put(getCurrenciesFailure('An unknwon error occurred'))
    }
  }
}

function* getExportTransactions({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    const res = yield call(
      callApiPost,
      `reports/exportmerchanttransactions`,
      payload
    )
    if (res.status === 200) {
      yield put(exportTranxSuccess(res.data))

      // console.log(res.data);

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
        yield put(exportTranxFailure(err.response.data))
      }
    } else {
      yield put(exportTranxFailure('An unknwon error occurred'))
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
    const res = yield call(
      callApiGet,
      `payments/gettransactionreciept/${payload}`
    )
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

function* watchGetTransactions() {
  yield takeEvery(TransactionTypes.GET_TRANSACTIONS_REQUEST, getTransactions)
}

function* watchGetCurrencies() {
  yield takeEvery(TransactionTypes.GET_CURRENCIES, getCurrencies)
}

function* watchExportTransactions() {
  yield takeEvery(
    TransactionTypes.EXPORT_TRANSACTIONS_REQUEST,
    getExportTransactions
  )
}

function* watchFetchGetDownloadReceiptStream() {
  yield takeEvery(
    TransactionTypes.DOWNLOAD_RECEIPT_REQUEST,
    getDownloadReceiptStream
  )
}

function* transactionSaga(): Generator {
  yield all([
    fork(watchGetTransactions),
    fork(watchGetCurrencies),
    fork(watchExportTransactions),
    fork(watchFetchGetDownloadReceiptStream)
  ])
}

export { transactionSaga }
