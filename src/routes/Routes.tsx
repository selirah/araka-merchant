import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Spin, Row } from 'antd';
import { path } from '../helpers/path';

const Dashboard = lazy(() => import('../pages/_dashboard'));
const Transactions = lazy(() => import('../pages/_trans'));
const PaymentPages = lazy(() => import('../pages/_paymentPages'));
const Page = lazy(() => import('../pages/_[pageId]'));
const Login = lazy(() => import('../pages/_login'));
// const NotFoundPage = lazy(() => import('../pages/_404'));
const Pay = lazy(() => import('../pages/_[pay]'));
const GenericPay = lazy(() => import('../pages/_[genericPay]'));
const ExamplePay = lazy(() => import('../pages/_examplePay'));
const MyPayouts = lazy(() => import('../pages/_myPayouts'));
const MerchantsOverview = lazy(() => import('../pages/_merchantsOverview'));
const MerchantsPayouts = lazy(() => import('../pages/_merchantsPayouts'));
const VASProcessed = lazy(() => import('../pages/_vasProcessed'));
const Settings = lazy(() => import('../pages/_settings'));

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Suspense
          fallback={
            <Row
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <div className="spin" style={{ textAlign: 'center' }}>
                <Spin size="large" />
              </div>
            </Row>
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
          <PrivateRoute
            exact
            path={path.vasProcessed}
            component={VASProcessed}
          />
          <PrivateRoute exact path={path.settings} component={Settings} />
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
