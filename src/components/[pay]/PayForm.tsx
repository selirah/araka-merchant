import React from 'react';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { Merchant } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { PayCircleOutlined, LoadingOutlined } from '@ant-design/icons';

interface PayFormProps {
  values: any;
  onSubmit(values: Merchant): void;
  isSubmit: boolean;
  error: any;
}

export const PayForm: React.FC<PayFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
}) => {
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
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                name="customerFullName"
                label="Full Name"
                style={{ marginBottom: '2px' }}
              >
                <Input readOnly disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="customerEmailAddress"
                label="Email Address"
                style={{ marginBottom: '2px' }}
              >
                <Input readOnly disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="customerPhoneNumber"
                label="Phone Number"
                style={{ marginBottom: '2px' }}
              >
                <Input readOnly disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item name="currency" label="Amount to Charge">
                <Input readOnly disabled />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name="amount" label="Amount" className="hide-label">
                <Input readOnly disabled />
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
