import React from 'react';
import { Row, Col, /*Button,*/ Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface EbitdaOverviewCardProps {
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
  loading: boolean;
}

const { Option } = Select;

const EbitdaOverviewCard: React.FC<EbitdaOverviewCardProps> = ({
  proxyPayReport,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
  currency,
  onSelectCurrency,
  loading,
}) => {
  const total = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.ebitda.proxyPayRevenue.graph.labels,
        proxyPayReport.ebitda.proxyPayRevenue.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const cards = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.ebitda.cards.graph.labels,
        proxyPayReport.ebitda.cards.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const momo = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.ebitda.mobileMoney.graph.labels,
        proxyPayReport.ebitda.mobileMoney.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">EBITDA Overview</h4>
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
              isExporting && exportType === 'EXCEL' && exportPage === 'EBITDA'
            }
            onClick={() => onExportClick('EXCEL', 'EBITDA')}
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
            value="ProxyPay Revenue - Total"
            title={
              proxyPayReport ? proxyPayReport.ebitda.proxyPayRevenue.value : 0
            }
            data={proxyPayReport ? total : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Cards"
            title={proxyPayReport ? proxyPayReport.ebitda.cards.value : 0}
            data={proxyPayReport ? cards : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Momo"
            title={proxyPayReport ? proxyPayReport.ebitda.mobileMoney.value : 0}
            data={proxyPayReport ? momo : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EbitdaOverviewCard;
