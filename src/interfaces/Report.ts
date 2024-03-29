export interface PCESTableData {
  merchant: string
  totalTransactions: number
  totalAmount: number
  annualFees?: number
  arakaAmount: number
  totalFees: number
  totalArakaIncome: number
  otherFees?: number
  currency: string
  pcesAmount: number
  totalNetAmount: number
  merchantPayout: number
  totalVat: number
}

export interface PendingTransactionsTableData {
  transactionId: string,
  paymentGatewayReference: string,
  transactionDate: string,
  amountPaid: string,
  fee: string,
  vat: string,
  currency: string,
  customer: string,
  channel: string,
  product: string,
  merchant: string
}

export interface GraphData {
  value: number
  graph: {
    values: number[]
    labels: string[]
  }
}

export interface ProxyPayTableData {
  subscriberName: string
  status: string
  emailAddress: string
  phoneNumber: string
  createdAt: string
  lastTransactionDate: string
}

export interface ProxyPayTrxTableData {
  merchant: string
  total: number
  successful: number
  failed: number
  channel: string
}

export interface PayoutTableData {
  amount: number
  feesPaid: number
  transactionId: number
  paidOn: string
  merchant: string
  netAmount: number
}

export interface PCESReport {
  transactions: GraphData
  totalAmount: GraphData
  arakaAnnualFees: GraphData
  totalArakaFees: GraphData
  totalArakaIncome: GraphData
  pcesshare: GraphData
  totalMerchants: number
  data: PCESTableData[]
}

export interface PendingTransactions {
  totalRecords: number,
  data: PendingTransactionsTableData[]
}

export interface ProxyPayReportSub {
  total: GraphData
  active: GraphData
  newsubscribers: GraphData
  external: {
    total: GraphData
    active: GraphData
    inactive: GraphData
  }
  data: ProxyPayTableData[]
}

export interface ProxyPayReportTrx {
  overview: {
    total: GraphData
    successful: GraphData
    failed: GraphData
  }
  card: {
    total: GraphData
    successful: GraphData
    failed: GraphData
  }
  mobilemoney: {
    total: GraphData
    successful: GraphData
    failed: GraphData
  }
  data: ProxyPayTrxTableData[]
}

export interface ProxyPayReportVol {
  moneyTransfers: GraphData
  otherPayments: GraphData
  airtimeRecharge: GraphData
  airtimeRechargeSplits: {
    airtel: GraphData
    vodacom: GraphData
    orange: GraphData
    africell: GraphData
  }
}

export interface ProxyPayReportRev {
  channel: {
    card: GraphData
    mpesa: GraphData
    airtel: GraphData
  }
  service: {
    moneyTransfers: GraphData
    otherPayments: GraphData
    airtimeRecharge: GraphData
  }
}

export interface ProxyPayReportOpex {
  bankGatewayProvider: number
  airtelMoney: number
  orangeMoney: number
  mpesa: number
}

export interface ProxyPayReportEbitda {
  total: GraphData
  cards: GraphData
  mobileMoney: GraphData
}

export interface PayoutReport {
  processedTransactions: GraphData
  totalPaidOut: GraphData
  feesPaid: GraphData
  outstanding: GraphData
  data: PayoutTableData[]
}

export interface PayoutNewRecord {
  merchant: number | string
  amount: number | string
  comments: string
  currency: string
}

export interface MerchantData {
  merchantId: number
  name: string
  parentMerchantId: number
  userId: number
  image: string
  createdWhen: string
  isActive: boolean
  emailAddress: string
}

export interface MerchantActivation {
  EmailAddress: string
  IsActive: boolean
}
