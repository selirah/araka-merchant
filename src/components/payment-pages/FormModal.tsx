import React from 'react';
import { Modal, Form, Row, Col, Input, Upload, Checkbox, Button } from 'antd';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  PlusOutlined,
} from '@ant-design/icons';

interface FormModalProps {
  showFormModal: boolean;
  onToggleFormModal(): void;
  beforeUpload(file: File): boolean;
  onChange(info: any): void;
  imageUrl: any;
  uploadButton: React.ReactNode;
  showAdvancedOptions: boolean;
  toggleAdvancedOptions(): void;
  values: any;
  addField(): void;
}

export const FormModal: React.FC<FormModalProps> = ({
  showFormModal,
  onToggleFormModal,
  beforeUpload,
  onChange,
  imageUrl,
  uploadButton,
  showAdvancedOptions,
  toggleAdvancedOptions,
  values,
  addField,
}) => {
  const { TextArea } = Input;

  const advancedOptions: React.ReactNode = (
    <Col span={24}>
      <Form.Item name="customLink" label="Use your custom link">
        <Input addonBefore="https://araka.com/pay/" placeholder="[your-url]" />
      </Form.Item>
      <Form.Item name="redirectLink" label="Redirect after payment">
        <Input placeholder="http://redirect-link" />
      </Form.Item>
      <Form.Item name="successMessage" label="Success Message">
        <Input placeholder="Message to show after payment" />
      </Form.Item>
      <Form.Item name="emailAddress" label="Send Notifications To">
        <p style={{ fontSize: '12px', color: '#d9d9d9' }}>
          If provided, this email address will get transaction notices
        </p>
        <Input placeholder="Email address" />
      </Form.Item>
      <p style={{ fontWeight: 'bold', fontSize: '14px' }}>
        Do you want to collect any extra information?
      </p>
      {values.map((item: any, i: number) => {
        return (
          <Form.Item name="customLink" label={null} key={i}>
            <Input
              addonBefore="Name of field"
              placeholder="e.g ID Number"
              value={item.data}
            />
          </Form.Item>
        );
      })}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 'normal',
          color: '#1890ff',
          cursor: 'pointer',
        }}
        onClick={() => addField()}
      >
        <PlusOutlined /> Add another field
      </p>
    </Col>
  );

  return (
    <Modal
      title="New Payment Page"
      maskClosable={false}
      centered
      visible={showFormModal}
      okText="Create"
      onOk={() => onToggleFormModal()}
      onCancel={() => onToggleFormModal()}
    >
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              name="pagename"
              label="Page name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Name of your page" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Page description with extra instructions" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="seoimage" label="SEO Image (Optional)">
              <span>
                This image will show when the page is shared on social media. We
                recommend a 1024 x 512 pixel JPG or PNG, under 1 MB in size.
              </span>
              <Upload
                name="seo"
                listType="picture-card"
                className="seo-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={onChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="fixedPayment" label={null}>
              <Checkbox checked>
                I want a fixed payment amount on this page
              </Checkbox>
            </Form.Item>
            <Form.Item name="collectPhoneNumbers" label={null}>
              <Checkbox checked>Collect phone numbers on this page</Checkbox>
            </Form.Item>
          </Col>
          <Col span={24}>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => toggleAdvancedOptions()}>
                {showAdvancedOptions ? (
                  <React.Fragment>
                    <CaretUpOutlined /> Hide advanced options
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <CaretDownOutlined /> Show advanced options
                  </React.Fragment>
                )}
              </Button>
            </div>
          </Col>
          {showAdvancedOptions ? advancedOptions : null}
        </Row>
      </Form>
    </Modal>
  );
};
