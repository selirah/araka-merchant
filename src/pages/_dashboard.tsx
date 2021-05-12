import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { TransactionReport } from '../interfaces';
import { getOverviewRequest, clearPaymentData } from '../store/home';
import { isEmpty } from '../helpers/isEmpty';
import { getCurrentUser } from '../store/settings';

const Overview = lazy(() => import('../components/dashboard/Overview'));
const LiveFilter = lazy(() => import('../components/dashboard/LiveFilter'));
const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'));

const { Content } = Layout;

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const { client } = appSelector((state) => state.settings);
  const home = appSelector((state) => state.home);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [fixedPeriod, setFixedPeriod] = useState('daily');
  const [trxReports, setTrxReports] = useState<TransactionReport | null>(null);
  const params = {
    currency: currency,
    fixedPeriod: fixedPeriod,
  };

  useEffect(() => {
    // fetch transaction history
    dispatch(clearPaymentData());
    dispatch(getOverviewRequest(params));
    if (user && isEmpty(client)) {
      dispatch(getCurrentUser(user.userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, trxReports } = home;
    setLoading(loading);
    setTrxReports(trxReports);
  }, [home]);

  const onReloadTransaction = () => {
    dispatch(clearPaymentData());
    dispatch(getOverviewRequest(params));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getOverviewRequest(params));
  };

  const onSelectPeriod = (value: string) => {
    setFixedPeriod(value);
    params.fixedPeriod = value;
    dispatch(getOverviewRequest(params));
  };

  const onRefreshPage = () => {
    dispatch(getOverviewRequest(params));
  };

  let container: React.ReactNode;
  if (loading) {
    container = (
      <Row className="suspense-container">
        <Spin style={{ marginTop: '200px' }} />
      </Row>
    );
  }

  if (!loading && !trxReports) {
    container = <EmptyBox onReloadTransaction={onReloadTransaction} />;
  }
  if (!loading && trxReports) {
    container = (
      <Overview
        trxReports={trxReports}
        userRoles={user!.roles}
        currency={currency}
        fixedPeriod={fixedPeriod}
        loading={loading}
      />
    );
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense
          fallback={
            <Row className="suspense-container">
              <div style={{ marginTop: '200px' }}>
                <Spin />
              </div>
            </Row>
          }
        >
          <LiveFilter
            onSelectCurrency={onSelectCurrency}
            currency={currency}
            fixedPeriod={fixedPeriod}
            onSelectPeriod={onSelectPeriod}
            onRefreshPage={onRefreshPage}
          />
          {container}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Dashboard);
