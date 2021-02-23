import React from 'react';
import { Row, Col, Input, Form, Checkbox, Button, Switch, Modal } from 'antd';
// import { Client } from '../../interfaces';

interface UserProfileProps {
  onUpdateProfile(values: any): void;
  isSubmitting: boolean;
  onChangePassword(values: any): void;
  isChangingPassword: boolean;
  user: any;
}

const UserProfile: React.FC<UserProfileProps> = ({
  onUpdateProfile,
  isSubmitting,
  isChangingPassword,
  onChangePassword,
  user,
}) => {
  const [form] = Form.useForm();
  const [showFormModal, setShowFormModal] = React.useState(false);

  const onToggleFormModal = () => {
    setShowFormModal(!showFormModal);
  };

  return (
    <>
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Col span={20} className="profile-box">
          <h3>Your Profile</h3>
          <Row>
            <Col span={24}>
              <Form
                form={form}
                name="update-form"
                onFinish={onUpdateProfile}
                scrollToFirstError
              >
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>Fullname</h4>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="firstName"
                      rules={[
                        { required: true, message: 'First name is required' },
                      ]}
                    >
                      <Input
                        placeholder="First name"
                        value={user ? user.firstName : null}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="lastName"
                      rules={[
                        { required: true, message: 'Last name is required' },
                      ]}
                    >
                      <Input
                        placeholder="Last name"
                        value={user ? user.lastName : null}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>Email</h4>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'First name is required' },
                        { type: 'email', message: 'Enter a valid email' },
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
                    <h4>Phone Number</h4>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        { required: true, message: 'Phone number is required' },
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
                    <h4>Technical Skill</h4>
                  </Col>
                  <Col span={12} className="tech-skill">
                    <Form.Item name="techinicalSkill" valuePropName="checked">
                      <Checkbox>I am a developer</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>Password</h4>
                  </Col>
                  <Col span={12} className="change-password-btn">
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => onToggleFormModal()}
                      >
                        Change Password
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={6} className="form-label">
                    <h4>Two-Factor Auth</h4>
                  </Col>
                  <Col span={12} className="switch-btn">
                    <Form.Item valuePropName="checked">
                      <Switch defaultChecked /> Enabled
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
                        {isSubmitting ? 'Saving..' : 'Save'}
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
        title="Change Password"
        maskClosable={false}
        centered
        visible={showFormModal}
        onCancel={() => onToggleFormModal()}
        footer={[
          <Button
            type="default"
            key="cancel"
            className="change-password-button"
            onClick={() => onToggleFormModal()}
          >
            Close
          </Button>,
          <Button
            form="change-password"
            key="submit"
            htmlType="submit"
            type="primary"
            className="change-password-button"
            loading={isChangingPassword}
          >
            {isChangingPassword ? 'Processing..' : 'Save New Password'}
          </Button>,
        ]}
      >
        <Form
          name="change-password"
          onFinish={onChangePassword}
          scrollToFirstError
        >
          <Form.Item
            name="OldPassword"
            rules={[{ required: true, message: 'Enter your old password' }]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>
          <Form.Item
            name="NewPassword"
            rules={[{ required: true, message: 'Enter your new password' }]}
            hasFeedback
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            dependencies={['NewPassword']}
            name="ConfirmPassword"
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('NewPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-type Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserProfile;
