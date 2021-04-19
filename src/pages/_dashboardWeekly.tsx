import React, { lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { getTransactions, clearTransactions } from '../store/transactions';

const { Content } = Layout;

const WeeklyOverview = lazy(
  () => import('../components/dashboard/WeeklyOverView')
);

const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'));

const DashboardWeekly = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const { transactions, loading } = appSelector((state) => state.transaction);

  useEffect(() => {
    // fetch transaction history
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
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
      <WeeklyOverview transactions={transactions} userRoles={user!.roles} />
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

export default withRouter(DashboardWeekly);
