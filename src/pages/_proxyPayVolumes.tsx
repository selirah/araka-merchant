import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { ProxyPayReport } from '../interfaces';
import { getProxyPayVolumesRequest, clearBooleans } from '../store/reports';
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
  const [loading, setLoading] = useState(false);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const [currency, setCurrency] = useState('USD');
  const params = {
    periodFrom: periodFrom,
    periodTo: periodTo,
    currency: currency,
  };

  useEffect(() => {
    dispatch(getProxyPayVolumesRequest(params));
    dispatch(clearBooleans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loadingVol, proxypayVolumes } = reports;
    setLoading(loadingVol);
    setProxyPayReport(proxypayVolumes);
  }, [reports]);

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
    dispatch(getProxyPayVolumesRequest(params));
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
    dispatch(getProxyPayVolumesRequest(params));
  };

  const onReloadPage = () => {
    params.periodFrom = '';
    params.periodTo = '';
    dispatch(getProxyPayVolumesRequest(params));
  };

  const onSelectCurrency = (value: string) => {
    setCurrency(value);
    params.currency = value;
    dispatch(getProxyPayVolumesRequest(params));
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
          <VolumesCard
            proxyPayReport={proxyPayReport}
            onReloadPage={onReloadPage}
            currency={currency}
            onSelectCurrency={onSelectCurrency}
            loading={loading}
          />
          <AirtimeRechargeSplitCard
            currency={currency}
            onSelectCurrency={onSelectCurrency}
            proxyPayReport={proxyPayReport}
            loading={loading}
          />
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPayVolumes);
