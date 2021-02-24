import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Layout, Row, Button, message, Spin } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { withRouter, useHistory } from 'react-router-dom';
import { PaymentPage, Page } from '../interfaces';
import {
  getPaymentPagesRequest,
  addPaymentPageRequest,
  clearStates,
  clearPaymentPages,
} from '../store/payment-pages';
import { isEmpty } from '../helpers/isEmpty';
import { path } from '../helpers/path';
import { useTranslation } from 'react-i18next';

const EmptyBox = lazy(() => import('../components/payment-pages/EmptyBox'));
const PaymentTypeModal = lazy(
  () => import('../components/payment-pages/PaymentTypeModal')
);
const FormModal = lazy(() => import('../components/payment-pages/FormModal'));
const FilterMenu = lazy(() => import('../components/payment-pages/FilterMenu'));
const Pages = lazy(() => import('../components/payment-pages/Pages'));

const PaymentPages = () => {
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
  const { t } = useTranslation();
  const history = useHistory();

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
      message.success(`${t('paymentPages.pageAddSuccess')}`, 5);
    }
    if (failure) {
      message.error(error, 5);
    }
  }, [page, t]);

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

  const onClickRow = (pageId: number) => {
    history.push(`${path.page}/${pageId}`);
  };

  const beforeUpload = (file: File): boolean => {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJPGOrPNG) {
      message.error(`${t('paymentPages.fileTypeError')}`);
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2;
    if (!isLessThan2MB) {
      message.error(`${t('paymentPages.fileSizeError')}`);
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

  const onPreviewClick = (processId: string) => {
    const { location } = window;
    const path = `${location.protocol}//${location.host}/payment/${processId}`;
    window.open(path, '_blank');
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin size="default" />
      </div>
    );
  }
  if (!loading && isEmpty(pages)) {
    render = (
      <EmptyBox
        header={t('paymentPages.paymentPage')}
        description={t('paymentPages.description')}
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      >
        <Button
          type="primary"
          onClick={() => onTogglePaymentTypeModal()}
          icon={<PlusOutlined />}
          className="empty-box-button"
        >
          {t('paymentPages.newPageText')}
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
        onClickRow={onClickRow}
        onPreviewClick={onPreviewClick}
      />
    );
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <FilterMenu />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Payment Pages</h4>
              <div className="utility-buttons">
                <Button
                  type="primary"
                  className="export-buttons"
                  onClick={() => onTogglePaymentTypeModal()}
                >
                  {t('paymentPages.newPageText')}
                </Button>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadPages()}
                >
                  {t('paymentPages.refresh')}
                </Button>
              </div>
            </Row>
          </div>
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
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(PaymentPages);
