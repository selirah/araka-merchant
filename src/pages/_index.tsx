import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Layout,
  Dropdown,
  Button,
  Divider,
  Row,
  Col,
  Progress,
  Spin,
} from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { DownOutlined } from '@ant-design/icons';
import { GraphMenu } from '../components/home/GraphMenu';
import { getTransactions } from '../store/transactions';
import moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';
import { transactionStatus } from '../helpers/constants';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface IndexProps {}

const Index: React.FC<IndexProps> = (props: HighchartsReact.Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.transaction);
  const [transactionData, setTransactionData] = useState(transactions);
  // const [totalAmount, setTotalAmount] = useState('');
  const { Content } = Layout;

  useEffect(() => {
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTransactionData(transactions);
  }, [loading, transactions, dispatch]);

  let render: React.ReactNode;
  let transactionsGraphOptions: Highcharts.Options = {};
  let successGraphOptions: Highcharts.Options = {};
  // let failureGraphOptions: Highcharts.Options = {};
  if (loading) {
    render = (
      <div className="spinner">
        <Spin size="small" />
      </div>
    );
  }
  if (!loading && isEmpty(transactionData)) {
    render = 'USD 0.00';
  }
  if (!loading && !isEmpty(transactionData)) {
    let amount = 0,
      seriesObject: any = {},
      series: any = [],
      successCount: any = 0,
      failureCount: any = 0;
    for (let i = 1; i <= 20; i++) {
      const currentDate = moment(new Date());
      const transactionDate = currentDate.subtract(i, 'days').format('MMM DD');
      seriesObject[transactionDate] = 0;
    }
    for (let i = 0; i < transactionData.length; i++) {
      const currentDate = moment(new Date());
      const numDays = moment(
        transactionData[i].createdAt,
        'MM/DD/YYYY HH:mm:ss'
      );

      const diff = currentDate.diff(numDays, 'days');

      if (
        diff <= 30 &&
        transactionData[i].status === transactionStatus.APPROVED
      ) {
        successCount += 1;
        amount = amount + transactionData[i].amountPaid;
        if (
          seriesObject[moment(transactionData[i].createdAt).format('MMM DD')]
        ) {
          seriesObject[moment(transactionData[i].createdAt).format('MMM DD')] +=
            transactionData[i].amountPaid;
        } else {
          seriesObject[moment(transactionData[i].createdAt).format('MMM DD')] =
            transactionData[i].amountPaid;
        }
      }
    }
    failureCount = transactionData.length - successCount;
    Object.keys(seriesObject).forEach((r) => series.push([r, seriesObject[r]]));
    render = `USD ${amount.toFixed(2)}`;
    transactionsGraphOptions = {
      title: {
        text: '',
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 1,
        title: {
          text: 'Amount paid (total)',
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: 'Transactions total',
          type: 'column',
          data: series.reverse(),
        },
      ],
    };
    successGraphOptions = {
      title: {
        text: '',
      },
      series: [
        {
          type: 'pie',
          allowPointSelect: true,
          name: 'Transactions',
          innerSize: '90%',
          keys: ['name', 'y', 'selected', 'sliced'],
          data: [
            ['Successful', successCount, false],
            ['Processing Errors', failureCount, false],
          ],
          showInLegend: true,
        },
      ],
    };
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
        <Col span={16} className="b-right">
          <Dropdown overlay={<GraphMenu />}>
            <Button>
              Last 30 days <DownOutlined />
            </Button>
          </Dropdown>
          <Divider />
          <div className="total-amount">{render}</div>
          {/* Insert HighCharts Here */}

          <HighchartsReact
            highcharts={Highcharts}
            options={transactionsGraphOptions}
            {...props}
            id="transactions-bar"
          />

          <Divider />
          {/* <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider>No activity for this period</Divider>
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider /> */}
          {/* End HighCharts Here */}
          <div className="summaryHolder">
            <div className="bg-placeholder">
              <h3>Success Rate </h3>
              <HighchartsReact
                highcharts={Highcharts}
                options={successGraphOptions}
                {...props}
                id="successrate-donut"
              />
            </div>
            <Divider type="vertical" />
            <div className="bg-placeholder">
              <h3>Payment Issues</h3>
              <div id="failurerate-donut">
                <p>
                  This chart breaks down the reasons why your transactions fail
                </p>
              </div>
            </div>
          </div>
          <Divider />
          <p className="dash-summary text-center">
            0 transactions � 0 abandoned{' '}
          </p>
        </Col>
        <Col span={8}>
          <h3 className="stats text-muted text-center">Statistics</h3>
          <Divider />
          <h3 className="text-muted text-center">Next Payout</h3>
          <p className="payout-desc">
            There's no pending payout for your business
          </p>
          <Button type="primary" disabled>
            View past payouts
          </Button>
          <Divider />
          <h2 className="text-muted text-center">Payout Limit</h2>
          <Progress
            percent={0}
            format={(percent) => `${percent}/50,000.00 USD`}
          />
          <Button type="primary">Upgrade your business</Button>
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(Index);
