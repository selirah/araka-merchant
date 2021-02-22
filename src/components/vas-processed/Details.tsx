import React from 'react';
import { Row, Col, Card, Button, Table } from 'antd';
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
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Total Fee Charged',
      dataIndex: 'totalFee',
      key: 'totalFee',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Araka Fee Charged',
      dataIndex: 'arakaFee',
      key: 'arakaFee',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Araka Discount',
      dataIndex: 'arakaDiscount',
      key: 'arakaDiscount',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Total Araka Income',
      dataIndex: 'arakaIncome',
      key: 'arakaIncome',
      align: 'left',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let v of vas) {
    dataSource.push({
      key: Math.random(),
      month: v.month,
      totalAmount: `${v.currency} ${v.totalAmount}`,
      totalFee: `${v.currency} ${v.totalFee}`,
      arakaFee: `${v.currency} ${v.arakaFee}`,
      arakaDiscount: `${v.currency} ${v.arakaDiscount}`,
      arakaIncome: `${v.currency} ${v.arakaIncome}`,
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
