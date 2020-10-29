import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { appSelector } from '../helpers/appSelector';
import { path } from '../helpers/path';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const auth = appSelector((state) => state.auth);
  const { isAuthenticated } = auth;

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={path.home} />
          )
        }
      />
    </React.Fragment>
  );
};

export { PrivateRoute };
