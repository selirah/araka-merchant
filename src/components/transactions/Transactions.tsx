import React from 'react';
import { Table } from 'antd';
import { TransactionTable } from '../../interfaces';

interface TransactionsProps {
  transactions: TransactionTable[];
  columns: any[];
  pageSize: number;
}

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  columns,
  pageSize,
}) => {
  return (
    <Table
      dataSource={transactions}
      columns={columns}
      pagination={{ pageSize: pageSize }}
    />
  );
};
