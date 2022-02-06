import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportSub } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface CardProps {
  proxyPayReport: ProxyPayReportSub | null;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ proxyPayReport, loading }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.total.graph.labels,
        proxyPayReport.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const active = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.active.graph.labels,
        proxyPayReport.active.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const newSubscribers = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.newsubscribers.graph.labels,
        proxyPayReport.newsubscribers.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Subscribers Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Total Subscribers"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.total.value)
                ? proxyPayReport.total.value
                : 0
            }
            data={total}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Active Subscribers"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.active.value)
                ? proxyPayReport.active.value
                : 0
            }
            data={active}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="New Subscribers"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.newsubscribers.value)
                ? proxyPayReport.newsubscribers.value
                : 0
            }
            data={newSubscribers}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Card;
