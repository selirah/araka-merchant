import React from 'react';
import { Row, Col, /*Button,*/ Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportRev } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface RevenueServiceCardProps {
  proxyPayReport: ProxyPayReportRev | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
  loading: boolean;
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
  loading,
}) => {
  const cards = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.service.moneyTransfers.graph.labels,
        proxyPayReport.service.moneyTransfers.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const mpesa = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.service.otherPayments.graph.labels,
        proxyPayReport.service.otherPayments.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const airtel = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.service.airtimeRecharge.graph.labels,
        proxyPayReport.service.airtimeRecharge.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

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
                defaultValue={currency}
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
              proxyPayReport &&
              !isEmpty(proxyPayReport.service.moneyTransfers.value)
                ? proxyPayReport.service.moneyTransfers.value
                : 0
            }
            data={proxyPayReport ? cards : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Other Payments - Successful"
            title={
              proxyPayReport &&
              !isEmpty(proxyPayReport.service.otherPayments.value)
                ? proxyPayReport.service.otherPayments.value
                : 0
            }
            data={proxyPayReport ? mpesa : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Airtime Recharge - Successful"
            title={
              proxyPayReport &&
              !isEmpty(proxyPayReport.service.airtimeRecharge.value)
                ? proxyPayReport.service.airtimeRecharge.value
                : 0
            }
            data={proxyPayReport ? airtel : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RevenueServiceCard;
