import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { PCESTableData, PCESReport } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { getAreaOptions } from '../../helpers/functions';

interface CardsProps {
  pces: PCESTableData[];
  pcesReport: PCESReport | null;
}

const Cards: React.FC<CardsProps> = ({ pces, pcesReport }) => {
  let totalTransactions: any = {},
    totalAmount: any = {},
    annualFees: any = {},
    totalArakaFees: any = {},
    totalArakaIncome: any = {},
    pcesShare: any = {};
  if (pcesReport) {
    totalTransactions = getAreaOptions(
      pcesReport.transactions.graph.labels,
      pcesReport.transactions.graph.values,
      '#FFA000',
      '#FFE082'
    );
    totalAmount = getAreaOptions(
      pcesReport.totalAmount.graph.labels,
      pcesReport.totalAmount.graph.values,
      '#FFA000',
      '#FFE082'
    );
    annualFees = getAreaOptions(
      pcesReport.arakaAnnualFees.graph.labels,
      pcesReport.arakaAnnualFees.graph.values,
      '#FFA000',
      '#FFE082'
    );

    totalArakaFees = getAreaOptions(
      pcesReport.totalArakaFees.graph.labels,
      pcesReport.totalArakaFees.graph.values,
      '#FFA000',
      '#FFE082'
    );

    totalArakaIncome = getAreaOptions(
      pcesReport.totalArakaIncome.graph.labels,
      pcesReport.totalArakaIncome.graph.values,
      '#FFA000',
      '#FFE082'
    );

    pcesShare = getAreaOptions(
      pcesReport.pcesshare.graph.labels,
      pcesReport.pcesshare.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

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
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Total Amount"
                    title={pcesReport.totalAmount.value}
                    data={totalAmount}
                    currency="$"
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Araka Annual Fees"
                    title={pcesReport.arakaAnnualFees.value}
                    data={annualFees}
                    currency="$"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <Row gutter={20}>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Total Araka Fees"
                    title={pcesReport.totalArakaFees.value}
                    data={totalArakaFees}
                    currency="$"
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value="Total Araka Income"
                    title={pcesReport.totalArakaIncome.value}
                    data={totalArakaIncome}
                    currency="$"
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24} className="pces-share">
                  <CardView
                    value="PCES Share (50%)"
                    title={pcesReport.pcesshare.value}
                    data={pcesShare}
                    currency="$"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
};

export default Cards;
