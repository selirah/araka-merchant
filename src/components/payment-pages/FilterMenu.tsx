import React from 'react';
import { Row, Col, Select, DatePicker, Input, Button, Collapse } from 'antd';
import { Clock } from '../../utils/clock';

interface FilterMenuProps {}

const { Option } = Select;
const { Panel } = Collapse;

const FilterMenu: React.FC<FilterMenuProps> = () => {
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
            <Select placeholder="Type: Default=All" style={{ width: '100%' }}>
              <Option value="">All</Option>
              <Option value="OT Payment">OT Payment</Option>
              <Option value="Subscription">Subscription</Option>
            </Select>
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ width: '100%' }}
              format="MMMM D, YYYY"
              allowClear
              placeholder="Created At: From"
            />
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ width: '100%' }}
              format="MMMM D, YYYY"
              allowClear
              placeholder="Created At: To"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }} gutter={10}>
          <Col span={6}>
            <Input placeholder="Page name/Amount" style={{ width: '100%' }} />
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

export default FilterMenu;
