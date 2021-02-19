import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import storage from 'redux-persist/lib/storage';
import { authSaga } from './auth/sagas';
import { transactionSaga } from './transactions/sagas';
import { homeSaga } from './home/sagas';
import { paymentPagesSaga } from './payment-pages/sagas';

import { AuthState, authReducer } from './auth';
import { HomeState, homeReducer } from './home';
import { TransactionState, transactionReducer } from './transactions';
import { PaymentPagesState, paymentPagesReducer } from './payment-pages';
import { UtilsState, utilsReducer } from './utils';

export type ApplicationState = {
  auth: AuthState;
  home: HomeState;
  transaction: TransactionState;
  page: PaymentPagesState;
  utils: UtilsState;
  router: RouterState;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'home', 'transaction', 'page', 'utils', 'router'],
};

export const persistingReducer = (history: History) =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      home: homeReducer,
      transaction: transactionReducer,
      page: paymentPagesReducer,
      utils: utilsReducer,
      router: connectRouter(history),
    })
  );

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(transactionSaga),
    fork(homeSaga),
    fork(paymentPagesSaga),
  ]);
}
