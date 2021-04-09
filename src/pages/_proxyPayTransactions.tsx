import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row, Button } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { MonthlyArea } from '../mock/MonthlyOverview';
import { ProxyPayTransactionsData } from '../mock/ProxyPayTransactionsData';

const Filter = lazy(
  () => import('../components/proxypay-reports/transactions/Filter')
);
const TrxCard = lazy(
  () => import('../components/proxypay-reports/transactions/TrxCard')
);
const CardTrx = lazy(
  () => import('../components/proxypay-reports/transactions/CardTrx')
);
const MomoTrx = lazy(
  () => import('../components/proxypay-reports/transactions/MomoTrx')
);
const MidCard = lazy(
  () => import('../components/proxypay-reports/transactions/MidCard')
);

const Details = lazy(
  () => import('../components/proxypay-reports/transactions/Details')
);

const { Content } = Layout;

const ProxyPayTransactions = () => {
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
          <TrxCard areadata={MonthlyArea} />
          <CardTrx areadata={MonthlyArea} />
          <MomoTrx areadata={MonthlyArea} />
          <MidCard />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Subscribers Table</h4>
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
            <Details transactions={ProxyPayTransactionsData} />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayTransactions);
