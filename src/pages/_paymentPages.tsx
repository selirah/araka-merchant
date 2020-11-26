import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Dropdown,
  Divider,
  Input,
  Button,
  message,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import { FilterMenu } from '../components/payment-pages/FilterMenu';
import { EmptyBox } from '../components/payment-pages/EmptyBox';
import { PaymentTypeModal } from '../components/payment-pages/PaymentTypeModal';
import { FormModal } from '../components/payment-pages/FormModal';

interface PaymentPagesProps {}

const PaymentPages: React.FC<PaymentPagesProps> = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [values, setValues] = useState([{ data: '' }]);

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  const addField = () => {
    setValues([...values, { data: '' }]);
  };

  const onTogglePaymentTypeModal = () => {
    setShowPaymentTypeModal(!showPaymentTypeModal);
  };

  const onToggleFormModal = () => {
    setShowFormModal(!showFormModal);
    setImageUrl(null);
    setValues([{ data: '' }]);
    setShowAdvancedOptions(false);
  };

  const choosePaymentPage = () => {
    onTogglePaymentTypeModal();
    onToggleFormModal();
  };

  const beforeUpload = (file: File): boolean => {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJPGOrPNG) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2;
    if (!isLessThan2MB) {
      message.error('Image must be smaller than 2MB!');
    }

    return isJPGOrPNG && isLessThan2MB;
  };

  const getBase64 = (img: File, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton: React.ReactNode = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Choose a file</div>
    </div>
  );

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row>
        <Col span={24}>
          <Dropdown overlay={<FilterMenu />}>
            <a
              href="/"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <FilterOutlined /> Filters
            </a>
          </Dropdown>
          <Divider type="vertical" />
          <Search
            placeholder="Search pages"
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
          <Button
            onClick={() => onTogglePaymentTypeModal()}
            type="primary"
            className="f-right"
            icon={<PlusOutlined />}
          >
            New Page
          </Button>
        </Col>
        <Divider />
        <Col span={24}>
          <EmptyBox
            header="Payment Pages"
            description="The easiest way to accept payments. Simply create a
            page, share the link to your customers and start
            accepting payments."
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          >
            <Button
              type="primary"
              onClick={() => onTogglePaymentTypeModal()}
              icon={<PlusOutlined />}
            >
              New Page
            </Button>
          </EmptyBox>
          <PaymentTypeModal
            choosePaymentPage={choosePaymentPage}
            onTogglePaymentTypeModal={onTogglePaymentTypeModal}
            showPaymentTypeModal={showPaymentTypeModal}
          />
          <FormModal
            onToggleFormModal={onToggleFormModal}
            showFormModal={showFormModal}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            imageUrl={imageUrl}
            uploadButton={uploadButton}
            showAdvancedOptions={showAdvancedOptions}
            toggleAdvancedOptions={toggleAdvancedOptions}
            values={values}
            addField={addField}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(PaymentPages);
