import { TransactionHistory } from '../interfaces';
import { transactionStatus } from './constants';
import moment from 'moment';

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
  }

  return { total, approved, declined };
};

export const GetAreaPoints = (
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

  switch (review) {
    case 'yearly':
      for (let lbl of labels) {
        const { total, approved, declined } = calculateYearValues(
          transactions,
          lbl
        );
        trxData.push(total);
        trxApproved.push(approved);
        trxDeclined.push(declined);
      }
      trxAreaChart = getAreaOptions(labels, trxData);
      approvedAreaChart = getAreaOptions(labels, trxApproved);
      declinedAreaChart = getAreaOptions(labels, trxDeclined);
      break;
  }
  return { trxAreaChart, approvedAreaChart, declinedAreaChart };
};

const calculateYearValues = (
  transactions: TransactionHistory[],
  month: string
) => {
  let total = 0;
  let approved = 0.0;
  let declined = 0.0;
  for (let trx of transactions) {
    const m = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('MMM');
    if (m === month) {
      total += 1;
    }
    if (m === month && trx.status === transactionStatus.APPROVED) {
      approved += trx.amountPaid;
    }
    if (m === month && trx.status === transactionStatus.DECLINED) {
      declined += trx.amountPaid;
    }
  }
  return { total, approved, declined };
};

const getAreaOptions = (labels: string[], dataPoints: any[]) => {
  const data = {
    height: 100,
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        borderColor: '#03A9F4',
        borderWidth: 1,
        fill: true,
        backgroundColor: '#B3E5FC',
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

const getLabels = (review: string) => {
  let label;
  switch (review) {
    case 'yearly':
      label = [
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
  }
  return label;
};
