<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useParams, withRouter, useLocation } from 'react-router-dom'
import {
  Layout,
  Row,
  Col,
  Image,
  Avatar,
  Spin,
  Empty,
  /*message,*/
  Button,
  Modal,
  notification
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { PaymentForm } from '../components/[genericPay]/PaymentForm'
import visa from '../images/visa.png'
import mastercard from '../images/master-card.png'
import creditDebitCards from '../images/logos/visa-master-card.jpg'
import mobileWallets from '../images/logos/mobile-wallets.jpg'
import { Merchant, Error, Page, Fee } from '../interfaces'
import {
  paymentRequest,
  clearPaymentData,
  mobilePaymentRequest,
  checkMobileStatusRequest
} from '../store/home'
import {
  paymentPageRequest,
=======
import React, { useState, useEffect } from 'react';
import { useParams, withRouter, useLocation } from 'react-router-dom';
import { Layout, Row, Col, Image, Avatar, Spin, Empty, message, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { appSelector } from '../helpers/appSelector';
import { PaymentForm } from '../components/[genericPay]/PaymentForm';
import visa from '../images/visa.png';
import mastercard from '../images/master-card.png';
import creditDebitCards from '../images/logos/visa-master-card.jpg';
import mobileWallets from '../images/logos/mobile-wallets.jpg';
import { Merchant, Error, Page, Fee } from '../interfaces';
import { paymentRequest, clearPaymentData } from '../store/home';
import {
  paymentPageRequest,
  mobilePaymentRequest,
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
  getProvidersRequest,
  clearStates,
  postFeeRequest,
  clearFee
} from '../store/payment-pages'
import { isEmpty } from '../helpers/isEmpty'
import { useTranslation } from 'react-i18next'

interface GenericPayProps {}

interface ParamProps {
  processId: string
}

const GenericPay: React.FC<GenericPayProps> = () => {
<<<<<<< HEAD
  const dispatch: AppDispatch = useDispatch()
  const { Content } = Layout
  const { processId } = useParams<ParamProps>()
  const home = appSelector((state) => state.home)
  const page = appSelector((state) => state.page)
  const [singlePage, setSinglePage] = useState<Page | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isMomoSubmit, setIsMomoSubmit] = useState(false)
  const [isShowOptions, setIsShowOptions] = useState(true)
  const [isPayWithCard, setIsPayWithCard] = useState(false)
  const [isPayWithMomo, setIsPayWithMomo] = useState(false)
  const [momoProviders, setMomoProviders] = useState<any>([])
  const [errorData, setErrorData] = useState<Error | {}>({})
  const query = new URLSearchParams(useLocation().search)
  const transactionStatus = query.get('transactionStatus')
  const [fee, setFee] = useState<Fee | undefined>(undefined)
  const { t } = useTranslation()
  const [counter, setCounter] = useState(1)
  const [isMobilePaymentSuccess, setIsMobilePaymentSuccess] = useState(false)
  const urlAmount = query.get('amount')

  useEffect(() => {
    dispatch(clearStates())
    dispatch(clearPaymentData())
    dispatch(clearFee())
    dispatch(paymentPageRequest(processId))
    dispatch(getProvidersRequest())
=======
  const dispatch: AppDispatch = useDispatch();
  const { Content } = Layout;
  const { processId } = useParams<ParamProps>();
  const home = appSelector((state) => state.home);
  const page = appSelector((state) => state.page);
  const [singlePage, setSinglePage] = useState<Page | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowOptions, setIsShowOptions] = useState(true);
  const [isPayWithCard, setIsPayWithCard] = useState(false);
  const [isPayWithMomo, setIsPayWithMomo] = useState(false);
  const [momoProviders, setMomoProviders] = useState([]);
  const [errorData, setErrorData] = useState<Error | {}>({});
  const query = new URLSearchParams(useLocation().search);
  const transactionStatus = query.get('transactionStatus');
  const [fee, setFee] = useState<Fee | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(clearStates());
    dispatch(clearPaymentData());
    dispatch(clearFee());
    dispatch(paymentPageRequest(processId));
    dispatch(getProvidersRequest());
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
    if (!isEmpty(transactionStatus)) {
      switch (transactionStatus) {
        case 'PENDING':
          // message.info('Transaction Pending', 5)
          notification['info']({
            message: 'Oops',
            description: 'Transaction is Pending'
          })
          break
        case 'SUCCESS':
          // message.success('Transaction was successful', 5)
          notification['success']({
            message: 'Nice!',
            description: 'Transaction was successful'
          })
          break
        case 'FAILED':
          // message.error('Transaction has failed', 5)
          notification['error']({
            message: 'Oops',
            description: 'Transaction has failed'
          })
          break
        case 'DECLINED':
          // message.error('Transaction was declined ', 5)
          notification['error']({
            message: 'Oops',
            description: 'Transaction was declined'
          })
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
<<<<<<< HEAD
    const { singlePage, loading, fee, providers } = page
=======
    const { singlePage, loading, fee, providers } = page;
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
    const {
      isPaymentFailure,
      isPaymentSuccess,
      isSubmitting,
      orderResponse,
      error,
      mobilePaymentSubmit,
      mobilePaymentSuccess,
      trxStatus,
      mobileResponse
    } = home
    setSinglePage(singlePage)
    setLoading(loading)
    setIsSubmit(isSubmitting)
    setIsMomoSubmit(mobilePaymentSubmit)
    setIsMobilePaymentSuccess(mobilePaymentSuccess)
    if (isPaymentSuccess && orderResponse !== undefined) {
      const { orderURL } = orderResponse.order
      dispatch(clearPaymentData())
      window.location.href = orderURL
    }
    if (isPaymentFailure && error !== undefined) {
      setErrorData(error)
    }
<<<<<<< HEAD
    if (mobilePaymentSuccess && !isEmpty(mobileResponse)) {
      if (counter <= 3) {
        setInterval(() => {
          dispatch(checkMobileStatusRequest(mobileResponse.transactionId))
          setCounter(counter + 1)
        }, 10000)
      } else {
        if (singlePage) {
          window.location.href = `${singlePage.redirectURL}?systemReference=${mobileResponse.transactionId}&transactionStatus=${trxStatus.status}`
          dispatch(clearPaymentData())
        }
      }
    }

    if (!isEmpty(trxStatus) && mobilePaymentSuccess) {
      switch (trxStatus.status) {
        case 'SUCCESS':
          if (singlePage) {
            window.location.href = `${singlePage.redirectURL}?systemReference=${mobileResponse.transactionId}&transactionStatus=${trxStatus.status}`
            dispatch(clearPaymentData())
          }
          break
        case 'FAILED':
          if (singlePage) {
            window.location.href = `${singlePage.redirectURL}?systemReference=${mobileResponse.transactionId}&transactionStatus=${trxStatus.status}`
            dispatch(clearPaymentData())
          }
          break
      }
    }
    // if (singlePage !== undefined && fee === undefined) {
    //   if (singlePage.amount !== '') {
    //     const payload = {
    //       data: {
    //         Amount: singlePage.amount,
    //         processId: singlePage.processId,
    //       },
    //     };
    //   }
    // }
    setFee(fee)
    setMomoProviders(providers)
  }, [page, home, dispatch, counter])

  const onSubmit = (values: Merchant) => {
    if (isPayWithCard) {
      dispatch(paymentRequest(values))
    }
    if (isPayWithMomo) {
=======
    if (singlePage !== undefined && fee === undefined) {
      if (singlePage.amount !== '') {
        const payload = {
          data: {
            Amount: singlePage.amount,
            processId: singlePage.processId,
          },
        };
      }
    }
    setFee(fee);
    setMomoProviders(providers)
  }, [page, home, dispatch]);

  const onSubmit = (values: Merchant) => {
    if (isPayWithCard) {
      dispatch(paymentRequest(values));
    }
    if (isPayWithMomo) {
      console.log("Pay with MOmo")
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
      const PaymentInfo = {
        Channel: 'MOBILEWALLET',
        Provider: values.momoProvider,
        WalletID: values.momoAccountNumber
      }
<<<<<<< HEAD

      values.paymentInfo = PaymentInfo
      dispatch(mobilePaymentRequest(values))
    }
  }
=======
      
      values.paymentInfo = PaymentInfo;
      dispatch(mobilePaymentRequest(values));
    }
  };
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04

  const onCalculateFee = (e: React.FormEvent<EventTarget>) => {
    const { value } = e.target as HTMLTextAreaElement
    const payload = {
      data: {
        Amount: value,
        processId: singlePage!.processId
      }
    }
    dispatch(postFeeRequest(payload))
  }

  let initials: string[] = []
  let name = ''
  if (singlePage !== undefined) {
    initials = singlePage.pageName.match(/\b\w/g) || []
    name = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

<<<<<<< HEAD
  let render: React.ReactNode,
    form: React.ReactNode,
    methodsMoMo: React.ReactNode,
    methodsCard: React.ReactNode,
    paymentOptions: React.ReactNode
=======
  let render: React.ReactNode, form: React.ReactNode, methodsMoMo: React.ReactNode,
  methodsCard: React.ReactNode, paymentOptions: React.ReactNode;
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
  if (loading) {
    render = (
      <div className="spinner" style={{ marginTop: '15rem' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!loading && singlePage === undefined) {
    render = (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description="This page does not exist"
        imageStyle={{
          height: 100
        }}
        style={{ marginTop: '20rem' }}
      />
    )
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
                verticalAlign: 'middle'
              }}
            >
              {name}
            </Avatar>
          )}
          <h2>{singlePage.pageName}</h2>
          <p>{singlePage.description}</p>
        </div>
      </Col>
    )
    form = (
      <Row>
        <Col span={24} className="text-center">
<<<<<<< HEAD
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              setIsPayWithMomo(false)
              setIsPayWithCard(false)
              setIsShowOptions(true)
            }}
          >
            Select another payment option
          </Button>
=======
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => { setIsPayWithMomo(false); setIsPayWithCard(false); setIsShowOptions(true); }}>Select another payment option</Button>
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
        </Col>
        <Col span={24}>
          <PaymentForm
            page={singlePage}
