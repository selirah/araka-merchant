import { MerchantOverview } from '../interfaces';

export const GetOverviewAnalytics = (overviews: MerchantOverview[]) => {
  let totalMerchants = 0;
  let totalAmountProcessed = 0.0;
  let totalTransactions = 0;
  let merchants: string[] = [];

  for (let overview of overviews) {
    const over = merchants.find((o) => o === overview.merchant);
    if (over === undefined) {
      merchants.push(overview.merchant);
    }

    totalTransactions += overview.totalTransactions;
    totalAmountProcessed += overview.totalAmountProcessed;
  }
  totalMerchants = merchants.length;
  return { totalMerchants, totalAmountProcessed, totalTransactions };
};
