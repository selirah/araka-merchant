export interface Page {
  paymentPageId: number;
  pageName: string;
  description: string;
  customerName: string;
  logo: string;
  amount: string;
  phoneNumber: string;
  emailAddress: string;
  redirectURL: string;
  transactionReference: string;
  currency: string;
  processId: string;
  createdWhen: string;
}
