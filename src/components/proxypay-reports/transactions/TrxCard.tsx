import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';

interface TrxCardProps {
  areadata: any;
}

const TrxCard: React.FC<TrxCardProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Transactions Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Total Transactions" title={10440} data={areadata} />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={9440}
            data={areadata}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Failed Transactions" title={1000} data={areadata} />
        </Col>
      </Row>
    </div>
  );
};

export default TrxCard;
