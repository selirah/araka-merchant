import React, { lazy, Suspense, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getTransactionsRequest,
  clearTransactions,
  exportTranxRequest,
  downloadReceiptRequest,
} from '../store/transactions';
import { getMerchantsRequest } from '../store/reports';
import { isEmpty } from '../helpers/isEmpty';
import { TransactionHistory, MerchantData, Transaction } from '../interfaces';
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
  () => import('../components/transactions/CurrencyFilter')
);

const Transactions = () => {
  const dispatch: AppDispatch = useDispatch();
  const transaction = appSelector((state) => state.transaction);
  const reports = appSelector((state) => state.reports);
  const [trans, setTrans] = useState<TransactionHistory[]>([]);
  const [trxReport, setTrxReport] = useState<Transaction | null>(null);
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
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isDownlaoding, setIsDownloading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [skip, setSkip] = useState(0);

  const params = {
    currency: currency,
    pageSize: 10,
    skip: skip,
    periodFrom: fromDate,
    periodTo: toDate,
    merchant: merchant ? merchant.name : '',
    status: statusSearch,
    channel: channelSearch,
    searchValue: searchValue,
    exportType: exportType,
  };

  useEffect(() => {
    // fetch transaction history
    dispatch(clearTransactions());
    dispatch(getTransactionsRequest(params));
    const { merchants } = reports;
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      loading,
      transactions,
      isExporting,
      isRequestingDownload,
      trans,
    } = transaction;
    const { merchants } = reports;
    setLoading(loading);
    setMerchants(merchants);
    setTrans(transactions && !isEmpty(transactions.data) ? trans : []);
    setTrxReport(transactions);
    setIsExporting(isExporting);
    setIsDownloading(isRequestingDownload);
  }, [transaction, reports]);

  const onClickRow = (transactionID: number) => {
    setSwitchView(!switchView);
    if (!isEmpty(transaction.trans)) {
      const trx = transaction.trans.find(
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
    dispatch(getTransactionsRequest(params));
  };

  const onDownloadReceiptClick = (transactionId: number): void => {
    dispatch(downloadReceiptRequest(transactionId));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.skip = skip;
    params.currency = value;
    dispatch(clearTransactions());
    dispatch(getTransactionsRequest(params));
  };

  const onLoadMore = () => {
    setPageSize(pageSize + 10);
    setSkip(pageSize + 1);
    params.skip = pageSize + 1;
    dispatch(getTransactionsRequest(params));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    params.exportType = type;
    dispatch(exportTranxRequest(params));
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
      setMerchant(m !== undefined ? m : null);
    }
    params.periodFrom = pFrom;
    params.periodTo = pTo;
    params.merchant = m !== undefined ? m.name : '';
    params.status = status;
    params.channel = channel;
    params.searchValue = query;
    dispatch(getTransactionsRequest(params));
  };

  const onReset = (form: any) => {
    form.resetFields();
    params.skip = 0;
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    params.status = '';
    params.channel = '';
    params.searchValue = '';
    dispatch(clearTransactions());
    dispatch(getTransactionsRequest(params));
  };

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
              <TransactionSummaryCards
                trxReports={trxReport}
                currency={currency}
                loading={loading}
              />

              <CurrencyFilter
                onSelectCurrency={onSelectCurrency}
                onLoadMore={onLoadMore}
              />
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

                <TransactionTable
                  transactionHistory={trans}
                  onClickRow={onClickRow}
                  currency={currency}
                  loading={loading}
                  onLoadMore={onLoadMore}
                />
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
