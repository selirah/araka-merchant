import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import CardView from '../../cards/CardView';

interface RevenueServiceCardProps {
  areadata: any;
}

const { Option } = Select;

const RevenueServiceCard: React.FC<RevenueServiceCardProps> = ({
  areadata,
}) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">
              Revenues (Fees) Overview{' '}
              <span style={{ color: '#ababb0' }}> - By Service</span>
            </h4>
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
            value="From Cards - Successful"
            title={3098}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="From mPESA - Successful"
            title={10094.9}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="From Airtel - Successful"
            title={10094.9}
            data={areadata}
            currency="$"
          />
        </Col>
      </Row>
    </div>
  );
};

export default RevenueServiceCard;
