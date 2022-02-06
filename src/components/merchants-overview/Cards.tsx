import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { MerchantOverviewReport } from '../../interfaces';
import { getAreaOptions } from '../../helpers/functions';

interface CardsProps {
  overviews: MerchantOverviewReport | null;
  currency: string;
  loading: boolean;
  translate: any;
}

const Cards: React.FC<CardsProps> = ({
  overviews,
  currency,
  loading,
  translate,
}) => {
  const totalMerchants = overviews
    ? getAreaOptions(
        overviews.totalMerchants.graph.labels,
        overviews.totalMerchants.graph.values,
        '#FBC02D',
        '#FFF176'
      )
    : {};

  const totalAmount = overviews
    ? getAreaOptions(
        overviews.totalAmount.graph.labels,
        overviews.totalAmount.graph.values,
        '#FBC02D',
        '#FFF176'
      )
    : {};

  const totalTransactions = overviews
    ? getAreaOptions(
        overviews.totalTransactions.graph.labels,
        overviews.totalTransactions.graph.values,
        '#FBC02D',
        '#FFF176'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">
          {translate('general.merchantOverview')}
        </h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={`${translate('general.merchant')}s`}
                title={overviews ? overviews.totalMerchants.value : 0}
                data={totalMerchants}
                loading={loading}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.amountProcessed')}
                title={overviews ? overviews.totalAmount.value : 0}
                data={totalAmount}
                currency={currency}
                loading={loading}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.totalTransactions')}
                title={overviews ? overviews.totalTransactions.value : 0}
                data={totalTransactions}
                loading={loading}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
