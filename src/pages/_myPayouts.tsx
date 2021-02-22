import React, { lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { YearlyArea } from '../mock/YearlyOverview';
import { MyPayoutData } from '../mock/MyPayoutData';

const { Content } = Layout;

const Filters = lazy(() => import('../components/my-payouts/Filters'));
const Cards = lazy(() => import('../components/my-payouts/Cards'));
const Details = lazy(() => import('../components/my-payouts/Details'));

const MyPayouts = () => {
  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <Filters />
          <Cards areachartdata={YearlyArea} />
          <Details payouts={MyPayoutData} />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(MyPayouts);
