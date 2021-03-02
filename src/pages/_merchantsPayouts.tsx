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
import { Search } from '../interfaces';
import { GetTransactionsFilteredResult } from '../helpers/transaction_functions';
import moment from 'moment';

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
  const [trans, setTrans] = useState(transactions);
  const [channelSearch, setChannelSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [statusSearch, setStatusSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [exportType, setExportType] = useState('');
  // const [transaction, setTransaction] = useState(
  //   null
  // );

  useEffect(() => {
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTrans(transactions);
  }, [transactions]);

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
        <Spin />
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
    render = <Details payouts={trans} />;
  }

  const onReset = (form: any) => {
    form.resetFields();
    setTrans(transactions);
  };

  const onSearch = (values: any) => {
    const { status, channel, periodFrom, periodTo, query } = values;
    const { bucket } = GetTransactionsFilteredResult(transactions, values);
    setChannelSearch(channel !== undefined ? channel : '');
    setStatusSearch(status !== undefined ? status : '');
    setSearchValue(query !== undefined ? query : '');
    if (periodFrom !== undefined) {
      setFromDate(moment(periodFrom._d, 'MMMM D, YYYY').format('MM/DD/YYYY'));
    }
    if (periodTo !== undefined) {
      setToDate(moment(periodTo._d, 'MMMM D, YYYY').format('MM/DD/YYYY'));
    }
    setTrans(bucket);
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
          <Filters transactions={trans} onReset={onReset} onSearch={onSearch} />
          {!isEmpty(transactions) ? <Cards transactions={trans} /> : null}
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">Merchants Table</h4>
              <div className="utility-buttons">
                {!isEmpty(trans) ? (
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
