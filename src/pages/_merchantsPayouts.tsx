import React, { lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { WeeklyArea } from '../mock/WeeklyOverview';
import { MerchantPayoutData } from '../mock/MerchantPayoutData';

const { Content } = Layout;

const Filters = lazy(() => import('../components/merchants-payout/Filters'));
const Cards = lazy(() => import('../components/merchants-payout/Cards'));
const Details = lazy(() => import('../components/merchants-payout/Details'));

const MerchantsPayouts = () => {
  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <Filters />
          <Cards areachartdata={WeeklyArea} />
          <Details merchants={MerchantPayoutData} />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(MerchantsPayouts);
