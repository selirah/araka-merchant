import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportTrx } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface MomoTrxProps {
  proxyPayReport: ProxyPayReportTrx | null;
  loading: boolean;
}

const MomoTrx: React.FC<MomoTrxProps> = ({ proxyPayReport, loading }) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.mobilemoney.total.graph.labels,
        proxyPayReport.mobilemoney.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const successful = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.mobilemoney.successful.graph.labels,
        proxyPayReport.mobilemoney.successful.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const failed = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.mobilemoney.failed.graph.labels,
        proxyPayReport.mobilemoney.failed.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">Mobile Money Transactions</h4>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Total Transactions"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.mobilemoney.total.value)
                ? proxyPayReport.mobilemoney.total.value
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
              !isEmpty(proxyPayReport.mobilemoney.successful.value)
                ? proxyPayReport.mobilemoney.successful.value
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
              proxyPayReport &&
              !isEmpty(proxyPayReport.mobilemoney.failed.value)
                ? proxyPayReport.mobilemoney.failed.value
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

export default MomoTrx;
