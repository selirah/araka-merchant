import React from 'react';
import { Row, Col, Table } from 'antd';
import { ProxyPayTableData } from '../../../interfaces';

interface DetailsProps {
  subscribers: ProxyPayTableData[];
  loading: boolean;
}

const Details: React.FC<DetailsProps> = ({ subscribers, loading }) => {
  const columns: any = [
    {
      title: 'Subscriber',
      dataIndex: 'subscriber',
      key: 'subscriber',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Last Transaction Date',
      dataIndex: 'lastTransactionDate',
      key: 'lastTransactionDate',
      align: 'center',
      className: 'column-text',
    },
  ];
  let dataSource = [];
  for (let s of subscribers) {
    dataSource.push({
      key: Math.random(),
      subscriber: s.subscriberName.toUpperCase(),
      status: s.status,
      email: s.emailAddress.toUpperCase(),
      phone: s.phoneNumber,
      createdAt: s.createdAt,
      lastTransactionDate: s.lastTransactionDate,
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
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Details;
