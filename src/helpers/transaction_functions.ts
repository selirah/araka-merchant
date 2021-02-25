import { TransactionHistory } from '../interfaces';
import { transactionStatus } from './constants';
import { isEmpty } from './isEmpty';
import moment from 'moment';

export const GetTransactionsAnalytics = (
  transactions: TransactionHistory[]
) => {
  let totalMerchants = 0;
  let totalAmountProcessed = 0.0;
  let totalAmountDeclined = 0.0;
  let totalAmountPaidOut = 0.0;
  let totalTransactions = 0;
  let merchants: string[] = [];

  for (let trx of transactions) {
    const over = merchants.find((o) => o === trx.merchant);
    if (over === undefined) {
      merchants.push(trx.merchant);
    }

    totalTransactions += 1;

    if (trx.status === transactionStatus.APPROVED) {
      totalAmountProcessed += trx.amountPaid;
    }

    if (trx.status === transactionStatus.DECLINED) {
      totalAmountDeclined += trx.amountPaid;
    }
  }
  totalMerchants = merchants.length;
  totalAmountPaidOut = 0;
  return {
    totalMerchants,
    totalAmountProcessed,
    totalAmountPaidOut,
    totalAmountDeclined,
    totalTransactions,
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
    from = moment(periodFrom._d).format('X');
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
