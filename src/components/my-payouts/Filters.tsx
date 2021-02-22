import React from 'react';
import { Row, Col, DatePicker, Input, Button, Collapse } from 'antd';

interface FiltersProps {}

const { Panel } = Collapse;

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
            <DatePicker
              style={{ width: '100%' }}
              format="MMMM D, YYYY"
              allowClear
              placeholder="Payout Date: From"
            />
          </Col>
          <Col span={6}>
            <DatePicker
              style={{ width: '100%' }}
              format="MMMM D, YYYY"
              allowClear
              placeholder="Payout Date: To"
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder="Balance before/Balance after/Amount/Fee"
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
