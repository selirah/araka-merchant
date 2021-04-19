import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../../cards/CardView';
import { path } from '../../../helpers/path';
import { menu, menuHeadings } from '../../../helpers/menu';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface SubscribersCardProps {
  onSeeDetailsClick(path: string, menu: string, header: string): void;
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
}

const SubscribersCard: React.FC<SubscribersCardProps> = ({
  onSeeDetailsClick,
  proxyPayReport,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
}) => {
  let totalSubscribers: any = {},
    activeSubscribers: any = {},
    newSubscribers: any = {};

  if (proxyPayReport && !isEmpty(proxyPayReport.subscribers)) {
    totalSubscribers = getAreaOptions(
      proxyPayReport.subscribers.total.graph.labels,
      proxyPayReport.subscribers.total.graph.values,
      '#FFA000',
      '#FFE082'
    );
    activeSubscribers = getAreaOptions(
      proxyPayReport.subscribers.active.graph.labels,
      proxyPayReport.subscribers.active.graph.values,
      '#FFA000',
      '#FFE082'
    );
    newSubscribers = getAreaOptions(
      proxyPayReport.subscribers.newsubscribers.graph.labels,
      proxyPayReport.subscribers.newsubscribers.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

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
            data={proxyPayReport ? totalSubscribers : {}}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Active Subscribers"
            title={proxyPayReport ? proxyPayReport.subscribers.active.value : 0}
            data={proxyPayReport ? activeSubscribers : {}}
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
            data={proxyPayReport ? newSubscribers : {}}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubscribersCard;
