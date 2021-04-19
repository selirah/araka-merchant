import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../../cards/CardView';
import { path } from '../../../helpers/path';
import { menu, menuHeadings } from '../../../helpers/menu';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface TransactionsCardProps {
  onSeeDetailsClick(path: string, menu: string, header: string): void;
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
}

const TransactionsCard: React.FC<TransactionsCardProps> = ({
  onSeeDetailsClick,
  proxyPayReport,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
  // currency,
}) => {
  let total: any = {},
    successful: any = {},
    failed: any = {};

  if (proxyPayReport && !isEmpty(proxyPayReport.transactions)) {
    total = getAreaOptions(
      proxyPayReport.transactions.overview.total.graph.labels,
      proxyPayReport.transactions.overview.total.graph.values,
      '#FFA000',
      '#FFE082'
    );
    successful = getAreaOptions(
      proxyPayReport.transactions.overview.successful.graph.labels,
      proxyPayReport.transactions.overview.successful.graph.values,
      '#FFA000',
      '#FFE082'
    );
    failed = getAreaOptions(
      proxyPayReport.transactions.overview.failed.graph.labels,
      proxyPayReport.transactions.overview.failed.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

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

export default TransactionsCard;
