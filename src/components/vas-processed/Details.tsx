import React from 'react';
import { Row, Col, /*Card,*/ Table } from 'antd';
// import moment from 'moment-timezone';
import { VASProcessed } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';
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
      align: 'center',
      className: 'column-text',
      render: (month: string) => {
        return <span style={{ color: '#35b9e6' }}>{month}</span>;
      },
    },
    {
      title: 'Total Amount Sold',
      dataIndex: 'totalAmountProcessed',
      key: 'totalAmountProcessed',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Fees Charged',
      dataIndex: 'totalFeesCharged',
      key: 'totalFeesCharged',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Annual Fee',
      dataIndex: 'annualFees',
      key: 'annualFees',
      align: 'center',
      className: 'column-text',
      responsive: ['md'],
    },
    {
      title: 'Other Fees',
      dataIndex: 'totalArakaDiscount',
      key: 'totalArakaDiscount',
      align: 'center',
      className: 'column-text',
      responsive: ['md'],
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
  for (let v of vas) {
    dataSource.push({
      key: Math.random(),
      month: v.month,
      totalAmountProcessed: `${v.currency} ${numberWithCommas(
        v.totalAmountProcessed.toFixed(2)
      )}`,
      totalFeesCharged: `${v.currency} ${numberWithCommas(
        v.totalFeesCharged.toFixed(2)
      )}`,
      totalArakaFees: `${v.currency} ${numberWithCommas(
        v.totalArakaFees.toFixed(2)
      )}`,
      totalArakaDiscount: `${v.currency} ${numberWithCommas(
        v.totalArakaDiscount.toFixed(2)
      )}`,
      totalArakaIncome: `${v.currency} ${numberWithCommas(
        v.totalArakaIncome.toFixed(2)
      )}`,
      // annualFees: `${v.currency} ${v.annualFees}`,
      annualFees: `${v.currency} 0.00`,
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
            className="tranaction-table"
            pagination={{
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${dataSource.length} results`;
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
