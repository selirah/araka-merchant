const sorter = (a: any, b: any) => {
  return b.amount - a.amount; // descending order;
};

export const sortByAmount = (arr: any[]) => {
  arr.sort(sorter);
};
