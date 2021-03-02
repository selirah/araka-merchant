import { TransactionHistory } from '../interfaces';
import { transactionStatus } from './constants';
import moment from 'moment';

export const calculateDailyTransactionTotals = (
  transactions: TransactionHistory[],
  label: string
) => {
  let trxTotal = 0,
    totalApprovedAmt = 0.0,
    totalDeclinedAmt = 0.0;
  // we have to make sure transactions were performed today
  let cDate = moment(new Date()).format('MM/DD/YYYY');
  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
      'MM/DD/YYYY'
    );

    let t = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('hh:mm A');
    let hour = t.split(':')[0];
    let ampm = t.split(':')[1].split(' ')[1];
    const time = `${hour}${ampm}`;

    if (tDate === cDate && time === label) {
      trxTotal += 1;
    }
    if (
      tDate === cDate &&
      time === label &&
      trx.status === transactionStatus.APPROVED
    ) {
      totalApprovedAmt += trx.amountPaid;
    }
    if (
      tDate === cDate &&
      time === label &&
      trx.status === transactionStatus.DECLINED
    ) {
      totalDeclinedAmt += trx.amountPaid;
    }
  }
  return { trxTotal, totalApprovedAmt, totalDeclinedAmt };
};

export const calculateWeeklyTransactionTotals = (
  transactions: TransactionHistory[],
  label: string
) => {
  // let's get current date and 7 days from current date
  const todayDate = moment(new Date()).format('X');

  let sevenDays = moment(new Date())
    .subtract(7, 'days')
    .format('MM/DD/YYYY 00:00:00');

  const last7Days = moment(sevenDays, 'MM/DD/YYYY HH:mm:ss').format('X');

  let lastSevenDaysTransactions: TransactionHistory[] = [];
  let trxTotal = 0,
    totalApprovedAmt = 0.0,
    totalDeclinedAmt = 0.0;

  // get transactions that falls within those last 7 days
  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('X');
    // check if trasnaction exists within these dates
    if (tDate >= last7Days && tDate <= todayDate) {
      lastSevenDaysTransactions.push(trx);
    }
  }

  // now let's loop through our new data to get the actual calculations
  for (let trx of lastSevenDaysTransactions) {
    const day = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('ddd');
    if (day === label) {
      trxTotal += 1;
    }
    if (day === label && trx.status === transactionStatus.APPROVED) {
      totalApprovedAmt += trx.amountPaid;
    }
    if (day === label && trx.status === transactionStatus.DECLINED) {
      totalDeclinedAmt += trx.amountPaid;
    }
  }
  return { trxTotal, totalApprovedAmt, totalDeclinedAmt };
};

export const calculateMonthlyTransactionTotal = (
  transactions: TransactionHistory[],
  label: string
) => {
  // let's get current date and 30 days from current date
  const todayDate = moment(new Date()).format('X');
  const last30Days = moment(new Date()).subtract(30, 'd').format('X');

  let last30DaysTransactions: TransactionHistory[] = [];
  let trxTotal = 0,
    totalApprovedAmt = 0.0,
    totalDeclinedAmt = 0.0;
  // get transactions that falls within those last 30 days
  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('X');
    // check if trasnaction exists within these dates
    if (tDate >= last30Days && tDate <= todayDate) {
      last30DaysTransactions.push(trx);
    }
  }

  // now let's loop through our new data to get the actual calculations
  const cDate = moment(new Date()).format('MMM DD');
  for (let trx of last30DaysTransactions) {
    let date = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('MMM DD');
    if (date === cDate) {
      date = 'Today';
    }
    if (date === label) {
      trxTotal += 1;
    }
    if (date === label && trx.status === transactionStatus.APPROVED) {
      totalApprovedAmt += trx.amountPaid;
    }
    if (date === label && trx.status === transactionStatus.DECLINED) {
      totalDeclinedAmt += trx.amountPaid;
    }
  }
  return { trxTotal, totalApprovedAmt, totalDeclinedAmt };
};

export const calculateYearValues = (
  transactions: TransactionHistory[],
  month: string
) => {
  let total = 0;
  let approvedAmt = 0.0;
  let declinedAmt = 0.0;
  let totalApproved = 0;
  let totalDeclined = 0;
  let merchants: any = {};

  for (let trx of transactions) {
    const m = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('MMM');
    if (m === month) {
      total += 1;
    }
    if (m === month && trx.status === transactionStatus.APPROVED) {
      approvedAmt += trx.amountPaid;
      totalApproved += 1;
      // if merchant is already there, let us add their amount to what is current there
      if (merchants[trx.merchant]) {
        merchants[trx.merchant] = merchants[trx.merchant] + trx.amountPaid;
      } else {
        // add afresh
        merchants[trx.merchant] = trx.amountPaid;
      }
    }
    if (m === month && trx.status === transactionStatus.DECLINED) {
      declinedAmt += trx.amountPaid;
      totalDeclined += 1;
    }
  }
  // console.log(merchants);
  return {
    total,
    approvedAmt,
    declinedAmt,
    totalApproved,
    totalDeclined,
    merchants,
  };
};

