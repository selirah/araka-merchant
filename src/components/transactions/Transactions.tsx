import React from 'react';
import { Table } from 'antd';

interface TransactionsProps {
  transactions: any[];
  columns: any[];
}

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  columns,
}) => {
  return <Table dataSource={transactions} columns={columns} />;
};
