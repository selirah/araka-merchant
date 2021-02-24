import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { TransactionHistory } from '../../interfaces';
import { GetTransactionsAnalytics } from '../../helpers/transaction_fucntions';

interface TransactionSummaryCardsProps {
  areachartdata: any;
  transactions: TransactionHistory[];
}

const TransactionCards: React.FC<TransactionSummaryCardsProps> = ({
  areachartdata,
  transactions,
}) => {
  const {
    totalAmountProcessed,
    totalAmountDeclined,
    totalTransactions,
  } = GetTransactionsAnalytics(transactions);

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
                title={`${totalTransactions}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Approved"
                title={`$${totalAmountProcessed.toFixed(2)}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Declined"
                title={`$${totalAmountDeclined.toFixed(2)}`}
                data={areachartdata}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionCards;
