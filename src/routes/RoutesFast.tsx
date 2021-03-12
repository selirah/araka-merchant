import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { path } from '../helpers/path';

import Dashboard from '../pages/_dashboard';
import DashboardDaily from '../pages/_dashboardDaily';
import DashboardWeekly from '../pages/_dashboardWeekly';
import DashboardMonthly from '../pages/_dashboardMonthly';
import Transactions from '../pages/_trans';
import PaymentPages from '../pages/_paymentPages';
import Page from '../pages/_[pageId]';
import Login from '../pages/_login';
import Pay from '../pages/_[pay]';
import GenericPay from '../pages/_[genericPay]';
import ExamplePay from '../pages/_examplePay';
import MyPayouts from '../pages/_myPayouts';
import MerchantsOverview from '../pages/_merchantsOverview';
import MerchantsPayouts from '../pages/_merchantsPayouts';
import VASProcessed from '../pages/_vasProcessed';
import Settings from '../pages/_settings';
import FeeReports from '../pages/_feeReports';

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path.login} component={Login} />
        <PrivateRoute exact path={path.home} component={Dashboard} />
        <PrivateRoute exact path={path.dashboardMain} component={Dashboard} />
        <PrivateRoute
          exact
          path={path.dashboardDaily}
          component={DashboardDaily}
        />
        <PrivateRoute
          exact
          path={path.dashboardWeekly}
          component={DashboardWeekly}
        />
        <PrivateRoute
          exact
          path={path.dashboardMonthly}
          component={DashboardMonthly}
        />
        <PrivateRoute exact path={path.tranasctions} component={Transactions} />
        <PrivateRoute exact path={path.paymentPages} component={PaymentPages} />
        <PrivateRoute exact path={`${path.page}/:pageId`} component={Page} />
        <PrivateRoute exact path={path.myPayouts} component={MyPayouts} />
        <PrivateRoute
          exact
          path={path.merchantsOverview}
          component={MerchantsOverview}
        />
        <PrivateRoute
          exact
          path={path.merchantPayouts}
          component={MerchantsPayouts}
        />
        <PrivateRoute exact path={path.vasProcessed} component={VASProcessed} />
        <PrivateRoute exact path={path.settings} component={Settings} />
        <PrivateRoute exact path={path.feeReports} component={FeeReports} />
        <Route exact path={`${path.pay}/:processId`} component={Pay} />
        <Route
          exact
          path={`${path.payment}/:processId`}
          component={GenericPay}
        />
        <Route exact path={path.example} component={ExamplePay} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
