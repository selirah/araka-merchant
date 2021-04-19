import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface RevenueServiceCardProps {
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
}

const { Option } = Select;

const RevenueServiceCard: React.FC<RevenueServiceCardProps> = ({
  proxyPayReport,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
  currency,
  onSelectCurrency,
}) => {
  let cards: any = {},
    mpesa: any = {},
    airtel: any = {};

  if (proxyPayReport && !isEmpty(proxyPayReport.revenues)) {
    cards = getAreaOptions(
      proxyPayReport.revenues.service.moneyTransfers.graph.labels,
      proxyPayReport.revenues.service.moneyTransfers.graph.values,
      '#FFA000',
      '#FFE082'
    );
    mpesa = getAreaOptions(
      proxyPayReport.revenues.service.otherPayments.graph.labels,
      proxyPayReport.revenues.service.otherPayments.graph.values,
      '#FFA000',
      '#FFE082'
    );
    airtel = getAreaOptions(
      proxyPayReport.revenues.service.airtimeRecharge.graph.labels,
      proxyPayReport.revenues.service.airtimeRecharge.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">
              Revenues (Fees) Overview{' '}
              <span style={{ color: '#ababb0' }}> - By Service</span>
            </h4>
            <div className="currency">
              <Select
                defaultValue="USD"
                style={{ marginLeft: 20 }}
                onChange={onSelectCurrency}
              >
                <Option key="USD" value="USD">
                  USD
                </Option>
                <Option key="CDF" value="CDF">
                  CDF
                </Option>
              </Select>
            </div>
          </div>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Button
            type="primary"
            className="export-buttons-excel"
            loading={
              isExporting &&
              exportType === 'EXCEL' &&
              exportPage === 'REVENUES-SERVICE'
            }
            onClick={() => onExportClick('EXCEL', 'REVENUES-SERVICE')}
            style={{ marginBottom: 10 }}
            disabled={!proxyPayReport ? true : false}
          >
            Export to Excel
          </Button> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Money Transfers-Successful"
            title={
              proxyPayReport
                ? proxyPayReport.revenues.service.moneyTransfers.value
                : 0
            }
            data={proxyPayReport ? cards : {}}
            currency={currency}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Other Payments - Successful"
            title={
              proxyPayReport
                ? proxyPayReport.revenues.service.otherPayments.value
                : 0
            }
            data={proxyPayReport ? mpesa : {}}
            currency={currency}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Airtime Recharge - Successful"
            title={
              proxyPayReport
                ? proxyPayReport.revenues.service.airtimeRecharge.value
                : 0
            }
            data={proxyPayReport ? airtel : {}}
            currency={currency}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RevenueServiceCard;
