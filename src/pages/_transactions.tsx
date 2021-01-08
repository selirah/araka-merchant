import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Divider, Spin, Tag, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { EmptyBox } from '../components/transactions/EmptyBox';
import { Transactions as Trans } from '../components/transactions/Transactions';
import { FilterBoard } from '../components/transactions/FilterBoard';
import { getTransactions, clearTransactions } from '../store/transactions';
import { isEmpty } from '../helpers/isEmpty';
import { TransactionHistory, TransactionTable } from '../interfaces';
import { transactionStatus, timeZones } from '../helpers/constants';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.transaction);
  const { user } = appSelector((state) => state.auth);
  const { Content } = Layout;
  const [transactionData, setTransactionData] = useState<TransactionHistory[]>(
    transactions
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions(user!.username));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTransactionData(transactions);
  }, [loading, transactions]);

  const reloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions(user!.username));
  };

  const onSearch = (value: string) => {
    setTransactionData([]);
    if (isEmpty(value)) {
      if (!isEmpty(transactions)) {
        setTransactionData(transactions);
      }
    } else {
      if (!isEmpty(transactions)) {
        let filteredList: TransactionHistory[] = [];
        filteredList = transactions.filter((tranx) => {
          const tranxId = `${tranx.transactionId}`;
          const amount = `${tranx.amountPaid.toFixed(2)}`;
          return tranxId.includes(value) || amount.includes(value);
        });
        setTransactionData(filteredList);
      }
    }
  };

  const onStatusFilter = (value: string) => {
    setTransactionData([]);
    if (isEmpty(value)) {
      if (!isEmpty(transactions)) {
        setTransactionData(transactions);
      }
    } else {
      if (!isEmpty(transactions)) {
        let filteredList: TransactionHistory[] = [];
        filteredList = transactions.filter((tranx) => {
          const status = tranx.status;
          return status.includes(value);
        });
        setTransactionData(filteredList);
      }
    }
  };

  const onChannelFilter = (value: string) => {
    setTransactionData([]);
    if (isEmpty(value)) {
      if (!isEmpty(transactions)) {
        setTransactionData(transactions);
      }
    } else {
      if (!isEmpty(transactions)) {
        let filteredList: TransactionHistory[] = [];
        filteredList = transactions.filter((tranx) => {
          const channel = tranx.channel;
          return channel.includes(value);
        });
        setTransactionData(filteredList);
      }
    }
  };

  const onDateFilter = (value: any) => {
    setTransactionData([]);
    const from = moment(value[0]._d).tz(timeZones.kinshasa).format('X');
    const to = moment(value[1]._d).tz(timeZones.kinshasa).format('X');

    if (!isEmpty(transactions)) {
      let filteredList: TransactionHistory[] = [];
      for (let tranx of transactions) {
        const createdAt = moment(tranx.createdAt, 'MM/DD/YYYY').format('X');
        if (createdAt >= from && createdAt <= to) {
          filteredList.push(tranx);
        }
      }
      setTransactionData(filteredList);
    }
  };

  let render: React.ReactNode;
  if (loading) {
    render = (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );
  }
  if (!loading && isEmpty(transactionData)) {
    render = (
      <EmptyBox
        header={`${t('transactions.noTransactions')}`}
        description={`${t('transactions.noTransDesc')}`}
      />
    );
  }

  if (!loading && !isEmpty(transactionData)) {
    const columns = [
      {
        title: `${t('transactions.table.amount')}`,
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
      },
      {
        title: `${t('transactions.table.customer')}`,
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        sorter: (a: TransactionTable, b: TransactionTable) =>
          a.customer.length - b.customer.length,
      },
      {
        title: `${t('transactions.table.transactionId')}`,
        dataIndex: 'transactionId',
        key: 'trasactionId',
        align: 'center',
        sorter: (a: TransactionTable, b: TransactionTable) =>
          a.transactionId - b.transactionId,
      },
      {
        title: `${t('transactions.table.paidOn')}`,
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        sorter: (a: TransactionTable, b: TransactionTable) =>
          moment(a.date).tz(timeZones.kinshasa).unix() -
          moment(b.date).tz(timeZones.kinshasa).unix(),
      },
      {
        title: `${t('transactions.table.channel')}`,
        dataIndex: 'channel',
        key: 'channel',
        align: 'center',
      },
      {
        title: `${t('transactions.table.status')}`,
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status: string) => {
          let color: string = 'geekblue';
          switch (status) {
            case transactionStatus.APPROVED:
              color = 'green';
              break;
            case transactionStatus.DECLINED:
              color = 'volcano';
              break;
            case transactionStatus.CANCELED:
              color = 'geekblue';
              break;
          }
          return (
            <Tag color={color} key={status}>
              {`${t(
                `transactions.table.${status.toLocaleLowerCase()}`
              ).toLocaleUpperCase()}`}
            </Tag>
          );
        },
      },
      {
        title: `${t('transactions.table.reason')}`,
        dataIndex: 'reason',
        key: 'reason',
        align: 'center',
      },
      {
        title: `${t('transactions.table.merchant')}`,
        dataIndex: 'merchant',
        key: 'merchant',
        align: 'left',
      },
    ];
    let dataSource: TransactionTable[] = [];

    for (let transaction of transactionData) {
      dataSource.push({
        key: transaction.transactionId,
        amount: `${transaction.currency} ${transaction.amountPaid.toFixed(2)}`,
        customer: transaction.customer,
        transactionId: transaction.transactionId,
        date: moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss')
          .tz(timeZones.kinshasa)
          .format('MMMM D, YYYY (h:mm a)'),
        channel: transaction.channel.replace(/([a-z])([A-Z])/g, '$1 $2'),
        status: transaction.status,
        reason: !isEmpty(transaction.statusMessage)
          ? transaction.statusMessage
          : 'N/A',
        merchant: transaction.merchant,
      });
    }
    render = <Trans transactions={dataSource} columns={columns} pageSize={7} />;
  }

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row>
        <Col span={24}>
          <FilterBoard
            onSearch={onSearch}
            onStatusFilter={onStatusFilter}
            onChannelFilter={onChannelFilter}
            onDateFilter={onDateFilter}
          />
          <Button
            onClick={() => reloadTransaction()}
            style={{ float: 'right' }}
          >
            {t('transactions.refresh')}
          </Button>
        </Col>
        <Divider />
        <Col span={24}>{render}</Col>
      </Row>
    </Content>
  );
};

export default withRouter(Transactions);
