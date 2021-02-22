import React from 'react';
import { Row, Col, DatePicker, Input, Button, Collapse, Select } from 'antd';

interface FiltersProps {}

const { Panel } = Collapse;
const { Option } = Select;

const Filters: React.FC<FiltersProps> = () => {
  return (
    <Collapse style={{ marginTop: '5px' }}>
      <Panel
        header="Filter by:"
        style={{ fontWeight: 400, fontSize: '1rem' }}
        key="1"
        extra={
          <h6 style={{ fontWeight: 500, fontSize: '1rem', color: '#0090fe' }}>
            01/01/2021, 11:35AM
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
              <Option value="mPESA">mPESA</Option>
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
          <Col span={8}>
            <Input
              placeholder="Reference/Transactions ID/Customer/Merchant"
              style={{ width: '100%' }}
            />
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

export default Filters;
