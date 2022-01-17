export interface MerchantPayout {
  merchant: string;
  transactionId: string;
  status: string;
  balance: string;
  currency: string;
  paidOn: string;
  channel: string;
  customer: string;
  reference: string;
}
