import React from 'react';
import { Row, Col, /*Button,*/ Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportRev } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface RevenueChannelCardProps {
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

const RevenueChannelCard: React.FC<RevenueChannelCardProps> = ({
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
        proxyPayReport.channel.card.graph.labels,
        proxyPayReport.channel.card.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const mpesa = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.channel.mpesa.graph.labels,
        proxyPayReport.channel.mpesa.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const airtel = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.channel.airtel.graph.labels,
        proxyPayReport.channel.airtel.graph.values,
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
              <span style={{ color: '#ababb0' }}> - By Channel</span>
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
            style={{ marginBottom: 10 }}
            loading={
              isExporting &&
              exportType === 'EXCEL' &&
              exportPage === 'REVENUES-CHANNEL'
            }
            onClick={() => onExportClick('EXCEL', 'REVENUES-CHANNEL')}
            disabled={!proxyPayReport ? true : false}
          >
            Export to Excel
          </Button> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="From Cards - Successful"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.channel.card.value)
                ? proxyPayReport.channel.card.value
                : 0
            }
            data={proxyPayReport ? cards : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="From mPESA - Successful"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.channel.mpesa.value)
                ? proxyPayReport.channel.mpesa.value
                : 0
            }
            data={proxyPayReport ? mpesa : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="From Airtel - Successful"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.channel.airtel.value)
                ? proxyPayReport.channel.airtel.value
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

export default RevenueChannelCard;
