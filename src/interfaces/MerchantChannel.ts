export interface MerchantChannel {
  merchantId: number
  merchant: string
  paymentGateway: string
  totalAmount: number
  transactionCount: number
  totalFees: number
  totalRecords: number
  itemCost: number
  netAmount: number
  fee: number
  vat: number
  paymentGatewayShare: number
  parentMerchantShare: number
  platformShare: number
}

export interface MerchantChannelReport {
  totalRecords: number
  data: MerchantChannel[]
}
