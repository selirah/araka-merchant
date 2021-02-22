import React, { lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { DailyArea } from '../mock/DailyOverview';
import { MerchantOverviewData } from '../mock/MerchantOverviewData';

const { Content } = Layout;

const Filters = lazy(() => import('../components/merchants-overview/Filters'));
const Cards = lazy(() => import('../components/merchants-overview/Cards'));
const Details = lazy(() => import('../components/merchants-overview/Details'));

const MerchantsOverview = () => {
  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <Filters />
          <Cards areachartdata={DailyArea} />
          <Details merchants={MerchantOverviewData} />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(MerchantsOverview);
