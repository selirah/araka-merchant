import { action } from 'typesafe-actions';
import { TransactionTypes } from './types';
import { TransactionHistory, Currency } from '../../interfaces';

export const getTransactions = () => action(TransactionTypes.GET_TRANSACTIONS);

export const getTransactionsSuccess = (data: TransactionHistory[]) =>
  action(TransactionTypes.GET_TRANSACTIONS_SUCCESS, data);

export const getTransactionsFailure = (error: any) =>
  action(TransactionTypes.GET_TRANSACTIONS_FAILURE, error);

export const getCurrencies = () => action(TransactionTypes.GET_CURRENCIES);

export const getCurrenciesSuccess = (data: Currency[]) =>
  action(TransactionTypes.GET_CURRENCIES_SUCCESS, data);

export const getCurrenciesFailure = (error: any) =>
  action(TransactionTypes.GET_CURRENCIES_FAILURE, error);
