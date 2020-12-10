export interface PaymentPage {
  PaymentPageId?: number;
  PageName: string;
  Description: string;
  CustomerName: boolean;
  Logo: string;
  Amount: string;
  PhoneNumber: boolean;
  EmailAddress: boolean;
  RedirectUrl: string;
  TransactionReference: string;
  Currency: string;
  ProcessId: string;
}
