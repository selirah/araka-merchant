import React from 'react';
import { Row, Col, Input, Button, Collapse, Select } from 'antd';

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
            <Select placeholder="Month: Default=All" style={{ width: '100%' }}>
              <Option value="">All</Option>
              <Option value="January">January</Option>
              <Option value="February">February</Option>
              <Option value="March">March</Option>
              <Option value="April">April</Option>
              <Option value="May">May</Option>
              <Option value="June">June</Option>
              <Option value="July">July</Option>
              <Option value="August">August</Option>
              <Option value="September">September</Option>
              <Option value="October">October</Option>
              <Option value="November">November</Option>
              <Option value="December">December</Option>
            </Select>
          </Col>
          <Col span={10}>
            <Input
              placeholder="Amount/Fee/Discount/Income"
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }} gutter={10}>
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
