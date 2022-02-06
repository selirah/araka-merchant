import { GraphData } from './Report'

interface TopMerchantGraphData {
  name: string
  value: number
  graph: {
    values: number[]
    labels: string[]
  }
}

interface BarGraphData {
  labels: string[]
  approvedValues: number[]
  declinedValues: number[]
}

export interface TransactionHistory {
  transactionId: number
  createdAt: string
  currency: string
  amountPaid: number
  transactionDescription: string
  charge: number
  vat: number
  customer: string
  channel: string
  status: string
  statusMessage?: string
  merchant: string
  transactionDetails: {
    data: any
  }
}

export interface Transaction {
  total: GraphData
  totalAmountApproved: GraphData
  totalAmountDeclined: GraphData
  data: TransactionHistory[]
}

export interface TransactionReport {
  total: GraphData
  totalValues: BarGraphData
  totalAmountApproved: GraphData
  totalAmountDeclined: GraphData
  topMerchants: {
    firstTopMerchant: TopMerchantGraphData
    secondTopMerchant: TopMerchantGraphData
    thirdTopMerchant: TopMerchantGraphData
  }
}
