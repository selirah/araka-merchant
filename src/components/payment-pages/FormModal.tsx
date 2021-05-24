import React from 'react';
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Upload,
  Checkbox,
  Button,
  Select,
} from 'antd';
import { PaymentPage } from '../../interfaces';

interface FormModalProps {
  showFormModal: boolean;
  onToggleFormModal(): void;
  beforeUpload(file: File): boolean;
  onChange(info: any): void;
  imageUrl: any;
  uploadButton: React.ReactNode;
  values: PaymentPage;
  onSubmit(values: PaymentPage): void;
  isSubmit: boolean;
  translate: any;
}

const FormModal: React.FC<FormModalProps> = ({
  showFormModal,
  onToggleFormModal,
  beforeUpload,
  onChange,
  imageUrl,
  uploadButton,
  values,
  onSubmit,
  isSubmit,
  translate,
}) => {
  const { TextArea } = Input;
  const { Option } = Select;

  return (
    <Modal
      title={translate('general.title')}
      maskClosable={false}
      centered
      visible={showFormModal}
      onCancel={() => onToggleFormModal()}
      footer={[
        <Button
          type="default"
          key="cancel"
          onClick={() => onToggleFormModal()}
          className="new-cancel-btn"
        >
          {translate('general.close')}
        </Button>,
        <Button
          form="paymentPageForm"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={isSubmit}
          className="new-page-btn"
        >
          {translate('general.createPage')}
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        name="basic"
        initialValues={values}
        onFinish={onSubmit}
        id="paymentPageForm"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="PageName"
              label={translate('general.pageName')}
              rules={[
                {
                  required: true,
                  message: `${translate('general.pageNameRequired')}`,
                },
              ]}
            >
              <Input placeholder={translate('general.pageNamePlaceholder')} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Description"
              label={translate('general.description')}
              rules={[
                {
                  required: true,
                  message: `${translate('general.descriptionRequired')}`,
                },
              ]}
            >
              <TextArea
                placeholder={translate('general.descriptionPlaceholder')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={translate('general.seoImage')}>
              <span>{translate('general.seoImageDesc')}</span>
              <Upload
                name="Logo"
                listType="picture-card"
                className="seo-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChange}
              >
                {imageUrl !== '' ? (
                  <img src={imageUrl} alt="" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="CustomerName" label={null} valuePropName="checked">
              <Checkbox>{translate('general.collectName')}</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="Amount" label={translate('general.amount')}>
              <Input placeholder={translate('general.amountPlaceholder')} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="PhoneNumber" label={null} valuePropName="checked">
              <Checkbox>{translate('general.phone')}</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="EmailAddress" label={null} valuePropName="checked">
              <Checkbox>{translate('general.email')}</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="Currency"
              label={translate('general.currency')}
              rules={[
                {
                  required: true,
                  message: `${translate('general.currencyRequired')}`,
                },
              ]}
            >
              <Select>
                <Option value="USD">USD</Option>
                <Option value="CDF">CDF</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="RedirectUrl"
              label={translate('general.redirectUrl')}
              rules={[
                {
                  required: true,
                  message: `${translate('general.redirectUrlReuired')}`,
                },
              ]}
            >
              <Input placeholder="https://www.example.com" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormModal;
