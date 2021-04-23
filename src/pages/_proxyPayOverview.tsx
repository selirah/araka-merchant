import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { changeMenu, changeMenuHeader } from '../store/utils';
import { ProxyPayReport } from '../interfaces';
import {
  getProxyPayRequest,
  clearBooleans,
  exportRequest,
} from '../store/reports';
import moment from 'moment';

const Filter = lazy(
  () => import('../components/proxypay-reports/overview/Filter')
);
const SubscribersCard = lazy(
  () => import('../components/proxypay-reports/overview/SubscribersCard')
);
const TransactionsCard = lazy(
  () => import('../components/proxypay-reports/overview/TransactionsCard')
);
const VolumesCard = lazy(
  () => import('../components/proxypay-reports/overview/VolumesCard')
);
const RevenueChannelCard = lazy(
  () => import('../components/proxypay-reports/overview/RevenueChannelCard')
);
const RevenueServiceCard = lazy(
  () => import('../components/proxypay-reports/overview/RevenueServiceCard')
);

const OpexOverviewCard = lazy(
  () => import('../components/proxypay-reports/overview/OpexOverviewCard')
);

const EbitdaOverviewCard = lazy(
  () => import('../components/proxypay-reports/overview/EbitdaOverviewCard')
);

const { Content } = Layout;

const ProxyPayOverview: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const reports = appSelector((state) => state.reports);
  const [proxyPayReport, setProxyPayReport] = useState<ProxyPayReport | null>(
    null
  );
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [exportType, setExportType] = useState('');
  const [exportPage, setExportPage] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const params = {
    periodFrom: periodFrom,
    periodTo: periodTo,
    currency: currency,
    exportType: exportType,
  };

  useEffect(() => {
    dispatch(getProxyPayRequest(params));
    dispatch(clearBooleans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loading, proxypay, isExporting } = reports;
    setLoading(loading);
    setProxyPayReport(proxypay);
    setIsExporting(isExporting);
  }, [reports]);

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    dispatch(getProxyPayRequest(params));
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
    params.periodFrom = pFrom;
    params.periodTo = pTo;
    dispatch(getProxyPayRequest(params));
  };

  const onSeeDetailsClick = (path: string, menu: string, header: string) => {
    dispatch(changeMenu(menu));
    dispatch(changeMenuHeader(header));
    history.push(path);
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getProxyPayRequest(params));
  };

  const onExportClick = (type: string, page: string) => {
    setExportType(type);
    setExportPage(page);
    params.exportType = type;
    dispatch(exportRequest(params));
  };

  const onReloadPage = () => {
    params.periodFrom = '';
    params.periodTo = '';
    dispatch(getProxyPayRequest(params));
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
          <SubscribersCard
            onSeeDetailsClick={onSeeDetailsClick}
            proxyPayReport={proxyPayReport}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onReloadPage={onReloadPage}
            loading={loading}
          />
          <TransactionsCard
            onSeeDetailsClick={onSeeDetailsClick}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            proxyPayReport={proxyPayReport}
            currency={currency}
            loading={loading}
          />
          <VolumesCard
            onSeeDetailsClick={onSeeDetailsClick}
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            proxyPayReport={proxyPayReport}
            onSelectCurrency={onSelectCurrency}
            loading={loading}
          />
          <RevenueChannelCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayReport}
            loading={loading}
          />
          <RevenueServiceCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayReport}
            loading={loading}
          />
          <OpexOverviewCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayReport}
            loading={loading}
          />
          <EbitdaOverviewCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayReport}
            loading={loading}
          />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayOverview);
