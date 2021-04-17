import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row, Button } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { MonthlyArea } from '../mock/MonthlyOverview';
import { changeMenu, changeMenuHeader } from '../store/utils';

const Filter = lazy(
  () => import('../components/proxypay-reports/overview/Filter')
);
const SubscribersCard = lazy(
  () => import('../components/proxypay-reports/overview/SubscribersCard')
);
const TransactionsCard = lazy(
  () => import('../components/proxypay-reports/overview/TransactionsCard')
);
const VolumesCard = lazy(
  () => import('../components/proxypay-reports/overview/VolumesCard')
);
const RevenueChannelCard = lazy(
  () => import('../components/proxypay-reports/overview/RevenueChannelCard')
);
const RevenueServiceCard = lazy(
  () => import('../components/proxypay-reports/overview/RevenueServiceCard')
);

const OpexOverviewCard = lazy(
  () => import('../components/proxypay-reports/overview/OpexOverviewCard')
);

const EbitdaOverviewCard = lazy(
  () => import('../components/proxypay-reports/overview/EbitdaOverviewCard')
);

const { Content } = Layout;

const ProxyPayOverview: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const onReset = (form: any) => {
    form.resetFields();
  };

  const onSearch = (values: any) => {};

  const onSeeDetailsClick = (path: string, menu: string, header: string) => {
    dispatch(changeMenu(menu));
    dispatch(changeMenuHeader(header));
    history.push(path);
  };

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
          <Filter onReset={onReset} onSearch={onSearch} />
          <SubscribersCard
            areadata={MonthlyArea}
            onSeeDetailsClick={onSeeDetailsClick}
          />
          <TransactionsCard
            areadata={MonthlyArea}
            onSeeDetailsClick={onSeeDetailsClick}
          />
          <VolumesCard
            areadata={MonthlyArea}
            onSeeDetailsClick={onSeeDetailsClick}
          />
          <RevenueChannelCard areadata={MonthlyArea} />
          <RevenueServiceCard areadata={MonthlyArea} />
          <OpexOverviewCard />
          <EbitdaOverviewCard areadata={MonthlyArea} />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayOverview);
