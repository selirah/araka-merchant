import React from 'react';
import { Row, Col, Tag, Table } from 'antd';
import { MerchantOverview } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface DetailsProps {
  overviews: MerchantOverview[];
  currency: string;
}

const Details: React.FC<DetailsProps> = ({ overviews, currency }) => {
  const sortOverview = (a: MerchantOverview, b: MerchantOverview) => {
    return b.totalAmountProcessed - a.totalAmountProcessed; // descending
  };

  const sortMerchantOverview = (arr: MerchantOverview[]) => {
    arr.sort(sortOverview);

    return arr;
  };

  const columns: any = [
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
    {
      title: 'Total Amount Processed',
      dataIndex: 'amountProcessed',
      key: 'amountProcessed',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Total Transactions',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      className: 'column-text',
      responsive: ['md'],
    },
    {
      title: 'Total Araka Fees',
      dataIndex: 'totalFees',
      key: 'totalFees',
      align: 'center',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  overviews = sortMerchantOverview(overviews);
  for (let overview of overviews) {
    dataSource.push({
      key: overview.id,
      merchant: overview.merchant,
      amountProcessed: `${currency} ${numberWithCommas(
        overview.totalAmountProcessed.toFixed(2)
      )}`,
      totalTransactions: `${overview.totalTransactions}`,
      totalFees: `${currency} ${numberWithCommas(
        overview.totalArakaFees.toFixed(2)
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
            pagination={{
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Details;
