import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { path } from '../helpers/path'
import { roles } from '../helpers/constants'
import { appSelector } from '../helpers/appSelector'

import Dashboard from '../pages/_dashboard'
import Transactions from '../pages/_trans'
import PaymentPages from '../pages/_paymentPages'
import Page from '../pages/_[pageId]'
import Login from '../pages/_login'
import Pay from '../pages/_[pay]'
import GenericPay from '../pages/_[genericPay]'
import ExamplePay from '../pages/_examplePay'
import MerchantsOverview from '../pages/_merchantsOverview'
import MerchantsChannels from '../pages/_merchantsChannels'
// import VASProcessed from '../pages/_vasProcessed';
import Settings from '../pages/_settings'
import FeeReports from '../pages/_feeReports'
// import PendingTransactionsView from '../pages/_pendingTransactions'
// import ProxyPaySubscribers from '../pages/_proxyPaySubscribers';
// import ProxyPayTransactions from '../pages/_proxyPayTransactions';
// import ProxyPayOverview from '../pages/_proxyPayOverview';
// import ProxyPayOVolumes from '../pages/_proxyPayVolumes';
// import Payouts from '../pages/_payouts'
import NotFound from '../pages/_404'
import ForgottenPassword from '../pages/_forgottenPassword'
import ResetPassword from '../pages/_reset-password'

const Routes: React.FC = () => {
  const { user } = appSelector((state) => state.auth)

  let role: any
  if (user) {
    role = user.roles.find((r) => r === roles.SuperMerchant)
  } else {
    role = roles.SuperMerchant
  }

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path.login} component={Login} />
        <Route
          exact
          path={path.forgottenPasssword}
          component={ForgottenPassword}
        />
        <Route exact path={path.resetPassword} component={ResetPassword} />
        <PrivateRoute exact path={path.home} component={Dashboard} />
        <PrivateRoute exact path={path.dashboard} component={Dashboard} />
        <PrivateRoute exact path={path.tranasctions} component={Transactions} />
        <PrivateRoute exact path={path.paymentPages} component={PaymentPages} />
        <PrivateRoute exact path={`${path.page}/:pageId`} component={Page} />
        {/* <PrivateRoute exact path={path.payouts} component={Payouts} /> */}
        <Route exact path={`${path.pay}/:processId`} component={Pay} />
        <Route
          exact
          path={`${path.payment}/:processId`}
          component={GenericPay}
        />
        <Route exact path={path.example} component={ExamplePay} />
        <PrivateRoute exact path={path.settings} component={Settings} />

        {/* {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.proxyPayOverview}
            component={ProxyPayOverview}
          />
        ) : (
          <NotFound />
        )} */}

        {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.merchantsOverview}
            component={MerchantsOverview}
          />
        ) : (
          <NotFound />
        )}

        {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.merchantsChannels}
            component={MerchantsChannels}
          />
        ) : (
          <NotFound />
        )}

        {/* {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.vasProcessed}
            component={VASProcessed}
          />
        ) : (
          <NotFound />
        )} */}

        {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute exact path={path.feeReports} component={FeeReports} />
        ) : (
          <NotFound />
        )}

        {/* {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute exact path={path.pendingTransactions} component={PendingTransactionsView} />
        ) : (
          <NotFound />
        )} */}

        {/* {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.proxyPaySubscribers}
            component={ProxyPaySubscribers}
          />
        ) : (
          <NotFound />
        )} */}

        {/* {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.proxyPayTransactions}
            component={ProxyPayTransactions}
          />
        ) : (
          <NotFound />
        )} */}

        {/* {role !== undefined && role === roles.SuperMerchant ? (
          <PrivateRoute
            exact
            path={path.proxyPayVolumes}
            component={ProxyPayOVolumes}
          />
        ) : (
          <NotFound />
        )} */}
      </Switch>
    </React.Fragment>
  )
}

export default Routes
