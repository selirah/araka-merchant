import { action } from 'typesafe-actions'
import { ReportsActionTypes } from './types'
import {
  PCESReport,
  PendingTransactions,
  ProxyPayReportSub,
  ProxyPayReportTrx,
  ProxyPayReportVol,
  ProxyPayReportRev,
  ProxyPayReportOpex,
  ProxyPayReportEbitda,
  PayoutReport,
  PayoutNewRecord,
  MerchantData,
  Fee,
  DataStream
} from '../../interfaces'

export const getPCESRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PCES_REQUEST, payload)

export const getPCESSuccess = (response: PCESReport) =>
  action(ReportsActionTypes.GET_PCES_SUCCESS, response)

export const getPCESFailure = (error: any) =>
  action(ReportsActionTypes.GET_PCES_FAILURE, error)

export const getPendingTransactionsRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PENDING_TRANSACTIONS_REQUEST, payload)

export const getPendingTransactionsSuccess = (response: PendingTransactions) =>
  action(ReportsActionTypes.GET_PENDING_TRANSACTIONS_SUCCESS, response)

export const getPendingTransactionsFailure = (error: any) =>
    action(ReportsActionTypes.GET_PENDING_TRANSACTIONS_FAILURE, error)

export const getProxyPaySubscribersRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_REQUEST, payload)

export const getProxyPaySubscribersSuccess = (response: ProxyPayReportSub) =>
  action(ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_SUCCESS, response)

export const getProxyPaySubscribersFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_FAILURE, error)

export const getProxyPayTransactionsRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_REQUEST, payload)

export const getProxyPayTransactionsSuccess = (response: ProxyPayReportTrx) =>
  action(ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_SUCCESS, response)

export const getProxyPayTransactionsFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_FAILURE, error)

export const getProxyPayVolumesRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_VOLUMES_REQUEST, payload)

export const getProxyPayVolumesSuccess = (response: ProxyPayReportVol) =>
  action(ReportsActionTypes.GET_PROXYPAY_VOLUMES_SUCCESS, response)

export const getProxyPayVolumesFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_VOLUMES_FAILURE, error)

export const getProxyPayRevenuesRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_REVENUES_REQUEST, payload)

export const getProxyPayRevenuesSuccess = (response: ProxyPayReportRev) =>
  action(ReportsActionTypes.GET_PROXYPAY_REVENUES_SUCCESS, response)

export const getProxyPayRevenuesFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_REVENUES_FAILURE, error)

export const getProxyPayOpexRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_OPEX_REQUEST, payload)

export const getProxyPayOpexSuccess = (response: ProxyPayReportOpex) =>
  action(ReportsActionTypes.GET_PROXYPAY_OPEX_SUCCESS, response)

export const getProxyPayOpexFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_OPEX_FAILURE, error)

export const getProxyPayEbitdaRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_EBITDA_REQUEST, payload)

export const getProxyPayEbitdaSuccess = (response: ProxyPayReportEbitda) =>
  action(ReportsActionTypes.GET_PROXYPAY_EBITDA_SUCCESS, response)

export const getProxyPayEbitdaFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_EBITDA_FAILURE, error)

export const getPayoutRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PAYOUT_REQUEST, payload)

export const getPayoutSuccess = (response: PayoutReport | null) =>
  action(ReportsActionTypes.GET_PAYOUT_SUCCESS, response)

export const getPayoutFailure = (error: any) =>
  action(ReportsActionTypes.GET_PAYOUT_FAILURE, error)

export const postPayoutRequest = (payload: PayoutNewRecord) =>
  action(ReportsActionTypes.POST_RECORD_REQUEST, payload)

export const postPayoutSuccess = () =>
  action(ReportsActionTypes.POST_RECORD_SUCCESS)

export const postPayoutFailure = (error: any) =>
  action(ReportsActionTypes.POST_RECORD_FAILURE, error)

export const clearBooleans = () => action(ReportsActionTypes.CLEAR_BOOLEANS)

export const getMerchantsRequest = () =>
  action(ReportsActionTypes.GET_MERCHANTS_REQUEST)

export const getMerchantsSuccess = (response: MerchantData[]) =>
  action(ReportsActionTypes.GET_MERCHANTS_SUCCESS, response)

export const getMerchantsFailure = (error: any) =>
  action(ReportsActionTypes.GET_MERCHANTS_FAILURE, error)

export const getPayoutFeeRequest = (payload: any) =>
  action(ReportsActionTypes.POST_PAYOUT_FEE_REQUEST, payload)

export const getPayoutFeeSuccess = (data: Fee) =>
  action(ReportsActionTypes.POST_PAYOUT_FEE_SUCCESS, data)

export const getPayoutFeeFailure = (error: any) =>
  action(ReportsActionTypes.POST_PAYOUT_FEE_FAILURE, error)

export const clearFee = () => action(ReportsActionTypes.CLEAR_FEE)

export const exportRequest = (payload: any) =>
  action(ReportsActionTypes.EXPORT_REQUEST, payload)

export const exportSuccess = (data: DataStream) =>
  action(ReportsActionTypes.EXPORT_SUCCESS, data)

export const exportFailure = (error: any) =>
  action(ReportsActionTypes.EXPORT_FAILURE, error)

export const downloadReceiptRequest = (payout: any) =>
  action(ReportsActionTypes.DOWNLOAD_RECEIPT_REQUEST, payout)

export const downloadReceiptSuccess = (data: DataStream) =>
  action(ReportsActionTypes.DOWNLOAD_RECEIPT_SUCCESS, data)

export const downloadReceiptFailure = (error: any) =>
  action(ReportsActionTypes.DOWNLOAD_RECEIPT_FAILURE, error)

export const clearData = () => action(ReportsActionTypes.CLEAR_DATA)

export const exportPCESRequest = (payload: any) =>
  action(ReportsActionTypes.EXPORT_PCES_REQUEST, payload)

export const exportPCESSuccess = (data: DataStream) =>
  action(ReportsActionTypes.EXPORT_PCES_SUCCESS, data)

export const exportPCESFailure = (error: any) =>
  action(ReportsActionTypes.EXPORT_PCES_FAILURE, error)
