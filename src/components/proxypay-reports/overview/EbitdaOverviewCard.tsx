import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface EbitdaOverviewCardProps {
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
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
}) => {
  let total: any = {},
    cards: any = {},
    momo: any = {};

  if (proxyPayReport && !isEmpty(proxyPayReport.ebitda)) {
    total = getAreaOptions(
      proxyPayReport.ebitda.proxyPayRevenue.graph.labels,
      proxyPayReport.ebitda.proxyPayRevenue.graph.values,
      '#FFA000',
      '#FFE082'
    );
    cards = getAreaOptions(
      proxyPayReport.ebitda.cards.graph.labels,
      proxyPayReport.ebitda.cards.graph.values,
      '#FFA000',
      '#FFE082'
    );
    momo = getAreaOptions(
      proxyPayReport.ebitda.mobileMoney.graph.labels,
      proxyPayReport.ebitda.mobileMoney.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">EBITDA Overview</h4>
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
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Cards"
            title={proxyPayReport ? proxyPayReport.ebitda.cards.value : 0}
            data={proxyPayReport ? cards : {}}
            currency={currency}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Momo"
            title={proxyPayReport ? proxyPayReport.ebitda.mobileMoney.value : 0}
            data={proxyPayReport ? momo : {}}
            currency={currency}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EbitdaOverviewCard;
