import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../../cards/CardView';

interface SubscribersCardProps {
  areadata: any;
}

const SubscribersCard: React.FC<SubscribersCardProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <h4 className="transaction-chart-text">Subscribers Overview</h4>
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
          <CardView value="Total Subscribers" title={20} data={areadata} />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Active Subscribers" title={20} data={areadata} />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="New Subscribers" title={5} data={areadata} />
        </Col>
      </Row>
    </div>
  );
};

export default SubscribersCard;
