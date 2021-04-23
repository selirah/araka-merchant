import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../../cards/CardView';
import { path } from '../../../helpers/path';
import { menu, menuHeadings } from '../../../helpers/menu';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface SubscribersCardProps {
  onSeeDetailsClick(path: string, menu: string, header: string): void;
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  onReloadPage(): void;
  loading: boolean;
}

const SubscribersCard: React.FC<SubscribersCardProps> = ({
  onSeeDetailsClick,
  proxyPayReport,
  onReloadPage,
  loading,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
}) => {
  const totalSubscribers = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.subscribers.total.graph.labels,
        proxyPayReport.subscribers.total.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};
  const activeSubscribers = proxyPayReport
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
        <Col span={12}>
          <h4 className="transaction-chart-text">Subscribers Overview</h4>
        </Col>

        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Button
            type="primary"
            className="export-buttons-excel"
            onClick={() => onExportClick('EXCEL', 'SUBSCRIBERS')}
            loading={
              isExporting &&
              exportType === 'EXCEL' &&
              exportPage === 'SUBSCRIBERS'
            }
            style={{ marginBottom: 10 }}
            disabled={!proxyPayReport ? true : false}
          >
            Export to Excel
          </Button> */}
          <Button
            type="primary"
            className="export-buttons-excel"
            onClick={() => onReloadPage()}
            style={{ marginBottom: 10 }}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            className="export-buttons-excel"
            onClick={() =>
              onSeeDetailsClick(
                path.proxyPaySubscribers,
                menu.PROXYPAY_SUBSCRIBERS,
                menuHeadings.REPORTS
              )
            }
            style={{ marginBottom: 10 }}
          >
            See Details
          </Button>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Total Subscribers"
            title={proxyPayReport ? proxyPayReport.subscribers.total.value : 0}
            data={totalSubscribers}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Active Subscribers"
            title={proxyPayReport ? proxyPayReport.subscribers.active.value : 0}
            data={activeSubscribers}
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

export default SubscribersCard;
