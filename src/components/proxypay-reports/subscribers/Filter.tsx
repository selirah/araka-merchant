import React from 'react';
import { Row, Col, Button, Collapse, Select, Form, DatePicker } from 'antd';
import { Clock } from '../../../utils/clock';

interface FilterProps {
  onSearch(values: any): void;
  onReset(form: any): void;
}

const { Panel } = Collapse;
const { Option } = Select;

const Filter: React.FC<FilterProps> = ({ onReset, onSearch }) => {
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
            <Col span={5}>
              <Form.Item name="periodFrom">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Created At: From"
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="periodTo">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Created At: To"
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="status">
                <Select
                  placeholder="Status: Default=All"
                  style={{ width: '100%' }}
                >
                  <Option value="ACTIVE">ACTIVE</Option>
                  <Option value="INACTIVE">INACTIVE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="transactionDate">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Last transaction date"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
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

export default Filter;
