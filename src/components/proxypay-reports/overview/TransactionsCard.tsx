import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../../cards/CardView';

interface TransactionsCardProps {
  areadata: any;
}

const TransactionsCard: React.FC<TransactionsCardProps> = ({ areadata }) => {
  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <h4 className="transaction-chart-text">Transactions Overview</h4>
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
          <CardView value="Total Transactions" title={500} data={areadata} />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView
            value="Successful Transactions"
            title={480}
            data={areadata}
          />
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <CardView value="Failed Transactions" title={20} data={areadata} />
        </Col>
      </Row>
    </div>
  );
};

export default TransactionsCard;
