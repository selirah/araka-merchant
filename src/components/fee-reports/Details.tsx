import React from 'react';
import { Row, Col, Table } from 'antd';
import { PCESTableData } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface DetailsProps {
  pces: PCESTableData[];
  currency: string;
  loading: boolean;
}

const Details: React.FC<DetailsProps> = ({ pces, currency, loading }) => {
  const columns: any = [
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'center',
      className: 'column-text',
      render: (merchant: string) => {
        return <span style={{ color: '#35b9e6' }}>{merchant}</span>;
      },
    },
    {
      title: 'Total Transactions',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Annual Fees',
      dataIndex: 'annualFees',
      key: 'annualFees',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Araka Fees',
      dataIndex: 'arakaFees',
      key: 'arakaFees',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Other Fees',
      dataIndex: 'otherFees',
      key: 'otherFees',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Total Araka Income',
      dataIndex: 'totalArakaIncome',
      key: 'totalArakaIncome',
      align: 'center',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let v of pces) {
    dataSource.push({
      key: Math.random(),
      totalTransactions: v.totalTransactions,
      merchant: v.merchant,
      totalAmount: `${currency} ${numberWithCommas(v.totalAmount.toFixed(2))}`,
      arakaFees: `${currency} ${numberWithCommas(v.arakaFees.toFixed(2))}`,
      otherFees: `${currency} ${numberWithCommas(v.otherFees.toFixed(2))}`,
      annualFees: `${currency} ${numberWithCommas(v.annualFees.toFixed(2))}`,
      totalArakaIncome: `${currency} ${numberWithCommas(
        v.totalArakaIncome.toFixed(2)
      )}`,
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        <div className="table-padding">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            className="tranaction-table"
            // pagination={{
            //   hideOnSinglePage: true,
            //   total: dataSource.length,
            //   showTotal: (total, range) => {
            //     return `Showing ${range[0]} - ${range[1]} of ${total} results`;
            //   },
            // }}
            pagination={false}
            loading={loading}
            scroll={{ y: 500, scrollToFirstRowOnChange: true }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Details;
