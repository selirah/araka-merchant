import React from 'react';
import { TransactionHistory, TransactionTable } from '../../interfaces';
import { Tag, Table } from 'antd';
import { transactionStatus } from '../../helpers/constants';
import moment from 'moment';

interface TransactionsProps {
  transactions: TransactionHistory[];
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const columns: any[] = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      align: 'center',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'trasactionId',
      align: 'center',
    },
    {
      title: 'Paid on',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => {
        let color: string = 'geekblue';
        switch (status) {
          case transactionStatus.APPROVED:
            color = 'green';
            break;
          case transactionStatus.DECLINED:
            color = 'volcano';
            break;
          case transactionStatus.CANCELLED:
            color = 'geekblue';
            break;
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  let dataSource: TransactionTable[] = [];

  for (let transaction of transactions) {
    dataSource.push({
      key: transaction.transactionId,
      amount: `${transaction.currency} ${transaction.amountPaid.toFixed(2)}`,
      customer: transaction.customer,
      transactionId: transaction.transactionId,
      date: moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
        'MMMM D, YYYY (h:mm a)'
      ),
      channel: transaction.channel.replace(/([a-z])([A-Z])/g, '$1 $2'),
      status: transaction.status,
    });
  }
  return (
    <Table
      dataSource={transactions}
      columns={columns}
      pagination={{ pageSize: 10 }}
    />
  );
};
