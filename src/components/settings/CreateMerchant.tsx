import React from 'react';
import { Input, Row, Col, Button, Alert } from 'antd';
import CountryPhoneInput from 'antd-country-phone-input';
import 'antd-country-phone-input/dist/index.css';

interface Merchant {
  Name: string;
  PhoneNumber: {
    short: string;
    code: number;
    phone: string;
  };
  EmailAddress: string;
  Password: string;
  Confirm: string;
}

interface CreateMerchantProps {
  onSubmit(values: Merchant): void;
  isSubmitting: boolean;
  Form: any;
  form: any;
  errors: any;
  success: boolean;
  values: Merchant;
  translate: any;
}

const CreateMerchant: React.FC<CreateMerchantProps> = ({
  Form,
  errors,
  form,
  isSubmitting,
  onSubmit,
  success,
  values,
  translate,
}) => {
  const FormItem = Form.Item;
  return (
    <Row justify="center" align="middle">
      <Col span={20} md={20} sm={24} xs={24} className="profile-box">
        <h3>{translate('general.createMerchant')}</h3>

        <Row justify="center" align="middle">
          <Col span={8} className="form-container">
            <Form
              form={form}
              name="merchant-form"
              onFinish={onSubmit}
              initialValues={values}
              scrollToFirstError
            >
              {success ? (
                <div style={{ marginBottom: 20 }}>
                  <Alert
                    message="Merchant created successfully"
                    type="success"
                  />
                </div>
              ) : null}
              {errors ? (
                <div style={{ marginBottom: 20 }}>
                  <Alert message={JSON.stringify(errors)} type="error" />
                </div>
              ) : null}
              <FormItem
                hasFeedback
                name="Name"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input placeholder={translate('general.merchantFullname')} />
              </FormItem>
              <FormItem
                hasFeedback
                name="EmailAddress"
                rules={[
                  { required: true, message: 'This field is required' },
                  { type: 'email', message: 'Enter a valid email' },
                ]}
              >
                <Input placeholder={translate('general.merchantEmail')} />
              </FormItem>
              <FormItem hasFeedback name="PhoneNumber">
                <CountryPhoneInput
                  placeholder={translate('general.merchantPhone')}
                />
              </FormItem>
              <FormItem
                hasFeedback
                name="Password"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input.Password
                  placeholder={translate('general.merchantPassword')}
                />
              </FormItem>
              <FormItem
                hasFeedback
                name="Confirm"
                dependencies={['Password']}
                rules={[
                  { required: true, message: 'Please confirm password!' },
                  ({ getFieldValue }: any) => ({
                    validator(_: any, value: any) {
                      if (!value || getFieldValue('Password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder={translate('general.reTypePassword')}
                />
              </FormItem>

              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isSubmitting}
              >
                {translate('general.createMerchant')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CreateMerchant;
