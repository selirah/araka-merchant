import React, { lazy, Suspense, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  Search,
  TransactionHistory,
  TransactionReport,
  MerchantData,
} from '../interfaces';
import {
  getTransactions,
  clearTransactions,
  exportTranxRequest,
} from '../store/transactions';
import { isEmpty } from '../helpers/isEmpty';
import moment from 'moment';
import { getMerchantsRequest } from '../store/reports';

const { Content } = Layout;

const Filters = lazy(() => import('../components/merchants-payout/Filters'));
const Cards = lazy(() => import('../components/merchants-payout/Cards'));
const Details = lazy(() => import('../components/merchants-payout/Details'));
const EmptyBox = lazy(() => import('../components/transactions/EmptyBox'));
const CurrencyFilter = lazy(
  () => import('../components/dashboard/CurrencyFilter')
);

const MerchantsPayouts = () => {
  const dispatch: AppDispatch = useDispatch();
  const transaction = appSelector((state) => state.transaction);
  const reports = appSelector((state) => state.reports);
  const [trans, setTrans] = useState<TransactionHistory[]>([]);
  const [channelSearch, setChannelSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [statusSearch, setStatusSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [exportType, setExportType] = useState('');
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [trxReports, setTrxReports] = useState<TransactionReport | null>(null);
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants);
  const [isExporting, setIsExporting] = useState(false);
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
    const { loading, trxReports, isExporting } = transaction;
    const { merchants } = reports;
    setLoading(loading);
    setTrxReports(trxReports);
    setMerchants(merchants);
    setTrans(trxReports ? trxReports.data : []);
    setIsExporting(isExporting);
  }, [transaction, reports]);

  const reloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions(params));
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
    const {
      status,
      channel,
      periodFrom,
      periodTo,
      query,
      fixedPeriod,
      merchant,
    } = values;
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
      fixedPeriod: fixedPeriod,
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
        header="Empty Data"
        description="There are no records available"
      />
    );
  }

  if (!loading && trxReports) {
    render = <Details payouts={trans} />;
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
          <Filters
            merchants={merchants}
            onReset={onReset}
            onSearch={onSearch}
          />
          {!isEmpty(trans) ? <Cards transactions={trans} /> : null}
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Merchants Table</h4>
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
                  Refresh
                </Button>
              </div>
            </Row>
            <CurrencyFilter onSelectCurrency={onSelectCurrency} />
            {render}
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(MerchantsPayouts);
