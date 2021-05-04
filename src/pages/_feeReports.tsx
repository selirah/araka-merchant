import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { MerchantData, PCESReport, PCESTableData } from '../interfaces';
import {
  getMerchantsRequest,
  exportRequest,
  getPCESRequest,
  clearData,
} from '../store/reports';
import moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';

const { Content } = Layout;

const Filters = lazy(() => import('../components/fee-reports/Filters'));
const Cards = lazy(() => import('../components/fee-reports/Cards'));
const Details = lazy(() => import('../components/fee-reports/Details'));
const CurrencyFilter = lazy(
  () => import('../components/transactions/CurrencyFilter')
);

const FeeReports = () => {
  const dispatch: AppDispatch = useDispatch();
  const reports = appSelector((state) => state.reports);
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants);
  const [pces, setPces] = useState<PCESTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pcesReport, setPcesReport] = useState<PCESReport | null>(null);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [exportType, setExportType] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currency, setCurrency] = useState('USD');

  const params = {
    currency: currency,
    pageSize: 10,
    skip: skip,
    periodFrom: periodFrom,
    periodTo: periodTo,
    merchant: merchant ? merchant.name : '',
    exportType: exportType,
    status: 'APPROVED',
  };

  useEffect(() => {
    const { merchants } = reports;
    dispatch(clearData());
    dispatch(getPCESRequest(params));
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { merchants, loading, pces, isExporting, pcesdata } = reports;
    setPces(pcesdata);
    setMerchants(merchants);
    setPcesReport(pces);
    setIsExporting(isExporting);
    setLoading(loading);
  }, [reports]);

  const reloadReport = () => {
    dispatch(clearData());
    dispatch(getPCESRequest(params));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.skip = skip;
    params.currency = value;
    dispatch(clearData());
    dispatch(getPCESRequest(params));
  };

  const onLoadMore = () => {
    setPageSize(pageSize + 10);
    setSkip(pageSize + 1);
    params.skip = pageSize + 1;
    dispatch(getPCESRequest(params));
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
        setMerchant(m);
      }
    }
    params.periodFrom = pFrom;
    params.periodTo = pTo;
    params.merchant = m !== undefined ? m.name : '';
    dispatch(clearData());
    dispatch(getPCESRequest(params));
  };

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    dispatch(getPCESRequest(params));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    params.exportType = type;
    dispatch(exportRequest(params));
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
          <Filters
            onReset={onReset}
            onSearch={onSearch}
            merchants={merchants}
          />
          <Cards
            pces={pces}
            pcesReport={pcesReport}
            currency={currency}
            loading={loading}
          />
          <CurrencyFilter
            onSelectCurrency={onSelectCurrency}
            onLoadMore={onLoadMore}
          />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">PCES Reports Table</h4>
              <div className="utility-buttons">
                <>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('EXCEL')}
                    loading={isExporting && exportType === 'EXCEL'}
                    disabled={isEmpty(pces)}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('PDF')}
                    loading={isExporting && exportType === 'PDF'}
                    disabled={isEmpty(pces)}
                  >
                    Export to PDF
                  </Button>
                </>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadReport()}
                >
                  Refresh
                </Button>
              </div>
            </Row>
            <Details pces={pces} currency={currency} loading={loading} />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(FeeReports);
