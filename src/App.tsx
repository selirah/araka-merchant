import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import { History } from 'history';
import Routes from './routes/Routes';
import { ApplicationState } from './store';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  persistor: any;
}

const App: React.FC<AppProps> = ({ store, history, persistor }) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default App;
