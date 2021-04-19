import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import CardView from '../../cards/CardView';
import { path } from '../../../helpers/path';
import { menu, menuHeadings } from '../../../helpers/menu';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface VolumesCardProps {
  onSeeDetailsClick(path: string, menu: string, header: string): void;
  proxyPayReport: ProxyPayReport | null;
  onExportClick(type: string, page: string): void;
  isExporting: boolean;
  exportType: string;
  exportPage: string;
  currency: string;
  onSelectCurrency(value: string): void;
}

const { Option } = Select;

const VolumesCard: React.FC<VolumesCardProps> = ({
  onSeeDetailsClick,
  proxyPayReport,
  // exportPage,
  // exportType,
  // isExporting,
  // onExportClick,
  currency,
  onSelectCurrency,
}) => {
  let moneyTransfers: any = {},
    otherPayments: any = {},
    airtimeRecharge: any = {};

  if (proxyPayReport && !isEmpty(proxyPayReport.volumes)) {
    moneyTransfers = getAreaOptions(
      proxyPayReport.volumes.moneyTransfers.graph.labels,
      proxyPayReport.volumes.moneyTransfers.graph.values,
      '#FFA000',
      '#FFE082'
    );
    otherPayments = getAreaOptions(
      proxyPayReport.volumes.otherPayments.graph.labels,
      proxyPayReport.volumes.otherPayments.graph.values,
      '#FFA000',
      '#FFE082'
    );
    airtimeRecharge = getAreaOptions(
      proxyPayReport.volumes.airtimeRecharge.graph.labels,
      proxyPayReport.volumes.airtimeRecharge.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Volumes Overview</h4>
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
            onClick={() => onExportClick('EXCEL', 'VOLUMES')}
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
                path.proxyPayVolumes,
                menu.PROXYPAY_VOLUMES,
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
            value="Money Transfers-Successful"
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
