import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getVasRequest,
  clearVAS,
  exportVASRequest,
} from '../store/vas-processed';
import { isEmpty } from '../helpers/isEmpty';
import { VASProcessed as VP, VASProcessedReport } from '../interfaces';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const Filters = lazy(() => import('../components/vas-processed/Filters'));
const Cards = lazy(() => import('../components/vas-processed/Cards'));
const Details = lazy(() => import('../components/vas-processed/Details'));
const CurrencyFilter = lazy(
  () => import('../components/vas-processed/CurrencyFilter')
);

const { Content } = Layout;

const VASProcessed = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const vasStore = appSelector((state) => state.vas);
  const [vasReport, setVasReport] = useState<VASProcessedReport | null>(null);
  const [vasData, setVasData] = useState<VP[]>([]);
  const [exportType, setExportType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [month, setMonth] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [skip, setSkip] = useState(0);

  const params = {
    currency: currency,
    periodFrom: fromDate,
    periodTo: toDate,
    exportType: exportType,
    month: month,
    pageSize: pageSize,
    skip: skip,
    fixedPeriod: 'overall',
  };

  useEffect(() => {
    dispatch(getVasRequest(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, vas, isExporting } = vasStore;
    setLoading(loading);
    setVasData(vas && !isEmpty(vas.data) ? vas.data : []);
    setVasReport(vas);
    setIsExporting(isExporting);
  }, [vasStore]);

  const reloadVas = () => {
    dispatch(clearVAS());
    dispatch(getVasRequest(params));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    params.exportType = type;
    dispatch(exportVASRequest(params));
  };

  const onLoadMore = (page: any, size: any) => {
    setSkip(0);
    setPageSize(size);
    params.skip = page - 1;
    setSkip(params.skip);
    dispatch(getVasRequest(params));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getVasRequest(params));
  };

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    params.month = '';
    dispatch(getVasRequest(params));
  };

  const onSearch = (values: any) => {
    const { periodFrom, periodTo, month } = values;
    let pFrom: string = '',
      pTo: string = '';
    setMonth(month);
    if (periodFrom !== undefined && periodTo !== undefined) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY');
      pTo = moment(periodTo).format('MM/DD/YYYY');
      setFromDate(pFrom);
      setToDate(pTo);
    }
    params.periodFrom = pFrom;
    params.periodTo = pTo;
    params.month = month;
    dispatch(getVasRequest(params));
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
          <Filters onReset={onReset} onSearch={onSearch} translate={t} />
          <Cards
            vas={vasReport}
            currency={currency}
            loading={loading}
            translate={t}
          />
          <div className="margin-top">
            <CurrencyFilter onSelectCurrency={onSelectCurrency} translate={t} />
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">
                {t('general.vasTable')}
              </h4>
              <div className="utility-buttons">
                <>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('EXCEL')}
                    loading={isExporting && exportType === 'EXCEL'}
                    disabled={isEmpty(vasData)}
                  >
                    {t('general.export-excel')}
                  </Button>
                  {/* <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('PDF')}
                    loading={isExporting && exportType === 'PDF'}
                    disabled={isEmpty(vasData)}
                  >
                    {t('general.export-pdf')}
                  </Button> */}
                </>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadVas()}
                >
                  {t('general.refresh')}
                </Button>
              </div>
            </Row>
            <Details
              vas={vasData}
              currency={currency}
              loading={loading}
              onLoadMore={onLoadMore}
              // total={vasReport ? vasReport.vasProcessed.value : 0}
              total={vasData.length}
              translate={t}
            />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(VASProcessed);
