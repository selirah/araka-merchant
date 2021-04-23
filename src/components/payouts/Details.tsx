import React from 'react';
import { Row, Col, Table, Tag } from 'antd';
import { PayoutTableData } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';
import moment from 'moment-timezone';
import { timeZones } from '../../helpers/constants';

interface DetailsProps {
  payouts: PayoutTableData[];
  currency: string;
  onClickRow(record: any): void;
  loading: boolean;
}

const Details: React.FC<DetailsProps> = ({
  payouts,
  currency,
  onClickRow,
  loading,
}) => {
  const columns: any = [
    {
      title: <span style={{ fontSize: '2rem', color: '#868686' }}>&bull;</span>,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      className: 'column-text',
      render: (status: string) => {
        return (
          <span style={{ fontSize: '2rem', color: '#41b883' }}>&bull;</span>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Fees Paid',
      dataIndex: 'feesPaid',
      key: 'feesPaid',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Net Amount',
      dataIndex: 'netAmount',
      key: 'netAmount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      align: 'center',
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
  ];

  let dataSource = [];
  for (let s of payouts) {
    dataSource.push({
      status: s.transactionId,
      key: s.transactionId,
      amount: `${currency} ${numberWithCommas(s.amount.toFixed(2))}`,
      feesPaid: `${currency} ${numberWithCommas(s.feesPaid.toFixed(2))}`,
      netAmount: `${currency} ${numberWithCommas(s.netAmount.toFixed(2))}`,
      paidOn: moment(s.paidOn, 'MM/DD/YYYY HH:mm:ss')
        .tz(timeZones.kinshasa)
        .format(`MMMM D, YYYY (h:mm a)`),
      transactionId: s.transactionId,
      merchant: s.merchant ? s.merchant : '',
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
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
            }}
            onRow={(record: any) => ({
              onClick: () => onClickRow(record),
            })}
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Details;
