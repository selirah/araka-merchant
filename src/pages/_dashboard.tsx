import React, { lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { menu } from '../helpers/menu';
import { DailyBar, DailyArea } from '../mock/DailyOverview';
import { WeeklyBar, WeeklyArea } from '../mock/WeeklyOverview';
import { YearlyBar, YearlyArea } from '../mock/YearlyOverview';
import { MonthlyBar, MonthlyArea } from '../mock/MonthlyOverview';

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

const Dashboard = () => {
  const { activeMenu } = appSelector((state) => state.utils);

  let container;
  switch (activeMenu) {
    case menu.DASHBOARD_YEARLY:
      container = (
        <YearlyOverview barchartdata={YearlyBar} areachartdata={YearlyArea} />
      );
      break;
    case menu.DASHBOARD_DAILY:
      container = (
        <DailyOverview barchartdata={DailyBar} areachartdata={DailyArea} />
      );
      break;
    case menu.DASHBOARD_WEEKLY:
      container = (
        <WeeklyOverview barchartdata={WeeklyBar} areachartdata={WeeklyArea} />
      );
      break;
    case menu.DASHBOARD_MONTHLY:
      container = (
        <MonthlyOverview
          barchartdata={MonthlyBar}
          areachartdata={MonthlyArea}
        />
      );
      break;
    default:
      container = (
        <YearlyOverview barchartdata={YearlyBar} areachartdata={YearlyArea} />
      );
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>{container}</Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Dashboard);
