import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getMerchantsOverview,
  exportOverviewRequest,
} from '../store/merchant-overview';
import { isEmpty } from '../helpers/isEmpty';
import {
  MerchantOverview,
  MerchantData,
  MerchantOverviewReport,
} from '../interfaces';
import { getMerchantsRequest } from '../store/reports';
import moment from 'moment';

const Filters = lazy(() => import('../components/merchants-overview/Filters'));
const Cards = lazy(() => import('../components/merchants-overview/Cards'));
const Details = lazy(() => import('../components/merchants-overview/Details'));
const CurrencyFilter = lazy(
  () => import('../components/dashboard/CurrencyFilter')
);

const { Content } = Layout;

const MerchantsOverview = () => {
  const dispatch: AppDispatch = useDispatch();
  const overviewsStore = appSelector((state) => state.overviews);
  const reports = appSelector((state) => state.reports);
  const [overviewReport, setOverviewReport] =
    useState<MerchantOverviewReport | null>(null);
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants);
  const [exportType, setExportType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [overviewdata, setOverviewdata] = useState<MerchantOverview[]>([]);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [skip, setSkip] = useState(0);

  const params = {
    currency: currency,
    periodFrom: fromDate,
    periodTo: toDate,
    merchant: merchant ? merchant.name : '',
    exportType: exportType,
    pageSize: pageSize,
    skip: skip,
    fixedPeriod: 'overall',
  };

  useEffect(() => {
    dispatch(getMerchantsOverview(params));
    const { merchants } = reports;
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, overviews, isExporting } = overviewsStore;
    const { merchants } = reports;
    setLoading(loading);
    setOverviewdata(
      overviews && !isEmpty(overviews.data) ? overviews.data : []
    );
    setOverviewReport(overviews);
    setMerchants(merchants);
    setIsExporting(isExporting);
  }, [overviewsStore, reports]);

  const reloadOverviews = () => {
    dispatch(getMerchantsOverview(params));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    params.exportType = type;
    dispatch(exportOverviewRequest(params));
  };

  const onLoadMore = (page: any, size: any) => {
    setSkip(0);
    setPageSize(size);
    params.skip = page - 1;
    setSkip(params.skip);
    dispatch(getMerchantsOverview(params));
  };

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    params.merchant = '';
    dispatch(getMerchantsOverview(params));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getMerchantsOverview(params));
  };

  const onSearch = (values: any) => {
    const { periodFrom, periodTo, merchant } = values;
    let m: MerchantData | undefined = undefined;
    let pFrom: string = '',
      pTo: string = '';
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
    dispatch(getMerchantsOverview(params));
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
            overviews={overviewReport}
            currency={currency}
            loading={loading}
          />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Merchants Table</h4>
              <div className="utility-buttons">
                <>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('EXCEL')}
                    loading={isExporting && exportType === 'EXCEL'}
                    disabled={isEmpty(overviewdata)}
                  >
                    Export to Excel
                  </Button>
                  {/* <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('PDF')}
                    loading={isExporting && exportType === 'PDF'}
                    disabled={isEmpty(overviewdata)}
                  >
                    Export to PDF
                  </Button> */}
                </>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadOverviews()}
                >
                  Refresh
                </Button>
              </div>
            </Row>
            <CurrencyFilter onSelectCurrency={onSelectCurrency} />
            <Details
              overviews={overviewdata}
              currency={currency}
              loading={loading}
              onLoadMore={onLoadMore}
              total={overviewReport ? overviewReport.totalMerchants.value : 0}
            />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(MerchantsOverview);
