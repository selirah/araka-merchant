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

const { Content } = Layout;

const DailyOverview = lazy(
  () => import('../components/dashboard/DailyOverview')
);
const CurrencyFilter = lazy(
  () => import('../components/dashboard/CurrencyFilter')
);
const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'));

const DashboardDaily = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const { client } = appSelector((state) => state.settings);
  const home = appSelector((state) => state.home);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [trxReports, setTrxReports] = useState<TransactionReport | null>(null);
  const params = {
    currrency: currency,
    fixedPeriod: 'daily',
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
    const params = {
      currrency: value,
      fixedPeriod: 'daily',
    };
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
      <DailyOverview
        trxReports={trxReports}
        userRoles={user!.roles}
        currency={currency}
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
          <CurrencyFilter onSelectCurrency={onSelectCurrency} />
          {container}
        </Suspense>
      </Content>
    </div>
  );
};
export default withRouter(DashboardDaily);
