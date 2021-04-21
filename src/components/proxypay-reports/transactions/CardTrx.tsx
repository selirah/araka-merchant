import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface CardTrxProps {
  proxyPayReport: ProxyPayReport | null;
}

const CardTrx: React.FC<CardTrxProps> = ({ proxyPayReport }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.transactions.card.total.graph.labels,
        proxyPayReport.transactions.card.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const successful = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.transactions.card.successful.graph.labels,
        proxyPayReport.transactions.card.successful.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const failed = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.transactions.card.failed.graph.labels,
        proxyPayReport.transactions.card.failed.graph.values,
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
              proxyPayReport ? proxyPayReport.transactions.card.total.value : 0
            }
            data={proxyPayReport ? total : {}}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={
              proxyPayReport
                ? proxyPayReport.transactions.card.successful.value
                : 0
            }
            data={proxyPayReport ? successful : {}}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Failed Transactions"
            title={
              proxyPayReport ? proxyPayReport.transactions.card.failed.value : 0
            }
            data={proxyPayReport ? failed : {}}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CardTrx;
