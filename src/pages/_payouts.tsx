import React, { lazy, Suspense, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import {
  PayoutReport,
  PayoutNewRecord,
  MerchantData,
  Fee,
  PayoutTableData,
} from '../interfaces';
import { AppDispatch } from '../helpers/appDispatch';
import { PayoutData } from '../mock/PayoutData';
import { GetPayoutFilteredResult } from '../helpers/payout';
import {
  getPayoutRequest,
  postPayoutRequest,
  getMerchantsRequest,
  getPayoutFeeRequest,
  clearFee,
  clearBooleans,
} from '../store/reports';
import { isEmpty } from '../helpers/isEmpty';
import moment from 'moment';
import { roles } from '../helpers/constants';

const Filter = lazy(() => import('../components/payouts/Filter'));
const CurrencyFilter = lazy(
  () => import('../components/payouts/CurrencyFilter')
);
const Card = lazy(() => import('../components/payouts/Card'));
const Details = lazy(() => import('../components/payouts/Details'));
const NewRecordPayout = lazy(
  () => import('../components/payouts/NewRecordPayout')
);
const EmptyBox = lazy(() => import('../components/payouts/EmptyBox'));

const { Content } = Layout;

const Payouts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const reports = appSelector((state) => state.reports);
  const { user } = appSelector((state) => state.auth);
  const [isNewPayout, setIsNewPayout] = useState(false);
  const [switchView, setSwitchView] = useState(false);
  const [payouts, setPayouts] = useState<PayoutTableData[]>([]);
  const [payoutReport, setPayoutReport] = useState<PayoutReport | null>(null);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [isPayingOut, setIsPayingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [form] = Form.useForm();
  const [initialValues] = useState<PayoutNewRecord>({
    amount: '',
    merchant: '',
    comments: '',
    currency: currency,
  });
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants);
  const [fee, setFee] = useState<Fee | undefined>(undefined);
  const [amount, setAmount] = useState(0.0);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  let role;
  if (user) {
    role = user.roles.find((r) => r === roles.SuperMerchant);
  } else {
    role = roles.SuperMerchant;
  }

  useEffect(() => {
    const { loading, payouts, merchants } = reports;
    if (isEmpty(payouts) && !loading) {
      const payload = {
        periodFrom: '',
        periodTo: '',
        currency: currency,
      };
      dispatch(getPayoutRequest(payload));
    }
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    dispatch(clearBooleans());
    dispatch(clearFee());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      loading,
      payouts,
      merchants,
      isSubmitting,
      success,
      failure,
      error,
      fee,
    } = reports;
    setLoading(loading);
    setPayouts(payouts ? payouts.data : []);
    setMerchants(merchants);
    setFee(fee);
    setIsPayingOut(isSubmitting);
    setPayoutReport(payouts);
    if (success) {
      message.success('Payout has been made successfully!', 5);
      dispatch(clearBooleans());
      dispatch(clearFee());
      form.resetFields();
    }
    if (failure) {
      message.error(JSON.stringify(error), 5);
      dispatch(clearBooleans());
      dispatch(clearFee());
    }
  }, [reports, dispatch, form]);

  const onReset = (form: any) => {
    form.resetFields();
    setIsNewPayout(false);
  };

  const onSearch = (values: any) => {
    const { merchant, periodFrom, periodTo } = values;
    if (merchant) {
      const m = merchants.find((m) => m.merchantId === merchant);
      const { bucket } = GetPayoutFilteredResult(PayoutData, values);
      if (m !== undefined) {
        setIsNewPayout(true);
        setMerchant(m);
      }
      setPayouts(bucket);
    }

    if (!isEmpty(periodFrom) && !isEmpty(periodTo)) {
      const pFrom = moment(periodFrom).format('MM/DD/YYYY');
      const pTo = moment(periodTo).format('MM/DD/YYYY');

      setPeriodFrom(pFrom);
      setPeriodTo(pTo);

      const payload = {
        periodFrom: pFrom,
        periodTo: pTo,
        currency: currency,
      };

      dispatch(getPayoutRequest(payload));
    }
  };

  const onChangeMerchant = (value: number) => {
    const m = merchants.find((m) => m.merchantId === value);
    if (m !== undefined) {
      setIsNewPayout(true);
      setMerchant(m);
    }
  };

  const onOpenRecordView = () => {
    setSwitchView(true);
    dispatch(clearFee());
    dispatch(clearBooleans());
  };

  const onCloseRecordView = () => {
    setSwitchView(false);
    setPayouts(reports.payouts ? reports.payouts.data : []);
    setIsNewPayout(false);
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    const payload = {
      periodFrom: periodFrom,
      periodTo: periodTo,
      currency: value,
    };
    dispatch(getPayoutRequest(payload));
  };

  const onPayoutSubmit = (values: PayoutNewRecord) => {
    values.currency = currency;
    values.merchant = merchant ? merchant.merchantId : '';
    dispatch(postPayoutRequest(values));
  };

  const onCalculateFee = (e: React.FormEvent<EventTarget>) => {
    const { value } = e.target as HTMLTextAreaElement;
    const payload = {
      amount: value,
      merchantId: merchant ? merchant.merchantId : '',
    };
    setAmount(parseFloat(value));
    dispatch(getPayoutFeeRequest(payload));
  };

  const reloadPayouts = () => {
    const payload = {
      periodFrom: periodFrom,
      periodTo: periodTo,
      currency: currency,
    };
    dispatch(getPayoutRequest(payload));
  };

  let render: React.ReactNode;

  if (loading && isEmpty(payouts)) {
    render = (
      <div className="spinner">
        <Spin />
      </div>
    );
  }

  if (!loading && isEmpty(payouts)) {
    render = (
      <EmptyBox
        header="Merchant Payouts"
        description="Merchant payouts returned empty results"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      />
    );
  }

  if (!loading && !isEmpty(payouts)) {
    render = <Details payouts={payouts} currency={currency} />;
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense
          fallback={
            <Row className="suspense-container">
              <div style={{ marginTop: '200px' }}>
                <Spin />
              </div>
            </Row>
          }
        >
          {!switchView ? (
            <>
              <Filter
                onReset={onReset}
                onSearch={onSearch}
                merchants={merchants}
                onChangeMerchant={onChangeMerchant}
                role={role}
              />
              <CurrencyFilter onSelectCurrency={onSelectCurrency} />
              <Card
                isNewPayout={isNewPayout}
                onOpenRecordView={onOpenRecordView}
                payouts={payouts}
                payoutReport={payoutReport ? payoutReport : null}
                currency={currency}
                role={role}
              />
              <div className="margin-top">
                <Row style={{ position: 'relative' }}>
                  <h4 className="transaction-chart-text">Payout History</h4>
                  <div className="utility-buttons">
                    <Button
                      type="primary"
                      className="export-buttons"
                      // onClick={() => onExportClick('EXCEL')}
                      // loading={isExporting && exportType === 'EXCEL'}
                    >
                      Export to Excel
                    </Button>

                    <Button
                      type="primary"
                      className="export-buttons reload"
                      onClick={() => reloadPayouts()}
                    >
                      Refresh
                    </Button>
                  </div>
                </Row>
                {render}
              </div>
            </>
          ) : (
            <NewRecordPayout
              isPayingOut={isPayingOut}
              merchant={merchant ? merchant : null}
              onCloseScreen={onCloseRecordView}
              onPayoutSubmit={onPayoutSubmit}
              currency={currency}
              Form={Form}
              form={form}
              values={initialValues}
              onCalculateFee={onCalculateFee}
              fee={fee}
              amount={amount}
            />
          )}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Payouts);
