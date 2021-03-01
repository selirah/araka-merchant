import React from 'react';
import { Row, Col, Card, Tag, Table } from 'antd';
import moment from 'moment-timezone';
import { TransactionHistory } from '../../interfaces';
import { transactionStatus, timeZones } from '../../helpers/constants';
// import { isEmpty } from '../../helpers/isEmpty';

interface DetailsProps {
  payouts: TransactionHistory[];
}

const Details: React.FC<DetailsProps> = ({ payouts }) => {
  const columns: any = [
    {
      title: 'Status',
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
      title: 'Merchant',
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
    {
      title: 'Amount Paid',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Paid On',
      dataIndex: 'paidOn',
      key: 'paidOn',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      align: 'center',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let payout of payouts) {
    dataSource.push({
      key: Math.random(),
      merchant: payout.merchant,
      balance: `${payout.currency} ${payout.amountPaid.toFixed(2)}`,
      paidOn: moment(payout.createdAt, 'MM/DD/YYYY HH:mm:ss')
        .tz(timeZones.kinshasa)
        .format(`MMMM D, YYYY (h:mm a)`),
      transactionId: `${payout.transactionId}`,
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        <Card>
          <div className="table-padding">
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Details;
