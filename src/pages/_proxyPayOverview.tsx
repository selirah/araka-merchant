import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { changeMenu, changeMenuHeader } from '../store/utils';
import {
  ProxyPayReportSub,
  ProxyPayReportTrx,
  ProxyPayReportVol,
  ProxyPayReportRev,
  ProxyPayReportOpex,
  ProxyPayReportEbitda,
} from '../interfaces';
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
import { proxyPayDataTypes } from '../helpers/constants';

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
  const [proxyPaySub, setProxyPaySub] = useState<ProxyPayReportSub | null>(
    null
  );
  const [proxyPayTrx, setProxyPayTrx] = useState<ProxyPayReportTrx | null>(
    null
  );
  const [proxyPayVol, setProxyPayVol] = useState<ProxyPayReportVol | null>(
    null
  );
  const [proxyPayRev, setProxyPayRev] = useState<ProxyPayReportRev | null>(
    null
  );
  const [proxyPayOpex, setProxyPayOpex] = useState<ProxyPayReportOpex | null>(
    null
  );
  const [
    proxyPayEbitda,
    setProxyPayEbitda,
  ] = useState<ProxyPayReportEbitda | null>(null);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = {
    periodFrom: periodFrom,
    periodTo: periodTo,
    currency: currency,
    exportType: exportType,
  };

  useEffect(() => {
    const { proxypaySubscribers } = reports;
    if (isEmpty(proxypaySubscribers)) {
      dispatch(getProxyPaySubscribersRequest(params));
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
      isLoaded,
      dataType,
    } = reports;

    // trying to load the data one after the other
    if (
      isLoaded &&
      dataType === proxyPayDataTypes.subscribers &&
      isEmpty(proxypayTransactions)
    ) {
      dispatch(getProxyPayTransactionsRequest(params));
    }
    if (
      isLoaded &&
      dataType === proxyPayDataTypes.transactions &&
      isEmpty(proxypayVolumes)
    ) {
      dispatch(getProxyPayVolumesRequest(params));
    }
    if (
      isLoaded &&
      dataType === proxyPayDataTypes.volumes &&
      isEmpty(proxypayRevenues)
    ) {
      dispatch(getProxyPayRevenuesRequest(params));
    }
    if (
      isLoaded &&
      dataType === proxyPayDataTypes.revenues &&
      isEmpty(proxypayOpex)
    ) {
      dispatch(getProxyPayOpexRequest(params));
    }
    if (
      isLoaded &&
      dataType === proxyPayDataTypes.opex &&
      isEmpty(proxypayEbitda)
    ) {
      dispatch(getProxyPayEbitdaRequest(params));
    }

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
  }, [reports, dispatch, params]);

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    dispatch(clearBooleans());
    dispatch(clearData());
    dispatch(getProxyPaySubscribersRequest(params));
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
    dispatch(clearBooleans());
    dispatch(clearData());
    dispatch(getProxyPaySubscribersRequest(params));
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
    dispatch(clearBooleans());
    dispatch(clearData());
    dispatch(getProxyPaySubscribersRequest(params));
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
