import React, { lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { MonthlyArea } from '../mock/MonthlyOverview';
import { VASProcessedData } from '../mock/VASProcessedData';

const { Content } = Layout;

const Filters = lazy(() => import('../components/vas-processed/Filters'));
const Cards = lazy(() => import('../components/vas-processed/Cards'));
const Details = lazy(() => import('../components/vas-processed/Details'));

const VASProcessed = () => {
  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <Filters />
          <Cards areachartdata={MonthlyArea} />
          <Details vas={VASProcessedData} />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(VASProcessed);
