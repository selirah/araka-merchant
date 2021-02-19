import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Spin } from 'antd';
import { path } from '../helpers/path';

// const Index = lazy(() => import('../pages/_index'));
const Dashboard = lazy(() => import('../pages/_dashboard'));
// const Transactions = lazy(() => import('../pages/_transactions'));
const Transactions = lazy(() => import('../pages/_trans'));
const PaymentPages = lazy(() => import('../pages/_paymentPages'));
const Page = lazy(() => import('../pages/_[pageId]'));
const Login = lazy(() => import('../pages/_login'));
// const NotFoundPage = lazy(() => import('../pages/_404'));
const Pay = lazy(() => import('../pages/_[pay]'));
const GenericPay = lazy(() => import('../pages/_[genericPay]'));
const ExamplePay = lazy(() => import('../pages/_examplePay'));

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Suspense
          fallback={
            <div className="spin" style={{ textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          }
        >
          <Route exact path={path.login} component={Login} />
          <PrivateRoute exact path={path.home} component={Dashboard} />
          <PrivateRoute
            exact
            path={path.tranasctions}
            component={Transactions}
          />
          <PrivateRoute
            exact
            path={path.paymentPages}
            component={PaymentPages}
          />
          <PrivateRoute exact path={`${path.page}/:pageId`} component={Page} />
          <Route exact path={`${path.pay}/:processId`} component={Pay} />
          <Route
            exact
            path={`${path.payment}/:processId`}
            component={GenericPay}
          />
          <Route exact path={path.example} component={ExamplePay} />
          {/* <Route exact component={NotFoundPage} path="*" /> */}
        </Suspense>
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
