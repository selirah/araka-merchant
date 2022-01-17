import React from 'react';
import { Row, Col, /*Button,*/ Select } from 'antd';
import RawCardView from '../../cards/RawCardView';
import { ProxyPayReportOpex } from '../../../interfaces';
import { isEmpty } from '../../../helpers/isEmpty';

interface OpexOverviewProps {
  proxyPayReport: ProxyPayReportOpex | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
  loading: boolean;
}

const { Option } = Select;

const OpexOverviewCard: React.FC<OpexOverviewProps> = ({
  proxyPayReport,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
  currency,
  onSelectCurrency,
  loading,
}) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Opex Overview</h4>
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
              isExporting && exportType === 'EXCEL' && exportPage === 'OPEX'
            }
            onClick={() => onExportClick('EXCEL', 'OPEX')}
            style={{ marginBottom: 10 }}
            disabled={!proxyPayReport ? true : false}
          >
            Export to Excel
          </Button> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Bank - Gateway Provider"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.bankGatewayProvider)
                ? proxyPayReport.bankGatewayProvider
                : 0
            }
            currency={currency}
            desc="2% of Transaction Value"
            loading={loading}
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Airtel Money"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.airtelMoney)
                ? proxyPayReport.airtelMoney
                : 0
            }
            currency={currency}
            desc="2.5% Fee"
            loading={loading}
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Orange Money"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.orangeMoney)
                ? proxyPayReport.orangeMoney
                : 0
            }
            currency={currency}
            desc="1.5% Fee"
            loading={loading}
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="mPESA"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.mpesa)
                ? proxyPayReport.mpesa
                : 0
            }
            currency={currency}
            desc="1.5% Fee"
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OpexOverviewCard;
