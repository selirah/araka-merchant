import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportTrx } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface TrxCardProps {
  proxyPayReport: ProxyPayReportTrx | null;
  loading: boolean;
}

const TrxCard: React.FC<TrxCardProps> = ({ proxyPayReport, loading }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.overview.total.graph.labels,
        proxyPayReport.overview.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const successful = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.overview.successful.graph.labels,
        proxyPayReport.overview.successful.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const failed = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.overview.failed.graph.labels,
        proxyPayReport.overview.failed.graph.values,
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
              proxyPayReport && !isEmpty(proxyPayReport.overview.total.value)
                ? proxyPayReport.overview.total.value
                : 0
            }
            data={proxyPayReport ? total : {}}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={
              proxyPayReport &&
              !isEmpty(proxyPayReport.overview.successful.value)
                ? proxyPayReport.overview.successful.value
                : 0
            }
            data={proxyPayReport ? successful : {}}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Failed Transactions"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.overview.failed.value)
                ? proxyPayReport.overview.failed.value
                : 0
            }
            data={proxyPayReport ? failed : {}}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TrxCard;
