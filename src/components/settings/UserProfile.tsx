import React from 'react'
import { Row, Col, Input, Checkbox, Button, Switch, Modal } from 'antd'
// import { Client } from '../../interfaces';

interface UserProfileProps {
  onUpdateProfile(values: any): void
  isSubmitting: boolean
  onChangePassword(values: any): void
  isChangingPassword: boolean
  user: any
  translate: any
  showModal: boolean
  onToggleFormModal: () => void
  Form: any
  updateForm: any
  passwordForm: any
}

const UserProfile: React.FC<UserProfileProps> = ({
  onUpdateProfile,
  isSubmitting,
  isChangingPassword,
  onChangePassword,
  user,
  translate,
  showModal,
  onToggleFormModal,
  Form,
  passwordForm,
  updateForm
}) => {
  return (
    <>
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Col span={20} md={20} sm={24} xs={24} className="profile-box">
          <h3>{translate('general.yourProfile')}</h3>
          <Row>
            <Col span={24}>
              <Form
                form={updateForm}
                name="update-form"
                onFinish={onUpdateProfile}
                scrollToFirstError
              >
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>{translate('general.fullname')}</h4>
                  </Col>
                  <Col span={6} sm={8} xs={8}>
                    <Form.Item
                      name="firstName"
                      rules={[
                        { required: true, message: 'First name is required' }
                      ]}
                    >
                      <Input
                        placeholder={translate('general.firstName')}
                        value={user ? user.firstName : null}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6} sm={8} xs={8}>
                    <Form.Item
                      name="lastName"
                      rules={[
                        { required: true, message: 'Last name is required' }
                      ]}
                    >
                      <Input
                        placeholder={translate('general.lastName')}
                        value={user ? user.lastName : null}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>{translate('login.email')}</h4>
                  </Col>
                  <Col span={12} sm={16} xs={16}>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'First name is required' },
                        { type: 'email', message: 'Enter a valid email' }
                      ]}
                    >
                      <Input
                        placeholder="email@example.com"
                        value={user ? user.email : null}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>{translate('general.phoneNumber')}</h4>
                  </Col>
                  <Col span={12} sm={16} xs={16}>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        { required: true, message: 'Phone number is required' }
                      ]}
                    >
                      <Input
                        placeholder="+243XXXXXXXXX"
                        value={user ? user.phoneNumber : null}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>{translate('general.technicalSkill')}</h4>
                  </Col>
                  <Col span={12} className="tech-skill" sm={16} xs={16}>
                    <Form.Item name="techinicalSkill" valuePropName="checked">
                      <Checkbox>{translate('general.developer')}</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>{translate('general.password')}</h4>
                  </Col>
                  <Col span={12} className="change-password-btn">
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => onToggleFormModal()}
                      >
                        {translate('general.password')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>{translate('general.twoFactor')}</h4>
                  </Col>
                  <Col span={12} className="switch-btn">
                    <Form.Item valuePropName="checked">
                      <Switch defaultChecked /> {translate('general.enabled')}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="form-submit-btn">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={isSubmitting}
                      >
                        {translate('general.save')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title={translate('general.password')}
        maskClosable={false}
        centered
        visible={showModal}
        onCancel={() => onToggleFormModal()}
        footer={[
          <Button
            type="default"
            key="cancel"
            className="change-password-button"
            onClick={() => onToggleFormModal()}
          >
            {translate('general.close')}
          </Button>,
          <Button
            form="change-password"
            key="submit"
            htmlType="submit"
            type="primary"
            className="change-password-button"
            loading={isChangingPassword}
          >
            {translate('general.saveNewPassword')}
          </Button>
        ]}
      >
        <Form
          name="change-password"
          onFinish={onChangePassword}
          scrollToFirstError
          form={passwordForm}
        >
          <Form.Item
            name="OldPassword"
            rules={[{ required: true, message: 'Enter your old password' }]}
          >
            <Input.Password placeholder={translate('general.oldPassword')} />
          </Form.Item>
          <Form.Item
            name="NewPassword"
            rules={[{ required: true, message: 'Enter your new password' }]}
            hasFeedback
          >
            <Input.Password placeholder={translate('general.newPassword')} />
          </Form.Item>
          <Form.Item
            dependencies={['NewPassword']}
            name="ConfirmPassword"
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm password!' },
              ({ getFieldValue }: any) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue('NewPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  )
                }
              })
            ]}
          >
            <Input.Password placeholder={translate('general.reTypePassword')} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserProfile
