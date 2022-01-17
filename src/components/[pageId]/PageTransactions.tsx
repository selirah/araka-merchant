import React from 'react';
import { Tabs, Spin } from 'antd';
import { EmptyTransactions } from './EmptyTransactions';
import { TransactionHistory } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { Transactions } from './Transactions';

interface PageTransactionsProps {
  loading: boolean;
  transactions: TransactionHistory[];
}

export const PageTransactions: React.FC<PageTransactionsProps> = ({
  loading,
  transactions,
}) => {
  const { TabPane } = Tabs;

  let render: React.ReactNode;

  if (loading && isEmpty(transactions)) {
    render = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }

  if (!loading && isEmpty(transactions)) {
    render = <EmptyTransactions />;
  }

  if (!loading && !isEmpty(transactions)) {
    render = <Transactions transactions={transactions} />;
  }

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Recent Payments" key="1">
        {render}
      </TabPane>
    </Tabs>
  );
};
