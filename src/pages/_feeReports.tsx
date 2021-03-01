import React, { lazy, Suspense /*, useEffect, useState*/ } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
// import { useDispatch } from 'react-redux';
// import { appSelector } from '../helpers/appSelector';
// import { AppDispatch } from '../helpers/appDispatch';

import { MonthlyArea } from '../mock/MonthlyOverview';
import { VASProcessedData } from '../mock/VASProcessedData';

const { Content } = Layout;

// const EmptyBox = lazy(() => import('../components/vas-processed/EmptyBox'));
const Filters = lazy(() => import('../components/fee-reports/Filters'));
const Cards = lazy(() => import('../components/fee-reports/Cards'));
const Details = lazy(() => import('../components/fee-reports/Details'));

const FeeReports = () => {
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
          <Filters onReset={onReset} onSearch={onSearch} />
          <Cards areadata={MonthlyArea} />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">VAS Processed Table</h4>
              <div className="utility-buttons">
                <>
                  <Button
                    type="primary"
                    className="export-buttons"
                    // onClick={() => onExportClick('EXCEL')}
                    // loading={isExporting && exportType === 'EXCEL'}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    type="primary"
                    className="export-buttons"
                    // onClick={() => onExportClick('PDF')}
                    // loading={isExporting && exportType === 'PDF'}
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
            <Details reports={VASProcessedData} />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(FeeReports);
