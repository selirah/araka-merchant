import React from 'react';
import { Row, Col, DatePicker, Input, Button, Collapse, Form } from 'antd';
import { Clock } from '../../utils/clock';

interface FiltersProps {
  onSearch(values: any): void;
  onReset(form: any): void;
}

const { Panel } = Collapse;

const Filters: React.FC<FiltersProps> = ({ onReset, onSearch }) => {
  const { time } = Clock();
  const [form] = Form.useForm();

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
        <Form
          name="filter"
          form={form}
          onFinish={onSearch}
          className="filter-form"
        >
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item name="periodFrom">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Payout Date: From"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="periodTo">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Payout Date: To"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="query">
                <Input
                  placeholder="Balance before/Balance after/Amount/Fee"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }} gutter={10}>
            <Col span={6}>
              <Row gutter={5}>
                <Form.Item>
                  <Col span={6}>
                    <Button
                      type="primary"
                      className="filterButton"
                      htmlType="submit"
                    >
                      Filter
                    </Button>
                  </Col>
                </Form.Item>
                <Col span={6}>
                  <Button
                    type="primary"
                    className="resetButton"
                    onClick={() => onReset(form)}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Filters;
