import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';

interface MomoTrxProps {
  areadata: any;
}

const MomoTrx: React.FC<MomoTrxProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Mobile Money Transactions</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Total Transactions" title={9940} data={areadata} />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={9000}
            data={areadata}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Failed Transactions" title={940} data={areadata} />
        </Col>
      </Row>
    </div>
  );
};

export default MomoTrx;
