import { action } from 'typesafe-actions';
import { TransactionTypes } from './types';
import {
  TransactionHistory,
  Currency,
  Search,
  DataStream,
} from '../../interfaces';

export const getTransactions = (user: string) =>
  action(TransactionTypes.GET_TRANSACTIONS, user);

export const getTransactionsSuccess = (data: TransactionHistory[]) =>
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
