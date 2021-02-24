import { TransactionHistory } from '../interfaces';
import { transactionStatus } from './constants';
import moment from 'moment';
import {
  calculateDailyTransactionTotals,
  calculateDailyValues,
  calculateMonthlyTransactionTotal,
  calculateMonthlyValues,
  calculateWeeklyTransactionTotals,
  calculateWeeklyValues,
  calculateYearValues,
} from './helperFunctions';

export const CalculateTransactionTotals = (
  transactions: TransactionHistory[],
  review: string
) => {
  let total = 0,
    approved = 0.0,
    declined = 0.0;

  switch (review) {
    case 'yearly':
      total = transactions.length;
      for (let trx of transactions) {
        switch (trx.status) {
          case transactionStatus.APPROVED:
            approved = approved + trx.amountPaid;

            break;
          case transactionStatus.DECLINED:
            declined = declined + trx.amountPaid;
            break;
        }
      }
      break;
    case 'daily':
      const DailyLabels = getLabels(review)!;
      for (let label of DailyLabels) {
        let hour = label.split(':')[0];
        let ampm = label.split(':')[1].split(' ')[1];
        const lbl = `${hour}${ampm}`;
        const {
          trxTotal,
          totalApprovedAmt,
          totalDeclinedAmt,
        } = calculateDailyTransactionTotals(transactions, lbl);

        total += trxTotal;
        approved += totalApprovedAmt;
        declined += totalDeclinedAmt;
      }
      break;
    case 'weekly':
      const WeeklyLabels = getLabels(review)!;
      for (let label of WeeklyLabels) {
        const {
          trxTotal,
          totalApprovedAmt,
          totalDeclinedAmt,
        } = calculateWeeklyTransactionTotals(transactions, label);
        total += trxTotal;
        approved += totalApprovedAmt;
        declined += totalDeclinedAmt;
      }
      break;
    case 'monthly':
      const MonthlyLabels = getLabels(review)!;
      for (let label of MonthlyLabels) {
        const {
          trxTotal,
          totalApprovedAmt,
          totalDeclinedAmt,
        } = calculateMonthlyTransactionTotal(transactions, label);
        total += trxTotal;
        approved += totalApprovedAmt;
        declined += totalDeclinedAmt;
      }
      break;
  }

  return { total, approved, declined };
};

