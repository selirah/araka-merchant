import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import CardView from '../../cards/CardView';

interface EbitdaOverviewCardProps {
  areadata: any;
}

const { Option } = Select;

const EbitdaOverviewCard: React.FC<EbitdaOverviewCardProps> = ({
  areadata,
}) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">EBITDA Overview</h4>
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
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            className="export-buttons-excel"
            // onClick={() => onExportClick('EXCEL')}
            // loading={isExporting && exportType === 'EXCEL'}
            style={{ marginBottom: 10 }}
          >
            Export to Excel
          </Button>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Total"
            title={5900.9}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Cards"
            title={689.0}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="ProxyPay Revenue - Momo"
            title={2100}
            data={areadata}
            currency="$"
          />
        </Col>
      </Row>
    </div>
  );
};

export default EbitdaOverviewCard;
