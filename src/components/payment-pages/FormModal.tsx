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
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { PaymentPage } from '../../interfaces';
import { useTranslation } from 'react-i18next';

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
}

export const FormModal: React.FC<FormModalProps> = ({
  showFormModal,
  onToggleFormModal,
  beforeUpload,
  onChange,
  imageUrl,
  uploadButton,
  values,
  onSubmit,
  isSubmit,
}) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const { t } = useTranslation();

  return (
    <Modal
      title={t('paymentPages.formModal.title')}
      maskClosable={false}
      centered
      visible={showFormModal}
      onCancel={() => onToggleFormModal()}
      footer={[
        <Button type="default" key="cancel" onClick={() => onToggleFormModal()}>
          {t('paymentPages.formModal.close')}
        </Button>,
        <Button
          form="paymentPageForm"
          key="submit"
          htmlType="submit"
          type="primary"
          icon={isSubmit ? <LoadingOutlined /> : <PlusOutlined />}
          disabled={isSubmit ? true : false}
        >
          {t('paymentPages.formModal.btnText')}
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
              label={t('paymentPages.formModal.pageName')}
              rules={[
                {
                  required: true,
                  message: `${t('paymentPages.formModal.pageNameRequired')}`,
                },
              ]}
            >
              <Input
                placeholder={t('paymentPages.formModal.pageNamePlaceholder')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Description"
              label={t('paymentPages.formModal.description')}
              rules={[
                {
                  required: true,
                  message: `${t('paymentPages.formModal.descriptionRequired')}`,
                },
              ]}
            >
              <TextArea
                placeholder={t('paymentPages.formModal.descriptionPlaceholder')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={t('paymentPages.formModal.seoImage')}>
              <span>{t('paymentPages.formModal.seoImageDesc')}</span>
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
              <Checkbox>{t('paymentPages.formModal.collectName')}</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="Amount" label={t('paymentPages.formModal.amount')}>
              <Input
                placeholder={t('paymentPages.formModal.amountPlaceholder')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="PhoneNumber" label={null} valuePropName="checked">
              <Checkbox>{t('paymentPages.formModal.phone')}</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="EmailAddress" label={null} valuePropName="checked">
              <Checkbox>{t('paymentPages.formModal.email')}</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="Currency"
              label={t('paymentPages.formModal.currency')}
              rules={[
                {
                  required: true,
                  message: `${t('paymentPages.formModal.currencyRequired')}`,
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
              label={t('paymentPages.formModal.redirectUrl')}
              rules={[
                {
                  required: true,
                  message: `${t('paymentPages.formModal.redirectUrlReuired')}`,
                },
              ]}
            >
              <Input placeholder="http://redirect-link" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
