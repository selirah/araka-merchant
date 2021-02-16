import React from 'react';
import { Row, Col, Form, Input, Button, Alert, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Login } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import logo from '../../images/logo_symbol.png';
import { Link } from 'react-router-dom';

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
    <React.Fragment>
      <Row className="login-row-first">
        <Col>
          <Image src={logo} width={150} alt="" />
        </Col>
      </Row>
      <Row className="login-row-second">
        <Col>
          <h4>Welcome to Araka Merchant Portal</h4>
        </Col>
      </Row>
      <Row className="login-row-third">
        <Col className="pay-form-col">
          <h1 className="login-header">Sign in to your account</h1>
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
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input placeholder="Your email" />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Your password" />
            </Form.Item>
            <Form.Item className="btn-input">
              <Button
                type="primary"
                className="login-btn"
                htmlType="submit"
                disabled={isSubmit}
              >
                {!isSubmit ? (
                  <React.Fragment>Sign In</React.Fragment>
                ) : (
                  <React.Fragment>
                    <LoadingOutlined /> Signing in..
                  </React.Fragment>
                )}
              </Button>
              <Row className="login-forgot">
                <Col span={24}>
                  <Link to="">Forgot Password?</Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row className="login-row-third">
        <Col>
          <h4>
            Don't have an account? <Link to="">Sign up</Link>
          </h4>
        </Col>
      </Row>
      <Row className="login-row-fourth">
        <div>
          <h4>
            <span>
              <Link to="">Terms of Use</Link>
            </span>
            <span>
              <Link to="">Compliance</Link>
            </span>
            <span>
              <Link to="">Support</Link>
            </span>
            <span>
              <Link to="">Contact</Link>
            </span>
          </h4>
        </div>
        <div>
          <h4>
            Copyright &copy; 2020-{new Date().getFullYear()} | Privacy Policy
          </h4>
        </div>
      </Row>
    </React.Fragment>
  );
};
