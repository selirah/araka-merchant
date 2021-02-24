import React from 'react';
import { Row, Col } from 'antd';
import { CardView } from '../cards/CardView';
import { TransactionHistory } from '../../interfaces';
import { GetTransactionsAnalytics } from '../../helpers/transaction_fucntions';

interface CardsProps {
  areachartdata: any;
  transactions: TransactionHistory[];
}

const Cards: React.FC<CardsProps> = ({ areachartdata, transactions }) => {
  const {
    totalAmountPaidOut,
    totalAmountProcessed,
    totalMerchants,
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
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Processed"
                title={`$${totalAmountProcessed.toFixed(2)}`}
                data={areachartdata}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Amount Paid Out"
                title={`$${totalAmountPaidOut.toFixed(2)}`}
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
