import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface CardProps {
  proxyPayReport: ProxyPayReport | null;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ proxyPayReport, loading }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.subscribers.total.graph.labels,
        proxyPayReport.subscribers.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const active = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.subscribers.active.graph.labels,
        proxyPayReport.subscribers.active.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const newSubscribers = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.subscribers.newsubscribers.graph.labels,
        proxyPayReport.subscribers.newsubscribers.graph.values,
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
            title={proxyPayReport ? proxyPayReport.subscribers.total.value : 0}
            data={total}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Active Subscribers"
            title={proxyPayReport ? proxyPayReport.subscribers.active.value : 0}
            data={active}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="New Subscribers"
            title={
              proxyPayReport
                ? proxyPayReport.subscribers.newsubscribers.value
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
