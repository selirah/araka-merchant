import { MerchantOverview, VASProcessed } from '../interfaces';
import { isEmpty } from './isEmpty';

export const GetOverviewsFilteredResult = (
  overviews: MerchantOverview[],
  values: any
) => {
  // set bucket to transactions
  let bucket: MerchantOverview[] = overviews;
  const { query, merchant } = values;

  if (!isEmpty(query)) {
    let filtered: MerchantOverview[] = [];
    filtered = bucket.filter((overview) => {
      const amountProcessed = `${overview.totalAmountProcessed.toFixed(2)}`;
      const transactions = `${overview.totalTransactions}`;
      const fees = `${overview.totalArakaFees.toFixed(2)}`;
      return (
        amountProcessed.includes(query) ||
        transactions.includes(query) ||
        fees.includes(query)
      );
    });
    bucket = filtered;
  }

  if (!isEmpty(merchant)) {
    let filtered: MerchantOverview[] = [];
    for (let overview of bucket) {
      if (overview.merchant === merchant) {
        filtered.push(overview);
      }
    }
    bucket = filtered;
  }

  return { bucket };
};

export const GetVASFilteredResult = (vas: VASProcessed[], values: any) => {
  // set bucket to vas
  let bucket: VASProcessed[] = vas;
  const { month, query } = values;

  if (!isEmpty(month)) {
    let filtered: VASProcessed[] = [];
    if (month === 'All') {
      bucket = vas;
    } else {
      for (let v of bucket) {
        if (v.month === month) {
          filtered.push(v);
        }
      }
      bucket = filtered;
    }
  }

  if (!isEmpty(query)) {
    let filtered: VASProcessed[] = [];
    filtered = bucket.filter((v) => {
      const amount = `${v.totalAmountProcessed.toFixed(2)}`;
      const fee = `${v.totalFeesCharged.toFixed(2)}`;
      const discount = `${v.totalArakaDiscount.toFixed(2)}`;
      const income = `${v.totalArakaIncome.toFixed(2)}`;

      return (
        amount.includes(query) ||
        fee.includes(query) ||
        discount.includes(query) ||
        income.includes(query)
      );
    });
    bucket = filtered;
  }

  return { bucket };
};
