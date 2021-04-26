import React from 'react';
import { Row, Col, Card } from 'antd';
import CardView from '../cards/CardView';
import BarChart from '../chart/BarChart';
import ProfitCard from '../cards/ProfitCard';
import { TransactionReport } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';
import { Clock } from '../../utils/clock';
import { roles } from '../../helpers/constants';
import { getAreaOptions, getBarOptions } from '../../helpers/functions';

interface OverviewProps {
  trxReports: TransactionReport | null;
  userRoles: string[];
  currency: string;
  fixedPeriod: string;
  loading: boolean;
}

const Overview: React.FC<OverviewProps> = ({
  currency,
  fixedPeriod,
  trxReports,
  userRoles,
  loading,
}) => {
  const role = userRoles.find((r) => r === roles.SuperMerchant);
  const { time } = Clock();
  let borderColor: string;
  let bgColor: string;

  switch (fixedPeriod) {
    case 'daily':
      borderColor = '#1ce1ac';
      bgColor = '#1ce1ac50';
      break;
    case 'weekly':
      borderColor = '#5E35B1';
      bgColor = '#D1C4E9';
      break;
    case 'monthly':
      borderColor = '#FFA000';
      bgColor = '#FFE082';
      break;
    default:
      borderColor = '#1976D2';
      bgColor = '#BBDEFB';
      break;
  }

  const totalTrx = trxReports
    ? getAreaOptions(
        trxReports.total.graph.labels.reverse(),
        trxReports.total.graph.values.reverse(),
        borderColor,
        bgColor
      )
    : {};

  const totalAmountApproved = trxReports
    ? getAreaOptions(
        trxReports.totalAmountApproved.graph.labels.reverse(),
        trxReports.totalAmountApproved.graph.values.reverse(),
        borderColor,
        bgColor
      )
    : {};
  const totalAmountDeclined = trxReports
    ? getAreaOptions(
        trxReports.totalAmountDeclined.graph.labels.reverse(),
        trxReports.totalAmountDeclined.graph.values.reverse(),
        borderColor,
        bgColor
      )
    : {};

  const barChartData = trxReports
    ? getBarOptions(
        trxReports.totalValues.labels.reverse(),
        trxReports.totalValues.approvedValues.reverse(),
        trxReports.totalValues.declinedValues.reverse()
      )
    : {};

  const firstTopMerchant = trxReports
    ? getAreaOptions(
        trxReports.topMerchants.firstTopMerchant.graph.labels,
        trxReports.topMerchants.firstTopMerchant.graph.values,
        borderColor,
        bgColor
      )
    : {};

  const secondTopMerchant = trxReports
    ? getAreaOptions(
        trxReports.topMerchants.secondTopMerchant.graph.labels,
        trxReports.topMerchants.secondTopMerchant.graph.values,
        borderColor,
        bgColor
      )
    : {};

  const thirdTopMerchant = trxReports
    ? getAreaOptions(
        trxReports.topMerchants.thirdTopMerchant.graph.labels,
        trxReports.topMerchants.thirdTopMerchant.graph.values,
        borderColor,
        bgColor
      )
    : {};

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>{fixedPeriod.toUpperCase()} STATISTICS</h4>
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
                  title={trxReports ? trxReports.total.value : 0}
                  data={totalTrx}
                  loading={loading}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Approved"
                  title={trxReports ? trxReports.totalAmountApproved.value : 0}
                  data={totalAmountApproved}
                  currency={currency}
                  loading={loading}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Declined"
                  title={trxReports ? trxReports.totalAmountDeclined.value : 0}
                  data={totalAmountDeclined}
                  currency={currency}
                  loading={loading}
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
          <Col span={24} sm={24} md={24} xs={24}>
            <Card>
              <div className="chart-padding">
                <BarChart info={barChartData} loading={loading} />
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
                  trxReports && trxReports.topMerchants.firstTopMerchant.name
                    ? trxReports.topMerchants.firstTopMerchant.name
                    : 'N/A'
                }`}
                amount={`${currency} ${numberWithCommas(
                  (trxReports && trxReports.topMerchants.firstTopMerchant.value
                    ? trxReports.topMerchants.firstTopMerchant.value
                    : 0
                  ).toFixed(2)
                )}`}
                data={firstTopMerchant}
                loading={loading}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <ProfitCard
                mainTitle="#2 Top Merchant"
                paragraph={`3% of revenue by ${
                  trxReports && trxReports.topMerchants.secondTopMerchant.name
                    ? trxReports.topMerchants.secondTopMerchant.name
                    : 'N/A'
                }`}
                amount={`${currency} ${numberWithCommas(
                  (trxReports && trxReports.topMerchants.secondTopMerchant.value
                    ? trxReports.topMerchants.secondTopMerchant.value
                    : 0
                  ).toFixed(2)
                )}`}
                data={secondTopMerchant}
                loading={loading}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <ProfitCard
                mainTitle="#3 Top Merchant"
                paragraph={`3% of revenue by ${
                  trxReports && trxReports.topMerchants.thirdTopMerchant.name
                    ? trxReports.topMerchants.thirdTopMerchant.name
                    : 'N/A'
                }`}
                amount={`${currency} ${numberWithCommas(
                  (trxReports && trxReports.topMerchants.thirdTopMerchant.value
                    ? trxReports.topMerchants.thirdTopMerchant.value
                    : 0
                  ).toFixed(2)
                )}`}
                data={thirdTopMerchant}
                loading={loading}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default Overview;
