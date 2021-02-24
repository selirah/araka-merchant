import React, { lazy, Suspense, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getMerchantsOverview,
  clearOverview,
  exportOverviewRequest,
} from '../store/merchant-overview';
import { isEmpty } from '../helpers/isEmpty';
import { Search } from '../interfaces';

import { DailyArea } from '../mock/DailyOverview';

const { Content } = Layout;

const Filters = lazy(() => import('../components/merchants-overview/Filters'));
const Cards = lazy(() => import('../components/merchants-overview/Cards'));
const Details = lazy(() => import('../components/merchants-overview/Details'));
const EmptyBox = lazy(
  () => import('../components/merchants-overview/EmptyBox')
);

const MerchantsOverview = () => {
  const dispatch: AppDispatch = useDispatch();
  const { overviews, loading, isExporting } = appSelector(
    (state) => state.overviews
  );
  const [exportType, setExportType] = useState('');
  const [channelSearch /*, setChannelSearch*/] = useState('');
  const [searchValue /*, setSearchValue*/] = useState('');
  const [statusSearch /*, setStatusSearch*/] = useState('');
  const [fromDate /*, setFromDate*/] = useState('');
  const [toDate /*, setToDate*/] = useState('');

  useEffect(() => {
    dispatch(getMerchantsOverview());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadOverviews = () => {
    dispatch(clearOverview());
    dispatch(getMerchantsOverview());
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
    dispatch(exportOverviewRequest(payload));
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
  if (!loading && isEmpty(overviews)) {
    render = (
      <EmptyBox
        header="No Merchants Overview Data"
        description="There are currently no merchants overview data collected"
      />
    );
  }

  if (!loading && !isEmpty(overviews)) {
    render = <Details overviews={overviews} />;
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <Filters />
          {!isEmpty(overviews) ? (
            <Cards areachartdata={DailyArea} overviews={overviews} />
          ) : null}
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Merchants Table</h4>
              <div className="utility-buttons">
                {!isEmpty(overviews) ? (
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
                  onClick={() => reloadOverviews()}
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

export default withRouter(MerchantsOverview);
