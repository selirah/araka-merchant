import React from 'react';
import { Row, Col, Table } from 'antd';
import { ProxyPayTrxTableData } from '../../../interfaces';
import { isEmpty } from '../../../helpers/isEmpty';

interface DetailsProps {
  transactions: ProxyPayTrxTableData[];
  loading: boolean;
}

const Details: React.FC<DetailsProps> = ({ transactions, loading }) => {
  const columns: any = [
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Successful',
      dataIndex: 'successful',
      key: 'successful',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Failed',
      dataIndex: 'failed',
      key: 'failed',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      className: 'column-text',
    },
  ];
  let dataSource = [];
  if (!isEmpty(transactions)) {
    for (let trx of transactions) {
      dataSource.push({
        key: Math.random(),
        merchant: trx.merchant,
        total: trx.total,
        successful: trx.successful,
        failed: trx.failed,
        type: trx.channel.toUpperCase(),
      });
    }
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
