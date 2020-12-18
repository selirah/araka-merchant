import React from 'react';
import { TransactionHistory } from '../../interfaces';
import { Tag, Table } from 'antd';
import { transactionStatus } from '../../helpers/constants';
import moment from 'moment';
import { isEmpty } from '../../helpers/isEmpty';

interface TransactionsProps {
  transactions: TransactionHistory[];
}

interface DataSource {
  key: number;
  amount: string;
  transactionId: number;
  reference: string;
  date: string;
  status: string;
  reason: string;
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const columns: any[] = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    // {
    //   title: 'Reference',
    //   dataIndex: 'customer',
    //   key: 'customer',
    //   align: 'center',
    // },
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
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      align: 'center',
    },
  ];

  let dataSource: DataSource[] = [];

  for (let transaction of transactions) {
    dataSource.push({
      key: transaction.transactionId,
      amount: `${transaction.currency} ${transaction.amountPaid.toFixed(2)}`,
      transactionId: transaction.transactionId,
      reference: '',
      date: moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
        'MMMM D, YYYY (h:mm a)'
      ),
      status: transaction.status,
      reason: !isEmpty(transaction.statusMessage)
        ? transaction.statusMessage
        : 'N/A',
    });
  }
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 10 }}
    />
  );
};
