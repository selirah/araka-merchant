import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportTrx } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface CardTrxProps {
  proxyPayReport: ProxyPayReportTrx | null;
  loading: boolean;
}

const CardTrx: React.FC<CardTrxProps> = ({ proxyPayReport, loading }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.card.total.graph.labels,
        proxyPayReport.card.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const successful = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.card.successful.graph.labels,
        proxyPayReport.card.successful.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const failed = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.card.failed.graph.labels,
        proxyPayReport.card.failed.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Card Transactions</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Total Transactions"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.card.total.value)
                ? proxyPayReport.card.total.value
                : 0
            }
            data={total}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.card.successful.value)
                ? proxyPayReport.card.successful.value
                : 0
            }
            data={successful}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Failed Transactions"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.card.failed.value)
                ? proxyPayReport.card.failed.value
                : 0
            }
            data={failed}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CardTrx;
