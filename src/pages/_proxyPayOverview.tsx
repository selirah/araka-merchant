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
  getProxyPaySubscribersRequest,
  getProxyPayTransactionsRequest,
  getProxyPayVolumesRequest,
  getProxyPayRevenuesRequest,
  getProxyPayOpexRequest,
  getProxyPayEbitdaRequest,
  clearBooleans,
  exportRequest,
  clearData,
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
  const [proxyPaySub, setProxyPaySub] = useState<ProxyPayReport | null>(null);
  const [proxyPayTrx, setProxyPayTrx] = useState<ProxyPayReport | null>(null);
  const [proxyPayVol, setProxyPayVol] = useState<ProxyPayReport | null>(null);
  const [proxyPayRev, setProxyPayRev] = useState<ProxyPayReport | null>(null);
  const [proxyPayOpex, setProxyPayOpex] = useState<ProxyPayReport | null>(null);
  const [proxyPayEbitda, setProxyPayEbitda] = useState<ProxyPayReport | null>(
    null
  );
  const [currency, setCurrency] = useState('USD');
  const [loadingSub, setLoadingSub] = useState(false);
  const [loadingTrx, setLoadingTrx] = useState(false);
  const [loadingVol, setLoadingVol] = useState(false);
  const [loadingRev, setLoadingRev] = useState(false);
  const [loadingOpex, setLoadingOpex] = useState(false);
  const [loadingEbitda, setLoadingEbitda] = useState(false);
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
    const {
      proxypaySubscribers,
      proxypayEbitda,
      proxypayOpex,
      proxypayRevenues,
      proxypayTransactions,
      proxypayVolumes,
    } = reports;
    // dispatch(clearData());
    if (isEmpty(proxypaySubscribers)) {
      dispatch(getProxyPaySubscribersRequest(params));
    }
    if (isEmpty(proxypayTransactions)) {
      dispatch(getProxyPayTransactionsRequest(params));
    }
    if (isEmpty(proxypayVolumes)) {
      dispatch(getProxyPayVolumesRequest(params));
    }
    if (isEmpty(proxypayRevenues)) {
      dispatch(getProxyPayRevenuesRequest(params));
    }
    if (isEmpty(proxypayOpex)) {
      dispatch(getProxyPayOpexRequest(params));
    }
    if (isEmpty(proxypayEbitda)) {
      dispatch(getProxyPayEbitdaRequest(params));
    }
    dispatch(clearBooleans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      loadingSub,
      loadingTrx,
      loadingRev,
      loadingVol,
      loadingOpex,
      loadingEbitda,
      proxypaySubscribers,
      proxypayTransactions,
      proxypayEbitda,
      proxypayOpex,
      proxypayRevenues,
      proxypayVolumes,
      isExporting,
    } = reports;
    setLoadingSub(loadingSub);
    setLoadingTrx(loadingTrx);
    setLoadingVol(loadingVol);
    setLoadingRev(loadingRev);
    setLoadingOpex(loadingOpex);
    setLoadingEbitda(loadingEbitda);
    setProxyPaySub(proxypaySubscribers);
    setProxyPayTrx(proxypayTransactions);
    setProxyPayRev(proxypayRevenues);
    setProxyPayVol(proxypayVolumes);
    setProxyPayOpex(proxypayOpex);
    setProxyPayEbitda(proxypayEbitda);
    setIsExporting(isExporting);
  }, [reports]);

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    dispatch(getProxyPaySubscribersRequest(params));
    dispatch(getProxyPayTransactionsRequest(params));
    dispatch(getProxyPayVolumesRequest(params));
    dispatch(getProxyPayRevenuesRequest(params));
    dispatch(getProxyPayOpexRequest(params));
    dispatch(getProxyPayEbitdaRequest(params));
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
    dispatch(clearData());
    dispatch(getProxyPaySubscribersRequest(params));
    dispatch(getProxyPayTransactionsRequest(params));
    dispatch(getProxyPayVolumesRequest(params));
    dispatch(getProxyPayRevenuesRequest(params));
    dispatch(getProxyPayOpexRequest(params));
    dispatch(getProxyPayEbitdaRequest(params));
  };

  const onSeeDetailsClick = (path: string, menu: string, header: string) => {
    dispatch(changeMenu(menu));
    dispatch(changeMenuHeader(header));
    history.push(path);
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getProxyPayVolumesRequest(params));
    dispatch(getProxyPayRevenuesRequest(params));
    dispatch(getProxyPayOpexRequest(params));
    dispatch(getProxyPayEbitdaRequest(params));
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
    dispatch(getProxyPaySubscribersRequest(params));
    dispatch(getProxyPayTransactionsRequest(params));
    dispatch(getProxyPayVolumesRequest(params));
    dispatch(getProxyPayRevenuesRequest(params));
    dispatch(getProxyPayOpexRequest(params));
    dispatch(getProxyPayEbitdaRequest(params));
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
            proxyPayReport={proxyPaySub}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onReloadPage={onReloadPage}
            loading={loadingSub}
          />
          <TransactionsCard
            onSeeDetailsClick={onSeeDetailsClick}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            proxyPayReport={proxyPayTrx}
            currency={currency}
            loading={loadingTrx}
          />
          <VolumesCard
            onSeeDetailsClick={onSeeDetailsClick}
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            proxyPayReport={proxyPayVol}
            onSelectCurrency={onSelectCurrency}
            loading={loadingVol}
          />
          <RevenueChannelCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayRev}
            loading={loadingRev}
          />
          <RevenueServiceCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayRev}
            loading={loadingRev}
          />
          <OpexOverviewCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayOpex}
            loading={loadingOpex}
          />
          <EbitdaOverviewCard
            currency={currency}
            exportPage={exportPage}
            exportType={exportType}
            isExporting={isExporting}
            onExportClick={onExportClick}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayEbitda}
            loading={loadingEbitda}
          />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayOverview);
