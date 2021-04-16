interface PCESTableData {
  merchant: string;
  totalTransactions: number;
  totalAmount: number;
  annualFees: number;
  arakaFees: number;
  totalArakaIncome: number;
  otherFees: number;
  currency: string;
}

interface GraphData {
  value: number;
  graph: {
    values: number[];
    labels: string[];
  };
}

interface ProxyPayTableData {
  subscriberName: string;
  status: string;
  emailAddress: string;
  phoneNumber: string;
  createdAt: string;
  lastTransactionDate: string;
}

export interface PayoutTableData {
  amount: number;
  feesPaid: number;
  transactionId: number;
  paidOn: string;
  merchant: string;
}

export interface PCESReport {
  transactions: GraphData;
  totalAmount: GraphData;
  arakaAnnualFees: GraphData;
  totalArakaFees: GraphData;
  totalArakaIncome: GraphData;
  pcesshare: GraphData;
  data: PCESTableData[];
}

export interface ProxyPayReport {
  subscribers: {
    total: GraphData;
    active: GraphData;
    new: GraphData;
    external: {
      total: GraphData;
      active: GraphData;
      inactive: GraphData;
    };
    data: ProxyPayTableData[];
  };
  transactions: {
    overview: {
      total: GraphData;
      successful: GraphData;
      failed: GraphData;
    };
    card: {
      total: GraphData;
      successful: GraphData;
      failed: GraphData;
    };
    mobileMoney: {
      total: GraphData;
      successful: GraphData;
      failed: GraphData;
    };
  };
  volumes: {
    moneyTransfers: GraphData;
    otherPayments: GraphData;
    airtimeRecharge: GraphData;
    airtimeRechargeSplits: {
      airtel: GraphData;
      vodacom: GraphData;
      orange: GraphData;
      africell: GraphData;
    };
  };
  revenues: {
    channel: {
      cards: GraphData;
      mpesa: GraphData;
      airtel: GraphData;
    };
    service: {
      cards: GraphData;
      mpesa: GraphData;
      airtel: GraphData;
    };
  };
  opex: {
    bankGatewayProvider: GraphData;
    airtelMoney: GraphData;
    orangeMoney: GraphData;
    mpesa: GraphData;
  };
  ebitda: {
    proxyPayRevenue: {
      total: GraphData;
      cards: GraphData;
      mobileMoney: GraphData;
    };
  };
}

export interface PayoutReport {
  processedTransactions: GraphData;
  totalPaidOut: GraphData;
  feesPaid: GraphData;
  outstanding: GraphData;
  data: PayoutTableData[];
}

export interface PayoutNewRecord {
  merchant: number | string;
  amount: number | string;
  comments: string;
  currency: string;
}

export interface MerchantData {
  merchantId: number;
  name: string;
  parentMerchantId: number;
  userId: number;
  image: string;
  createdWhen: string;
}
