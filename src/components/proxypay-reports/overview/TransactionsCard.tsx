import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../../cards/CardView';
import { path } from '../../../helpers/path';
import { menu, menuHeadings } from '../../../helpers/menu';
import { ProxyPayReportTrx } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface TransactionsCardProps {
  onSeeDetailsClick(path: string, menu: string, header: string): void;
  proxyPayReport: ProxyPayReportTrx | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  loading: boolean;
}

const TransactionsCard: React.FC<TransactionsCardProps> = ({
  onSeeDetailsClick,
  proxyPayReport,
  loading,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
  // currency,
}) => {
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
        <Col span={12}>
          <h4 className="transaction-chart-text">Transactions Overview</h4>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Button
            type="primary"
            className="export-buttons-excel"
            onClick={() => onExportClick('EXCEL', 'TRANSACTIONS')}
            loading={
              isExporting &&
              exportType === 'EXCEL' &&
              exportPage === 'TRANSACTIONS'
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
                path.proxyPayTransactions,
                menu.PROXYPAY_TRANSACTIONS,
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

export default TransactionsCard;
