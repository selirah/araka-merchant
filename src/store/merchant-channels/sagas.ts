import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { MerchantsChannelsTypes } from './types'
import {
  getMerchantsChannelsSuccess,
  getMerchantsChannelsFailure,
  exportChannelsSuccess,
  exportChannelsFailure
} from './actions'
import { callApiPost } from '../../utils/api'
import { DataStream } from '../../interfaces'
import { path } from '../../helpers/path'
import { logout } from '../auth'

function* getChannels({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      'Payments/merchantchannelpayments',
      payload
    )
    if (res.status === 200) {
      yield put(getMerchantsChannelsSuccess(res.data))
    } else {
      yield put(getMerchantsChannelsFailure('An unknwon error occurred'))
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
        yield put(getMerchantsChannelsFailure(err.response.data))
      }
    } else {
      yield put(getMerchantsChannelsFailure('An unknwon error occurred'))
    }
  }
}

function* getExportChannels({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiPost,
      `Payments/exportmerchantchannelpayments `,
      payload
    )
    if (res.status === 200) {
      yield put(exportChannelsSuccess(res.data))
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
        yield put(exportChannelsFailure(err.response.data))
      }
    } else {
      yield put(exportChannelsFailure('An unknwon error occurred'))
    }
  }
}

function* watchGetChannels() {
  yield takeEvery(MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS, getChannels)
}

function* watchExportChannels() {
  yield takeEvery(
    MerchantsChannelsTypes.EXPORT_CHANNELS_REQUEST,
    getExportChannels
  )
}

function* channelSaga(): Generator {
  yield all([fork(watchGetChannels), fork(watchExportChannels)])
}

export { channelSaga }
