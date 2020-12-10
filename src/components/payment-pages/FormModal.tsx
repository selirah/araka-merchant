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
  return (
    <Modal
      title="New Payment Page"
      maskClosable={false}
      centered
      visible={showFormModal}
      footer={[
        <Button type="default" key="cancel" onClick={() => onToggleFormModal()}>
          Cancel
        </Button>,
        <Button
          form="paymentPageForm"
          key="submit"
          htmlType="submit"
          type="primary"
          icon={isSubmit ? <LoadingOutlined /> : <PlusOutlined />}
          disabled={isSubmit ? true : false}
        >
          Create Page
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
              label="Page name"
              rules={[{ required: true, message: 'Page title is required' }]}
            >
              <Input placeholder="Name of your page" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Description"
              label="Description"
              rules={[
                { required: true, message: 'Page description is required' },
              ]}
            >
              <TextArea placeholder="Page description with extra instructions" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="SEO Image (Optional)">
              <span>
                This image will show when the page is shared on social media. We
                recommend a 1024 x 512 pixel JPG or PNG, under 1 MB in size.
              </span>
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
              <Checkbox>Collect customer name</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="Amount"
              label="Amount (Leave empty if Amount is not fixed)"
            >
              <Input placeholder="Enter amount" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="PhoneNumber" label={null} valuePropName="checked">
              <Checkbox>Collect phone numbers on this page</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="EmailAddress" label={null} valuePropName="checked">
              <Checkbox>Collect email address on this page</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="Currency"
              label="Currency"
              rules={[{ required: true, message: 'Currency is required' }]}
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
              label="Redirect after payment"
              rules={[{ required: true, message: 'Enter a redirect url' }]}
            >
              <Input placeholder="http://redirect-link" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
