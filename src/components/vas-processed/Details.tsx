import React from 'react';
import { Row, Col, Card, Table } from 'antd';
// import moment from 'moment-timezone';
import { VASProcessed } from '../../interfaces';
// import { isEmpty } from '../../helpers/isEmpty';

interface DetailsProps {
  vas: VASProcessed[];
}

const Details: React.FC<DetailsProps> = ({ vas }) => {
  const columns: any = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      align: 'left',
      className: 'column-text',
      render: (month: string) => {
        return <span style={{ color: '#35b9e6' }}>{month}</span>;
      },
    },
    {
      title: 'Total Amount Sold',
      dataIndex: 'totalAmountProcessed',
      key: 'totalAmountProcessed',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Fees Charged',
      dataIndex: 'totalFeesCharged',
      key: 'totalFeesCharged',
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
      title: 'Other Fees',
      dataIndex: 'totalArakaDiscount',
      key: 'totalArakaDiscount',
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
  for (let v of vas) {
    dataSource.push({
      key: Math.random(),
      month: v.month,
      totalAmountProcessed: `${v.currency} ${v.totalAmountProcessed}`,
      totalFeesCharged: `${v.currency} ${v.totalFeesCharged}`,
      totalArakaFees: `${v.currency} ${v.totalArakaFees}`,
      totalArakaDiscount: `${v.currency} ${v.totalArakaDiscount}`,
      totalArakaIncome: `${v.currency} ${v.totalArakaIncome}`,
      // annualFees: `${v.currency} ${v.annualFees}`,
      annualFees: `${v.currency} 0.00`,
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
