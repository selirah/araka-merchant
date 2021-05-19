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
  translate: any;
}

const Cards: React.FC<CardsProps> = ({
  pces,
  pcesReport,
  currency,
  loading,
  translate,
}) => {
  const totalTransactions = pcesReport
    ? getAreaOptions(
        pcesReport.transactions.graph.labels.reverse(),
        pcesReport.transactions.graph.values.reverse(),
        '#FFA000',
        '#FFE082'
      )
    : {};

  const totalAmount = pcesReport
    ? getAreaOptions(
        pcesReport.totalAmount.graph.labels.reverse(),
        pcesReport.totalAmount.graph.values.reverse(),
        '#FFA000',
        '#FFE082'
      )
    : {};

  const annualFees = pcesReport
    ? getAreaOptions(
        pcesReport.arakaAnnualFees.graph.labels.reverse(),
        pcesReport.arakaAnnualFees.graph.values.reverse(),
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
          <h4 className="transaction-chart-text">
            {' '}
            {translate('general.FEEReports')}
          </h4>
        ) : null}
      </Row>
      {pcesReport ? (
        <>
          <Row gutter={20}>
            <Col span={24}>
              <Row gutter={20}>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value={translate('general.transactions')}
                    title={pcesReport.transactions.value}
                    data={totalTransactions}
                    loading={loading}
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value={translate('general.totalAmount')}
                    title={pcesReport.totalAmount.value}
                    data={totalAmount}
                    currency={currency}
                    loading={loading}
                  />
                </Col>
                <Col span={8} sm={24} md={8} xs={24}>
                  <CardView
                    value={translate('general.arakaAnnualFees')}
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
