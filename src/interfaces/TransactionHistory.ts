import { GraphData } from './Report';

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
  approved: GraphData;
  declined: GraphData;
  data: TransactionHistory[];
}
