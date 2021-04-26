import React from 'react';
import { Row, Col, Select, Button } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportVol } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface VolumesCardProps {
  proxyPayReport: ProxyPayReportVol | null;
  onReloadPage(): void;
  currency: string;
  onSelectCurrency(value: string): void;
  loading: boolean;
}

const { Option } = Select;

const VolumesCard: React.FC<VolumesCardProps> = ({
  proxyPayReport,
  onReloadPage,
  currency,
  onSelectCurrency,
  loading,
}) => {
  const moneyTransfers = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.moneyTransfers.graph.labels,
        proxyPayReport.moneyTransfers.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const otherPayments = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.otherPayments.graph.labels,
        proxyPayReport.otherPayments.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const airtimeRecharge = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.airtimeRecharge.graph.labels,
        proxyPayReport.airtimeRecharge.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Volumes Overview</h4>
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
            // onClick={() => onExportClick('EXCEL')}
            // loading={isExporting && exportType === 'EXCEL'}
            style={{ marginBottom: 10 }}
          >
            Export to EXCEL
          </Button> */}
          <Button
            type="primary"
            className="export-buttons-excel"
            onClick={() => onReloadPage()}
            style={{ marginBottom: 10 }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Money Transfers - Successful"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.moneyTransfers.value)
                ? proxyPayReport.moneyTransfers.value
                : 0
            }
            data={proxyPayReport ? moneyTransfers : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Other Payments - Successful"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.otherPayments.value)
                ? proxyPayReport.otherPayments.value
                : 0
            }
            data={proxyPayReport ? otherPayments : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Airtime Recharge - Successful"
            title={
              proxyPayReport && !isEmpty(proxyPayReport.airtimeRecharge.value)
                ? proxyPayReport.airtimeRecharge.value
                : 0
            }
            data={proxyPayReport ? airtimeRecharge : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default VolumesCard;
