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
  onLoadMore(page: any, pageSize: any): void;
  total: number;
  translate: any;
}

const Details: React.FC<DetailsProps> = ({
  payouts,
  currency,
  onClickRow,
  loading,
  onLoadMore,
  total,
  translate,
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
      title: `${translate('general.amount')}`,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.feesPaid')}`,
      dataIndex: 'feesPaid',
      key: 'feesPaid',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.netAmount')}`,
      dataIndex: 'netAmount',
      key: 'netAmount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.transactionId')}`,
      dataIndex: 'transactionId',
      key: 'transactionId',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.paidOn')}`,
      dataIndex: 'paidOn',
      key: 'paidOn',
      align: 'left',
      className: 'column-text',
    },
    {
      title: `${translate('general.merchant')}`,
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
              onChange: (page, pageSize) => {
                onLoadMore(page, pageSize);
              },
              total: total,
              showTotal: (_, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
              showSizeChanger: false,
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
