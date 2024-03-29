import { action } from 'typesafe-actions';
import { TransactionTypes } from './types';
import { Currency, DataStream, TransactionHistory } from '../../interfaces';

export const getTransactionsRequest = (payload: any) =>
  action(TransactionTypes.GET_TRANSACTIONS_REQUEST, payload);

export const getTransactionsSuccess = (data: TransactionHistory) =>
  action(TransactionTypes.GET_TRANSACTIONS_SUCCESS, data);

export const getTransactionsFailure = (error: any) =>
  action(TransactionTypes.GET_TRANSACTIONS_FAILURE, error);

export const getCurrencies = () => action(TransactionTypes.GET_CURRENCIES);

export const getCurrenciesSuccess = (data: Currency[]) =>
  action(TransactionTypes.GET_CURRENCIES_SUCCESS, data);

export const getCurrenciesFailure = (error: any) =>
  action(TransactionTypes.GET_CURRENCIES_FAILURE, error);

export const exportTranxRequest = (payload: any) =>
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
