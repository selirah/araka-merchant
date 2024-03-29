import React from 'react'
import { Row, Col, Form, Input, Button, Alert, Image } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Login } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'
import logo from '../../images/logo_symbol.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { path } from '../../helpers/path'

interface LoginFormProps {
  values: Login
  onSubmit(values: Login): void
  isSubmit: boolean
  error: any
  singleError: string
  resetSuccess: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({
  values,
  onSubmit,
  isSubmit,
  error,
  singleError,
  resetSuccess
}) => {
  const { t } = useTranslation()

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
        <Col className="pay-form-col" lg={6} md={6} sm={12} xs={24}>
          <h1 className="login-header">{t('login.box-header')}</h1>

          {!isEmpty(error) ? (
            <div style={{ marginBottom: 10 }}>
              <Alert type="error" message={`${JSON.stringify(error)}`} />
            </div>
          ) : null}
          {!isEmpty(singleError) ? (
            <div style={{ marginBottom: 10 }}>
              <Alert type="error" message={`${JSON.stringify(singleError)}`} />
            </div>
          ) : null}
          {resetSuccess ? (
            <div style={{ marginBottom: 10 }}>
              <Alert
                type="success"
                message="Your password has been reset successfully. Proceed to Login"
              />
            </div>
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
                  message: `${t('login.email-error')}`
                },
                {
                  type: 'email',
                  message: `${t('login.email-valid')}`
                }
              ]}
            >
              <Input placeholder={t('login.email-placeholder')} />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[
                { required: true, message: `${t('login.password-error')}` }
              ]}
            >
              <Input.Password placeholder={t('login.password-placeholder')} />
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
                  <Link to={path.forgottenPasssword}>
                    {t('login.forgot-password')}
                  </Link>
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
  )
}
