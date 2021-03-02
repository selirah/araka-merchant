import { TransactionHistory } from '../interfaces';
import { transactionStatus } from './constants';
import { isEmpty } from './isEmpty';
import moment from 'moment';
import { getAreaOptions } from './functions';

export const GetTransactionsAnalytics = (
  transactions: TransactionHistory[]
) => {
  let totalMerchants = 0;
  let totalAmountProcessed = 0.0;
  let totalAmountDeclined = 0.0;
  let totalAmountPaidOut = 0.0;
  let totalTransactions = 0;
  let merchants: string[] = [];
  let amtAreaChart = {};
  let paidOutAreaChart = {};
  let labels: string[] = [];
  let amtLabel: number[] = [];
  let paidLabel: number[] = [];

  for (let trx of transactions) {
    const over = merchants.find((o) => o === trx.merchant);
    if (over === undefined) {
      merchants.push(trx.merchant);
    }
    totalTransactions += 1;

    if (trx.status === transactionStatus.APPROVED) {
      totalAmountProcessed += trx.amountPaid;
      const lbl = labels.find((l) => l === trx.merchant);
      if (lbl === undefined) {
        labels.push(trx.merchant);
      }
    }

    if (
      trx.status === transactionStatus.DECLINED ||
      trx.status === transactionStatus.CANCELED
    ) {
      totalAmountDeclined += trx.amountPaid;
    }
  }

  for (let lbl of labels) {
    let merchantAmount = 0.0;
    for (let trx of transactions) {
      if (trx.merchant === lbl && trx.status === transactionStatus.APPROVED) {
        merchantAmount += trx.amountPaid;
      }
    }
    amtLabel.push(merchantAmount);
    paidLabel.push(0); // for now paid out is 0
  }

  totalMerchants = merchants.length;
  totalAmountPaidOut = 0; // for now paid out is 0
  amtAreaChart = getAreaOptions(labels, amtLabel, '#D81B60', '#F48FB1');
  paidOutAreaChart = getAreaOptions(labels, paidLabel, '#C0CA33', '#E6EE9C');

  return {
    totalMerchants,
    totalAmountProcessed,
    totalAmountPaidOut,
    totalAmountDeclined,
    totalTransactions,
    amtAreaChart,
    paidOutAreaChart,
  };
};

export const GetTransactionsFilteredResult = (
  transactions: TransactionHistory[],
  values: any
) => {
  // set bucket to transactions
  let bucket: TransactionHistory[] = transactions;
  const { status, channel, periodFrom, periodTo, query, merchant } = values;
  let from: string | number;
  let to: string | number;

  // check if dates are not empty
  if (!isEmpty(periodFrom) && !isEmpty(periodTo)) {
    let filtered: TransactionHistory[] = [];
    let pFrom = moment(periodFrom).format('MM/DD/YYYY 00:00:00');
    from = moment(pFrom, 'MM/DD/YYYY 00:00:00').format('X');
    to = moment(periodTo._d).format('X');

    for (let trx of bucket) {
      const createdAt = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
        'X'
      );
      if (createdAt >= from && createdAt <= to) {
        filtered.push(trx);
      }
    }
    bucket = filtered;
  }
  if (!isEmpty(channel)) {
    let filtered: TransactionHistory[] = [];
    for (let trx of bucket) {
      if (trx.channel === channel) {
        filtered.push(trx);
      }
    }
    bucket = filtered;
  }

  if (!isEmpty(status)) {
    let filtered: TransactionHistory[] = [];
    for (let trx of bucket) {
      if (trx.status === status) {
        filtered.push(trx);
      }
    }
    bucket = filtered;
  }

  if (!isEmpty(query)) {
    let filtered: TransactionHistory[] = [];
    filtered = bucket.filter((tranx) => {
      const tranxId = `${tranx.transactionId}`;
      const amount = `${tranx.amountPaid.toFixed(2)}`;
      const customer = tranx.customer.toLocaleLowerCase();
      return (
        tranxId.includes(query) ||
        amount.includes(query) ||
        customer.includes(query)
      );
    });
    bucket = filtered;
  }

  if (!isEmpty(merchant)) {
    let filtered: TransactionHistory[] = [];
    for (let trx of bucket) {
      if (trx.merchant === merchant) {
        filtered.push(trx);
      }
    }
    bucket = filtered;
  }

  return { bucket };
};
