import React from 'react'
import {
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Button,
  Collapse,
  Form
} from 'antd'
import { Clock } from '../../utils/clock'
import { MerchantData } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'
import { roles } from '../../helpers/constants'
import { appSelector } from '../../helpers/appSelector'

interface TransactionFiltersProps {
  merchants: MerchantData[]
  onSearch(values: any): void
  onReset(form: any): void
  translate: any
}

const { Option } = Select
const { Panel } = Collapse

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  merchants,
  onSearch,
  onReset,
  translate
}) => {
  const { time } = Clock()
  const [form] = Form.useForm()

  const { user } = appSelector((state) => state.auth)

  let role: any
  if (user) {
    role = user.roles.find((r) => r === roles.SuperMerchant)
  } else {
    role = roles.SuperMerchant
  }

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
              <Form.Item name="status">
                <Select
                  placeholder={`${translate('general.status')}: ${translate(
                    'general.default'
                  )}=${translate('general.all')}`}
                  style={{ width: '100%' }}
                >
                  <Option value="APPROVED">
                    {translate('general.approved')}
                  </Option>
                  <Option value="DECLINED">
                    {translate('general.declined')}
                  </Option>
                  <Option value="CANCELED">
                    {translate('general.canceled')}
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="channel">
                <Select
                  placeholder={`${translate('general.channel')}: ${translate(
                    'general.default'
                  )}=${translate('general.all')}`}
                  style={{ width: '100%' }}
                >
                  {/* <Option value="Card">{translate('general.card')}</Option> */}
                  <Option value="MPESA">MPESA</Option>
                  <Option value="QPC">QPC</Option>
                  <Option value="Rawbank">Rawbank</Option>
                  <Option value="Airtel">Airtel</Option>
                </Select>
              </Form.Item>
            </Col>
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
          </Row>
          <Row style={{ marginTop: '10px' }} gutter={10}>
            <Col span={6}>
              <Form.Item name="query">
                <Input
                  placeholder={`${translate('general.reference')}`}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            {role !== undefined && role === roles.SuperMerchant ? (
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
            ) : null}
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

export default TransactionFilters
