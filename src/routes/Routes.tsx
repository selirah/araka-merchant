import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import Index from '../pages/_index';
import Transactions from '../pages/_transactions';
import PaymentPages from '../pages/_paymentPages';
import Page from '../pages/_[pageId]';
import Login from '../pages/_login';
import NotFoundPage from '../pages/_404';
import Pay from '../pages/_[pay]';
import ExamplePay from '../pages/_examplePay';
import { path } from '../helpers/path';

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path.login} component={Login} />
        <PrivateRoute exact path={path.home} component={Index} />
        <PrivateRoute exact path={path.tranasctions} component={Transactions} />
        <PrivateRoute exact path={path.paymentPages} component={PaymentPages} />
        <PrivateRoute exact path={`${path.page}/:pageId`} component={Page} />
        <Route exact path={`${path.pay}/:processId`} component={Pay} />
        <Route exact path={path.example} component={ExamplePay} />
        <Route exact component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
