import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';

interface CardsProps {
  areachartdata: any;
}

const Cards: React.FC<CardsProps> = ({ areachartdata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Payout Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Amount"
                title="$300,105.08"
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Payouts Due"
                title="$291,101.93"
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Fees Due"
                title="$9,003.15"
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
