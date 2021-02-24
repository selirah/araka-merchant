import React from 'react';
import { Row, Col, Card } from 'antd';
import { CardView } from '../cards/CardView';
import { BarChart } from '../chart/BarChart';
import { ProfitCard } from '../cards/ProfitCard';
import { TransactionHistory } from '../../interfaces';
import {
  CalculateTransactionTotals,
  GetAreaAndBarPoints,
} from '../../helpers/functions';

interface WeeklyOverViewProps {
  barchartdata: any;
  areachartdata: any;
  transactions: TransactionHistory[];
}

const WeeklyOverView: React.FC<WeeklyOverViewProps> = ({
  barchartdata,
  areachartdata,
  transactions,
}) => {
  const { total, approved, declined } = CalculateTransactionTotals(
    transactions,
    'weekly'
  );
  const {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
    barChart,
  } = GetAreaAndBarPoints(transactions, 'weekly');
  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>WEEKLY STATISTICS</h4>
            <h6>01/01/2021, 11:35AM</h6>
          </div>
        </Col>
      </Row>
      <div className="margin-top">
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
      <div className="margin-top">
        <Row>
          <h4 className="transaction-chart-text">Transactions Chart</h4>
        </Row>
        <Row gutter={20}>
          <Col span={24}>
            <Card>
              <div className="chart-padding">
                <BarChart info={barChart} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="margin-top">
        <Row>
          <h4 className="transaction-chart-text">Profits by Merchants</h4>
        </Row>
        <Row gutter={40}>
          <Col span={8}>
            <ProfitCard
              mainTitle="#1 Top Merchant"
              paragraph="3% of revenue by INRB"
              amount="$5056.00"
              data={areachartdata}
            />
          </Col>
          <Col span={8}>
            <ProfitCard
              mainTitle="#2 Top Merchant"
              paragraph="3% of revenue by VAS DStv"
              amount="$1,000.12"
              data={areachartdata}
            />
          </Col>
          <Col span={8}>
            <ProfitCard
              mainTitle="#3 Top Merchant"
              paragraph="3% of revenue by Vodacom"
              amount="$789.32"
              data={areachartdata}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WeeklyOverView;
