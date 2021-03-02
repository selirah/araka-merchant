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
  TopMerchantAreaChart,
} from '../../helpers/functions';
import { numberWithCommas } from '../../helpers/helperFunctions';
import { isEmpty } from '../../helpers/isEmpty';
import { Clock } from '../../utils/clock';

interface WeeklyOverViewProps {
  transactions: TransactionHistory[];
}

const WeeklyOverView: React.FC<WeeklyOverViewProps> = ({ transactions }) => {
  const { time } = Clock();
  const { total, approved, declined } = CalculateTransactionTotals(
    transactions,
    'weekly'
  );
  const {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
    barChart,
    merchantsArr,
  } = GetAreaAndBarPoints(transactions, 'weekly');

  const { merchantTotals } = GetTopMerchants(
    transactions,
    'weekly',
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

  const topMerchantChart = TopMerchantAreaChart(
    topMerchant,
    transactions,
    'weekly',
    '#5E35B1',
    '#D1C4E9'
  );

  const secondMerchantChart = TopMerchantAreaChart(
    secondMerchant,
    transactions,
    'weekly',
    '#5E35B1',
    '#D1C4E9'
  );

  const thirdMerchantChart = TopMerchantAreaChart(
    thirdMerchant,
    transactions,
    'weekly',
    '#5E35B1',
    '#D1C4E9'
  );

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>WEEKLY STATISTICS</h4>
            <h6>{time}</h6>
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
                  title={total}
                  data={trxAreaChart}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Approved"
                  // title={`$${numberWithCommas(approved.toFixed(2))}`}
                  title={approved}
                  data={approvedAreaChart}
                  currency="$"
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Declined"
                  // title={`$${numberWithCommas(declined.toFixed(2))}`}
                  title={declined}
                  data={declinedAreaChart}
                  currency="$"
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
                amount={`$${numberWithCommas(
                  (topMerchant.amount * 0.03).toFixed(2)
                )}`}
                data={topMerchantChart}
              />
            </Col>
            <Col span={8}>
              <ProfitCard
                mainTitle="#2 Top Merchant"
                paragraph={`3% of revenue by ${secondMerchant.merchant}`}
                amount={`$${numberWithCommas(
                  (secondMerchant.amount * 0.03).toFixed(2)
                )}`}
                data={secondMerchantChart}
              />
            </Col>
            <Col span={8}>
              <ProfitCard
                mainTitle="#3 Top Merchant"
                paragraph={`3% of revenue by ${thirdMerchant.merchant}`}
                amount={`$${numberWithCommas(
                  (thirdMerchant.amount * 0.03).toFixed(2)
                )}`}
                data={thirdMerchantChart}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default WeeklyOverView;
