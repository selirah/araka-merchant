import { MerchantOverview } from '../interfaces';
import { getAreaOptions } from './functions';
import { sortMerchantOverview } from './sorter';

export const GetOverviewAnalytics = (overviews: MerchantOverview[]) => {
  let totalMerchants = 0;
  let totalAmountProcessed = 0.0;
  let totalTransactions = 0;
  let merchants: string[] = [];
  let labels: string[] = [];
  let merchantTransactions: number[] = [];
  let merchantAmountProcessed: number[] = [];
  let trxAreaChart = {};
  let amtAreaChart = {};

  for (let overview of sortMerchantOverview(overviews)) {
    const over = merchants.find((o) => o === overview.merchant);
    if (over === undefined) {
      merchants.push(overview.merchant);
    }

    totalTransactions += overview.totalTransactions;
    totalAmountProcessed += overview.totalAmountProcessed;
    labels.push(overview.merchant);
    merchantTransactions.push(overview.totalTransactions);
    merchantAmountProcessed.push(overview.totalAmountProcessed);
  }
  totalMerchants = merchants.length;
  trxAreaChart = getAreaOptions(
    labels,
    merchantTransactions,
    '#03A9F4',
    '#B3E5FC'
  );

  amtAreaChart = getAreaOptions(
    labels,
    merchantAmountProcessed,
    '#FFB300',
    '#FFE082'
  );

  return {
    totalMerchants,
    totalAmountProcessed,
    totalTransactions,
    trxAreaChart,
    amtAreaChart,
  };
};
