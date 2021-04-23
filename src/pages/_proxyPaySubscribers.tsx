import React, { lazy, Suspense, /* useEffect,*/ useState } from 'react';
import { withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Layout, Spin, Row, Button } from 'antd';
// import { appSelector } from '../helpers/appSelector';
// import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { MonthlyArea } from '../mock/MonthlyOverview';
// import { SubscriberData } from '../mock/SubscribersData';

const Filter = lazy(
  () => import('../components/proxypay-reports/subscribers/Filter')
);
const Card = lazy(
  () => import('../components/proxypay-reports/subscribers/Card')
);
const MidCard = lazy(
  () => import('../components/proxypay-reports/subscribers/MidCard')
);

const Details = lazy(
  () => import('../components/proxypay-reports/subscribers/Details')
);

const { Content } = Layout;

const ProxyPaySubscribers = () => {
  const [subscriberData /*, setSubscriberData*/] = useState([]);
  const [loading /*, setLoading*/] = useState(false);
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
          <Card areadata={MonthlyArea} loading={loading} />
          <MidCard areadata={MonthlyArea} loading={loading} />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Subscribers Table</h4>
              <div className="utility-buttons new-payout">
                <>
                  <Button
                    type="primary"
                    className="export-buttons"
                    // onClick={() => onExportClick('EXCEL')}
                    // loading={isExporting && exportType === 'EXCEL'}
                    disabled={isEmpty(subscriberData)}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    type="primary"
                    className="export-buttons"
                    // onClick={() => onExportClick('PDF')}
                    // loading={isExporting && exportType === 'PDF'}
                    disabled={isEmpty(subscriberData)}
                  >
                    Export to PDF
                  </Button>
                </>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  // onClick={() => reloadVas()}
                >
                  Refresh
                </Button>
              </div>
            </Row>
            <Details subscribers={subscriberData} />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPaySubscribers);
