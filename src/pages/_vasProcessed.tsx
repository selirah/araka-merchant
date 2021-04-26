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
import { VASProcessed as VP } from '../interfaces';
import moment from 'moment';

const Filters = lazy(() => import('../components/vas-processed/Filters'));
const Cards = lazy(() => import('../components/vas-processed/Cards'));
const Details = lazy(() => import('../components/vas-processed/Details'));
const CurrencyFilter = lazy(
  () => import('../components/dashboard/CurrencyFilter')
);

const { Content } = Layout;

const VASProcessed = () => {
  const dispatch: AppDispatch = useDispatch();
  const vasStore = appSelector((state) => state.vas);
  const [vasData, setVasData] = useState<VP[]>([]);
  const [exportType, setExportType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [month, setMonth] = useState('');

  const params = {
    currency: currency,
    periodFrom: fromDate,
    periodTo: toDate,
    searchValue: searchValue,
    exportType: exportType,
    month: month,
  };

  useEffect(() => {
    const { vas } = vasStore;
    if (isEmpty(vas)) {
      dispatch(getVasRequest(params));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, vas, isExporting } = vasStore;
    setLoading(loading);
    setVasData(vas);
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
    params.searchValue = '';
    dispatch(clearVAS());
    dispatch(getVasRequest(params));
  };

  const onSearch = (values: any) => {
    const { periodFrom, periodTo, query, month } = values;
    let pFrom: string = '',
      pTo: string = '';
    setSearchValue(query !== undefined ? query : '');
    setMonth(query !== undefined ? month : '');
    if (periodFrom !== undefined && periodTo !== undefined) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY');
      pTo = moment(periodTo).format('MM/DD/YYYY');
      setFromDate(pFrom);
      setToDate(pTo);
    }
    params.periodFrom = pFrom;
    params.periodTo = pTo;
    params.searchValue = query;
    params.month = month;
    dispatch(clearVAS());
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
          <Filters onReset={onReset} onSearch={onSearch} />
          <Cards vas={vasData} currency={currency} loading={loading} />
          <div className="margin-top">
            <CurrencyFilter onSelectCurrency={onSelectCurrency} />
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">VAS Processed Table</h4>
              <div className="utility-buttons">
                <>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('EXCEL')}
                    loading={isExporting && exportType === 'EXCEL'}
                    disabled={isEmpty(vasData)}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('PDF')}
                    loading={isExporting && exportType === 'PDF'}
                    disabled={isEmpty(vasData)}
                  >
                    Export to PDF
                  </Button>
                </>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadVas()}
                >
                  Refresh
                </Button>
              </div>
            </Row>
            <Details vas={vasData} currency={currency} loading={loading} />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(VASProcessed);
