import React from 'react';
import { Row, Col, Form, Input, Button, Alert, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Login } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import logo from '../../images/logo_symbol.png';
import { Link } from 'react-router-dom';
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
    <React.Fragment>
      <Row className="login-row-first">
        <Col>
          <Image src={logo} width={150} alt="" preview={false} />
        </Col>
      </Row>
      <Row className="login-row-second">
        <Col>
          <h4>{t('login.header')}</h4>
        </Col>
      </Row>
      <Row className="login-row-third">
        <Col className="pay-form-col">
          <h1 className="login-header">{t('login.box-header')}</h1>
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
                  message: `${t('login.email-error')}`,
                },
                {
                  type: 'email',
                  message: `${t('login.email-valid')}`,
                },
              ]}
            >
              <Input placeholder={t('login.email-placeholder')} />
            </Form.Item>
            <Form.Item
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
            <Form.Item className="btn-input">
              <Button
                type="primary"
                className="login-btn"
                htmlType="submit"
                loading={isSubmit}
                icon={isSubmit ? <LoadingOutlined /> : null}
              >
                {!isSubmit ? t('login.btn-text') : t('login.btn-loading')}
              </Button>
              <Row className="login-forgot">
                <Col span={24}>
                  <Link to="">{t('login.forgot-password')}</Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row className="login-row-third">
        <Col>
          <h4>
            {t('login.no-account')}{' '}
            <a
              href="https://www.arakapay.com/auth/register"
              target="_blank"
              rel="noreferrer"
            >
              {t('login.sign-up')}
            </a>
          </h4>
        </Col>
      </Row>
      <Row className="login-row-fourth">
        <div>
          <h4>
            <span>
              <Link to="">{t('login.terms')}</Link>
            </span>
            <span>
              <Link to="">{t('login.compliance')}</Link>
            </span>
            <span>
              <Link to="">{t('login.support')}</Link>
            </span>
            <span>
              <Link to="">{t('login.contact')}</Link>
            </span>
          </h4>
        </div>
        <div>
          <h4>
            Copyright &copy; 2020-{new Date().getFullYear()} |{' '}
            {t('login.privacy')}
          </h4>
        </div>
      </Row>
    </React.Fragment>
  );
};
