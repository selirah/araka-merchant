import React, { lazy, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row } from 'antd';
// import { YearlyArea } from '../mock/YearlyOverview';

// import { MyPayoutData } from '../mock/MyPayoutData';

const { Content } = Layout;

// const Filters = lazy(() => import('../components/my-payouts/Filters'));
// const Cards = lazy(() => import('../components/my-payouts/Cards'));
// const Details = lazy(() => import('../components/my-payouts/Details'));
const EmptyBox = lazy(() => import('../components/my-payouts/EmptyBox'));

const MyPayouts = () => {
  // const onReset = (form: any) => {
  //   form.resetFields();
  // };

  // const onSearch = (values: any) => {};

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
          {/* <Filters onReset={onReset} onSearch={onSearch} />
          <Cards areachartdata={YearlyArea} />
          <Details payouts={[]} /> */}
          <EmptyBox
            description="There are currently no records"
            header="Empty records"
          />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(MyPayouts);
