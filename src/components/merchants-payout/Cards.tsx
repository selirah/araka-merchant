import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { TransactionHistory } from '../../interfaces';
import { GetTransactionsAnalytics } from '../../helpers/transaction_functions';
import { numberWithCommas } from '../../helpers/helperFunctions';

interface CardsProps {
  transactions: TransactionHistory[];
}

const Cards: React.FC<CardsProps> = ({ transactions }) => {
  const {
    totalAmountPaidOut,
    totalAmountProcessed,
    totalMerchants,
    amtAreaChart,
    paidOutAreaChart,
  } = GetTransactionsAnalytics(transactions);

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Merchants Payouts Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Merchants"
                title={`${totalMerchants}`}
                data={amtAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Processed"
                title={`$${numberWithCommas(totalAmountProcessed.toFixed(2))}`}
                data={amtAreaChart}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Paid Out"
                title={`$${numberWithCommas(totalAmountPaidOut.toFixed(2))}`}
                data={paidOutAreaChart}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
