import React from 'react';
import { Row, Col, /*Button,*/ Select } from 'antd';
import RawCardView from '../../cards/RawCardView';
import { ProxyPayReport } from '../../../interfaces';
import { isEmpty } from '../../../helpers/isEmpty';

interface OpexOverviewProps {
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
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
              proxyPayReport && !isEmpty(proxyPayReport.opex)
                ? proxyPayReport.opex.bankGatewayProvider
                : 0
            }
            currency={currency}
            desc="2% of Transaction Value"
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Airtel Money"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.opex)
                ? proxyPayReport.opex.airtelMoney
                : 0
            }
            currency={currency}
            desc="2.5% Fee"
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Orange Money"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.opex)
                ? proxyPayReport.opex.orangeMoney
                : 0
            }
            currency={currency}
            desc="1.5% Fee"
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="mPESA"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.opex)
                ? proxyPayReport.opex.mpesa
                : 0
            }
            currency={currency}
            desc="1.5% Fee"
          />
        </Col>
      </Row>
    </div>
  );
};

export default OpexOverviewCard;
