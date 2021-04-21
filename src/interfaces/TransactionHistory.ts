import { GraphData } from './Report';

export interface TopMerchantGraphData {
  name: string;
  value: number;
  graph: {
    values: number[];
    labels: string[];
  };
}

export interface TransactionHistory {
  transactionId: number;
  createdAt: string;
  currency: string;
  amountPaid: number;
  transactionDescription: string;
  charge: number;
  vat: number;
  customer: string;
  channel: string;
  status: string;
  statusMessage: string;
  merchant: string;
  transactionDetails: {
    data?: any;
  };
}

export interface TransactionReport {
  total: GraphData;
  totalApproved: GraphData;
  totalDeclined: GraphData;
  totalAmountApproved: GraphData;
  totalAmountDeclined: GraphData;
  topMerchants: {
    firstTopMerchant: TopMerchantGraphData;
    secondTopMerchant: TopMerchantGraphData;
    thirdTopMerchant: TopMerchantGraphData;
  };
  data: TransactionHistory[];
}
