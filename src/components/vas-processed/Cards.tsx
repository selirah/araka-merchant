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
        <h4 className="transaction-chart-text">VAS Processed Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Vas Processed"
                title="1240"
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Araka Income"
                title="$22,056,12"
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Fees Charged"
                title="$3,056.12"
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
