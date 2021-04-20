import { action } from 'typesafe-actions';
import { TransactionTypes } from './types';
import {
  Currency,
  Search,
  DataStream,
  TransactionReport,
} from '../../interfaces';

export const getTransactions = (payload: any) =>
  action(TransactionTypes.GET_TRANSACTIONS, payload);

export const getTransactionsSuccess = (data: TransactionReport) =>
  action(TransactionTypes.GET_TRANSACTIONS_SUCCESS, data);

export const getTransactionsFailure = (error: any) =>
  action(TransactionTypes.GET_TRANSACTIONS_FAILURE, error);

export const getCurrencies = () => action(TransactionTypes.GET_CURRENCIES);

export const getCurrenciesSuccess = (data: Currency[]) =>
  action(TransactionTypes.GET_CURRENCIES_SUCCESS, data);

export const getCurrenciesFailure = (error: any) =>
  action(TransactionTypes.GET_CURRENCIES_FAILURE, error);

export const clearTransactions = () =>
  action(TransactionTypes.CLEAR_TRANSACTIONS);

export const exportTranxRequest = (payload: Search) =>
  action(TransactionTypes.EXPORT_TRANSACTIONS_REQUEST, payload);

export const exportTranxSuccess = (data: DataStream) =>
  action(TransactionTypes.EXPORT_TRANSACTIONS_SUCCESS, data);

export const exportTranxFailure = (error: any) =>
  action(TransactionTypes.EXPORT_TRANSACTIONS_FAILURE, error);

export const downloadReceiptRequest = (transactionId: number) =>
  action(TransactionTypes.DOWNLOAD_RECEIPT_REQUEST, transactionId);

export const downloadReceiptSuccess = (data: DataStream) =>
  action(TransactionTypes.DOWNLOAD_RECEIPT_SUCCESS, data);

export const downloadReceiptFailure = (error: any) =>
  action(TransactionTypes.DOWNLOAD_RECEIPT_FAILURE, error);
