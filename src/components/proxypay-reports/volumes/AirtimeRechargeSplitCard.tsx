import React from 'react';
import { Row, Col, Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReport } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';

interface AirtimeRechargeSplitCardProps {
  proxyPayReport: ProxyPayReport | null;
  currency: string;
  onSelectCurrency(value: string): void;
  loading: boolean;
}

const { Option } = Select;

const AirtimeRechargeSplitCard: React.FC<AirtimeRechargeSplitCardProps> = ({
  currency,
  onSelectCurrency,
  proxyPayReport,
  loading,
}) => {
  const airtel = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.airtimeRechargeSplits.airtel.graph.labels,
        proxyPayReport.volumes.airtimeRechargeSplits.airtel.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const vodacom = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.airtimeRechargeSplits.vodacom.graph.labels,
        proxyPayReport.volumes.airtimeRechargeSplits.vodacom.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const orange = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.airtimeRechargeSplits.orange.graph.labels,
        proxyPayReport.volumes.airtimeRechargeSplits.orange.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const africell = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.volumes.airtimeRechargeSplits.africell.graph.labels,
        proxyPayReport.volumes.airtimeRechargeSplits.africell.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Airtime Recharge Splits</h4>
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
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Airtel - Successful"
            title={
              proxyPayReport
                ? proxyPayReport.volumes.airtimeRechargeSplits.airtel.value
                : 0
            }
            data={proxyPayReport ? airtel : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Vodacom - Successful"
            title={
              proxyPayReport
                ? proxyPayReport.volumes.airtimeRechargeSplits.vodacom.value
                : 0
            }
            data={proxyPayReport ? vodacom : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Orange - Successful"
            title={
              proxyPayReport
                ? proxyPayReport.volumes.airtimeRechargeSplits.orange.value
                : 0
            }
            data={proxyPayReport ? orange : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Africell - Successful"
            title={
              proxyPayReport
                ? proxyPayReport.volumes.airtimeRechargeSplits.africell.value
                : 0
            }
            data={proxyPayReport ? africell : {}}
            currency={currency}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AirtimeRechargeSplitCard;
