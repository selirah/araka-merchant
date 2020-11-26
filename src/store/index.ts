import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { authSaga } from './auth/sagas';
import { transactionSaga } from './transactions/sagas';
import { homeSaga } from './home/sagas';

import { AuthState, authReducer } from './auth';
import { HomeState, homeReducer } from './home';
import { TransactionState, transactionReducer } from './transactions';
import storage from 'redux-persist/lib/storage';

export type ApplicationState = {
  auth: AuthState;
  home: HomeState;
  transaction: TransactionState;
  router: RouterState;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'home', 'transaction', 'router'],
};

export const persistingReducer = (history: History) =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      home: homeReducer,
      transaction: transactionReducer,
      router: connectRouter(history),
    })
  );

export function* rootSaga() {
  yield all([fork(authSaga), fork(transactionSaga), fork(homeSaga)]);
}