export const calculateDailyValues = (
  transactions: TransactionHistory[],
  time: string
) => {
  let total = 0;
  let approvedAmt = 0.0;
  let declinedAmt = 0.0;
  let totalApproved = 0;
  let totalDeclined = 0;
  let merchants: any = {};

  // we have to make sure transactions were performed today
  let cDate = moment(new Date()).format('MM/DD/YYYY');
  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
      'MM/DD/YYYY'
    );
    let t = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('hh:mm A');
    let hour = t.split(':')[0];
    let ampm = t.split(':')[1].split(' ')[1];
    const tm = `${hour}${ampm}`;

    if (tDate === cDate && tm === time) {
      total += 1;
    }
    if (
      tDate === cDate &&
      tm === time &&
      trx.status === transactionStatus.APPROVED
    ) {
      approvedAmt += trx.amountPaid;
      totalApproved += 1;
      // if merchant is already there, let us add their amount to what is current there
      if (merchants[trx.merchant]) {
        merchants[trx.merchant] = merchants[trx.merchant] + trx.amountPaid;
      } else {
        // add afresh
        merchants[trx.merchant] = trx.amountPaid;
      }
    }
    if (
      tDate === cDate &&
      tm === time &&
      trx.status === transactionStatus.DECLINED
    ) {
      declinedAmt += trx.amountPaid;
      totalDeclined += 1;
    }
  }
  return {
    total,
    approvedAmt,
    declinedAmt,
    totalApproved,
    totalDeclined,
    merchants,
  };
};

export const calculateWeeklyValues = (
  transactions: TransactionHistory[],
  day: string
) => {
  let total = 0;
  let approvedAmt = 0.0;
  let declinedAmt = 0.0;
  let totalApproved = 0;
  let totalDeclined = 0;
  let merchants: any = {};

  const todayDate = moment(new Date()).format('X');
  let sevenDays = moment(new Date())
    .subtract(7, 'days')
    .format('MM/DD/YYYY 00:00:00');

  const last7Days = moment(sevenDays, 'MM/DD/YYYY HH:mm:ss').format('X');
  let lastSevenDaysTransactions: TransactionHistory[] = [];

  // get transactions that falls within those last 7 days
  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('X');
    // check if trasnaction exists within these dates
    if (tDate >= last7Days && tDate <= todayDate) {
      lastSevenDaysTransactions.push(trx);
    }
  }

  // now let's loop through our new data to get the actual calculations
  for (let trx of lastSevenDaysTransactions) {
    const d = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('ddd');
    if (d === day) {
      total += 1;
    }
    if (d === day && trx.status === transactionStatus.APPROVED) {
      approvedAmt += trx.amountPaid;
      totalApproved += 1;
      // if merchant is already there, let us add their amount to what is current there
      if (merchants[trx.merchant]) {
        merchants[trx.merchant] = merchants[trx.merchant] + trx.amountPaid;
      } else {
        // add afresh
        merchants[trx.merchant] = trx.amountPaid;
      }
    }
    if (d === day && trx.status === transactionStatus.DECLINED) {
      declinedAmt += trx.amountPaid;
      totalDeclined += 1;
    }
  }
  return {
    total,
    approvedAmt,
    declinedAmt,
    totalApproved,
    totalDeclined,
    merchants,
  };
};

export const calculateMonthlyValues = (
  transactions: TransactionHistory[],
  day: string
) => {
  let total = 0;
  let approvedAmt = 0.0;
  let declinedAmt = 0.0;
  let totalApproved = 0;
  let totalDeclined = 0;
  let merchants: any = {};

  // let's get current date and 30 days from current date
  const todayDate = moment(new Date()).format('X');
  const last30Days = moment(new Date()).subtract(30, 'd').format('X');

  let last30DaysTransactions: TransactionHistory[] = [];
  // get transactions that falls within those last 30 days
  for (let trx of transactions) {
    const tDate = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('X');
    // check if trasnaction exists within these dates
    if (tDate >= last30Days && tDate <= todayDate) {
      last30DaysTransactions.push(trx);
    }
  }

  // now let's loop through our new data to get the actual calculations
  const cDate = moment(new Date()).format('MMM DD');
  for (let trx of last30DaysTransactions) {
    let date = moment(trx.createdAt, 'MM/DD/YYYY HH:mm:ss').format('MMM DD');
    if (date === cDate) {
      date = 'Today';
    }
    if (date === day) {
      total += 1;
    }
    if (date === day && trx.status === transactionStatus.APPROVED) {
      approvedAmt += trx.amountPaid;
      totalApproved += 1;
      // if merchant is already there, let us add their amount to what is current there
      if (merchants[trx.merchant]) {
        merchants[trx.merchant] = merchants[trx.merchant] + trx.amountPaid;
      } else {
        // add afresh
        merchants[trx.merchant] = trx.amountPaid;
      }
    }
    if (date === day && trx.status === transactionStatus.DECLINED) {
      declinedAmt += trx.amountPaid;
      totalDeclined += 1;
    }
  }
  return {
    total,
    approvedAmt,
    declinedAmt,
    totalApproved,
    totalDeclined,
    merchants,
  };
};

export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
