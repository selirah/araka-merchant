import { GraphData } from './Report';

export interface MerchantOverview {
  id: number;
  merchant: string;
  totalAmountProcessed: number;
  totalTransactions: number;
  totalArakaFees: number;
  currency: string;
}

export interface MerchantOverviewReport {
  totalMerchants: GraphData;
  totalAmount: GraphData;
  totalTransactions: GraphData;
  data: MerchantOverview[];
}
