import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { PCESTableData, PCESReport } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { getAreaOptions } from '../../helpers/functions';

interface CardsProps {
  pces: PCESTableData[];
  pcesReport: PCESReport | null;
  currency: string;
  loading: boolean;
}

const Cards: React.FC<CardsProps> = ({
  pces,
  pcesReport,
  currency,
  loading,
}) => {
  const totalTransactions = pcesReport
    ? getAreaOptions(
        pcesReport.transactions.graph.labels,
        pcesReport.transactions.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const totalAmount = pcesReport
    ? getAreaOptions(
        pcesReport.totalAmount.graph.labels,
        pcesReport.totalAmount.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const annualFees = pcesReport
    ? getAreaOptions(
        pcesReport.arakaAnnualFees.graph.labels,
        pcesReport.arakaAnnualFees.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  // const totalArakaFees = pcesReport
  //   ? getAreaOptions(
  //       pcesReport.totalArakaFees.graph.labels,
  //       pcesReport.totalArakaFees.graph.values,
  //       '#FFA000',
  //       '#FFE082'
  //     )
  //   : {};

  // const totalArakaIncome = pcesReport
  //   ? getAreaOptions(
  //       pcesReport.totalArakaIncome.graph.labels,
  //       pcesReport.totalArakaIncome.graph.values,
  //       '#FFA000',
  //       '#FFE082'
  //     )
  //   : {};

  // const pcesShare = pcesReport
  //   ? getAreaOptions(
  //       pcesReport.pcesshare.graph.labels,
  //       pcesReport.pcesshare.graph.values,
  //       '#FFA000',
  //       '#FFE082'
  //     )
  //   : {};

  return (
    <div className="margin-top-small">
      <Row>
        {!isEmpty(pces) && pcesReport ? (
          <h4 className="transaction-chart-text">PCES Reports Overview</h4>
        ) : null}
      </Row>
      {pcesReport ? (
        <>
          <Row gutter={20}>
            <Col span={24}>
              <Row gutter={20}>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Transactions"
                    title={pcesReport.transactions.value}
                    data={totalTransactions}
                    loading={loading}
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Total Amount"
                    title={pcesReport.totalAmount.value}
                    data={totalAmount}
                    currency={currency}
                    loading={loading}
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Araka Annual Fees"
                    title={pcesReport.arakaAnnualFees.value}
                    data={annualFees}
                    currency={currency}
                    loading={loading}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Row gutter={20}>
            <Col span={24}>
              <Row gutter={20}>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Total Araka Fees"
                    title={pcesReport.totalArakaFees.value}
                    data={totalArakaFees}
                    currency={currency}
                    loading={loading}
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Total Araka Income"
                    title={pcesReport.totalArakaIncome.value}
                    data={totalArakaIncome}
                    currency={currency}
                    loading={loading}
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24} className="pces-share">
                  <CardView
                    value="PCES Share (50%)"
                    title={pcesReport.pcesshare.value}
                    data={pcesShare}
                    currency={currency}
                    loading={loading}
                  />
                </Col>
              </Row>
            </Col>
          </Row> */}
        </>
      ) : null}
    </div>
  );
};

export default Cards;
