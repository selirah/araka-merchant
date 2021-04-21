export interface Payout {
  amount: number;
  currency: string;
  feesPaid: number;
  transactionId: number;
  paidOn: string;
  merchant: string;
}
