import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { TransactionReport } from '../interfaces';
import { getTransactions, clearTransactions } from '../store/transactions';

const { Content } = Layout;
const YearlyOverview = lazy(
  () => import('../components/dashboard/YearlyOverview')
);
const CurrencyFilter = lazy(
  () => import('../components/dashboard/CurrencyFilter')
);
const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'));

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const transaction = appSelector((state) => state.transaction);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [trxReports, setTrxReports] = useState<TransactionReport | null>(null);
  const params = {
    currrency: currency,
    fixedPeriod: 'overall',
  };

  useEffect(() => {
    // fetch transactions history
    dispatch(clearTransactions());
    dispatch(getTransactions(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, trxReports } = transaction;
    setLoading(loading);
    setTrxReports(trxReports);
  }, [transaction]);

  const onReloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions(params));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    const params = {
      currrency: value,
      fixedPeriod: 'daily',
    };
    dispatch(getTransactions(params));
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
      <YearlyOverview
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

export default withRouter(Dashboard);
