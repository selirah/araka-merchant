import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { VASProcessed } from '../../interfaces';
import { GetVASAnalytics } from '../../helpers/vas_functions';

interface CardsProps {
  areachartdata: any;
  vas: VASProcessed[];
}

const Cards: React.FC<CardsProps> = ({ areachartdata, vas }) => {
  const {
    totalArakaIncome,
    totalFeesCharged,
    totalProcessed,
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
                title={`${totalProcessed}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Araka Income"
                title={`$${totalArakaIncome.toFixed(2)}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Fees Charged"
                title={`$${totalFeesCharged.toFixed(2)}`}
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
