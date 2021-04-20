import React from 'react';
import { Row, Col, Card } from 'antd';
import CardView from '../cards/CardView';
import BarChart from '../chart/BarChart';
import ProfitCard from '../cards/ProfitCard';
import { TransactionHistory } from '../../interfaces';
import {
  CalculateTransactionTotals,
  GetAreaAndBarPoints,
  GetTopMerchants,
  TopMerchantAreaChart,
} from '../../helpers/functions';
import { numberWithCommas } from '../../helpers/helperFunctions';
import { sortByAmount } from '../../helpers/sorter';
import { isEmpty } from '../../helpers/isEmpty';
import { Clock } from '../../utils/clock';
import { roles } from '../../helpers/constants';
import moment from 'moment';

interface MonthlyOverviewProps {
  transactions: TransactionHistory[];
  userRoles: string[];
}

const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({
  transactions,
  userRoles,
}) => {
  const role = userRoles.find((r) => r === roles.SuperMerchant);
  const { time } = Clock();

  // let us first filter the transactions to get those conducted for the last 30 days
  let filteredTransactions: TransactionHistory[] = [];
  const thirtyDays = moment(new Date())
    .subtract(30, 'days')
    .format('MM/DD/YYYY 23:59:59');
  const last30Days = moment(thirtyDays, 'MM/DD/YYYY HH:mm:ss').format('X');

  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('X');
    // check if trasnaction exists within these dates
    if (tDate >= last30Days) {
      filteredTransactions.push(trx);
    }
  }

  const { total, approved, declined } = CalculateTransactionTotals(
    filteredTransactions,
    'monthly'
  );

  const {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
    barChart,
    merchantsArr,
  } = GetAreaAndBarPoints(filteredTransactions, 'monthly');

  let topMerchant,
    secondMerchant,
    thirdMerchant,
    topMerchantChart,
    secondMerchantChart,
    thirdMerchantChart;

  if (role !== undefined && role === roles.SuperMerchant) {
    const { merchantTotals } = GetTopMerchants(
      filteredTransactions,
      'monthly',
      merchantsArr
    );

    if (!isEmpty(merchantTotals)) {
      sortByAmount(merchantTotals);
      topMerchant = merchantTotals[0];
      secondMerchant = merchantTotals[1];
      thirdMerchant = merchantTotals[2];

      topMerchantChart = TopMerchantAreaChart(
        topMerchant,
        filteredTransactions,
        'monthly',
        '#FFA000',
        '#FFE082'
      );

      secondMerchantChart = TopMerchantAreaChart(
        secondMerchant,
        filteredTransactions,
        'monthly',
        '#FFA000',
        '#FFE082'
      );

      thirdMerchantChart = TopMerchantAreaChart(
        thirdMerchant,
        filteredTransactions,
        'monthly',
        '#FFA000',
        '#FFE082'
      );
    }
  }

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>MONTHLY STATISTICS</h4>
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
                  data={approvedAreaChart}
                  currency="USD"
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Declined"
                  title={declined}
                  data={declinedAreaChart}
                  currency="USD"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="margin-top mobile-off">
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
            <Col span={8} sm={24} md={8} xs={24}>
              <ProfitCard
                mainTitle="#1 Top Merchant"
                paragraph={`3% of revenue by ${
                  topMerchant ? topMerchant.merchant : 'N/A'
                }`}
                amount={`$${
                  topMerchant
                    ? numberWithCommas((topMerchant.amount * 0.03).toFixed(2))
                    : '0.00'
                }`}
                data={topMerchant ? topMerchantChart : {}}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <ProfitCard
                mainTitle="#2 Top Merchant"
                paragraph={`3% of revenue by ${
                  secondMerchant ? secondMerchant.merchant : 'N/A'
                }`}
                amount={`$${
                  secondMerchant
                    ? numberWithCommas(
                        (secondMerchant.amount * 0.03).toFixed(2)
                      )
                    : '0.00'
                }`}
                data={secondMerchant ? secondMerchantChart : {}}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <ProfitCard
                mainTitle="#3 Top Merchant"
                paragraph={`3% of revenue by ${
                  thirdMerchant ? thirdMerchant.merchant : 'N/A'
                }`}
                amount={`$${
                  thirdMerchant
                    ? numberWithCommas((thirdMerchant.amount * 0.03).toFixed(2))
                    : '0.00'
                }`}
                data={thirdMerchant ? thirdMerchantChart : {}}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default MonthlyOverview;
