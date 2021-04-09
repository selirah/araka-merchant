import React from 'react';
import { Row, Col, Select, Button } from 'antd';
import CardView from '../../cards/CardView';

interface AirtimeRechargeSplitCardProps {
  areadata: any;
}

const { Option } = Select;

const AirtimeRechargeSplitCard: React.FC<AirtimeRechargeSplitCardProps> = ({
  areadata,
}) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Airtime Recharge Splits</h4>
            <div className="currency">
              <Select defaultValue="USD" style={{ marginLeft: 20 }}>
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
            title={10550}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Vodacom - Successful"
            title={4505}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Orange - Successful"
            title={10845}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Africell - Successful"
            title={20000}
            data={areadata}
            currency="$"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AirtimeRechargeSplitCard;
