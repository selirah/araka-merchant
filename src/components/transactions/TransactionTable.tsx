import React from 'react';
import { Row, Col, Tag, Table } from 'antd';
import moment from 'moment-timezone';
import { TransactionHistory } from '../../interfaces/TransactionHistory';
import { transactionStatus, timeZones } from '../../helpers/constants';
import { TransactionTable as TT } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface TransactionTableProps {
  transactionHistory: TransactionHistory[];
  onClickRow(transactionID: number): void;
  currency: string;
  loading: boolean;
  onLoadMore(page: any, pageSize: any): void;
  total: number;
  translate: any;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactionHistory,
  onClickRow,
  currency,
  loading,
  onLoadMore,
  total,
  translate,
}) => {
  const columns: any = [
    {
      title: <span style={{ fontSize: '2rem', color: '#868686' }}>&bull;</span>,
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
      title: `${translate('general.amount')}`,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.customer')}`,
      dataIndex: 'customer',
      key: 'customer',
      align: 'left',
      sorter: (a: TT, b: TT) => a.customer.length - b.customer.length,
      className: 'column-text',
      render: (name: string) => {
        return <span style={{ color: '#35b9e6' }}>{name}</span>;
      },
      responsive: ['md'],
    },
    {
      title: `${translate('general.transactionId')}`,
      dataIndex: 'transactionId',
      key: 'trasactionId',
      align: 'center',
      sorter: (a: TT, b: TT) => a.transactionId - b.transactionId,
      className: 'column-text',
      responsive: ['md'],
    },
    {
      title: `${translate('general.paidOn')}`,
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      sorter: (a: TT, b: TT) =>
        moment(a.date).tz(timeZones.kinshasa).unix() -
        moment(b.date).tz(timeZones.kinshasa).unix(),
      className: 'column-text',
      responsive: ['lg'],
      render: (date: string) => {
        // const d = moment(date, 'MM/DD/YYYY HH:mm:ss')
        const d = moment(date)
          .tz(timeZones.kinshasa)
          .format(`MMMM D, YYYY (h:mm a)`);
        return <span>{d}</span>;
      },
    },
    {
      title: `${translate('general.channel')}`,
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
      title: `${translate('general.reason')}`,
      dataIndex: 'reason',
      key: 'reason',
      align: 'center',
      className: 'column-text',
      responsive: ['lg'],
    },
    {
      title: `${translate('general.merchant')}`,
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
      key: transaction.transactionId,
      amount: `${currency} ${numberWithCommas(
        transaction.amountPaid.toFixed(2)
      )}`,
      customer: transaction.customer,
      transactionId: transaction.transactionId,
      date: transaction.createdAt,
      channel: transaction.channel,
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
        <div className="table-padding">
          <Table
            dataSource={dataSource}
            columns={columns}
            onRow={(t: TT) => ({
              onClick: () => onClickRow(t.transactionId),
            })}
            className="tranaction-table"
            bordered
            // pagination={false}
            pagination={{
              onChange: (page, pageSize) => {
                onLoadMore(page, pageSize);
              },
              total: total,
              showTotal: (_, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
              showSizeChanger: false,
            }}
            // scroll={{ y: 500, scrollToFirstRowOnChange: true }}
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  );
};

export default TransactionTable;
