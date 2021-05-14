import React from 'react';
import { Row, Col, Button, Collapse, Select, Form, DatePicker } from 'antd';
import { Clock } from '../../utils/clock';
import { MerchantData } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';

interface FiltersProps {
  merchants: MerchantData[];
  onSearch(values: any): void;
  onReset(form: any): void;
}

const { Panel } = Collapse;
const { Option } = Select;

const Filters: React.FC<FiltersProps> = ({ merchants, onReset, onSearch }) => {
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
            <Col span={6}>
              <Form.Item name="periodFrom">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Date Period: From"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="periodTo">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder="Date Period: To"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="merchant">
                <Select
                  placeholder="Merchant: Default=All"
                  style={{ width: '100%' }}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {!isEmpty(merchants) &&
                    merchants.map((m) => (
                      <Option value={m.merchantId} key={m.merchantId}>
                        {m.name}
                      </Option>
                    ))}
                </Select>
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
