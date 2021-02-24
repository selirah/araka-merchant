import React from 'react';
import { Row, Col, Select, DatePicker, Input, Button, Collapse } from 'antd';
import { Clock } from '../../utils/clock';

interface TransactionFiltersProps {}

const { Option } = Select;
const { Panel } = Collapse;

const TransactionFilters: React.FC<TransactionFiltersProps> = () => {
  const { time } = Clock();
  return (
    <Collapse style={{ marginTop: '5px' }}>
      <Panel
        header="Filter by:"
        style={{ fontWeight: 400, fontSize: '1rem' }}
        key="1"
        extra={
          <h6 style={{ fontWeight: 500, fontSize: '1rem', color: '#0090fe' }}>
            {time}
          </h6>
        }
      >
        <Row gutter={10}>
          <Col span={6}>
            <Select placeholder="Status: Default=All" style={{ width: '100%' }}>
              <Option value="">All</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Declined">Declined</Option>
              <Option value="Canceled">Canceled</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Channel: Default=All"
              style={{ width: '100%' }}
            >
              <Option value="">All</Option>
              <Option value="Card">Card</Option>
              <Option value="mPSA">mPESA</Option>
            </Select>
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ width: '100%' }}
              format="MMMM D, YYYY"
              allowClear
              placeholder="Date Period: From"
            />
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ width: '100%' }}
              format="MMMM D, YYYY"
              allowClear
              placeholder="Date Period: To"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }} gutter={10}>
          <Col span={6}>
            <Input
              placeholder="Reference/Transaction ID/Customer"
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Merchant: Default=All"
              style={{ width: '100%' }}
            >
              <Option value="">All</Option>
              <Option value="Card">LEON Hotel</Option>
              <Option value="mPSA">INRB</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Row gutter={5}>
              <Col span={6}>
                <Button type="primary" className="filterButton">
                  Filter
                </Button>
              </Col>
              <Col span={6}>
                <Button type="primary" className="resetButton">
                  Reset
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default TransactionFilters;
