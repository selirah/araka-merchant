import React from 'react';
import {
  Row,
  Col,
  // Select,
  DatePicker,
  Input,
  Button,
  Collapse,
  Form,
} from 'antd';
import { Clock } from '../../utils/clock';

interface FilterMenuProps {
  onSearch(values: any): void;
  onReset(form: any): void;
}

// const { Option } = Select;
const { Panel } = Collapse;

const FilterMenu: React.FC<FilterMenuProps> = ({ onReset, onSearch }) => {
  const { time } = Clock();
  const [form] = Form.useForm();

  return (
    <Collapse style={{ marginTop: '5px' }}>
      <Panel
        header="Filter by:"
        style={{ fontWeight: 400, fontSize: '1rem' }}
        key="1"
        extra={
          <h6 style={{ fontWeight: 300, fontSize: '1rem', color: '#0090fe' }}>
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
            {/* <Col span={6}>
              <Form.Item name="status">
                <Select
                  placeholder="Status: Default=All"
                  style={{ width: '100%' }}
                >
                  <Option value="">All</Option>
                  <Option value="Approved">Approved</Option>
                  <Option value="Declined">Declined</Option>
                  <Option value="Canceled">Canceled</Option>
                </Select>
              </Form.Item>
            </Col> */}
            {/* <Col span={6}>
              <Form.Item name="type">
                <Select
                  placeholder="Type: Default=All"
                  style={{ width: '100%' }}
                >
                  <Option value="">All</Option>
                  <Option value="OT Payment">OT Payment</Option>
                  <Option value="Subscription">Subscription</Option>
                </Select>
              </Form.Item>
            </Col> */}
            <Col span={6}>
              <Form.Item name="periodFrom">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Created At: From"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="periodTo">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Created At: To"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }} gutter={10}>
            <Col span={6}>
              <Form.Item name="query">
                <Input
                  placeholder="Page name/Amount"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
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

export default FilterMenu;
