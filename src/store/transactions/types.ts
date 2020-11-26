import { TransactionHistory, Currency } from '../../interfaces';

export enum TransactionTypes {
  GET_TRANSACTIONS = '@@transaction/GET_TRANSACTIONS',
  GET_TRANSACTIONS_SUCCESS = '@@transaction/GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAILURE = '@@transaction/GET_TRANSACTIONS_FAILURE',
  GET_CURRENCIES = '@@transaction/GET_CURRENCIES',
  GET_CURRENCIES_SUCCESS = '@@transaction/GET_CURRENCIES_SUCCESS',
  GET_CURRENCIES_FAILURE = '@@transaction/GET_CURRENCIES_FAILURE',
}

export type TransactionState = {
  readonly transactions: TransactionHistory[];
  readonly loading: boolean;
  readonly error: any;
  readonly currencies: Currency[];
  readonly currenciesLoading: boolean;
  readonly currencyError: any;
};
