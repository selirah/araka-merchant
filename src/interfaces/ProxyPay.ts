export interface ProxyPayTrx {
  merchant: string;
  total: number;
  successful: number;
  failed: number;
  type: string;
}

export interface Subscriber {
  subscriber: string;
  status: string;
  email: string;
  phone: string;
  createdAt: string;
  lastTransactionDate: string;
}
