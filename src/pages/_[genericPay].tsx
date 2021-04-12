import React, { useState, useEffect } from 'react';
import { useParams, withRouter, useLocation } from 'react-router-dom';
import { Layout, Row, Col, Image, Avatar, Spin, Empty, message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { appSelector } from '../helpers/appSelector';
import { PaymentForm } from '../components/[genericPay]/PaymentForm';
import visa from '../images/visa.png';
import mastercard from '../images/master-card.png';
import { Merchant, Error, Page, Fee } from '../interfaces';
import { paymentRequest, clearPaymentData } from '../store/home';
import {
  paymentPageRequest,
  clearStates,
  postFeeRequest,
  clearFee,
} from '../store/payment-pages';
import { isEmpty } from '../helpers/isEmpty';

interface GenericPayProps {}

interface ParamProps {
  processId: string;
}

const GenericPay: React.FC<GenericPayProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { Content } = Layout;
  const { processId } = useParams<ParamProps>();
  const home = appSelector((state) => state.home);
  const page = appSelector((state) => state.page);
  const [singlePage, setSinglePage] = useState<Page | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorData, setErrorData] = useState<Error | {}>({});
  const query = new URLSearchParams(useLocation().search);
  const transactionStatus = query.get('transactionStatus');
  const [fee, setFee] = useState<Fee | undefined>(undefined);

  useEffect(() => {
    dispatch(clearStates());
    dispatch(clearPaymentData());
    dispatch(clearFee());
    dispatch(paymentPageRequest(processId));
    if (!isEmpty(transactionStatus)) {
      switch (transactionStatus) {
        case 'SUCCESS':
          message.success('Transaction Successful', 5);
          break;
        case 'FAILED':
          message.error('Transaction Failed', 5);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { singlePage, loading, fee } = page;
    const {
      isPaymentFailure,
      isPaymentSuccess,
      isSubmitting,
      orderResponse,
      error,
    } = home;
    setSinglePage(singlePage);
    setLoading(loading);
    setIsSubmit(isSubmitting);
    if (isPaymentSuccess && orderResponse !== undefined) {
      const { orderURL } = orderResponse.order;
      dispatch(clearPaymentData());
      window.location.href = orderURL;
    }
    if (isPaymentFailure && error !== undefined) {
      setErrorData(error);
    }
    if (singlePage !== undefined && fee === undefined) {
      if (singlePage.amount !== '') {
        const payload = {
          data: {
            Amount: singlePage.amount,
            processId: singlePage.processId,
          },
        };
        dispatch(postFeeRequest(payload));
      }
    }
    setFee(fee);
  }, [page, home, dispatch]);

  const onSubmit = (values: Merchant) => {
    dispatch(paymentRequest(values));
  };

  const onCalculateFee = (e: React.FormEvent<EventTarget>) => {
    const { value } = e.target as HTMLTextAreaElement;
    const payload = {
      data: {
        Amount: value,
        processId: singlePage!.processId,
      },
    };
    dispatch(postFeeRequest(payload));
  };

  let initials: string[] = [];
  let name = '';
  if (singlePage !== undefined) {
    initials = singlePage.pageName.match(/\b\w/g) || [];
    name = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  let render: React.ReactNode, form: React.ReactNode, methods: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner" style={{ marginTop: '15rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!loading && singlePage === undefined) {
    render = (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description="This page does not exist"
        imageStyle={{
          height: 100,
        }}
        style={{ marginTop: '20rem' }}
      />
    );
  }

  if (!loading && singlePage !== undefined) {
    render = (
      <Col span={24}>
        <div className="pay-details">
          {singlePage !== undefined && singlePage.logo !== '' ? (
            <Avatar size={100} src={singlePage.logo} />
          ) : (
            <Avatar
              size={100}
              style={{
                backgroundColor: '#1890ff',
                verticalAlign: 'middle',
              }}
            >
              {name}
            </Avatar>
          )}
          <h2>{singlePage.pageName}</h2>
          <p>{singlePage.description}</p>
        </div>
      </Col>
    );
    form = (
      <PaymentForm
        page={singlePage}
        isSubmit={isSubmit}
        error={errorData}
        onSubmit={onSubmit}
        fee={fee}
        onCalculateFee={onCalculateFee}
      />
    );
    methods = (
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <div className="pay-logos">
          <Image width={80} src={visa} />
          <Image width={80} src={mastercard} />
        </div>
      </Row>
    );
  }

  return (
    <Layout>
      <Content style={{ background: '#fff' }}>
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          {render}
        </Row>
        {form}
        {methods}
      </Content>
    </Layout>
  );
};

export default withRouter(GenericPay);
