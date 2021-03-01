import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { VASProcessed } from '../../interfaces';
import { GetVASAnalytics } from '../../helpers/vas_functions';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface CardsProps {
  vas: VASProcessed[];
}

const Cards: React.FC<CardsProps> = ({ vas }) => {
  const {
    totalArakaIncome,
    totalFeesCharged,
    totalProcessed,
    vasAreaChart,
    incomeAreaChart,
    feesChargedAreaChart,
    annualFeesAreaChart,
    totalAnnualFees,
  } = GetVASAnalytics(vas);

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">VAS Processed Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={6} sm={24} md={6} xs={24}>
              <CardView
                value="Vas Processed"
                title={`${totalProcessed}`}
                data={vasAreaChart}
              />
            </Col>
            <Col span={6} sm={24} md={6} xs={24}>
              <CardView
                value="VAS Income"
                title={`$${numberWithCommas(totalArakaIncome.toFixed(2))}`}
                data={incomeAreaChart}
              />
            </Col>
            <Col span={6} sm={24} md={6} xs={24}>
              <CardView
                value="Annual Fees"
                title={`$${numberWithCommas(totalAnnualFees.toFixed(2))}`}
                data={annualFeesAreaChart}
              />
            </Col>
            <Col span={6} sm={24} md={6} xs={24}>
              <CardView
                value="Fees Charged"
                title={`$${numberWithCommas(totalFeesCharged.toFixed(2))}`}
                data={feesChargedAreaChart}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
