import React, { lazy, Suspense, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
// import { Transactions as Trans } from '../components/transactions/Transactions';
import {
  getTransactions,
  clearTransactions,
  exportTranxRequest,
  downloadReceiptRequest,
} from '../store/transactions';
import { isEmpty } from '../helpers/isEmpty';
import { Search, TransactionHistory } from '../interfaces';
// import { transactionStatus, timeZones } from '../helpers/constants';
// import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

import { MonthlyArea } from '../mock/MonthlyOverview';

const { Content } = Layout;

const TransactionFilters = lazy(
  () => import('../components/transactions/TransactionFilters')
);

const TransactionSummaryCards = lazy(
  () => import('../components/transactions/TransactionSummaryCards')
);

const TransactionTable = lazy(
  () => import('../components/transactions/TransactionTable')
);

const TransactionDetail = lazy(
  () => import('../components/transactions/TransactionDetail')
);

const EmptyBox = lazy(() => import('../components/transactions/EmptyBox'));

const Transactions = () => {
  const [switchView, setSwitchView] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const {
    transactions,
    loading,
    isExporting,
    isRequestingDownload,
  } = appSelector((state) => state.transaction);
  // const [transactionData, setTransactionData] = useState<TransactionHistory[]>(
  //   transactions
  // );
  const { t } = useTranslation();
  const [channelSearch /*, setChannelSearch*/] = useState('');
  const [searchValue /*, setSearchValue*/] = useState('');
  const [statusSearch /*, setStatusSearch*/] = useState('');
  const [fromDate /*, setFromDate*/] = useState('');
  const [toDate /*, setToDate*/] = useState('');
  const [exportType, setExportType] = useState('');
  const [transaction, setTransaction] = useState<TransactionHistory | null>(
    null
  );

  const onClickRow = (transactionID: number) => {
    setSwitchView(!switchView);
    const trx = transactions.find((t) => t.transactionId === transactionID);
    if (trx !== undefined) {
      setTransaction(trx);
    }
  };

  const onCloseScreen = () => {
    setSwitchView(!switchView);
  };

  useEffect(() => {
    dispatch(getTransactions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions());
  };

  const onDownloadReceiptClick = (transactionId: number): void => {
    dispatch(downloadReceiptRequest(transactionId));
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
        header={`${t('transactions.noTransactions')}`}
        description={`${t('transactions.noTransDesc')}`}
      />
    );
  }

  if (!loading && !isEmpty(transactions)) {
    render = (
      <TransactionTable
        transactionHistory={transactions}
        onClickRow={onClickRow}
      />
    );
  }

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
    dispatch(exportTranxRequest(payload));
  };

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense fallback={<Spin />}>
          {!switchView ? (
            <>
              <TransactionFilters />
              {!isEmpty(transactions) ? (
                <TransactionSummaryCards
                  areachartdata={MonthlyArea}
                  transactions={transactions}
                />
              ) : null}
              <div className="margin-top">
                <Row style={{ position: 'relative' }}>
                  <h4 className="transaction-chart-text">Transactions Chart</h4>
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
                      {t('transactions.refresh')}
                    </Button>
                  </div>
                </Row>
                {render}
              </div>
            </>
          ) : (
            <TransactionDetail
              onCloseScreen={onCloseScreen}
              transaction={transaction!}
              isDownloading={isRequestingDownload}
              onDownloadReceiptClick={onDownloadReceiptClick}
            />
          )}
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Transactions);
