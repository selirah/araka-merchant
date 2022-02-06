import React from 'react';
import { Row, Col, Table } from 'antd';
import { VASProcessed } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface DetailsProps {
  vas: VASProcessed[];
  currency: string;
  loading: boolean;
  onLoadMore(page: any, pageSize: any): void;
  total: number;
  translate: any;
}

const Details: React.FC<DetailsProps> = ({
  vas,
  currency,
  loading,
  onLoadMore,
  total,
  translate,
}) => {
  const columns: any = [
    {
      title: `${translate('general.month')}`,
      dataIndex: 'month',
      key: 'month',
      align: 'center',
      className: 'column-text',
      render: (month: string) => {
        return <span style={{ color: '#35b9e6' }}>{month}</span>;
      },
    },
    {
      title: `${translate('general.totalAmountSold')}`,
      dataIndex: 'totalAmountProcessed',
      key: 'totalAmountProcessed',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.feesCharged')}`,
      dataIndex: 'totalFeesCharged',
      key: 'totalFeesCharged',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.annualFee')}`,
      dataIndex: 'annualFees',
      key: 'annualFees',
      align: 'center',
      className: 'column-text',
      responsive: ['md'],
    },
    {
      title: `${translate('general.otherFees')}`,
      dataIndex: 'totalArakaDiscount',
      key: 'totalArakaDiscount',
      align: 'center',
      className: 'column-text',
      responsive: ['md'],
    },
    {
      title: `${translate('general.totalArakaIncome')}`,
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
      totalAmountProcessed: `${currency} ${numberWithCommas(
        v.totalAmountProcessed.toFixed(2)
      )}`,
      totalFeesCharged: `${currency} ${numberWithCommas(
        v.totalFeesCharged.toFixed(2)
      )}`,
      totalArakaFees: `${currency} ${numberWithCommas(
        v.totalArakaFees.toFixed(2)
      )}`,
      totalArakaDiscount: `${currency} ${numberWithCommas(
        v.totalArakaDiscount.toFixed(2)
      )}`,
      totalArakaIncome: `${currency} ${numberWithCommas(
        v.totalArakaIncome.toFixed(2)
      )}`,
      annualFees: `${currency} ${
        v.annualFees !== undefined ? v.annualFees.toFixed(2) : '0.00'
      }`,
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
            pagination={{
              onChange: (page, pageSize) => {
                // onLoadMore(page, pageSize);
              },
              total: total,
              showTotal: (_, range) => {
                const tran = translate(`general.pagination`);
                let t = tran.replace(`%d`, `${range[0]} - ${range[1]}`);
                let s = t.replace(`%s`, total);
                return s;
              },
              showSizeChanger: false,
            }}
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Details;
