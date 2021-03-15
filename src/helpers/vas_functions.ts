import { VASProcessed } from '../interfaces';
import { getAreaOptions } from './functions';
// import moment from 'moment';

// const getMonths = () => {
//   let labels: string[] = [];
//   for (let m = 0; m < 12; m++) {
//     let month = moment(new Date()).subtract(m, 'months').format('MMMM');
//     labels.push(month);
//   }

//   return labels;
// };

export const GetVASAnalytics = (vas: VASProcessed[]) => {
  let totalProcessed = 0;
  let totalArakaIncome = 0.0;
  let totalFeesCharged = 0.0;
  let totalAnnualFees = 0.0;
  let labels: string[] = [];
  let totalProcessedLabels: number[] = [];
  let totalArakaIncomeLabels: number[] = [];
  let totalFeesChargedLabels: number[] = [];
  let totalAnnualFeeLabels: number[] = [];
  let vasAreaChart = {},
    incomeAreaChart = {},
    feesChargedAreaChart = {},
    annualFeesAreaChart = {};

  for (let v of vas) {
    totalProcessed += v.totalTransactions;
    totalArakaIncome += v.totalArakaIncome;
    labels.push(v.month);
    // totalAnnualFees += v.annualFees;
    totalFeesCharged += v.totalFeesCharged;
    totalProcessedLabels.push(v.totalTransactions);
    totalArakaIncomeLabels.push(v.totalArakaIncome);
    totalFeesChargedLabels.push(v.totalFeesCharged);
    // totalAnnualFeeLabels.push(v.annualFees);
    totalAnnualFeeLabels.push(0);
  }

  labels = labels.reverse();
  totalProcessedLabels = totalProcessedLabels.reverse();
  totalArakaIncomeLabels = totalArakaIncomeLabels.reverse();
  totalFeesChargedLabels = totalFeesChargedLabels.reverse();
  totalAnnualFeeLabels = totalAnnualFeeLabels.reverse();

  vasAreaChart = getAreaOptions(
    labels,
    totalProcessedLabels,
    '#039BE5',
    '#B3E5FC'
  );

  incomeAreaChart = getAreaOptions(
    labels,
    totalArakaIncomeLabels,
    '#388E3C',
    '#69F0AE'
  );

  feesChargedAreaChart = getAreaOptions(
    labels,
    totalFeesChargedLabels,
    '#FFA000',
    '#FFD54F'
  );

  annualFeesAreaChart = getAreaOptions(
    labels,
    totalAnnualFeeLabels,
    '#7B1FA2',
    '#CE93D8'
  );

  return {
    totalProcessed,
    totalArakaIncome,
    totalFeesCharged,
    totalAnnualFees,
    vasAreaChart,
    incomeAreaChart,
    feesChargedAreaChart,
    annualFeesAreaChart,
  };
};
