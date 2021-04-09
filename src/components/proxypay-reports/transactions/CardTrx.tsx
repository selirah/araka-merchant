import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';

interface CardTrxProps {
  areadata: any;
}

const CardTrx: React.FC<CardTrxProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Card Transactions</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Total Transactions" title={500} data={areadata} />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={480}
            data={areadata}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Failed Transactions" title={20} data={areadata} />
        </Col>
      </Row>
    </div>
  );
};

export default CardTrx;
