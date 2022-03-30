import React from 'react'
import { Row, Col, Form, Input, Button, Alert, Image } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { ResetPassword } from '../../interfaces'
import logo from '../../images/logo_symbol.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { path } from '../../helpers/path'

interface Props {
  values: ResetPassword
  onSubmit(values: ResetPassword): void
  isSubmit: boolean
  error: any
}

const ResetPasswordForm: React.FC<Props> = (props) => {
  const { values, onSubmit, isSubmit, error } = props
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
          {error ? (
            <div style={{ marginBottom: 10 }}>
              <Alert type="error" message={`${JSON.stringify(error)}`} />
            </div>
          ) : null}
          <Form
            layout="vertical"
            name="basic"
            initialValues={values}
            onFinish={onSubmit}
          >
            <Form.Item
              name="Password"
              rules={[{ required: true, message: 'Enter your new password' }]}
            >
              <Input.Password placeholder={t('login.password')} />
            </Form.Item>
            <Form.Item
              dependencies={['Password']}
              name="Confirm"
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm password!' },
                ({ getFieldValue }: any) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue('Password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    )
                  }
                })
              ]}
            >
              <Input.Password placeholder={t('general.reTypePassword')} />
            </Form.Item>
            <Form.Item name="ProcessId" className="hide-label" hidden={true}>
              <Input type="text" />
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
                  ? t('general.saveNewPassword')
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

export default ResetPasswordForm
