import React from 'react';
import { Row, Col, /*Card,*/ Table } from 'antd';
import { numberWithCommas } from '../../helpers/helperFunctions';

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
      totalAmount: `${v.currency} ${numberWithCommas(v.totalAmount)}`,
      arakaFees: `${v.currency} ${numberWithCommas(v.arakaFees)}`,
      otherFees: `${v.currency} ${numberWithCommas(v.otherFees)}`,
      annualFees: `${v.currency} ${numberWithCommas(v.annualFees)}`,
      totalArakaIncome: `${v.currency} ${numberWithCommas(v.totalArakaIncome)}`,
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        {/* <Card> */}
        <div className="table-padding">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
            }}
          />
        </div>
        {/* </Card> */}
      </Col>
    </Row>
  );
};

export default Details;
