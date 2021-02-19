import React, { lazy, Suspense, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { MonthlyArea } from '../mock/MonthlyOverview';
import { TransactionTableData } from '../mock/TransactionTableData';

const { Content } = Layout;

const TransactionFilters = lazy(
  () => import('../components/transactions/TransactionFilters')
);

const TransactionSummaryCards = lazy(
  () => import('../components/transactions/TransactionSummaryCards')
);

const TransactionTable = lazy(
  () => import('../components/transactions/TransactionTable')
);

const TransactionDetail = lazy(
  () => import('../components/transactions/TransactionDetail')
);

const Transactions = () => {
  const [switchView, setSwitchView] = useState(false);

  const onClickRow = (transactionID: number) => {
    setSwitchView(!switchView);
    console.log(transactionID);
  };

  const onCloseScreen = () => {
    setSwitchView(!switchView);
  };

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          {!switchView ? (
            <>
              <TransactionFilters />
              <TransactionSummaryCards areachartdata={MonthlyArea} />
              <TransactionTable
                transactionHistory={TransactionTableData}
                onClickRow={onClickRow}
              />
            </>
          ) : (
            <TransactionDetail onCloseScreen={onCloseScreen} />
          )}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Transactions);
