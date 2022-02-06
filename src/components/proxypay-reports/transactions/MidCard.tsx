import React from 'react';
import { Row, Col } from 'antd';
import { PieChartView } from './PieChartView';
import { ProxyPayReportTrx } from '../../../interfaces';

interface MidCardProps {
  proxyPayReport: ProxyPayReportTrx | null;
}

const MidCard: React.FC<MidCardProps> = ({ proxyPayReport }) => {
  const total = proxyPayReport ? proxyPayReport.overview.total.value : 0;
  const successful = proxyPayReport
    ? proxyPayReport.overview.successful.value
    : 0;
  const failed = proxyPayReport ? proxyPayReport.overview.failed.value : 0;

  const info = {
    data: {
      labels: ['Successful', 'Failed'],
      datasets: [
        {
          data: [successful, failed],
          backgroundColor: ['#46be8a', '#fb434a'],
          hoverOffset: 4,
          borderColor: ['#4b7cf3', '#4b7cf3'],
          borderWidth: [5, 2],
        },
      ],
    },
  };

  const load = {
    total: total,
    failed: failed,
    successful: successful,
  };

  return (
    <div className="margin-top-small">
      <Row>
        <h4
          className="transaction-chart-text"
          style={{
            background: '#d9dee9',
            paddingLeft: 10,
            paddingRight: 10,
            color: '#595c97',
            fontWeight: 700,
          }}
        >
          Successful Transactions vs. Failed Transactions
        </h4>
      </Row>
      <Row>
        <Col span={12} sm={24} md={12} xs={24}>
          <PieChartView data={info} load={load} />
        </Col>
      </Row>
    </div>
  );
};

export default MidCard;
