import React from 'react'
import { Row, Col, Button, Collapse, Select, Form, DatePicker } from 'antd'
import { Clock } from '../../utils/clock'
import { MerchantData } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'

interface FiltersProps {
  merchants: MerchantData[]
  onSearch(values: any): void
  onReset(form: any): void
  translate: any
}

const { Panel } = Collapse
const { Option } = Select

const Filters: React.FC<FiltersProps> = ({
  merchants,
  onReset,
  onSearch,
  translate
}) => {
  const { time } = Clock()
  const [form] = Form.useForm()

  return (
    <Collapse style={{ marginTop: '5px' }} defaultActiveKey={['1']}>
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
              <Form.Item
                name="periodFrom"
                rules={[
                  {
                    required: true,
                    message: translate('general.requiredField')
                  }
                ]}
              >
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
              <Form.Item
                name="periodTo"
                rules={[
                  {
                    required: true,
                    message: translate('general.requiredField')
                  }
                ]}
              >
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
              <Form.Item name="merchant">
                <Select
                  placeholder={`${translate('general.merchant')}: ${translate(
                    'general.default'
                  )}=${translate('general.all')}`}
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
  )
}

export default Filters
