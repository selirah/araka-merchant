import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row, Button } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { MonthlyArea } from '../mock/MonthlyOverview';
import { isEmpty } from '../helpers/isEmpty';
import { ProxyPayReport, ProxyPayTrxTableData } from '../interfaces';
import { getProxyPayRequest, clearBooleans } from '../store/reports';
import moment from 'moment';

const Filter = lazy(
  () => import('../components/proxypay-reports/volumes/Filter')
);

const VolumesCard = lazy(
  () => import('../components/proxypay-reports/volumes/VolumesCard')
);

const AirtimeRechargeSplitCard = lazy(
  () =>
    import('../components/proxypay-reports/volumes/AirtimeRechargeSplitCard')
);

const { Content } = Layout;

const ProxyPayVolumes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const reports = appSelector((state) => state.reports);
  const [proxyPayReport, setProxyPayReport] = useState<ProxyPayReport | null>(
    null
  );
  const [transactions, setTransactions] = useState<ProxyPayTrxTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [currency, setCurrency] = useState('USD');
  // const [exportType, setExportType] = useState('');
  // const [exportPage, setExportPage] = useState('');
  // const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const { loading, proxypay } = reports;
    if (!loading && !proxypay) {
      const payload = {
        periodFrom: '',
        periodTo: '',
        currency: currency,
      };
      dispatch(getProxyPayRequest(payload));
    }
    dispatch(clearBooleans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, proxypay } = reports;
    setLoading(loading);
    setProxyPayReport(proxypay);
    // setIsExporting(isExporting);
    setTransactions(proxypay ? proxypay.transactions.data : []);
  }, [reports]);

  const onReset = (form: any) => {
    form.resetFields();
    const payload = {
      periodFrom: '',
      periodTo: '',
      currency: currency,
    };
    dispatch(getProxyPayRequest(payload));
  };

  const onSearch = (values: any) => {
    const { periodFrom, periodTo } = values;
    let pFrom: string = '',
      pTo: string = '';

    if (!isEmpty(periodFrom) && !isEmpty(periodTo)) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY');
      pTo = moment(periodTo).format('MM/DD/YYYY');
      setPeriodFrom(pFrom);
      setPeriodTo(pTo);
    }

    const payload = {
      periodFrom: pFrom,
      periodTo: pTo,
      currency: currency,
    };
    dispatch(getProxyPayRequest(payload));
  };

  const onReloadPage = () => {
    const payload = {
      periodFrom: periodFrom,
      periodTo: periodTo,
    };
    dispatch(getProxyPayRequest(payload));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    const payload = {
      periodFrom: periodFrom,
      periodTo: periodTo,
      currency: value,
    };
    dispatch(getProxyPayRequest(payload));
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
          <Filter onReset={onReset} onSearch={onSearch} />
          {loading ? (
            <div className="spinner">
              <Spin />
            </div>
          ) : (
            <>
              <VolumesCard
                proxyPayReport={proxyPayReport}
                onReloadPage={onReloadPage}
                currency={currency}
                onSelectCurrency={onSelectCurrency}
              />
              <AirtimeRechargeSplitCard
                currency={currency}
                onSelectCurrency={onSelectCurrency}
                proxyPayReport={proxyPayReport}
              />
            </>
          )}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayVolumes);
