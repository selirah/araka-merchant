import { PayoutTableData } from '../interfaces';
import { isEmpty } from './isEmpty';

export const GetPayoutFilteredResult = (
  payouts: PayoutTableData[],
  values: any
) => {
  // set bucket to transactions
  let bucket: PayoutTableData[] = payouts;
  const { merchant } = values;

  if (!isEmpty(merchant)) {
    let filtered: PayoutTableData[] = [];
    for (let payout of bucket) {
      if (payout.merchant === merchant) {
        filtered.push(payout);
      }
    }
    bucket = filtered;
  }

  return { bucket };
};
