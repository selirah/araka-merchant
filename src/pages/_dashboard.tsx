import React, { lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { getCurrentUser } from '../store/settings';
import { isEmpty } from '../helpers/isEmpty';
import { getTransactions, clearTransactions } from '../store/transactions';
import { getMerchantsRequest } from '../store/reports';

const { Content } = Layout;
const YearlyOverview = lazy(
  () => import('../components/dashboard/YearlyOverview')
);

const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'));

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const { merchants } = appSelector((state) => state.reports);
  const { client } = appSelector((state) => state.settings);
  const { transactions, loading } = appSelector((state) => state.transaction);

  useEffect(() => {
    // fetch transactions history
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
    }
    if (user && isEmpty(client)) {
      dispatch(getCurrentUser(user.userId));
    }
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onReloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions());
  };

  let container: React.ReactNode;
  if (loading && isEmpty(transactions)) {
    container = (
      <Row className="suspense-container">
        <Spin style={{ marginTop: '200px' }} />
      </Row>
    );
  } else if (!loading && isEmpty(transactions)) {
    container = <EmptyBox onReloadTransaction={onReloadTransaction} />;
  } else if (!loading && !isEmpty(transactions)) {
    container = (
      <YearlyOverview transactions={transactions} userRoles={user!.roles} />
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
          {container}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Dashboard);
