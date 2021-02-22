import React from 'react';
import { Row, Col, Card, Button, Tag, Table } from 'antd';
// import moment from 'moment-timezone';
import { MerchantOverview } from '../../interfaces';
// import { isEmpty } from '../../helpers/isEmpty';

interface DetailsProps {
  merchants: MerchantOverview[];
}

const Details: React.FC<DetailsProps> = ({ merchants }) => {
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
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Total Transactions',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'left',
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
  for (let merchant of merchants) {
    dataSource.push({
      key: Math.random(),
      merchant: merchant.merchant,
      amountProcessed: `${merchant.currency} ${merchant.amountProcessed}`,
      totalTransactions: `${merchant.totalTransactions}`,
      totalFees: `${merchant.currency} ${merchant.totalFees}`,
    });
  }

  return (
    <div className="margin-top-small">
      <Row style={{ position: 'relative' }}>
        <h4 className="transaction-chart-text">Merchants Table</h4>
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
