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
import { roles } from '../../helpers/constants';

interface DailyOverviewProps {
  transactions: TransactionHistory[];
  userRoles: string[];
}

const DailyOverview: React.FC<DailyOverviewProps> = ({
  transactions,
  userRoles,
}) => {
  const role = userRoles.find((r) => r === roles.SuperMerchant);
  const { time } = Clock();
  const { total, approved, declined } = CalculateTransactionTotals(
    transactions,
    'daily'
  );

  const {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
    barChart,
    merchantsArr,
  } = GetAreaAndBarPoints(transactions, 'daily');

  let topMerchant,
    secondMerchant,
    thirdMerchant,
    topMerchantChart,
    secondMerchantChart,
    thirdMerchantChart;

  if (role !== undefined && role === roles.SuperMerchant) {
    const { merchantTotals } = GetTopMerchants(
      transactions,
      'daily',
      merchantsArr
    );

    const sorter = (a: any, b: any) => {
      return b.amount - a.amount; // descending order;
    };

    const sortByAmount = (arr: any[]) => {
      arr.sort(sorter);
    };

    if (!isEmpty(merchantTotals)) {
      sortByAmount(merchantTotals);
      topMerchant = merchantTotals[0];
      secondMerchant = merchantTotals[1];
      thirdMerchant = merchantTotals[2];
    }

    topMerchantChart = TopMerchantAreaChart(
      topMerchant,
      transactions,
      'daily',
      '#1976D2',
      '#BBDEFB'
    );

    secondMerchantChart = TopMerchantAreaChart(
      secondMerchant,
      transactions,
      'daily',
      '#1976D2',
      '#BBDEFB'
    );

    thirdMerchantChart = TopMerchantAreaChart(
      thirdMerchant,
      transactions,
      'daily',
      '#1976D2',
      '#BBDEFB'
    );
  }

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>DAILY STATISTICS</h4>
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
                  title={approved}
                  // title={`$${numberWithCommas(approved.toFixed(2))}`}
                  data={approvedAreaChart}
                  currency="$"
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Declined"
                  title={declined}
                  // title={`$${numberWithCommas(declined.toFixed(2))}`}
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
      {role !== undefined && role === roles.SuperMerchant ? (
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

export default DailyOverview;
