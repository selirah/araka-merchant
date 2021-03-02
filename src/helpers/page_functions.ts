import { Page } from '../interfaces';
import { isEmpty } from './isEmpty';
import moment from 'moment';

export const GetPagesFilteredResult = (pages: Page[], values: any) => {
  // set bucket to transactions
  let bucket: Page[] = pages;
  const { periodFrom, periodTo, query } = values;
  let from: string | number;
  let to: string | number;

  // check if dates are not empty
  if (!isEmpty(periodFrom) && !isEmpty(periodTo)) {
    let filtered: Page[] = [];
    let pFrom = moment(periodFrom).format('MM/DD/YYYY 00:00:00');
    from = moment(pFrom, 'MM/DD/YYYY 00:00:00').format('X');
    to = moment(periodTo._d).format('X');
    for (let page of bucket) {
      const createdAt = moment(page.createdWhen, 'MM/DD/YYYY HH:mm:ss').format(
        'X'
      );
      if (createdAt >= from && createdAt <= to) {
        filtered.push(page);
      }
    }
    bucket = filtered;
  }

  if (!isEmpty(query)) {
    let filtered: Page[] = [];
    filtered = bucket.filter((page) => {
      const amount = `${page.amount}`;
      const pageName = page.pageName.toLocaleLowerCase();
      return amount.includes(query) || pageName.includes(query);
    });
    bucket = filtered;
  }

  return { bucket };
};
