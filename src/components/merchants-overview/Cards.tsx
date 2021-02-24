import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { MerchantOverview } from '../../interfaces';
import { GetOverviewAnalytics } from '../../helpers/overview_functions';

interface CardsProps {
  areachartdata: any;
  overviews: MerchantOverview[];
}

const Cards: React.FC<CardsProps> = ({ areachartdata, overviews }) => {
  const {
    totalAmountProcessed,
    totalMerchants,
    totalTransactions,
  } = GetOverviewAnalytics(overviews);

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Merchants Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Merchants"
                title={`${totalMerchants}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Processed"
                title={`$${totalAmountProcessed.toFixed(2)}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Transactions"
                title={`${totalTransactions}`}
                data={areachartdata}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
