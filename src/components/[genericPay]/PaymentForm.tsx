<<<<<<< HEAD
import React, { useState } from 'react'
import { Row, Col, Form, Input, Button, Alert, Select } from 'antd'
import { Merchant, Page, Fee } from '../../interfaces'
import { PayCircleOutlined } from '@ant-design/icons'
import { isEmpty } from '../../helpers/isEmpty'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface PaymentFormProps {
  page: Page
  onSubmit(values: Merchant): void
  isSubmit: boolean
  error: any
  fee: Fee | undefined
  onCalculateFee(e: React.FormEvent<EventTarget>): void
  translate: any
  isDefault: boolean
  momoProviders: any[]
  urlAmount: any
=======
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Alert, Select } from 'antd';
import { Merchant, Page, Fee } from '../../interfaces';
import { PayCircleOutlined } from '@ant-design/icons';
import { isEmpty } from '../../helpers/isEmpty';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PaymentFormProps {
  page: Page;
  onSubmit(values: Merchant): void;
  isSubmit: boolean;
  error: any;
  fee: Fee | undefined;
  onCalculateFee(e: React.FormEvent<EventTarget>): void;
  translate: any;
  isDefault: boolean;
  momoProviders: any [];
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  page,
  onSubmit,
  error,
  isSubmit,
  fee,
  onCalculateFee,
  translate,
  isDefault,
<<<<<<< HEAD
  momoProviders,
  urlAmount
=======
  momoProviders
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
}) => {
  const [values] = useState<Merchant>({
    amount: page.amount !== '' ? page.amount : urlAmount ? urlAmount : '',
    currency: page.currency,
    customerEmailAddress: '',
    customerFullName: '',
    customerPhoneNumber: '',
    pageDescription: page.description,
    pageLogo: '',
    pageTitle: page.pageName,
    processId: page.processId,
    redirectURL: page.redirectURL,
    transactionReference: page.transactionReference,
    paymentPageId: page.paymentPageId,
    momoProvider: '',
    momoAccountNumber: '',
    paymentInfo: {}
<<<<<<< HEAD
  })
  const { Option } = Select
=======
  });
  const { Option } = Select;
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04

  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '10px'
      }}
    >
      <Col className="pay-form-col">
        {!isEmpty(error) ? (
          <Alert type="error" message={`${JSON.stringify(error)}`} />
        ) : null}
        <Form
          layout="vertical"
          name="basic"
          initialValues={values}
          onFinish={onSubmit}
        >
          <Row>
            <Col span={24}>
              {page.customerName === 'true' ? (
                <Form.Item
                  name="customerFullName"
                  label={translate('general.fullname')}
                  style={{ marginBottom: '2px' }}
                  rules={[{ required: true, message: 'Enter your full name' }]}
                >
                  <Input placeholder={translate('general.fullname')} />
                </Form.Item>
              ) : (
                <Form.Item
                  name="customerFullName"
                  label={translate('general.fullname')}
                  style={{ marginBottom: '2px' }}
                >
                  <Input disabled />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {page.emailAddress === 'true' ? (
                <Form.Item
                  name="customerEmailAddress"
                  label={translate('login.email-placeholder')}
                  style={{ marginBottom: '2px' }}
                  rules={[
                    {
                      required: true,
                      message: `${translate('login.email-error')}`,
                      type: 'email'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item
                  name="customerEmailAddress"
                  label={translate('login.email-placeholder')}
                  style={{ marginBottom: '2px' }}
                >
                  <Input disabled />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {page.phoneNumber === 'true' ? (
                <Form.Item
                  name="customerPhoneNumber"
                  label={translate('general.phoneNumber')}
                  style={{ marginBottom: '2px' }}
                  rules={[
                    { required: true, message: 'Enter your phone number' }
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item
                  name="customerPhoneNumber"
                  label={translate('general.phoneNumber')}
                  style={{ marginBottom: '2px' }}
                >
                  <Input disabled />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={6}>
              <Form.Item name="currency" label={translate('general.amount')}>
                <Input readOnly disabled />
              </Form.Item>
            </Col>
            {page.amount !== '' || urlAmount !== null ? (
              <Col span={18}>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item
                      name="amount"
                      label={translate('general.amount')}
                      className="hide-label"
                    >
                      <Input readOnly disabled />
                    </Form.Item>
                  </Col>
                  {/* <Col span={6}>
                    <Form.Item label="Fee">
                      <Input
                        readOnly
                        disabled
                        value={fee !== undefined ? fee.fee.toFixed(2) : ''}
                      />
                    </Form.Item>
                  </Col> */}
                  {/* <Col span={6}>
                    <Form.Item label="VAT">
                      <Input
                        readOnly
                        disabled
                        value={fee !== undefined ? fee.vat.toFixed(2) : ''}
                      />
                    </Form.Item>
                  </Col> */}
                </Row>
              </Col>
            ) : (
              <Col span={18}>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item
                      name="amount"
                      label={translate('general.amount')}
                      className="hide-label"
                      rules={[{ required: true, message: 'Enter the amount' }]}
                    >
                      <Input
                        placeholder={translate('general.amount')}
                        onBlur={(e) => onCalculateFee(e)}
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col span={6}>
                    <Form.Item label="Fee">
                      <Input
                        readOnly
                        disabled
                        value={fee !== undefined ? fee.fee.toFixed(2) : ''}
                      />
                    </Form.Item>
                  </Col> */}
                  {/* <Col span={6}>
                    <Form.Item label="VAT">
                      <Input
                        readOnly
                        disabled
                        value={fee !== undefined ? fee.vat.toFixed(2) : ''}
                      />
                    </Form.Item>
                  </Col> */}
                </Row>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="pageDescription"
                className="hide-label"
                hidden={true}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item name="pageLogo" className="hide-label" hidden={true}>
                <Input type="text" />
              </Form.Item>
              <Form.Item name="pageTitle" className="hide-label" hidden={true}>
                <Input type="text" />
              </Form.Item>
              <Form.Item name="processId" className="hide-label" hidden={true}>
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="paymentPageId"
                className="hide-label"
                hidden={true}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="redirectURL"
                className="hide-label"
                hidden={true}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
<<<<<<< HEAD
          {!isDefault ? (
            <Row>
              <Col span={24}>
                <Form.Item
                  name="momoProvider"
                  label={translate('general.momoProvider')}
                  rules={[
                    {
                      required: true,
                      message: 'Payment provider is required'
                    }
                  ]}
                >
                  <Select placeholder="Choose Mobile Wallet Provider">
                    <Option value="">Choose Provider</Option>
                    {momoProviders.map((provider) => (
                      <Option key={provider} value={provider}>
                        {provider}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="momoAccountNumber"
                  label={translate('general.momoAccount')}
                  rules={[
                    {
                      required: true,
                      message: 'Phone number to debit is required'
                    }
                  ]}
                >
                  <PhoneInput
                    country="cd"
                    preferredCountries={['cd', 'gh', 'us', 'gb']}
                  />
                </Form.Item>
              </Col>
            </Row>
          ) : null}
=======
          {!isDefault ? <Row>
            <Col span={24}>
              <Form.Item
                name="paymentProvider"
                label={translate('general.momoProvider')}
                rules={[
                  {
                    required: true,
                    message: 'Payment provider is required',
                  },
                ]}
              >
                <Select placeholder='Choose Mobile Wallet Provider'>
                  <Option value="">Choose Provider</Option>
                  {momoProviders.map((provider) => (
                    <Option key={provider} value={provider}>{provider}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="momoAccountNumber"
                label={translate('general.momoAccount')}
                rules={[
                  {
                    required: true,
                    message: 'Phone number to debit is required',
                  },
                ]}
              >
              <PhoneInput
                country="cd"
                preferredCountries={['cd', 'gh', 'us', 'gb']}
                
              />
              </Form.Item>
            </Col>
          </Row> : null}
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
          <Row>
            <Col span={24}>
              <Form.Item
                name="transactionReference"
                label={translate('general.referenceInput')}
                rules={[
                  {
                    required: true,
                    message: 'Transaction reference is required'
                  }
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              <React.Fragment>
                <PayCircleOutlined /> {translate('general.payNow')}
              </React.Fragment>
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
