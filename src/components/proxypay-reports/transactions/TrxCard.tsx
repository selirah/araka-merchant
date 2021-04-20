import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface TrxCardProps {
  proxyPayReport: ProxyPayReport | null;
}

const TrxCard: React.FC<TrxCardProps> = ({ proxyPayReport }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.transactions.overview.total.graph.labels,
        proxyPayReport.transactions.overview.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const successful = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.transactions.overview.successful.graph.labels,
        proxyPayReport.transactions.overview.successful.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const failed = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.transactions.overview.failed.graph.labels,
        proxyPayReport.transactions.overview.failed.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Transactions Overview</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Total Transactions"
            title={
              proxyPayReport
                ? proxyPayReport.transactions.overview.total.value
                : 0
            }
            data={proxyPayReport ? total : {}}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={
              proxyPayReport
                ? proxyPayReport.transactions.overview.successful.value
                : 0
            }
            data={proxyPayReport ? successful : {}}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Failed Transactions"
            title={
              proxyPayReport
                ? proxyPayReport.transactions.overview.failed.value
                : 0
            }
            data={proxyPayReport ? failed : {}}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TrxCard;
