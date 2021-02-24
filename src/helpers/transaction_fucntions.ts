import { TransactionHistory } from '../interfaces';
import { transactionStatus } from './constants';

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
