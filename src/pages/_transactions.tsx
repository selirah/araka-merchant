import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Divider, Input, Spin, Tag, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { EmptyBox } from '../components/transactions/EmptyBox';
import { Transactions as Trans } from '../components/transactions/Transactions';
import { getTransactions } from '../store/transactions';
import { isEmpty } from '../helpers/isEmpty';
import { TransactionHistory, TransactionTable } from '../interfaces';
import { transactionStatus } from '../helpers/constants';
import moment from 'moment';

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.transaction);
  const { Content } = Layout;
  const { Search } = Input;
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
  }, [loading, transactions, dispatch]);

  const reloadTransaction = () => {
    dispatch(getTransactions());
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
    ];
    let dataSource: TransactionTable[] = [];

    for (let i = 0; i < transactionData.length; i++) {
      dataSource.push({
        key: transactionData[i].transactionId,
        amount: `${transactionData[i].currency} ${transactionData[
          i
        ].amountPaid.toFixed(2)}`,
        customer: transactionData[i].customer,
        transactionId: transactionData[i].transactionId,
        date: moment(
          transactionData[i].createdAt,
          'MM/DD/YYYY HH:mm:ss'
        ).format('MMMM D, YYYY (h:mm a)'),
        channel: transactionData[i].channel.replace(/([a-z])([A-Z])/g, '$1 $2'),
        status: transactionData[i].status,
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
          <Divider type="vertical" />
          <Search
            placeholder="Search transactions"
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
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
