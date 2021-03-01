import { TransactionHistory, Currency, DataStream } from '../../interfaces';

export enum TransactionTypes {
  GET_TRANSACTIONS = '@@transaction/GET_TRANSACTIONS',
  GET_TRANSACTIONS_SUCCESS = '@@transaction/GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAILURE = '@@transaction/GET_TRANSACTIONS_FAILURE',
  GET_CURRENCIES = '@@transaction/GET_CURRENCIES',
  GET_CURRENCIES_SUCCESS = '@@transaction/GET_CURRENCIES_SUCCESS',
  GET_CURRENCIES_FAILURE = '@@transaction/GET_CURRENCIES_FAILURE',
  CLEAR_TRANSACTIONS = '@@transaction/CLEAR_TRANSACTIONS',
  EXPORT_TRANSACTIONS_REQUEST = '@@transaction/EXPORT_TRANSACTIONS_REQUEST',
  EXPORT_TRANSACTIONS_SUCCESS = '@@transaction/EXPORT_TRANSACTIONS_SUCCESS',
  EXPORT_TRANSACTIONS_FAILURE = '@@transaction/EXPORT_TRANSACTIONS_FAILURE',
  DOWNLOAD_RECEIPT_REQUEST = '@@transaction/DOWNLOAD_RECEIPT_REQUEST',
  DOWNLOAD_RECEIPT_SUCCESS = '@@transaction/DOWNLOAD_RECEIPT_SUCCESS',
  DOWNLOAD_RECEIPT_FAILURE = '@@transaction/DOWNLOAD_RECEIPT_FAILURE',
}

export type TransactionState = {
  readonly transactions: TransactionHistory[];
  readonly loading: boolean;
  readonly error: any;
  readonly currencies: Currency[];
  readonly currenciesLoading: boolean;
  readonly currencyError: any;
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
};
