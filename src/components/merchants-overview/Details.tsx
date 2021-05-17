import React from 'react';
import { Row, Col, Tag, Table } from 'antd';
import { MerchantOverview } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface DetailsProps {
  overviews: MerchantOverview[];
  currency: string;
  loading: boolean;
  onLoadMore(page: any, pageSize: any): void;
  total: number;
  translate: any;
}

const Details: React.FC<DetailsProps> = ({
  overviews,
  currency,
  loading,
  onLoadMore,
  total,
  translate,
}) => {
  const sortOverview = (a: MerchantOverview, b: MerchantOverview) => {
    return b.totalAmountProcessed - a.totalAmountProcessed; // descending
  };

  const sortMerchantOverview = (arr: MerchantOverview[]) => {
    arr.sort(sortOverview);

    return arr;
  };

  const columns: any = [
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
    {
      title: `${translate('general.totalAmountProcessed')}`,
      dataIndex: 'amountProcessed',
      key: 'amountProcessed',
      align: 'center',
      className: 'column-text',
    },
    {
      title: `${translate('general.totalTransactions')}`,
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      className: 'column-text',
      responsive: ['md'],
    },
    {
      title: `${translate('general.totalArakaFees')}`,
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
              onChange: (page, pageSize) => {
                onLoadMore(page, pageSize);
              },
              total: total,
              showTotal: (_, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
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
