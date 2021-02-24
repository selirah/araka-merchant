import React from 'react';
import { Row, Col, Card } from 'antd';
import { CardView } from '../cards/CardView';
import { BarChart } from '../chart/BarChart';
import { ProfitCard } from '../cards/ProfitCard';
import { TransactionHistory } from '../../interfaces';
import {
  CalculateTransactionTotals,
  GetAreaAndBarPoints,
  GetTopMerchants,
} from '../../helpers/functions';
import { isEmpty } from '../../helpers/isEmpty';

interface MonthlyOverviewProps {
  transactions: TransactionHistory[];
}

const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({ transactions }) => {
  const { total, approved, declined } = CalculateTransactionTotals(
    transactions,
    'monthly'
  );

  const {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
    barChart,
    merchantsArr,
  } = GetAreaAndBarPoints(transactions, 'monthly');

  const { merchantTotals } = GetTopMerchants(
    transactions,
    'monthly',
    merchantsArr
  );

  const sorter = (a: any, b: any) => {
    return b.amount - a.amount; // descending order;
  };

  const sortByAmount = (arr: any[]) => {
    arr.sort(sorter);
  };

  let topMerchant, secondMerchant, thirdMerchant;
  if (!isEmpty(merchantTotals)) {
    sortByAmount(merchantTotals);
    topMerchant = merchantTotals[0];
    secondMerchant = merchantTotals[1];
    thirdMerchant = merchantTotals[2];
  }

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>MONTHLY STATISTICS</h4>
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
      {topMerchant.amount > 0 ? (
        <div className="margin-top">
          <Row>
            <h4 className="transaction-chart-text">Profits by Merchants</h4>
          </Row>
          <Row gutter={40}>
            <Col span={8}>
              <ProfitCard
                mainTitle="#1 Top Merchant"
                paragraph={`3% of revenue by ${topMerchant.merchant}`}
                amount={`$${topMerchant.amount.toFixed(2)}`}
                data={trxAreaChart}
              />
            </Col>
            <Col span={8}>
              <ProfitCard
                mainTitle="#2 Top Merchant"
                paragraph={`3% of revenue by ${secondMerchant.merchant}`}
                amount={`$${secondMerchant.amount.toFixed(2)}`}
                data={approvedAreaChart}
              />
            </Col>
            <Col span={8}>
              <ProfitCard
                mainTitle="#3 Top Merchant"
                paragraph={`3% of revenue by ${thirdMerchant.merchant}`}
                amount={`$${thirdMerchant.amount.toFixed(2)}`}
                data={declinedAreaChart}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default MonthlyOverview;
