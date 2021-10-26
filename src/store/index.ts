import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import storage from 'redux-persist/lib/storage'
import { authSaga } from './auth/sagas'
import { transactionSaga } from './transactions/sagas'
import { homeSaga } from './home/sagas'
import { paymentPagesSaga } from './payment-pages/sagas'
import { settingsSaga } from './settings/sagas'
import { overviewSaga } from './merchant-overview/sagas'
import { vasSaga } from './vas-processed/sagas'
import { reportsSaga } from './reports/sagas'
import { channelSaga } from './merchant-channels/sagas'

import { AuthState, authReducer } from './auth'
import { HomeState, homeReducer } from './home'
import { TransactionState, transactionReducer } from './transactions'
import { PaymentPagesState, paymentPagesReducer } from './payment-pages'
import { UtilsState, utilsReducer } from './utils'
import { SettingsState, settingsReducer } from './settings'
import { MerchantsOverviewState, overviewReducer } from './merchant-overview'
import { VASProcessedState, vasReducer } from './vas-processed'
import { ReportsState, reportsReducer } from './reports'
import { MerchantsChannelsState, channelsReducer } from './merchant-channels'

export type ApplicationState = {
  auth: AuthState
  home: HomeState
  transaction: TransactionState
  page: PaymentPagesState
  utils: UtilsState
  settings: SettingsState
  overviews: MerchantsOverviewState
  vas: VASProcessedState
  reports: ReportsState
  router: RouterState
  channels: MerchantsChannelsState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'home',
    'transaction',
    'page',
    'utils',
    'settings',
    'overviews',
    'vas',
    'reports',
    'router',
    'channels'
  ]
}

export const persistingReducer = (history: History) =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      home: homeReducer,
      transaction: transactionReducer,
      page: paymentPagesReducer,
      utils: utilsReducer,
      settings: settingsReducer,
      overviews: overviewReducer,
      vas: vasReducer,
      reports: reportsReducer,
      channels: channelsReducer,
      router: connectRouter(history)
    })
  )

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(transactionSaga),
    fork(homeSaga),
    fork(paymentPagesSaga),
    fork(settingsSaga),
    fork(overviewSaga),
    fork(vasSaga),
    fork(reportsSaga),
    fork(channelSaga)
  ])
}
