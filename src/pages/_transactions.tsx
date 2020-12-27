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
import { transactionStatus } from '../helpers/constants';
import moment from 'moment';

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.transaction);
  const { Content } = Layout;
  const [transactionData, setTransactionData] = useState<TransactionHistory[]>(
    transactions
  );

  useEffect(() => {
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTransactionData(transactions);
  }, [loading, transactions]);

  const reloadTransaction = () => {
    dispatch(clearTransactions());
    dispatch(getTransactions());
  };

  const onSearch = (value: string) => {
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
    const from = moment(value[0]._d).format('X');
    const to = moment(value[1]._d).format('X');

    if (!isEmpty(transactions)) {
      let filteredList: TransactionHistory[] = [];
      for (let tranx of transactions) {
        const createdAt = moment(tranx.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
          'X'
        );
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
        header="No Transactions"
        description="There're no transactions for this query. Please try another
            query or clear your filters."
      />
    );
  }

  if (!loading && !isEmpty(transactionData)) {
    const columns = [
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
      },
      {
        title: 'Transaction ID',
        dataIndex: 'transactionId',
        key: 'trasactionId',
        align: 'center',
      },
      {
        title: 'Paid on',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        // sorter: (a: any, b: any) => a.date.length - b.date.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Channel',
        dataIndex: 'channel',
        key: 'channel',
        align: 'center',
        // sorter: (a: any, b: any) => a.date.length - b.date.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Status',
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
            case transactionStatus.CANCELLED:
              color = 'geekblue';
              break;
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        },
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        align: 'center',
      },
      {
        title: 'Merchant',
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
        date: moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
          'MMMM D, YYYY (h:mm a)'
        ),
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
            Refresh
          </Button>
        </Col>
        <Divider />
        <Col span={24}>{render}</Col>
      </Row>
    </Content>
  );
};

export default withRouter(Transactions);
