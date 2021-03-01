import React from 'react';
import { Row, Col, Card, Table } from 'antd';

interface DetailsProps {
  reports: any[];
}

const Details: React.FC<DetailsProps> = ({ reports }) => {
  const columns: any = [
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'left',
      className: 'column-text',
      render: (merchant: string) => {
        return <span style={{ color: '#35b9e6' }}>{merchant}</span>;
      },
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Araka Fees',
      dataIndex: 'arakaFees',
      key: 'arakaFees',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Other Fees',
      dataIndex: 'otherFees',
      key: 'otherFees',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Annual Fee',
      dataIndex: 'annualFees',
      key: 'annualFees',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Total Araka Income',
      dataIndex: 'totalArakaIncome',
      key: 'totalArakaIncome',
      align: 'left',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let v of reports) {
    dataSource.push({
      key: Math.random(),
      merchant: v.merchant,
      totalAmount: `${v.currency} ${v.totalAmount}`,
      arakaFees: `${v.currency} ${v.arakaFees}`,
      otherFees: `${v.currency} ${v.otherFees}`,
      annualFees: `${v.currency} ${v.annualFees}`,
      totalArakaIncome: `${v.currency} ${v.totalArakaIncome}`,
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