export const GetAreaAndBarPoints = (
  transactions: TransactionHistory[],
  review: string
) => {
  let labels = getLabels(review)!;
  let trxAreaChart,
    approvedAreaChart,
    declinedAreaChart = {};
  let trxData = [];
  let trxApproved = [];
  let trxDeclined = [];
  let trxApprovedAmt = [];
  let trxDeclinedAmt = [];
  let barChart = {};
  let merchantsArr = [];

  switch (review) {
    case 'yearly':
      for (let lbl of labels) {
        const {
          total,
          approvedAmt,
          declinedAmt,
          totalApproved,
          totalDeclined,
          merchants,
        } = calculateYearValues(transactions, lbl);
        trxData.push(total);
        trxApproved.push(totalApproved);
        trxDeclined.push(totalDeclined);
        trxApprovedAmt.push(approvedAmt);
        trxDeclinedAmt.push(declinedAmt);
        merchantsArr.push(merchants);
      }

      trxAreaChart = getAreaOptions(labels, trxData, '#03A9F4', '#B3E5FC');
      approvedAreaChart = getAreaOptions(
        labels,
        trxApprovedAmt,
        '#03A9F4',
        '#B3E5FC'
      );
      declinedAreaChart = getAreaOptions(
        labels,
        trxDeclinedAmt,
        '#03A9F4',
        '#B3E5FC'
      );
      barChart = getBarOptions(labels, trxApproved, trxDeclined);
      break;
    case 'daily':
      for (let label of labels) {
        let hour = label.split(':')[0];
        let ampm = label.split(':')[1].split(' ')[1];
        const lbl = `${hour}${ampm}`;
        const {
          total,
          approvedAmt,
          declinedAmt,
          totalApproved,
          totalDeclined,
          merchants,
        } = calculateDailyValues(transactions, lbl);
        trxData.push(total);
        trxApproved.push(totalApproved);
        trxDeclined.push(totalDeclined);
        trxApprovedAmt.push(approvedAmt);
        trxDeclinedAmt.push(declinedAmt);
        merchantsArr.push(merchants);
      }
      trxAreaChart = getAreaOptions(labels, trxData, '#1ce1ac', '#1ce1ac50');
      approvedAreaChart = getAreaOptions(
        labels,
        trxApprovedAmt,
        '#1ce1ac',
        '#1ce1ac50'
      );
      declinedAreaChart = getAreaOptions(
        labels,
        trxDeclinedAmt,
        '#1ce1ac',
        '#1ce1ac50'
      );
      barChart = getBarOptions(labels, trxApproved, trxDeclined);
      break;
    case 'weekly':
      for (let label of labels) {
        const {
          total,
          approvedAmt,
          declinedAmt,
          totalApproved,
          totalDeclined,
          merchants,
        } = calculateWeeklyValues(transactions, label);
        trxData.push(total);
        trxApproved.push(totalApproved);
        trxDeclined.push(totalDeclined);
        trxApprovedAmt.push(approvedAmt);
        trxDeclinedAmt.push(declinedAmt);
        merchantsArr.push(merchants);
      }
      trxAreaChart = getAreaOptions(labels, trxData, '#5E35B1', '#D1C4E9');
      approvedAreaChart = getAreaOptions(
        labels,
        trxApprovedAmt,
        '#5E35B1',
        '#D1C4E9'
      );
      declinedAreaChart = getAreaOptions(
        labels,
        trxDeclinedAmt,
        '#5E35B1',
        '#D1C4E9'
      );
      barChart = getBarOptions(labels, trxApproved, trxDeclined);
      break;
    case 'monthly':
      // let's reverse the labels to start from last 30 days date and not today
      labels = labels.reverse();
      for (let label of labels) {
        const {
          total,
          approvedAmt,
          declinedAmt,
          totalApproved,
          totalDeclined,
          merchants,
        } = calculateMonthlyValues(transactions, label);
        trxData.push(total);
        trxApproved.push(totalApproved);
        trxDeclined.push(totalDeclined);
        trxApprovedAmt.push(approvedAmt);
        trxDeclinedAmt.push(declinedAmt);
        merchantsArr.push(merchants);
      }
      trxAreaChart = getAreaOptions(labels, trxData, '#FFA000', '#FFE082');
      approvedAreaChart = getAreaOptions(
        labels,
        trxApprovedAmt,
        '#FFA000',
        '#FFE082'
      );
      declinedAreaChart = getAreaOptions(
        labels,
        trxDeclinedAmt,
        '#FFA000',
        '#FFE082'
      );
      barChart = getBarOptions(labels, trxApproved, trxDeclined);
      break;
  }
  return {
    trxAreaChart,
    approvedAreaChart,
    declinedAreaChart,
    barChart,
    merchantsArr,
  };
};

const getLabels = (review: string) => {
  let labels: string[] = [];
  switch (review) {
    case 'yearly':
      labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      break;
    case 'daily':
      labels = [
        '12:00 AM',
        '01:00 AM',
        '02:00 AM',
        '03:00 AM',
        '04:00 AM',
        '05:00 AM',
        '06:00 AM',
        '07:00 AM',
        '08:00 AM',
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM',
        '10:00 PM',
        '11:00 PM',
      ];
      break;
    case 'weekly':
      labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      break;
    case 'monthly':
      // this is a special case
      // we have to get last 30 days dates
      const todayDate = moment(new Date()).format('MMM DD');
      // have to get for all 30 days
      for (let d = 0; d < 30; d++) {
        let date = moment(new Date()).subtract(d, 'd').format('MMM DD');
        if (date === todayDate) {
          date = 'Today';
        }
        labels.push(date);
      }
      break;
  }
  return labels;
};

