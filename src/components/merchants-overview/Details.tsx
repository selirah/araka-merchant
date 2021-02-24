import React from 'react';
import { Row, Col, Card, Tag, Table } from 'antd';
// import moment from 'moment-timezone';
import { MerchantOverview } from '../../interfaces';
// import { isEmpty } from '../../helpers/isEmpty';

interface DetailsProps {
  overviews: MerchantOverview[];
}

const Details: React.FC<DetailsProps> = ({ overviews }) => {
  const columns: any = [
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
      title: 'Total Amount Processed',
      dataIndex: 'amountProcessed',
      key: 'amountProcessed',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Total Transactions',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Total Araka Fees',
      dataIndex: 'totalFees',
      key: 'totalFees',
      align: 'center',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let overview of overviews) {
    dataSource.push({
      key: Math.random(),
      merchant: overview.merchant,
      amountProcessed: `${
        overview.currency
      } ${overview.totalAmountProcessed.toFixed(2)}`,
      totalTransactions: `${overview.totalTransactions}`,
      totalFees: `${overview.currency} ${overview.totalArakaFees.toFixed(2)}`,
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
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Details;
