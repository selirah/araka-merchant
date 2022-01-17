import { MerchantOverview } from '../interfaces';

const sorter = (a: any, b: any) => {
  return b.amount - a.amount; // descending order;
};

export const sortByAmount = (arr: any[]) => {
  arr.sort(sorter);
};

const sortOverview = (a: MerchantOverview, b: MerchantOverview) => {
  return a.totalAmountProcessed - b.totalAmountProcessed; // ascending
};

export const sortMerchantOverview = (arr: MerchantOverview[]) => {
  arr.sort(sortOverview);

  return arr;
};

export const sortMerchantPayout = (a: string[], b: number[]) => {
  let list = [];
  for (let i = 0; i < a.length; i++) {
    list.push({ merchant: a[i], amount: b[i] });
  }
  // sort
  list.sort(sorter);

  // separate them back out
  for (let j = 0; j < list.length; j++) {
    a[j] = list[j].merchant;
    b[j] = list[j].amount;
  }

  return { a, b };
};
