import React from 'react';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { LoadingOutlined, LoginOutlined } from '@ant-design/icons';
import { Login } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';

interface LoginFormProps {
  values: Login;
  onSubmit(values: Login): void;
  isSubmit: boolean;
  error: any;
  singleError: string;
  onHandleRecaptcha(value: any): void;
}

const SITE_KEY = '6Lf00SUaAAAAAJbCW3lrIe7duzL0-FuOvNfsk2jY';

export const LoginForm: React.FC<LoginFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
  singleError,
  onHandleRecaptcha,
}) => {
  const { t } = useTranslation();
  const ref = React.createRef<ReCAPTCHA>();

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
          {t('login.box-header')}
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
            label={t('login.email')}
            rules={[
              {
                required: true,
                type: 'email',
                message: `${t('login.email-error')}`,
              },
            ]}
          >
            <Input placeholder={t('login.email-placeholder')} />
          </Form.Item>
          <Form.Item
            label={t('login.password')}
            name="Password"
            rules={[
              { required: true, message: `${t('login.password-error')}` },
            ]}
          >
            <Input.Password placeholder={t('login.password-placeholder')} />
          </Form.Item>
          <Form.Item>
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={onHandleRecaptcha}
              ref={ref}
              theme="light"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmit}>
              {!isSubmit ? (
                <React.Fragment>
                  <LoginOutlined /> {t('login.btn-text')}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <LoadingOutlined /> {t('login.btn-loading')}
                </React.Fragment>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
