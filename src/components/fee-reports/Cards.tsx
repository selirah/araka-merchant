import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';

interface CardsProps {
  areadata: any;
}

const Cards: React.FC<CardsProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">PCES Merchants Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView value="Transactions" title="1240" data={areadata} />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Amount"
                title="$22,056.12"
                data={areadata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Araka Annual Fees"
                title="$3,056.12"
                data={areadata}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Araka Fees"
                title="$9,012.00"
                data={areadata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Araka Income"
                title="$12,068.12"
                data={areadata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24} className="pces-share">
              <CardView
                value="PCES Share (50%)"
                title="$6,034.06"
                data={areadata}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;