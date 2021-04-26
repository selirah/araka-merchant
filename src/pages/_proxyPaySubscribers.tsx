import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout, Spin, Row, Button } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { isEmpty } from '../helpers/isEmpty';
import { ProxyPayReport, ProxyPayTableData } from '../interfaces';
import { getProxyPaySubscribersRequest, clearBooleans } from '../store/reports';
import moment from 'moment';

const Filter = lazy(
  () => import('../components/proxypay-reports/subscribers/Filter')
);
const Card = lazy(
  () => import('../components/proxypay-reports/subscribers/Card')
);
const MidCard = lazy(
  () => import('../components/proxypay-reports/subscribers/MidCard')
);

const Details = lazy(
  () => import('../components/proxypay-reports/subscribers/Details')
);

const { Content } = Layout;

const ProxyPaySubscribers = () => {
  const dispatch: AppDispatch = useDispatch();
  const reports = appSelector((state) => state.reports);
  const [proxyPayReport, setProxyPayReport] = useState<ProxyPayReport | null>(
    null
  );
  const [subscribers, setSubscribers] = useState<ProxyPayTableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [periodFrom, setPeriodFrom] = useState('');
  const [periodTo, setPeriodTo] = useState('');
  const params = {
    periodFrom: periodFrom,
    periodTo: periodTo,
  };

  useEffect(() => {
    dispatch(getProxyPaySubscribersRequest(params));
    dispatch(clearBooleans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { loadingSub, proxypaySubscribers } = reports;
    setLoading(loadingSub);
    setProxyPayReport(proxypaySubscribers);
    setSubscribers(
      proxypaySubscribers &&
        proxypaySubscribers.subscribers &&
        proxypaySubscribers.subscribers.data
        ? proxypaySubscribers.subscribers.data
        : []
    );
  }, [reports]);

  const onReset = (form: any) => {
    form.resetFields();
    params.periodFrom = '';
    params.periodTo = '';
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
    dispatch(getProxyPaySubscribersRequest(params));
  };

  const onReloadPage = () => {
    params.periodFrom = '';
    params.periodTo = '';
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
          <Card proxyPayReport={proxyPayReport} loading={loading} />
          <MidCard proxyPayReport={proxyPayReport} loading={loading} />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Subscribers Table</h4>
              <div className="utility-buttons new-payout">
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => onReloadPage()}
                >
                  Refresh
                </Button>
              </div>
            </Row>
            <Details subscribers={subscribers} loading={loading} />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(ProxyPaySubscribers);
