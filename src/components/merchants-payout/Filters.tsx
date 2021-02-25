import React from 'react';
import {
  Row,
  Col,
  DatePicker,
  Input,
  Button,
  Collapse,
  Select,
  Form,
} from 'antd';
import { Clock } from '../../utils/clock';
import { TransactionHistory } from '../../interfaces';

interface FiltersProps {
  transactions: TransactionHistory[];
  onSearch(values: any): void;
  onReset(form: any): void;
}

const { Panel } = Collapse;
const { Option } = Select;

const Filters: React.FC<FiltersProps> = ({
  transactions,
  onSearch,
  onReset,
}) => {
  const { time } = Clock();
  const [form] = Form.useForm();

  let merchants: string[] = [];
  for (let trx of transactions) {
    const merchant = merchants.find((m) => m === trx.merchant);
    if (merchant === undefined) {
      merchants.push(trx.merchant);
    }
  }

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
        <Form name="filter" form={form} onFinish={onSearch}>
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item name="status">
                <Select
                  placeholder="Status: Default=All"
                  style={{ width: '100%' }}
                >
                  <Option value="APPROVED">Approved</Option>
                  <Option value="DECLINED">Declined</Option>
                  <Option value="CANCELED">Canceled</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="channel">
                <Select
                  placeholder="Channel: Default=All"
                  style={{ width: '100%' }}
                >
                  <Option value="Card">Card</Option>
                  <Option value="mPESA">mPESA</Option>
                </Select>
              </Form.Item>
            </Col>
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
          </Row>
          <Row style={{ marginTop: '10px' }} gutter={10}>
            <Col span={6}>
              <Form.Item name="query">
                <Input
                  placeholder="Reference/Transaction ID/Customer"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="merchant">
                <Select
                  placeholder="Merchant: Default=All"
                  style={{ width: '100%' }}
                >
                  {merchants.map((m) => (
                    <Option value={m} key={Math.random()}>
                      {m}
                    </Option>
                  ))}
                </Select>
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

export default Filters;
