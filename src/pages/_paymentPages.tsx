import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Divider, Button, message, Spin, Space } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { withRouter } from 'react-router-dom';
import { EmptyBox } from '../components/payment-pages/EmptyBox';
import { PaymentTypeModal } from '../components/payment-pages/PaymentTypeModal';
import { FormModal } from '../components/payment-pages/FormModal';
import { PaymentPage, Page } from '../interfaces';
import {
  getPaymentPagesRequest,
  addPaymentPageRequest,
  clearStates,
  clearPaymentPages,
} from '../store/payment-pages';
import { isEmpty } from '../helpers/isEmpty';
import { Pages } from '../components/payment-pages/Pages';

interface PaymentPagesProps {}

const PaymentPages: React.FC<PaymentPagesProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const page = appSelector((state) => state.page);
  const { Content } = Layout;
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [values] = useState<PaymentPage>({
    Amount: '',
    Description: '',
    EmailAddress: true,
    Logo: '',
    PageName: '',
    PhoneNumber: true,
    RedirectUrl: '',
    Currency: 'USD',
    CustomerName: true,
    ProcessId: '',
    TransactionReference: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [processId, setProcessId] = useState('');

  useEffect(() => {
    const { pages, loading } = page;
    dispatch(clearStates());
    if (isEmpty(pages) && !loading) {
      dispatch(getPaymentPagesRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { pages, loading, isSubmitting, success, failure, error } = page;
    setPages(pages);
    setLoading(loading);
    setIsSubmit(isSubmitting);
    if (success) {
      message.success('Payment page has been added successfully', 5);
    }
    if (failure) {
      message.error(error, 5);
    }
  }, [page]);

  const reloadPages = () => {
    dispatch(clearPaymentPages());
    dispatch(getPaymentPagesRequest());
  };

  const onTogglePaymentTypeModal = () => {
    setShowPaymentTypeModal(!showPaymentTypeModal);
  };

  const onToggleFormModal = () => {
    setShowFormModal(!showFormModal);
    setImageUrl('');
    dispatch(clearStates());
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

  const handleChange = (info: any): void => {
    getBase64(info.file.originFileObj, (imageUrl: any) => {
      setImageUrl(imageUrl);
      setLoading(false);
    });
  };

  const uploadButton: React.ReactNode = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Choose a file</div>
    </div>
  );

  const onSubmit = (values: PaymentPage) => {
    const payload: PaymentPage = {
      Amount: values.Amount,
      Description: values.Description,
      EmailAddress: values.EmailAddress,
      Logo: imageUrl,
      PageName: values.PageName,
      PhoneNumber: values.PhoneNumber,
      RedirectUrl: values.RedirectUrl,
      Currency: values.Currency,
      CustomerName: values.CustomerName,
      ProcessId: '',
      TransactionReference: '',
    };
    dispatch(addPaymentPageRequest(payload));
  };

  const copyLink = (processId: string) => {
    if (typeof window !== 'undefined') {
      const { location } = window;
      const path = `${location.protocol}//${location.host}/payment/${processId}`;

      let board = document.createElement('textarea');
      document.body.appendChild(board);
      board.value = path;
      board.select();
      document.execCommand('copy');
      document.body.removeChild(board);
      setIsCopied(true);
      setProcessId(processId);
    }
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
  if (!loading && isEmpty(pages)) {
    render = (
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
    );
  }

  if (!loading && !isEmpty(pages)) {
    render = (
      <Pages
        pages={pages}
        copyLink={copyLink}
        isCopied={isCopied}
        processId={processId}
      />
    );
  }

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
          <Space className="f-right">
            <Button
              onClick={() => onTogglePaymentTypeModal()}
              type="primary"
              icon={<PlusOutlined />}
            >
              New Page
            </Button>
            <Button onClick={() => reloadPages()}>Refresh</Button>
          </Space>
        </Col>
        <Divider />
        <Col span={24}>
          {render}

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
            values={values}
            onSubmit={onSubmit}
            isSubmit={isSubmit}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(PaymentPages);
