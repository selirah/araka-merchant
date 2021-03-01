import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { TransactionHistory } from '../../interfaces';
import { GetAreaAndBarPoints } from '../../helpers/functions';
import { GetTransactionsAnalytics } from '../../helpers/transaction_functions';
// import { numberWithCommas } from '../../helpers/helperFunctions';

interface TransactionSummaryCardsProps {
  transactions: TransactionHistory[];
}

const TransactionCards: React.FC<TransactionSummaryCardsProps> = ({
  transactions,
}) => {
  const {
    totalTransactions,
    totalAmountProcessed,
    totalAmountDeclined,
  } = GetTransactionsAnalytics(transactions);

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
                title={`${totalTransactions}`}
                data={trxAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Approved"
                // title={`$${numberWithCommas(totalAmountProcessed.toFixed(2))}`}
                title={totalAmountProcessed}
                data={approvedAreaChart}
                currency="$"
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Declined"
                // title={`$${numberWithCommas(totalAmountDeclined.toFixed(2))}`}
                title={totalAmountDeclined}
                data={declinedAreaChart}
                currency="$"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionCards;
