import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row, Button } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { MonthlyArea } from '../mock/MonthlyOverview';

const Filter = lazy(
  () => import('../components/proxypay-reports/volumes/Filter')
);

const VolumesCard = lazy(
  () => import('../components/proxypay-reports/volumes/VolumesCard')
);

const AirtimeRechargeSplitCard = lazy(
  () =>
    import('../components/proxypay-reports/volumes/AirtimeRechargeSplitCard')
);

const { Content } = Layout;

const ProxyPayVolumes: React.FC = () => {
  const onReset = (form: any) => {
    form.resetFields();
  };

  const onSearch = (values: any) => {};

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
          <VolumesCard areadata={MonthlyArea} />
          <AirtimeRechargeSplitCard areadata={MonthlyArea} />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayVolumes);
