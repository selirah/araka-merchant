export interface MerchantOverview {
  id: number;
  merchant: string;
  totalAmountProcessed: number;
  totalTransactions: number;
  totalArakaFees: number;
  currency: string;
}
