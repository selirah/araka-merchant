import React, { useState, useEffect } from 'react';
import { withRouter, useParams, useLocation } from 'react-router-dom';
import { Layout, Row, Col, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { appSelector } from '../helpers/appSelector';
import { PayForm } from '../components/[pay]/PayForm';
import visa from '../images/visa.png';
import mastercard from '../images/master-card.png';
import { Merchant, Error } from '../interfaces';
import { paymentRequest, clearPaymentData } from '../store/home';

interface PayProps {}

interface ParamProps {
  processId: string;
}

const Pay: React.FC<PayProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { Content } = Layout;
  const { processId } = useParams<ParamProps>();
  const home = appSelector((state) => state.home);
  const query = new URLSearchParams(useLocation().search);

  const [values] = useState({
    pageTitle: query.get('pageTitle') !== null ? query.get('pageTitle') : '',
    pageLogo: query.get('pageLogo') !== null ? query.get('pageLogo') : '',
    pageDescription:
      query.get('pageDescription') !== null ? query.get('pageDescription') : '',
    customerFullName:
      query.get('customerFullName') !== null
        ? query.get('customerFullName')
        : '',
    customerPhoneNumber:
      query.get('customerPhoneNumber') !== null
        ? query.get('customerPhoneNumber')
        : '',
    customerEmailAddress:
      query.get('customerEmailAddress') !== null
        ? query.get('customerEmailAddress')
        : '',
    transactionReference:
      query.get('transactionReference') !== null
        ? query.get('transactionReference')
        : '',
    currency: query.get('currency') !== null ? query.get('currency') : '',
    amount: query.get('amount') !== null ? query.get('amount') : '',
    redirectURL:
      query.get('redirectURL') !== null ? query.get('redirectURL') : '',
    processId: processId,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorData, setErrorData] = useState<Error | {}>({});

  const onSubmit = (v: Merchant) => {
    v.processId = values.processId;
    v.pageTitle = values.pageTitle !== null ? values.pageTitle : '';
    v.pageDescription =
      values.pageDescription !== null ? values.pageDescription : '';
    v.pageLogo = values.pageLogo !== null ? values.pageLogo : '';
    v.redirectURL = values.redirectURL !== null ? values.redirectURL : '';
    v.transactionReference =
      values.transactionReference !== null ? values.transactionReference : '';
    dispatch(paymentRequest(v));
  };

  useEffect(() => {
    const {
      isPaymentFailure,
      isPaymentSuccess,
      isSubmitting,
      orderResponse,
      error,
    } = home;
    setIsSubmit(isSubmitting);
    if (isPaymentSuccess && orderResponse !== undefined) {
      const { orderURL } = orderResponse.order;
      dispatch(clearPaymentData());
      window.location.href = orderURL;
    }
    if (isPaymentFailure && error !== undefined) {
      setErrorData(error);
    }
  }, [home, dispatch]);

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
          <Col span={24}>
            <div className="pay-details">
              <Image
                width={100}
                src={
                  values.pageLogo !== null
                    ? values.pageLogo
                    : 'https://via.placeholder.com/150'
                }
              />
              <h2>{values.pageTitle}</h2>
              {/* <h4>BY MERCHANT COMPANY NAME</h4> */}
              <p>{values.pageDescription}</p>
            </div>
          </Col>
        </Row>
        <PayForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={errorData}
        />
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
      </Content>
    </Layout>
  );
};

export default withRouter(Pay);
