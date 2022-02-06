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
import {
  getPayoutRequest,
  postPayoutRequest,
  getMerchantsRequest,
  getPayoutFeeRequest,
  clearFee,
  clearBooleans,
  exportRequest,
  downloadReceiptRequest,
} from '../store/reports';
import { isEmpty } from '../helpers/isEmpty';
import moment from 'moment';
import { roles } from '../helpers/constants';
import { useTranslation } from 'react-i18next';

const Filter = lazy(() => import('../components/payouts/Filter'));
const CurrencyFilter = lazy(
  () => import('../components/payouts/CurrencyFilter')
);
const Card = lazy(() => import('../components/payouts/Card'));
const Details = lazy(() => import('../components/payouts/Details'));
const NewRecordPayout = lazy(
  () => import('../components/payouts/NewRecordPayout')
);
const PayoutDetail = lazy(() => import('../components/payouts/PayoutDetail'));

const { Content } = Layout;

const Payouts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
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
  const [exportType, setExportType] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [hasSelectMerchant, setHasSelectMerchant] = useState(false);
  const [switchDetailView, setSwitchDetailView] = useState(false);
  const [payout, setPayout] = useState<any>({});
  const [isDownlaoding, setIsDownloading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [skip, setSkip] = useState(0);

  const params = {
    periodFrom: periodFrom,
    periodTo: periodTo,
    currency: currency,
    merchant: merchant ? merchant.name : '',
    exportType: exportType,
    pageSize: pageSize,
    skip: skip,
    fixedPeriod: 'overall',
  };

  let role;
  if (user) {
    role = user.roles.find((r) => r === roles.SuperMerchant);
  } else {
    role = roles.SuperMerchant;
  }

  useEffect(() => {
    const { merchants } = reports;
    dispatch(getPayoutRequest(params));
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
      isExporting,
      isRequestingDownload,
      downloadError,
      downloadRecieptError,
    } = reports;
    setLoading(loading);
    setPayouts(payouts ? payouts.data : []);
    setMerchants(merchants);
    setFee(fee);
    setIsPayingOut(isSubmitting);
    setPayoutReport(payouts);
    setIsExporting(isExporting);
    setIsDownloading(isRequestingDownload);
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
    if (downloadRecieptError) {
      message.error(JSON.stringify(downloadError), 5);
      dispatch(clearBooleans());
    }
    if (!isEmpty(payouts) && hasSelectMerchant) {
      setIsNewPayout(true);
    }
    if (isEmpty(payouts) && hasSelectMerchant) {
      setIsNewPayout(false);
    }
    if (!isEmpty(payouts) && !hasSelectMerchant) {
      setIsNewPayout(false);
    }
  }, [reports, dispatch, form, hasSelectMerchant]);

  const onReset = (form: any) => {
    form.resetFields();
    setIsNewPayout(false);
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    dispatch(getPayoutRequest(params));
    setHasSelectMerchant(false);
  };

  const onLoadMore = (page: any, size: any) => {
    setSkip(0);
    setPageSize(size);
    params.skip = page - 1;
    setSkip(params.skip);
    dispatch(getPayoutFeeRequest(params));
  };

  const onSearch = (values: any) => {
    const { merchant, periodFrom, periodTo } = values;
    let pFrom: string = '',
      pTo: string = '';
    let m: MerchantData | undefined = undefined;

    if (!isEmpty(periodFrom) && !isEmpty(periodTo)) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY');
      pTo = moment(periodTo).format('MM/DD/YYYY');
      setPeriodFrom(pFrom);
      setPeriodTo(pTo);
    }
    if (!isEmpty(merchant)) {
      m = merchants.find((m) => m.merchantId === merchant);
      if (m !== undefined) {
        setIsNewPayout(true);
        setMerchant(m);
      }
    }
    params.periodFrom = pFrom;
    params.periodTo = pTo;
    params.merchant = m !== undefined ? m.name : '';
    dispatch(getPayoutRequest(params));
  };

  const onChangeMerchant = (value: number) => {
    const m = merchants.find((m) => m.merchantId === value);
    if (m !== undefined) {
      setHasSelectMerchant(true);
      setMerchant(m);
    }
  };

  const onOpenRecordView = () => {
    setSwitchView(true);
    setSwitchDetailView(false);
    dispatch(clearFee());
    dispatch(clearBooleans());
  };

  const onCloseRecordView = () => {
    setSwitchView(false);
    setIsNewPayout(false);
    setSwitchDetailView(false);
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    dispatch(getPayoutRequest(params));
    setHasSelectMerchant(false);
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getPayoutRequest(params));
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
    setIsNewPayout(false);
    setHasSelectMerchant(false);
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    dispatch(getPayoutRequest(params));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    params.exportType = type;
    dispatch(exportRequest(params));
  };

  const onClickRow = (record: any) => {
    setSwitchDetailView(true);
    setSwitchView(false);
    setPayout(record);
  };

  const onCloseScreen = () => {
    setSwitchDetailView(false);
    setSwitchView(false);
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    dispatch(getPayoutRequest(params));
    setHasSelectMerchant(false);
  };

  const onDownloadReceiptClick = (transactionId: number) => {
    const trx = payouts.find((t) => t.transactionId === transactionId);
    if (trx !== undefined) {
      const payload = {
        merchant: trx.merchant,
        amount: `${trx.amount}`,
        currency: currency,
        transactionId: `${trx.transactionId}`,
        fee: `${trx.feesPaid}`,
        date: trx.paidOn,
      };
      dispatch(downloadReceiptRequest(payload));
    }
  };

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
          {!switchView && !switchDetailView ? (
            <>
              <Filter
                onReset={onReset}
                onSearch={onSearch}
                merchants={merchants}
                onChangeMerchant={onChangeMerchant}
                role={role}
                translate={t}
              />
              <CurrencyFilter
                onSelectCurrency={onSelectCurrency}
                translate={t}
              />
              <Card
                isNewPayout={isNewPayout}
                onOpenRecordView={onOpenRecordView}
                payouts={payouts}
                payoutReport={payoutReport ? payoutReport : null}
                currency={currency}
                role={role}
                loading={loading}
                translate={t}
              />
              <div className="margin-top">
                <Row style={{ position: 'relative' }}>
                  <h4 className="transaction-chart-text">Payout History</h4>
                  <div className="utility-buttons new-payout">
                    <Button
                      type="primary"
                      className="export-buttons"
                      onClick={() => onExportClick('EXCEL')}
                      loading={isExporting && exportType === 'EXCEL'}
                      disabled={isEmpty(payouts)}
                    >
                      {t('general.export-excel')}
                    </Button>

                    {/* <Button
                      type="primary"
                      className="export-buttons"
                      onClick={() => onExportClick('PDF')}
                      loading={isExporting && exportType === 'PDF'}
                      disabled={isEmpty(payouts)}
                    >
                       {t('general.export-pdf')}
                    </Button> */}

                    <Button
                      type="primary"
                      className="export-buttons reload"
                      onClick={() => reloadPayouts()}
                    >
                      {t('general.refresh')}
                    </Button>
                  </div>
                </Row>
                <Details
                  payouts={payouts}
                  currency={currency}
                  onClickRow={onClickRow}
                  loading={loading}
                  onLoadMore={onLoadMore}
                  total={payoutReport ? payoutReport.data.length : 0}
                  translate={t}
                />
              </div>
            </>
          ) : switchView ? (
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
              translate={t}
            />
          ) : (
            <PayoutDetail
              isDownloading={isDownlaoding}
              onCloseScreen={onCloseScreen}
              onDownloadReceiptClick={onDownloadReceiptClick}
              payout={payout}
              translate={t}
            />
          )}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Payouts);
