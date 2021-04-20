import React, { lazy, Suspense, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getTransactions,
  clearTransactions,
  exportTranxRequest,
  downloadReceiptRequest,
} from '../store/transactions';
import { getMerchantsRequest } from '../store/reports';
import { isEmpty } from '../helpers/isEmpty';
import {
  Search,
  TransactionHistory,
  TransactionReport,
  MerchantData,
} from '../interfaces';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const { Content } = Layout;

const TransactionFilters = lazy(
  () => import('../components/transactions/TransactionFilters')
);
const TransactionSummaryCards = lazy(
  () => import('../components/transactions/TransactionSummaryCards')
);
const TransactionTable = lazy(
  () => import('../components/transactions/TransactionTable')
);
const TransactionDetail = lazy(
  () => import('../components/transactions/TransactionDetail')
);
const CurrencyFilter = lazy(
  () => import('../components/dashboard/CurrencyFilter')
);

const EmptyBox = lazy(() => import('../components/transactions/EmptyBox'));

const Transactions = () => {
  const dispatch: AppDispatch = useDispatch();
  const transaction = appSelector((state) => state.transaction);
  const reports = appSelector((state) => state.reports);
  const [trans, setTrans] = useState<TransactionHistory[]>([]);
  const { t } = useTranslation();
  const [channelSearch, setChannelSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [statusSearch, setStatusSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [exportType, setExportType] = useState('');
  const [trx, setTrx] = useState<TransactionHistory | null>(null);
  const [switchView, setSwitchView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [trxReports, setTrxReports] = useState<TransactionReport | null>(null);
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants);
  const [isExporting, setIsExporting] = useState(false);
  const [isDownlaoding, setIsDownloading] = useState(false);
  const params = {
    currrency: currency,
    fixedPeriod: 'overall',
  };

  useEffect(() => {
    // fetch transaction history
    dispatch(getTransactions(params));
    const { merchants } = reports;
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      loading,
      trxReports,
      isExporting,
      isRequestingDownload,
    } = transaction;
    const { merchants } = reports;
    setLoading(loading);
    setTrxReports(trxReports);
    setMerchants(merchants);
    setTrans(trxReports ? trxReports.data : []);
    setIsExporting(isExporting);
    setIsDownloading(isRequestingDownload);
  }, [transaction, reports]);

  const onClickRow = (transactionID: number) => {
    setSwitchView(!switchView);
    if (trxReports && !isEmpty(trxReports.data)) {
      const trx = trxReports.data.find(
        (t) => t.transactionId === transactionID
      );
      if (trx !== undefined) {
        setTrx(trx);
      }
    }
  };

  const onCloseScreen = () => {
    setSwitchView(!switchView);
  };

  const reloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions(params));
  };

  const onDownloadReceiptClick = (transactionId: number): void => {
    dispatch(downloadReceiptRequest(transactionId));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    const params = {
      currrency: value,
      fixedPeriod: 'overall',
    };
    dispatch(getTransactions(params));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    const payload: Search = {
      ChannelSearch: channelSearch,
      DateSearch: {
        from: fromDate,
        to: toDate,
      },
      ExportType: type,
      SearchValue: searchValue,
      StatusSearch:
        statusSearch.charAt(0).toUpperCase() +
        statusSearch.slice(1).toLowerCase(),
    };
    dispatch(exportTranxRequest(payload));
  };

  const onSearch = (values: any) => {
    const { status, channel, periodFrom, periodTo, query, merchant } = values;
    let m: MerchantData | undefined = undefined;
    let pFrom: string = '',
      pTo: string = '';

    setChannelSearch(channel !== undefined ? channel : '');
    setStatusSearch(status !== undefined ? status : '');
    setSearchValue(query !== undefined ? query : '');
    if (periodFrom !== undefined && periodTo !== undefined) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY');
      pTo = moment(periodTo).format('MM/DD/YYYY');
      setFromDate(pFrom);
      setToDate(pTo);
    }
    if (merchant !== undefined) {
      m = merchants.find((m) => m.merchantId === merchant);
    }
    const payload = {
      periodFrom: pFrom,
      periodTo: pTo,
      fixedPeriod: 'overall',
      merchant: m !== undefined ? m.name : '',
      status: status,
      channel: channel,
      currrency: currency,
      searchValue: query,
    };
    dispatch(getTransactions(payload));
  };

  const onReset = (form: any) => {
    form.resetFields();
    const payload = {
      currrency: currency,
      fixedPeriod: 'overall',
    };
    dispatch(getTransactions(payload));
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin />
      </div>
    );
  }
  if (!loading && !trxReports) {
    render = (
      <EmptyBox
        header={`${t('transactions.noTransactions')}`}
        description={`${t('transactions.noTransDesc')}`}
      />
    );
  }

  if (!loading && trxReports) {
    render = (
      <TransactionTable transactionHistory={trans} onClickRow={onClickRow} />
    );
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense
          fallback={
            <Row
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <div style={{ marginTop: '200px' }}>
                <Spin />
              </div>
            </Row>
          }
        >
          {!switchView ? (
            <>
              <TransactionFilters
                merchants={merchants}
                onSearch={onSearch}
                onReset={onReset}
              />
              {!isEmpty(trans) ? (
                <TransactionSummaryCards
                  trxReports={trxReports}
                  currency={currency}
                />
              ) : null}
              <div className="margin-top">
                <Row style={{ position: 'relative' }}>
                  <h4 className="transaction-chart-text">Transactions Chart</h4>
                  <div className="utility-buttons">
                    {!isEmpty(trans) ? (
                      <>
                        <Button
                          type="primary"
                          className="export-buttons"
                          onClick={() => onExportClick('EXCEL')}
                          loading={isExporting && exportType === 'EXCEL'}
                        >
                          Export to Excel
                        </Button>
                        <Button
                          type="primary"
                          className="export-buttons"
                          onClick={() => onExportClick('PDF')}
                          loading={isExporting && exportType === 'PDF'}
                        >
                          Export to PDF
                        </Button>
                      </>
                    ) : null}
                    <Button
                      type="primary"
                      className="export-buttons reload"
                      onClick={() => reloadTransaction()}
                    >
                      {t('transactions.refresh')}
                    </Button>
                  </div>
                </Row>
                <CurrencyFilter onSelectCurrency={onSelectCurrency} />
                {render}
              </div>
            </>
          ) : (
            <TransactionDetail
              onCloseScreen={onCloseScreen}
              transaction={trx!}
              isDownloading={isDownlaoding}
              onDownloadReceiptClick={onDownloadReceiptClick}
            />
          )}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Transactions);
