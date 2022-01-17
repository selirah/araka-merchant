import React from 'react';
import { Row, Col, Button, Collapse, Select, Form, DatePicker } from 'antd';
import { Clock } from '../../utils/clock';

interface FiltersProps {
  onSearch(values: any): void;
  onReset(form: any): void;
  translate: any;
}

const { Panel } = Collapse;
const { Option } = Select;

const Filters: React.FC<FiltersProps> = ({ onReset, onSearch, translate }) => {
  const { time } = Clock();
  const [form] = Form.useForm();

  return (
    <Collapse style={{ marginTop: '5px' }}>
      <Panel
        header={`${translate('general.filterBy')}:`}
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
                  placeholder={`${translate('general.datePeriod')}: ${translate(
                    'general.from'
                  )}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="periodTo">
                <DatePicker
                  style={{ width: '100%' }}
                  format="MMMM D, YYYY"
                  allowClear
                  placeholder={`${translate('general.datePeriod')}: ${translate(
                    'general.to'
                  )}`}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="month">
                <Select
                  placeholder={`${translate('general.month')}: ${translate(
                    'general.default'
                  )}=${translate('general.all')}`}
                  style={{ width: '100%' }}
                >
                  <Option value="All">{translate('general.all')}</Option>
                  <Option value="January">
                    {translate('general.January')}
                  </Option>
                  <Option value="February">
                    {translate('general.February')}
                  </Option>
                  <Option value="March">{translate('general.March')}</Option>
                  <Option value="April">{translate('general.April')}</Option>
                  <Option value="May">{translate('general.May')}</Option>
                  <Option value="June">{translate('general.June')}</Option>
                  <Option value="July">{translate('general.July')}</Option>
                  <Option value="August">{translate('general.August')}</Option>
                  <Option value="September">
                    {translate('general.September')}
                  </Option>
                  <Option value="October">
                    {translate('general.October')}
                  </Option>
                  <Option value="November">
                    {translate('general.November')}
                  </Option>
                  <Option value="December">
                    {translate('general.December')}
                  </Option>
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
                      {translate('general.filter')}
                    </Button>
                  </Col>
                </Form.Item>
                <Col span={6}>
                  <Button
                    type="primary"
                    className="resetButton"
                    onClick={() => onReset(form)}
                  >
                    {translate('general.reset')}
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