<<<<<<< HEAD
            isSubmit={isPayWithCard ? isSubmit : isMomoSubmit}
=======
            isSubmit={isSubmit}
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
            error={errorData}
            onSubmit={onSubmit}
            fee={fee}
            onCalculateFee={onCalculateFee}
            translate={t}
            momoProviders={momoProviders}
            isDefault={isPayWithCard ? true : false}
<<<<<<< HEAD
            urlAmount={urlAmount}
          />
        </Col>
      </Row>
    )
=======
          />
        </Col>
      </Row>
    );
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
    methodsMoMo = (
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
<<<<<<< HEAD
          marginTop: '10px'
=======
          marginTop: '10px',
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
        }}
      >
        <div className="pay-logos">
          <Image width={300} src={mobileWallets} />
        </div>
      </Row>
<<<<<<< HEAD
    )
=======
    );
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
    methodsCard = (
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '50px'
        }}
      >
        <div className="pay-logos">
          <Image width={80} src={visa} />
          <Image width={80} src={mastercard} />
        </div>
      </Row>
<<<<<<< HEAD
    )
    paymentOptions = (
      <Row
        gutter={24}
=======
    );
    paymentOptions = (
      <Row gutter={24}
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '50px auto',
          maxWidth: '740px',
          textAlign: 'center'
        }}
      >
        <Col span={12} xs={24} sm={12}>
