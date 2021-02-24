import React, { lazy, Suspense, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';

import {
  getTransactions,
  clearTransactions,
  exportTranxRequest,
} from '../store/transactions';
import { isEmpty } from '../helpers/isEmpty';
import { Search /*, TransactionHistory*/ } from '../interfaces';

import { WeeklyArea } from '../mock/WeeklyOverview';

const { Content } = Layout;

const Filters = lazy(() => import('../components/merchants-payout/Filters'));
const Cards = lazy(() => import('../components/merchants-payout/Cards'));
const Details = lazy(() => import('../components/merchants-payout/Details'));
const EmptyBox = lazy(() => import('../components/transactions/EmptyBox'));

const MerchantsPayouts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading, isExporting } = appSelector(
    (state) => state.transaction
  );
  // const [transactionData, setTransactionData] = useState<TransactionHistory[]>(
  //   transactions
  // );
  const [channelSearch /*, setChannelSearch*/] = useState('');
  const [searchValue /*, setSearchValue*/] = useState('');
  const [statusSearch /*, setStatusSearch*/] = useState('');
  const [fromDate /*, setFromDate*/] = useState('');
  const [toDate /*, setToDate*/] = useState('');
  const [exportType, setExportType] = useState('');

  useEffect(() => {
    dispatch(getTransactions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions());
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
    dispatch(exportTranxRequest(payload));
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
  if (!loading && isEmpty(transactions)) {
    render = (
      <EmptyBox
        header="Empty Data"
        description="There are no records available"
      />
    );
  }

  if (!loading && !isEmpty(transactions)) {
    render = <Details payouts={transactions} />;
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          <Filters />
          {!isEmpty(transactions) ? (
            <Cards areachartdata={WeeklyArea} transactions={transactions} />
          ) : null}
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Merchants Table</h4>
              <div className="utility-buttons">
                {!isEmpty(transactions) ? (
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
                  onClick={() => reloadTransaction()}
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

export default withRouter(MerchantsPayouts);
