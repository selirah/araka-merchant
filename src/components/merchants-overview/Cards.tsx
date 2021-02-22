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
        <h4 className="transaction-chart-text">Merchants Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView value="Merchants" title="529" data={areachartdata} />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Processed"
                title="$22,056,12"
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Total Transactions"
                title="10,200"
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
