import React from 'react';
import { Row, Col, Input, Button, Collapse, Select } from 'antd';
import { Clock } from '../../utils/clock';

interface FiltersProps {}

const { Panel } = Collapse;
const { Option } = Select;

const Filters: React.FC<FiltersProps> = () => {
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
            <Select
              placeholder="Merchant: Default=All"
              style={{ width: '100%' }}
            >
              <Option value="">All</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Declined">Declined</Option>
              <Option value="Canceled">Canceled</Option>
            </Select>
          </Col>

          <Col span={6}>
            <Input
              placeholder="Amount Processed/Transactions/Fee"
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
