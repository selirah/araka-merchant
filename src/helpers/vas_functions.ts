import { VASProcessed } from '../interfaces';

export const GetVASAnalytics = (vas: VASProcessed[]) => {
  let totalProcessed = 0;
  let totalArakaIncome = 0.0;
  let totalFeesCharged = 0.0;

  for (let v of vas) {
    totalProcessed += v.totalTransactions;
    totalArakaIncome += v.totalArakaIncome;
    totalFeesCharged = v.totalFeesCharged;
  }

  return { totalProcessed, totalArakaIncome, totalFeesCharged };
};
