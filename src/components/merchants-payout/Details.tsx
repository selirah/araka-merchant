import React from 'react';
import { Row, Col, Card, Button, Tag, Table } from 'antd';
// import moment from 'moment-timezone';
import { MerchantPayout } from '../../interfaces';
// import { isEmpty } from '../../helpers/isEmpty';
import { transactionStatus } from '../../helpers/constants';

interface DetailsProps {
  merchants: MerchantPayout[];
}

const Details: React.FC<DetailsProps> = ({ merchants }) => {
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
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Paid On',
      dataIndex: 'paidOn',
      key: 'paidOn',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      align: 'left',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let merchant of merchants) {
    dataSource.push({
      key: Math.random(),
      merchant: merchant.merchant,
      balance: `${merchant.currency} ${merchant.balance}`,
      paidOn: `${merchant.paidOn}`,
      transactionId: `${merchant.transactionId}`,
    });
  }

  return (
    <div className="margin-top-small">
      <Row style={{ position: 'relative' }}>
        <h4 className="transaction-chart-text">Merchants Payouts Table</h4>
        <div className="utility-buttons">
          <Button type="primary" className="export-buttons">
            Export to Excel
          </Button>
          <Button type="primary" className="export-buttons">
            Export to PDF
          </Button>
        </div>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Card>
            <div className="table-padding">
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 15 }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
