import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { VASProcessed } from '../../interfaces';
import { GetVASAnalytics } from '../../helpers/vas_functions';

interface CardsProps {
  vas: VASProcessed[];
  currency: string;
}

const Cards: React.FC<CardsProps> = ({ vas, currency }) => {
  const {
    totalArakaIncome,
    totalFeesCharged,
    totalProcessed,
    vasAreaChart,
    incomeAreaChart,
    feesChargedAreaChart,
    // annualFeesAreaChart,
    // totalAnnualFees,
  } = GetVASAnalytics(vas);

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">VAS Processed Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Vas Processed"
                title={totalProcessed}
                data={vasAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="VAS Income"
                title={totalArakaIncome}
                data={incomeAreaChart}
                currency={currency}
              />
            </Col>
            {/* <Col span={6} sm={24} md={6} xs={24}>
              <CardView
                value="Annual Fees"
                title={totalAnnualFees}
                data={annualFeesAreaChart}
                currency={currency}
              />
            </Col> */}
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Fees Charged"
                title={totalFeesCharged}
                data={feesChargedAreaChart}
                currency={currency}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
