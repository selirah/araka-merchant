import {
  PCESReport,
  ProxyPayReport,
  PayoutReport,
  MerchantData,
  Fee,
  DataStream,
  PCESTableData,
} from '../../interfaces';

export enum ReportsActionTypes {
  GET_PCES_REQUEST = '@@reports/GET_PCES_REQUEST',
  GET_PCES_SUCCESS = '@@reports/GET_PCES_SUCCESS',
  GET_PCES_FAILURE = '@@reports/GET_PCES_FAILURE',
  GET_PROXYPAY_REQUEST = '@@reports/GET_PROXYPAY_REQUEST',
  GET_PROXYPAY_SUCCESS = '@@reports/GET_PROXYPAY_SUCCESS',
  GET_PROXYPAY_FAILURE = '@@reports/GET_PROXYPAY_FAILURE',
  GET_PAYOUT_REQUEST = '@@reports/GET_PAYOUT_REQUEST',
  GET_PAYOUT_SUCCESS = '@@reports/GET_PAYOUT_SUCCESS',
  GET_PAYOUT_FAILURE = '@@reports/GET_PAYOUT_FAILURE',
  POST_RECORD_REQUEST = '@@reports/POST_RECORD_REQUEST',
  POST_RECORD_SUCCESS = '@@reports/POST_RECORD_SUCCESS',
  POST_RECORD_FAILURE = '@@reports/POST_RECORD_FAILURE',
  CLEAR_BOOLEANS = '@@reports/CLEAR_BOOLEANS',
  CLEAR_DATA = '@@reports/CLEAR_DATA',
  GET_MERCHANTS_REQUEST = '@@reports/GET_MERCHANTS_REQUEST',
  GET_MERCHANTS_SUCCESS = '@@reports/GET_MERCHANTS_SUCCESS',
  GET_MERCHANTS_FAILURE = '@@reports/GET_MERCHANTS_FAILURE',
  POST_PAYOUT_FEE_REQUEST = '@@reports/POST_PAYOUT_FEE_REQUEST',
  POST_PAYOUT_FEE_SUCCESS = '@@reports/POST_PAYOUT_FEE_SUCCESS',
  POST_PAYOUT_FEE_FAILURE = '@@reports/POST_PAYOUT_FEE_FAILURE',
  EXPORT_REQUEST = '@@reports/EXPORT_REQUEST',
  EXPORT_SUCCESS = '@@reports/EXPORT_SUCCESS',
  EXPORT_FAILURE = '@@reports/EXPORT_FAILURE',
  CLEAR_FEE = '@@reports/CLEAR_FEE',
  DOWNLOAD_RECEIPT_REQUEST = '@@reports/DOWNLOAD_RECEIPT_REQUEST',
  DOWNLOAD_RECEIPT_SUCCESS = '@@reports/DOWNLOAD_RECEIPT_SUCCESS',
  DOWNLOAD_RECEIPT_FAILURE = '@@reports/DOWNLOAD_RECEIPT_FAILURE',
}

export type ReportsState = {
  readonly loading: boolean;
  readonly isSubmitting: boolean;
  readonly success: boolean;
  readonly failure: boolean;
  readonly error: any;
  readonly pces: PCESReport | null;
  readonly proxypay: ProxyPayReport | null;
  readonly payouts: PayoutReport | null;
  readonly merchants: MerchantData[];
  readonly fee: Fee | undefined;
  readonly feeError: any;
  readonly feeLoading: boolean;
  readonly isExporting: boolean;
  readonly isExportSuccess: boolean;
  readonly isExportError: boolean;
  readonly exportStream: DataStream | undefined;
  readonly exportError: any;
  readonly isRequestingDownload: boolean;
  readonly downloadRecieptSuccess: boolean;
  readonly downloadRecieptError: boolean;
  readonly downloadReceiptStream: DataStream | undefined;
  readonly downloadError: any;
  readonly pcesdata: PCESTableData[];
};
