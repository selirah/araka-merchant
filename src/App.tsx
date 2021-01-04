import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import { History } from 'history';
import Routes from './routes/Routes';
import { ApplicationState } from './store';
import { message } from 'antd';
import { logout } from './store/auth';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
  persistor: any;
}

const App: React.FC<AppProps> = ({ store, history, persistor }) => {
  const [signOutTime] = useState(60 * 10 * 1000); // 10 minutes
  const [warningTime] = useState(54 * 10 * 1000); // 9 minutes
  let warnTimeOut: any;
  let logoutTimeOut: any;
  const { isAuthenticated } = store.getState().auth;

  const warn = () => {
    message.info(
      'You will be logged out of this session in a 1 minute time',
      5
    );
  };

  const logoutSession = () => {
    store.dispatch(logout());
    message.info(
      'You have been logged out for your own safety. You can login once again to continue'
    );
  };

  const setTimeOuts = () => {
    warnTimeOut = setTimeout(warn, warningTime);
    logoutTimeOut = setTimeout(logoutSession, signOutTime);
  };

  const clearTimeOuts = () => {
    if (warnTimeOut) clearTimeout(warnTimeOut);
    if (logoutTimeOut) clearTimeout(logoutTimeOut);
  };

  useEffect(() => {
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress',
    ];

    if (isAuthenticated) {
      const resetTimeOut = () => {
        clearTimeOuts();
        setTimeOuts();
      };

      for (let i in events) {
        window.addEventListener(events[i], resetTimeOut);
      }

      setTimeOuts();
      return () => {
        for (let i in events) {
          window.removeEventListener(events[i], resetTimeOut);
          clearTimeOuts();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
