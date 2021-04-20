import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { MerchantData, PCESReport, PCESTableData } from '../interfaces';
import {
  getMerchantsRequest,
  clearBooleans,
  exportRequest,
  getPCESRequest,
} from '../store/reports';
import moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';

const { Content } = Layout;

// const EmptyBox = lazy(() => import('../components/vas-processed/EmptyBox'));
const Filters = lazy(() => import('../components/fee-reports/Filters'));
const Cards = lazy(() => import('../components/fee-reports/Cards'));
const Details = lazy(() => import('../components/fee-reports/Details'));
const EmptyBox = lazy(() => import('../components/fee-reports/EmptyBox'));

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

  useEffect(() => {
    const { merchants, loading, pces } = reports;
    if (!loading && !pces) {
      const payload = {
        periodFrom: '',
        periodTo: '',
        merchant: merchant ? merchant.name : '',
        currency: 'USD',
      };
      dispatch(getPCESRequest(payload));
    }
    dispatch(clearBooleans());
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { merchants, loading, pces, isExporting } = reports;
    setLoading(loading);
    setPces(pces ? pces.data : []);
    setMerchants(merchants);
    setPcesReport(pces);
    setIsExporting(isExporting);
  }, [reports]);

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
    const payload = {
      periodFrom: pFrom,
      periodTo: pTo,
      currency: 'USD',
      merchant: m !== undefined ? m.name : '',
    };
    dispatch(getPCESRequest(payload));
  };

  const onReset = (form: any) => {
    form.resetFields();
    const payload = {
      periodFrom: '',
      periodTo: '',
      merchant: '',
      currency: 'USD',
    };
    dispatch(getPCESRequest(payload));
  };

  const reloadReport = () => {
    const payload = {
      periodFrom: periodFrom,
      periodTo: periodTo,
      merchant: merchant ? merchant.name : '',
      currency: 'USD',
    };
    dispatch(getPCESRequest(payload));
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    const payload = {
      periodFrom: periodFrom,
      periodTo: periodTo,
      exportType: type,
      merchant: merchant ? merchant.name : '',
      currency: 'USD',
    };
    dispatch(exportRequest(payload));
  };

  let render: React.ReactNode;

  if (loading) {
    render = (
      <div className="spinner">
        <Spin />
      </div>
    );
  }

  if (!loading && isEmpty(pcesReport)) {
    render = (
      <EmptyBox
        header="PCES Reports"
        description="PCES reports returned empty results"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      />
    );
  }

  if (!loading && !isEmpty(pcesReport)) {
    render = <Details pces={pces} />;
  }

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
          <Cards pces={pces} pcesReport={pcesReport} />
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
                  >
                    Export to Excel
                  </Button>
                  <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('PDF')}
                    loading={isExporting && exportType === 'PDF'}
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
            {render}
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(FeeReports);
