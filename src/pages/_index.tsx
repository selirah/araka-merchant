import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Divider, Row, Col, Spin, Space } from 'antd';
import {
  LineChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import { GraphMenu } from '../components/home/GraphMenu';
import { DateRangeFilter } from '../components/home/DateRangeFilter';
import { DateFilter } from '../components/home/DateFilter';
import { MerchantList } from '../components/home/MerchantList';
import { getTransactions } from '../store/transactions';
import { isEmpty } from '../helpers/isEmpty';
import { transactionStatus, timeZones } from '../helpers/constants';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { TransactionHistory } from '../interfaces';
import { CardView } from '../components/home/CardView';

interface IndexProps {}

const Index: React.FC<IndexProps> = (props: HighchartsReact.Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.transaction);
  const { user } = appSelector((state) => state.auth);
  const [transactionData, setTransactionData] = useState(transactions);
  const { Content } = Layout;
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState(null);
  const [trx, setTrx] = useState(0);
  const [amt, setAmt] = useState(0);
  const [comm, setComm] = useState(0);
  const [date, setDate] = useState(moment(new Date()).format('MMM DD'));
  const [searchDate, setSearchDate] = useState(null);
  let merchants = [];

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
  let volTrx = 0,
    volAmt = 0,
    volComm = 0,
    totalComm = 0;
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
    let cDate = moment(new Date()).format('MMM DD');
    if (!dateRange) {
      for (let i = 0; i <= 31; i++) {
        const currentDate = moment(new Date());
        const transactionDate = currentDate
          .subtract(i, 'days')
          .format('MMM DD');

        if (transactionDate === cDate) {
          seriesObject['Today'] = 0;
        } else {
          seriesObject[transactionDate] = 0;
        }
      }
    }

    for (let i = 0; i < transactionData.length; i++) {
      if (transactionData[i].status === transactionStatus.APPROVED) {
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
        totalComm = totalComm + transactionData[i].charge;
        const m = merchants.find((m) => m === transactionData[i].merchant);
        if (m === undefined) {
          merchants.push(transactionData[i].merchant);
        }
      }

      if (
        moment(transactionData[i].createdAt, 'MM/DD/YYYY HH:mm:ss').format(
          'MMM DD'
        ) === cDate &&
        transactionData[i].status === transactionStatus.APPROVED
      ) {
        volTrx = volTrx + i;
        volAmt = volAmt + transactionData[i].amountPaid;
        volComm = volComm + transactionData[i].charge;
      }
    }

    if (volTrx > 0) {
      setTrx(volTrx);
    }
    if (volAmt > 0) {
      setAmt(volAmt);
    }
    if (volComm > 0) {
      setComm(volComm);
    }

    failureCount = transactionData.length - successCount;
    Object.keys(seriesObject).forEach((r) => series.push([r, seriesObject[r]]));
    render = `USD ${amount.toFixed(2)}`;
    transactionsGraphOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '9px',
            fontFamily: 'Verdana, sans-serif',
            textOverflow: 'none',
          },
        },
        crosshair: true,
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

  const filterDate = (dateRange: any) => {
    if (dateRange) {
      const from = moment(dateRange[0]).tz(timeZones.kinshasa).format('X');
      const to = moment(dateRange[1]).tz(timeZones.kinshasa).format('X');
      setDateRange(dateRange);
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
    } else {
      setDateRange(null);
    }
  };

  const filterVolume = (value: any) => {
    let trxValue = 0;
    let amtValue = 0;
    let charge = 0;
    if (value) {
      const date = moment(value).tz(timeZones.kinshasa).format('MMM DD');
      for (let tranx of transactions) {
        const c = moment(tranx.createdAt, 'MM/DD/YYYY HH:mm:ss')
          .tz(timeZones.kinshasa)
          .format('MMM DD');
        if (c === date && tranx.status === transactionStatus.APPROVED) {
          trxValue = trxValue + 1;
          amtValue = amtValue + tranx.amountPaid;
          charge = charge + tranx.charge;
        }
      }
      setTrx(trxValue);
      setAmt(amtValue);
      setComm(charge);
      setDate(moment(value).format('MMM DD'));
      setSearchDate(value);
    } else {
      trxValue = 0;
      amtValue = 0;
      charge = 0;
      const cDate = moment(new Date()).format('MMM DD');
      for (let tranx of transactions) {
        const c = moment(tranx.createdAt, 'MM/DD/YYYY HH:mm:ss')
          .tz(timeZones.kinshasa)
          .format('MMM DD');
        if (c === cDate && tranx.status === transactionStatus.APPROVED) {
          trxValue = trxValue + 1;
          amtValue = amtValue + tranx.amountPaid;
          charge = charge + tranx.charge;
        }
      }
      setTrx(trxValue);
      setAmt(amtValue);
      setComm(charge);
      setDate(moment(new Date()).format('MMM DD'));
    }
  };
  const onSelectMerchant = (value: string) => {
    let charges = 0;
    let trx = 0;
    let amt = 0;
    if (value !== '') {
      if (!isEmpty(searchDate)) {
        const date = moment(searchDate).tz(timeZones.kinshasa).format('MMM DD');
        for (let tranx of transactions) {
          const c = moment(tranx.createdAt, 'MM/DD/YYYY HH:mm:ss')
            .tz(timeZones.kinshasa)
            .format('MMM DD');
          if (
            value === tranx.merchant &&
            tranx.status === transactionStatus.APPROVED &&
            c === date
          ) {
            charges = charges + tranx.charge;
            trx = trx + 1;
            amt = amt + tranx.amountPaid;
          }
        }
      } else {
        for (let tranx of transactions) {
          if (
            value === tranx.merchant &&
            tranx.status === transactionStatus.APPROVED
          ) {
            charges = charges + tranx.charge;
            trx = trx + 1;
            amt = amt + tranx.amountPaid;
          }
        }
      }
    } else {
      let charges = 0;
      let trx = 0;
      let amt = 0;
      if (!isEmpty(searchDate)) {
        const date = moment(searchDate).tz(timeZones.kinshasa).format('MMM DD');
        for (let tranx of transactions) {
          const c = moment(tranx.createdAt, 'MM/DD/YYYY HH:mm:ss')
            .tz(timeZones.kinshasa)
            .format('MMM DD');
          if (tranx.status === transactionStatus.APPROVED && c === date) {
            charges = charges + tranx.charge;
            trx = trx + 1;
            amt = amt + tranx.amountPaid;
          }
        }
      } else {
        for (let tranx of transactions) {
          if (tranx.status === transactionStatus.APPROVED) {
            charges = charges + tranx.charge;
            trx = trx + 1;
            amt = amt + tranx.amountPaid;
          }
        }
      }
    }
    setComm(charges);
    setTrx(trx);
    setAmt(amt);
  };

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
          <Space>
            <GraphMenu />{' '}
            {user && user.username === 'gorgievski@pces.mk' ? (
              <DateRangeFilter filterDate={filterDate} dateRange={dateRange} />
            ) : null}
          </Space>
          {user && user.username === 'gorgievski@pces.mk' ? (
            <Space style={{ float: 'right' }}>
              <DateFilter filterVolume={filterVolume} />
              <MerchantList
                merchants={merchants}
                onSelectMerchant={onSelectMerchant}
              />
            </Space>
          ) : null}
        </Col>

        <Divider />
        {user && user.username === 'gorgievski@pces.mk' ? (
          <Col span={24}>
            <Row gutter={16}>
              <Col span={6}>
                <CardView
                  value={`USD ${amt.toFixed(2)}`}
                  title={`Amount Volume (${
                    date === moment(new Date()).format('MMM DD')
                      ? 'Today'
                      : date
                  })`}
                  icon={<PieChartOutlined />}
                />
              </Col>
              <Col span={6}>
                <CardView
                  value={trx}
                  title={`Transaction Volume (${
                    date === moment(new Date()).format('MMM DD')
                      ? 'Today'
                      : date
                  })`}
                  icon={<LineChartOutlined />}
                />
              </Col>
              <Col span={6}>
                <CardView
                  value={`USD ${comm.toFixed(2)}`}
                  title={`Charges (${
                    date === moment(new Date()).format('MMM DD')
                      ? 'Today'
                      : date
                  })`}
                  icon={<BarChartOutlined />}
                />
              </Col>
              <Col span={6}>
                <CardView
                  value={`USD ${totalComm.toFixed(2)}`}
                  title="Charges (All Merchants)"
                  icon={<AreaChartOutlined />}
                />
              </Col>
            </Row>
          </Col>
        ) : null}

        <Col span={24}>
          <Row style={{ display: 'block', textAlign: 'center' }}>
            <div className="total-amount">{render}</div>
          </Row>
          {/* Insert HighCharts Here */}
          <Row>
            <Col span={24}>
              <figure className="highcharts-figure">
                <div id="container">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={transactionsGraphOptions}
                    {...props}
                    id="transactions-bar"
                    style={{ width: '100% !important' }}
                  />
                </div>
              </figure>
            </Col>
          </Row>
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
      </Row>
    </Content>
  );
};

export default withRouter(Index);
