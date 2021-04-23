import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';

interface CardProps {
  areadata: any;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ areadata, loading }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Subscribers Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Total Subscribers"
            title={0}
            data={{}}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Active Subscribers"
            title={0}
            data={{}}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="New Subscribers"
            title={0}
            data={{}}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Card;
