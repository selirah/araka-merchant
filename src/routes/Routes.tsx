import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Index from '../pages/_index';
import Transactions from '../pages/_transactions';
import PaymentPages from '../pages/_paymentPages';
import Page from '../pages/_[pageId]';
import NotFoundPage from '../pages/_404';
import { path } from '../helpers/path';

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        {/* <Route exact path={path.payment} component={PaymentPage} />
        <Route exact path={path.login} component={LoginPage} />
        <Route exact path={path.register} component={RegisterPage} /> */}
        {/* <Route
          exact
          path={path.registerSuccess}
          component={RegisterSuccessPage}
        />
        <Route exact path={path.verify} component={EmailVerificationPage} />
        <Route exact path={path.forgot} component={ForgottenPasswordPage} />
        <Route exact path={path.reset} component={ResetPasswordPage} /> */}

        <PrivateRoute exact path={path.home} component={Index} />
        <PrivateRoute exact path={path.tranasctions} component={Transactions} />
        <PrivateRoute exact path={path.paymentPages} component={PaymentPages} />
        <PrivateRoute exact path={`${path.page}/:pageId`} component={Page} />
        <Route exact component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
