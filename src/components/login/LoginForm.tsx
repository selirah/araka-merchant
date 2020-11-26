import React from 'react';
import { Row, Col, Form, Input, Checkbox, Button, Alert } from 'antd';
import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { Login } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';

interface LoginFormProps {
  values: Login;
  onSubmit(values: Login): void;
  isSubmit: boolean;
  error: any;
  singleError: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
  singleError,
}) => {
  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '150px',
      }}
    >
      <Col
        className="pay-form-col"
        style={{
          background: '#fbfbfb',
          padding: '1rem',
          borderRadius: '0.2rem',
        }}
      >
        <h1 style={{ color: '#1890ff', fontSize: '1.5rem', fontWeight: 300 }}>
          Login to Merchant Account
        </h1>
        {!isEmpty(error) ? (
          <Alert type="error" message={`${JSON.stringify(error)}`} />
        ) : null}
        {!isEmpty(singleError) ? (
          <Alert type="error" message={`${JSON.stringify(singleError)}`} />
        ) : null}
        <Form
          layout="vertical"
          name="basic"
          initialValues={values}
          onFinish={onSubmit}
        >
          <Form.Item
            name="EmailAddress"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder="Enter your email address.." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password.." />
          </Form.Item>
          <Form.Item name="RememberMe" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmit}>
              {!isSubmit ? (
                <React.Fragment>
                  <LoginOutlined /> Login
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <LoadingOutlined /> Logging in..
                </React.Fragment>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
