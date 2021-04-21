import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { TransactionReport } from '../../interfaces';
import { getAreaOptions } from '../../helpers/functions';

interface TransactionSummaryCardsProps {
  trxReports: TransactionReport | null;
  currency: string;
}

const TransactionCards: React.FC<TransactionSummaryCardsProps> = ({
  trxReports,
  currency,
}) => {
  const totalTrx = trxReports
    ? getAreaOptions(
        trxReports.total.graph.labels,
        trxReports.total.graph.values,
        '#1976D2',
        '#BBDEFB'
      )
    : {};

  const totalAmountApproved = trxReports
    ? getAreaOptions(
        trxReports.totalAmountApproved.graph.labels,
        trxReports.totalAmountApproved.graph.values,
        '#1976D2',
        '#BBDEFB'
      )
    : {};
  const totalAmountDeclined = trxReports
    ? getAreaOptions(
        trxReports.totalAmountDeclined.graph.labels,
        trxReports.totalAmountDeclined.graph.values,
        '#1976D2',
        '#BBDEFB'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Transactions Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Transactions"
                title={trxReports ? trxReports.total.value : 0}
                data={totalTrx}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Approved"
                title={trxReports ? trxReports.totalAmountApproved.value : 0}
                data={totalAmountApproved}
                currency={currency}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value="Declined"
                title={trxReports ? trxReports.totalAmountDeclined.value : 0}
                data={totalAmountDeclined}
                currency={currency}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionCards;
