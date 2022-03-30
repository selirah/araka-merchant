import React from 'react'
import { Row, Col, Form, Input, Button, Alert, Image } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { ForgottenPassword } from '../../interfaces'
import logo from '../../images/logo_symbol.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { path } from '../../helpers/path'

interface Props {
  values: ForgottenPassword
  onSubmit(values: ForgottenPassword): void
  isSubmit: boolean
  error: any
  success: boolean
  failure: boolean
}

const ForgottenPasswordForm: React.FC<Props> = (props) => {
  const { values, onSubmit, isSubmit, error, success, failure } = props
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
          <h1 className="login-header">{t('login.forgotten-header')}</h1>
          {success ? (
            <div style={{ marginBottom: 10 }}>
              <Alert
                type="success"
                message="An email has been sent to you for further instructions"
              />
            </div>
          ) : null}
          <div style={{ marginBottom: 10 }}>
            {failure ? (
              <Alert type="error" message={`${JSON.stringify(error)}`} />
            ) : null}
          </div>
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
            <Form.Item className="btn-input">
              <Button
                type="primary"
                className="login-btn"
                htmlType="submit"
                loading={isSubmit}
                icon={isSubmit ? <LoadingOutlined /> : null}
              >
                {!isSubmit
                  ? t('login.btn-text-forgotten')
                  : t('login.Please wait . .')}
              </Button>
              <Row className="login-forgot">
                <Col span={24}>
                  <Link to={path.login}>{t('login.return-to-login')}</Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ForgottenPasswordForm
