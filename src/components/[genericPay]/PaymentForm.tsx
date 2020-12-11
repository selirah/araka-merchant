import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { Merchant, Page } from '../../interfaces';
import { PayCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { isEmpty } from '../../helpers/isEmpty';

interface PaymentFormProps {
  page: Page;
  onSubmit(values: Merchant): void;
  isSubmit: boolean;
  error: any;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  page,
  onSubmit,
  error,
  isSubmit,
}) => {
  const [values] = useState<Merchant>({
    amount: page.amount !== '' ? page.amount : '',
    currency: page.currency,
    customerEmailAddress: '',
    customerFullName: '',
    customerPhoneNumber: '',
    pageDescription: page.description,
    pageLogo: page.logo,
    pageTitle: page.pageName,
    processId: page.processId,
    redirectURL: page.redirectURL,
    transactionReference: page.transactionReference,
  });

  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '10px',
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
                  label="Full Name"
                  style={{ marginBottom: '2px' }}
                  rules={[{ required: true, message: 'Enter your full name' }]}
                >
                  <Input placeholder="Enter your name.." />
                </Form.Item>
              ) : (
                <Form.Item
                  name="customerFullName"
                  label="Full Name"
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
                  label="Email Address"
                  style={{ marginBottom: '2px' }}
                  rules={[
                    { required: true, message: 'Enter your email address' },
                  ]}
                >
                  <Input placeholder="Enter email address.." />
                </Form.Item>
              ) : (
                <Form.Item
                  name="customerEmailAddress"
                  label="Email Address"
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
                  label="Phone Number"
                  style={{ marginBottom: '2px' }}
                  rules={[
                    { required: true, message: 'Enter your phone number' },
                  ]}
                >
                  <Input placeholder="Enter phone number.." />
                </Form.Item>
              ) : (
                <Form.Item
                  name="customerPhoneNumber"
                  label="Phone Number"
                  style={{ marginBottom: '2px' }}
                >
                  <Input disabled />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item name="currency" label="Amount to Charge">
                <Input readOnly disabled />
              </Form.Item>
            </Col>
            {page.amount !== '' ? (
              <Col span={16}>
                <Form.Item name="amount" label="Amount" className="hide-label">
                  <Input readOnly disabled />
                </Form.Item>
              </Col>
            ) : (
              <Col span={16}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  className="hide-label"
                  rules={[{ required: true, message: 'Enter the amount' }]}
                >
                  <Input placeholder="Enter amount.." />
                </Form.Item>
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
                name="redirectURL"
                className="hide-label"
                hidden={true}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="transactionReference"
                className="hide-label"
                hidden={true}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button type="primary" htmlType="submit" disabled={isSubmit}>
              {!isSubmit ? (
                <React.Fragment>
                  <PayCircleOutlined /> Pay Now
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <LoadingOutlined /> Processing...
                </React.Fragment>
              )}
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
