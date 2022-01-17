import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { VASProcessedTypes } from './types'
import {
  getVasSuccess,
  getVasFailure,
  exportVASSuccess,
  exportVASFailure
} from './actions'
import { callApiPost } from '../../utils/api'
import { DataStream } from '../../interfaces'
import { path } from '../../helpers/path'
import { logout } from '../auth'

function* getVas({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'reports/getvasoverview', payload)
    if (res.status === 200) {
      yield put(getVasSuccess(res.data))
    } else {
      yield put(getVasFailure('An unknwon error occurred'))
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
        yield put(getVasFailure(err.response.data))
      }
    } else {
      yield put(getVasFailure('An unknwon error occurred'))
    }
  }
}

function* getExportVas({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, `reports/exportvasoverview`, payload)
    if (res.status === 200) {
      yield put(exportVASSuccess(res.data))
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
        yield put(exportVASFailure(err.response.data))
      }
    } else {
      yield put(exportVASFailure('An unknwon error occurred'))
    }
  }
}

function* watchGetVas() {
  yield takeEvery(VASProcessedTypes.GET_VAS_REQUEST, getVas)
}

function* watchExportVas() {
  yield takeEvery(VASProcessedTypes.EXPORT_VAS_REQUEST, getExportVas)
}

function* vasSaga(): Generator {
  yield all([fork(watchGetVas), fork(watchExportVas)])
}

export { vasSaga }