<<<<<<< HEAD
          <div
            className={`selectable-item`}
            onClick={() => {
              setIsPayWithCard(true)
              setIsShowOptions(false)
            }}
          >
            <img
              src={creditDebitCards}
              width={100}
              alt="Pay with credit or debit card"
            />
=======
          <div className={`selectable-item`} onClick={() => {setIsPayWithCard(true); setIsShowOptions(false);}}>
            <img src={creditDebitCards} width={100} alt="Pay with credit or debit card" />
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
            <h2>Pay with Credit/Debit Card</h2>
          </div>
        </Col>
        <Col span={12} xs={24} sm={12}>
<<<<<<< HEAD
          <div
            className={`selectable-item`}
            onClick={() => {
              setIsPayWithMomo(true)
              setIsShowOptions(false)
            }}
          >
=======
          <div className={`selectable-item`} onClick={() => {setIsPayWithMomo(true); setIsShowOptions(false);}}>
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
            <img src={mobileWallets} width={100} alt="Pay with mobile wallet" />
            <h2>Pay with Mobile Wallets</h2>
          </div>
        </Col>
      </Row>
<<<<<<< HEAD
    )
=======
    );
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
  }

  return (
    <Layout>
      <Content style={{ background: '#fff' }}>
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          {render}
        </Row>
        {isShowOptions ? paymentOptions : null}
        {isPayWithCard || isPayWithMomo ? form : null}
<<<<<<< HEAD
        {isPayWithCard || isPayWithMomo
          ? isPayWithCard
            ? methodsCard
            : methodsMoMo
          : null}
=======
        {isPayWithCard || isPayWithMomo ? (isPayWithCard ? methodsCard : methodsMoMo) : null}
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
      </Content>
      <Modal
        title="Mobile Money Payment"
        maskClosable={false}
        centered
        visible={isMobilePaymentSuccess}
        width={400}
        footer={null}
        closable={false}
      >
        <Row style={{ display: 'block', margin: '0 auto' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Spin />
            <h4>Complete the payment on your phone. We are waiting...</h4>
          </Col>
        </Row>
      </Modal>
    </Layout>
  )
}

export default withRouter(GenericPay)
