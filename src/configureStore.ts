import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { persistStore } from 'redux-persist';

import { composeWithDevTools } from 'redux-devtools-extension';

import { History } from 'history';

import { ApplicationState, rootSaga, persistingReducer } from './store';

export function configureStore(
  history: History,
  initialState: ApplicationState
) {
  const composeEnhancers = composeWithDevTools({});

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistingReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
