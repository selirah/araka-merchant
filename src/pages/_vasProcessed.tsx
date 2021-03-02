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
import { Search } from '../interfaces';
import { GetVASFilteredResult } from '../helpers/report_functions';

const { Content } = Layout;

const Filters = lazy(() => import('../components/vas-processed/Filters'));
const Cards = lazy(() => import('../components/vas-processed/Cards'));
const Details = lazy(() => import('../components/vas-processed/Details'));
const EmptyBox = lazy(() => import('../components/vas-processed/EmptyBox'));

const VASProcessed = () => {
  const dispatch: AppDispatch = useDispatch();
  const { vas, loading, isExporting } = appSelector((state) => state.vas);
  const [exportType, setExportType] = useState('');
  const [channelSearch /*, setChannelSearch*/] = useState('');
  const [searchValue /*, setSearchValue*/] = useState('');
  const [statusSearch /*, setStatusSearch*/] = useState('');
  const [fromDate /*, setFromDate*/] = useState('');
  const [toDate /*, setToDate*/] = useState('');
  const [vasData, setVasData] = useState(vas);

  useEffect(() => {
    if (isEmpty(vas) && !loading) {
      dispatch(getVasRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVasData(vas);
  }, [vas]);

  const reloadVas = () => {
    dispatch(clearVAS());
    dispatch(getVasRequest());
  };

  const onExportClick = (type: string) => {
    setExportType(type);
    const payload: Search = {
      ChannelSearch: channelSearch,
      DateSearch: {
        from: fromDate,
        to: toDate,
      },
      ExportType: type,
      SearchValue: searchValue,
      StatusSearch:
        statusSearch.charAt(0).toUpperCase() +
        statusSearch.slice(1).toLowerCase(),
    };
    // console.log(payload);
    dispatch(exportVASRequest(payload));
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin />
      </div>
    );
  }
  if (!loading && isEmpty(vas)) {
    render = (
      <EmptyBox
        header="No VAS Processed Data"
        description="There are currently no VAS processed data collected"
      />
    );
  }

  if (!loading && !isEmpty(vas)) {
    render = <Details vas={vasData} />;
  }

  const onReset = (form: any) => {
    form.resetFields();
    setVasData(vas);
  };

  const onSearch = (values: any) => {
    const { bucket } = GetVASFilteredResult(vas, values);
    setVasData(bucket);
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
          {!isEmpty(vasData) ? (
            <>
              <Filters onReset={onReset} onSearch={onSearch} />
              <Cards vas={vasData} />
            </>
          ) : null}
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">VAS Processed Table</h4>
              <div className="utility-buttons">
                {!isEmpty(vasData) ? (
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
                ) : null}
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadVas()}
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

export default withRouter(VASProcessed);
