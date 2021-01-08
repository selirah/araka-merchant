import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Button, Divider, Row, Col, Progress, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { GraphMenu } from '../components/home/GraphMenu';
import { getTransactions } from '../store/transactions';
import moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';
import { transactionStatus } from '../helpers/constants';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';

interface IndexProps {}

const Index: React.FC<IndexProps> = (props: HighchartsReact.Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.transaction);
  const { user } = appSelector((state) => state.auth);
  const [transactionData, setTransactionData] = useState(transactions);
  // const [totalAmount, setTotalAmount] = useState('');
  const { Content } = Layout;
  const { t } = useTranslation();

  useEffect(() => {
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions(user!.username));
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
          seriesObject[
            moment(transactionData[i].createdAt, 'MM/DD/YYYY HH:mm:ss').format(
              'MMM DD'
            )
          ]
        ) {
          seriesObject[
            moment(transactionData[i].createdAt, 'MM/DD/YYYY HH:mm:ss').format(
              'MMM DD'
            )
          ] += transactionData[i].amountPaid;
        } else {
          seriesObject[
            moment(transactionData[i].createdAt, 'MM/DD/YYYY HH:mm:ss').format(
              'MMM DD'
            )
          ] = transactionData[i].amountPaid;
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
          text: `${t('dashboard.amountPaid')}`,
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
            [`${t('dashboard.successful')}`, successCount, false],
            [`${t('dashboard.processingErrors')}`, failureCount, false],
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
          <GraphMenu />
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
          {/* End HighCharts Here */}
          <div className="summaryHolder">
            <div className="bg-placeholder">
              <h3>{t('dashboard.successRate')}</h3>
              <HighchartsReact
                highcharts={Highcharts}
                options={successGraphOptions}
                {...props}
                id="successrate-donut"
              />
            </div>
            <Divider type="vertical" />
            <div className="bg-placeholder">
              <h3>{t('dashboard.paymentIssues')}</h3>
              <div id="failurerate-donut">
                <p>{t('dashboard.failureInfo')}</p>
              </div>
            </div>
          </div>
          <Divider />
          <p className="dash-summary text-center">
            0 {t('dashboard.transactions')} � 0 {t('dashboard.abandoned')}{' '}
          </p>
        </Col>
        <Col span={8}>
          <h3 className="stats text-muted text-center">
            {' '}
            {t('dashboard.statistics')}
          </h3>
          <Divider />
          <h3 className="text-muted text-center">
            {t('dashboard.nextPayout')}
          </h3>
          <p className="payout-desc">{t('dashboard.nextPayInfo')}</p>
          <Button type="primary" disabled>
            {t('dashboard.viewPastPayouts')}
          </Button>
          <Divider />
          <h2 className="text-muted text-center">
            {t('dashboard.payoutLimit')}
          </h2>
          <Progress
            percent={0}
            format={(percent) => `${percent}/50,000.00 USD`}
          />
          <Button type="primary">{t('dashboard.upgrade')}</Button>
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(Index);
