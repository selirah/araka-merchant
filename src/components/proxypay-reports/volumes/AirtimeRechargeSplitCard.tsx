import React from 'react';
import { Row, Col, Select } from 'antd';
import CardView from '../../cards/CardView';
import { ProxyPayReportVol } from '../../../interfaces';
import { getAreaOptions } from '../../../helpers/functions';
import { isEmpty } from '../../../helpers/isEmpty';

interface AirtimeRechargeSplitCardProps {
  proxyPayReport: ProxyPayReportVol | null;
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
        proxyPayReport.airtimeRechargeSplits.airtel.graph.labels,
        proxyPayReport.airtimeRechargeSplits.airtel.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const vodacom = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.airtimeRechargeSplits.vodacom.graph.labels,
        proxyPayReport.airtimeRechargeSplits.vodacom.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const orange = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.airtimeRechargeSplits.orange.graph.labels,
        proxyPayReport.airtimeRechargeSplits.orange.graph.values,
        '#FFA000',
        '#FFE082'
      )
    : {};

  const africell = proxyPayReport
    ? getAreaOptions(
        proxyPayReport.airtimeRechargeSplits.africell.graph.labels,
        proxyPayReport.airtimeRechargeSplits.africell.graph.values,
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
              proxyPayReport &&
              !isEmpty(proxyPayReport.airtimeRechargeSplits.airtel.value)
                ? proxyPayReport.airtimeRechargeSplits.airtel.value
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
              proxyPayReport &&
              !isEmpty(proxyPayReport.airtimeRechargeSplits.vodacom.value)
                ? proxyPayReport.airtimeRechargeSplits.vodacom.value
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
              proxyPayReport &&
              !isEmpty(proxyPayReport.airtimeRechargeSplits.orange.value)
                ? proxyPayReport.airtimeRechargeSplits.orange.value
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
              proxyPayReport &&
              !isEmpty(proxyPayReport.airtimeRechargeSplits.africell.value)
                ? proxyPayReport.airtimeRechargeSplits.africell.value
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
