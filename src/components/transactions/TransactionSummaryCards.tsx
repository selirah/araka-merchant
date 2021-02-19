import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';

interface TransactionSummaryCardsProps {
  areachartdata: any;
}

const TransactionCards: React.FC<TransactionSummaryCardsProps> = ({
  areachartdata,
}) => {
  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Transactions Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView value="Transactions" title="40" data={areachartdata} />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Approved"
                title="$1,056.12"
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView value="Declined" title="$106.00" data={areachartdata} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionCards;
