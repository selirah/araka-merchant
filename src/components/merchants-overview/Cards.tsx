import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { MerchantOverview } from '../../interfaces';
import { GetOverviewAnalytics } from '../../helpers/overview_functions';

interface CardsProps {
  overviews: MerchantOverview[];
  currency: string;
}

const Cards: React.FC<CardsProps> = ({ overviews, currency }) => {
  const {
    totalAmountProcessed,
    totalMerchants,
    totalTransactions,
    trxAreaChart,
    amtAreaChart,
  } = GetOverviewAnalytics(overviews);

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">
          Merchants Overview (ONLY APPROVED)
        </h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Merchants"
                title={totalMerchants}
                data={trxAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Processed"
                title={totalAmountProcessed}
                data={amtAreaChart}
                currency={currency}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Transactions"
                title={totalTransactions}
                data={trxAreaChart}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
