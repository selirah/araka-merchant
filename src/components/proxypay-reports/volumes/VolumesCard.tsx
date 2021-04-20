import React from 'react';
import { Row, Col, Select, Button } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface VolumesCardProps {
  proxyPayReport: ProxyPayReport | null;
  onReloadPage(): void;
  currency: string;
  onSelectCurrency(value: string): void;
}

const { Option } = Select;

const VolumesCard: React.FC<VolumesCardProps> = ({
  proxyPayReport,
  onReloadPage,
  currency,
  onSelectCurrency,
}) => {
  const moneyTransfers = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.moneyTransfers.graph.labels,
        proxyPayReport.volumes.moneyTransfers.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const otherPayments = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.otherPayments.graph.labels,
        proxyPayReport.volumes.otherPayments.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const airtimeRecharge = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.airtimeRecharge.graph.labels,
        proxyPayReport.volumes.airtimeRecharge.graph.values,
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
              proxyPayReport ? proxyPayReport.volumes.moneyTransfers.value : 0
            }
            data={proxyPayReport ? moneyTransfers : {}}
            currency={currency}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Other Payments - Successful"
            title={
              proxyPayReport ? proxyPayReport.volumes.otherPayments.value : 0
            }
            data={proxyPayReport ? otherPayments : {}}
            currency={currency}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Airtime Recharge - Successful"
            title={
              proxyPayReport ? proxyPayReport.volumes.airtimeRecharge.value : 0
            }
            data={proxyPayReport ? airtimeRecharge : {}}
            currency={currency}
          />
        </Col>
      </Row>
    </div>
  );
};

export default VolumesCard;
