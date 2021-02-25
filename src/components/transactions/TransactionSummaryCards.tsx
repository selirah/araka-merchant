import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { TransactionHistory } from '../../interfaces';
import {
  CalculateTransactionTotals,
  GetAreaAndBarPoints,
} from '../../helpers/functions';

interface TransactionSummaryCardsProps {
  transactions: TransactionHistory[];
}

const TransactionCards: React.FC<TransactionSummaryCardsProps> = ({
  transactions,
}) => {
  const { total, approved, declined } = CalculateTransactionTotals(
    transactions,
    'yearly'
  );
  const {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
  } = GetAreaAndBarPoints(transactions, 'yearly');

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Transactions Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Transactions"
                title={`${total}`}
                data={trxAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Approved"
                title={`$${approved.toFixed(2)}`}
                data={approvedAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Declined"
                title={`$${declined.toFixed(2)}`}
                data={declinedAreaChart}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionCards;
