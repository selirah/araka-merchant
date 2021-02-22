import React from 'react';
import { Row, Col, Card, Tag, Table } from 'antd';
import moment from 'moment-timezone';
import { TransactionHistory } from '../../interfaces/TransactionHistory';
import { transactionStatus, timeZones } from '../../helpers/constants';
import { useTranslation } from 'react-i18next';
import { TransactionTable as TT } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';

interface TransactionTableProps {
  transactionHistory: TransactionHistory[];
  onClickRow(transactionID: number): void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactionHistory,
  onClickRow,
}) => {
  const { t } = useTranslation();

  const columns: any = [
    {
      title: `${t('transactions.table.status')}`,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      className: 'column-text',
      render: (status: string) => {
        let color: string;
        switch (status) {
          case transactionStatus.APPROVED:
            color = '#41b883';
            break;
          case transactionStatus.DECLINED:
            color = '#ff2e2e';
            break;
          case transactionStatus.CANCELED:
            color = '#868686';
            break;
          default:
            color = '#868686';
            break;
        }
        return <span style={{ fontSize: '2rem', color: color }}>&bull;</span>;
      },
    },
    {
      title: `${t('transactions.table.amount')}`,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${t('transactions.table.customer')}`,
      dataIndex: 'customer',
      key: 'customer',
      align: 'left',
      sorter: (a: TT, b: TT) => a.customer.length - b.customer.length,
      className: 'column-text',
      render: (name: string) => {
        return <span style={{ color: '#35b9e6' }}>{name}</span>;
      },
    },
    {
      title: `${t('transactions.table.transactionId')}`,
      dataIndex: 'transactionId',
      key: 'trasactionId',
      align: 'center',
      sorter: (a: TT, b: TT) => a.transactionId - b.transactionId,
      className: 'column-text',
    },
    {
      title: `${t('transactions.table.paidOn')}`,
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      sorter: (a: TT, b: TT) =>
        moment(a.date).tz(timeZones.kinshasa).unix() -
        moment(b.date).tz(timeZones.kinshasa).unix(),
      className: 'column-text',
    },
    {
      title: `${t('transactions.table.channel')}`,
      dataIndex: 'channel',
      key: 'channel',
      align: 'center',
      className: 'column-text',
      render: (channel: string) => {
        return (
          <Tag key={channel} className="table-tag-channel">
            {channel}
          </Tag>
        );
      },
    },
    {
      title: `${t('transactions.table.reason')}`,
      dataIndex: 'reason',
      key: 'reason',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${t('transactions.table.merchant')}`,
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'center',
      className: 'column-text',
      render: (merchant: string) => {
        return (
          <Tag key={merchant} className="table-tag-merchant">
            {merchant}
          </Tag>
        );
      },
    },
  ];

  let dataSource: TT[] = [];

  for (let transaction of transactionHistory) {
    dataSource.push({
      key: Math.random(),
      amount: `${transaction.currency} ${transaction.amountPaid.toFixed(2)}`,
      customer: transaction.customer,
      transactionId: transaction.transactionId,
      date: moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss')
        .tz(timeZones.kinshasa)
        .format(`MMMM D, YYYY (h:mm a)`),
      channel: transaction.channel.replace(/([a-z])([A-Z])/g, '$1 $2'),
      status: transaction.status,
      reason: !isEmpty(transaction.statusMessage)
        ? transaction.statusMessage
        : 'N/A',
      merchant: transaction.merchant,
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        <Card>
          <div className="table-padding">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 15 }}
              onRow={(t: TT) => ({
                onClick: () => onClickRow(t.transactionId),
              })}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionTable;