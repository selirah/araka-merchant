import React from 'react';
import { Row, Col, Button, Select } from 'antd';
import CardView from '../../cards/CardView';

interface VolumesCardProps {
  areadata: any;
}

const { Option } = Select;

const VolumesCard: React.FC<VolumesCardProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 className="transaction-chart-text">Volumes Overview</h4>
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
          <Button
            type="primary"
            className="export-buttons-excel"
            // onClick={() => onExportClick('EXCEL')}
            // loading={isExporting && exportType === 'EXCEL'}
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
            title={120450}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Money Payments - Successful"
            title={405005}
            data={areadata}
            currency="$"
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Airtime Recharge - Successful"
            title={326401}
            data={areadata}
            currency="$"
          />
        </Col>
      </Row>
    </div>
  );
};

export default VolumesCard;
