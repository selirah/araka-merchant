import React, { lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { menu } from '../helpers/menu';
import { getCurrentUser } from '../store/settings';
import { isEmpty } from '../helpers/isEmpty';
import { getTransactions, clearTransactions } from '../store/transactions';

const { Content } = Layout;
const YearlyOverview = lazy(
  () => import('../components/dashboard/YearlyOverview')
);
const DailyOverview = lazy(
  () => import('../components/dashboard/DailyOverview')
);
const WeeklyOverview = lazy(
  () => import('../components/dashboard/WeeklyOverView')
);
const MonthlyOverview = lazy(
  () => import('../components/dashboard/MonthlyOverview')
);

const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'));

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { activeMenu } = appSelector((state) => state.utils);
  const { user } = appSelector((state) => state.auth);
  const { client } = appSelector((state) => state.settings);
  const { transactions, loading } = appSelector((state) => state.transaction);

  useEffect(() => {
    if (user && isEmpty(client)) {
      dispatch(getCurrentUser(user.userId));
    }
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

  let container;
  if (loading && isEmpty(transactions)) {
    container = (
      <Row className="suspense-container">
        <Spin style={{ marginTop: '200px' }} />
      </Row>
    );
  } else if (!loading && isEmpty(transactions)) {
    container = <EmptyBox onReloadTransaction={onReloadTransaction} />;
  } else if (!loading && !isEmpty(transactions)) {
    switch (activeMenu) {
      case menu.DASHBOARD_YEARLY:
        container = <YearlyOverview transactions={transactions} />;
        break;
      case menu.DASHBOARD_DAILY:
        container = <DailyOverview transactions={transactions} />;
        break;
      case menu.DASHBOARD_WEEKLY:
        container = <WeeklyOverview transactions={transactions} />;
        break;
      case menu.DASHBOARD_MONTHLY:
        container = <MonthlyOverview transactions={transactions} />;
        break;
      default:
        container = <YearlyOverview transactions={transactions} />;
    }
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
