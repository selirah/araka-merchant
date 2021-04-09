import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import RawCardView from '../../cards/RawCardView';

interface OpexOverviewProps {}

const { Option } = Select;

const OpexOverviewCard: React.FC<OpexOverviewProps> = () => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Opex Overview</h4>
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
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Bank - Gateway Provider"
            title={2409}
            currency="$"
            desc="2% of Transaction Value"
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Airtel Money"
            title={35.09}
            currency="$"
            desc="2.5% Free"
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="Orange Money"
            title={9.76}
            currency="$"
            desc="1.5% Free"
          />
        </Col>
        <Col span={6} sm={24} md={6} xs={24}>
          <RawCardView
            value="mPESA"
            title={1514.1}
            currency="$"
            desc="1.5% Free"
          />
        </Col>
      </Row>
    </div>
  );
};

export default OpexOverviewCard;