const getAreaOptions = (
  labels: string[],
  dataPoints: any[],
  borderColor: string,
  backgroundColor: string
) => {
  const data = {
    height: 100,
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        borderColor: borderColor,
        borderWidth: 1,
        fill: true,
        backgroundColor: backgroundColor,
        pointHoverBorderColor: 'transparent',
      },
    ],
    options: {
      maintainAspectRatio: true,
      hover: {
        mode: 'nearest',
        intersect: false,
      },

      layout: {
        padding: {
          left: -10,
          right: 0,
          top: 2,
          bottom: -10,
        },
      },
      legend: {
        display: false,
        labels: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
              color: '#e5e9f2',
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              display: false,
              stepSize: 20,
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              beginAtZero: true,
              fontSize: 11,
              display: false,
            },
          },
        ],
      },
    },
  };
  return data;
};

const getBarOptions = (
  labels: string[],
  approvedDataPoints: any[],
  declinedDataPoints: any[]
) => {
  const data = {
    height: 100,
    labels: labels,
    datasets: [
      {
        label: 'DECLINED/CANCELLED TRANSACTIONS',
        data: declinedDataPoints,
        backgroundColor: '#f55c29',
      },
      {
        label: 'APPROVED TRANSACTIONS',
        data: approvedDataPoints,
        backgroundColor: '#35b9e6',
      },
    ],
    options: {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontSize: 10,
          padding: 30,
          boxWidth: 10,
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: '#e5e9f2',
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: '#182b49',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: '#182b49',
            },
          },
        ],
      },
    },
  };
  return data;
};

export const GetTopMerchants = (
  transactions: TransactionHistory[],
  review: string,
  merchantsArr: any[]
) => {
  let merchants: string[] = [];
  let merchantTotals: any[] = [];

  switch (review) {
    case 'yearly':
      for (let trx of transactions) {
        const merchant = merchants.find((m) => m === trx.merchant);
        if (merchant === undefined) {
          merchants.push(trx.merchant);
        }
      }
      // loop through and get and add their amounts
      for (let m of merchants) {
        // merchantTotals[m] = getMerchantsAmount(merchantsArr, m);
        merchantTotals.push({
          merchant: m,
          amount: getMerchantsAmount(merchantsArr, m),
        });
      }
      break;
    case 'daily':
      for (let trx of transactions) {
        const merchant = merchants.find((m) => m === trx.merchant);
        if (merchant === undefined) {
          merchants.push(trx.merchant);
        }
      }
      // loop through and get and add their amounts
      for (let m of merchants) {
        // merchantTotals[m] = getMerchantsAmount(merchantsArr, m);
        merchantTotals.push({
          merchant: m,
          amount: getMerchantsAmount(merchantsArr, m),
        });
      }
      break;
    case 'weekly':
      for (let trx of transactions) {
        const merchant = merchants.find((m) => m === trx.merchant);
        if (merchant === undefined) {
          merchants.push(trx.merchant);
        }
      }
      // loop through and get and add their amounts
      for (let m of merchants) {
        // merchantTotals[m] = getMerchantsAmount(merchantsArr, m);
        merchantTotals.push({
          merchant: m,
          amount: getMerchantsAmount(merchantsArr, m),
        });
      }
      break;
    case 'monthly':
      for (let trx of transactions) {
        const merchant = merchants.find((m) => m === trx.merchant);
        if (merchant === undefined) {
          merchants.push(trx.merchant);
        }
      }
      // loop through and get and add their amounts
      for (let m of merchants) {
        // merchantTotals[m] = getMerchantsAmount(merchantsArr, m);
        merchantTotals.push({
          merchant: m,
          amount: getMerchantsAmount(merchantsArr, m),
        });
      }
      break;
  }

  return { merchantTotals };
};

const getMerchantsAmount = (merchantsArr: any[], merchant: string) => {
  let amt = 0.0;

  for (let m of merchantsArr) {
    if (m[merchant]) {
      amt += m[merchant];
    }
  }
  return amt;
};
