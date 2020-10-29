import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { authSaga } from './auth/sagas';

import { AuthState, authReducer } from './auth';
import { HomeState, homeReducer } from './home';
import storage from 'redux-persist/lib/storage';

export type ApplicationState = {
  auth: AuthState;
  home: HomeState;
  router: RouterState;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'home', 'router'],
};

export const persistingReducer = (history: History) =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      home: homeReducer,
      router: connectRouter(history),
    })
  );

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
