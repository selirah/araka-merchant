import { Reducer } from 'redux';
import { TransactionState, TransactionTypes } from './types';
import { AuthActionTypes } from '../auth';

export const initialState: TransactionState = {
  currencies: [],
  currenciesLoading: false,
  currencyError: undefined,
  error: undefined,
  loading: false,
  transactions: [],
  isExporting: false,
  exportStream: undefined,
  isExportSuccess: false,
  isExportError: false,
  exportError: undefined,
};

const reducer: Reducer<TransactionState> = (state = initialState, action) => {
  switch (action.type) {
    case TransactionTypes.GET_TRANSACTIONS:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case TransactionTypes.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case TransactionTypes.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TransactionTypes.GET_CURRENCIES:
      return {
        ...state,
        currenciesLoading: true,
      };
    case TransactionTypes.GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
        currenciesLoading: false,
      };
    case TransactionTypes.GET_CURRENCIES_FAILURE:
      return {
        ...state,
        currenciesLoading: false,
        currencyError: action.payload,
      };
    case TransactionTypes.CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: [],
      };
    case TransactionTypes.EXPORT_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isExporting: true,
      };
    case TransactionTypes.EXPORT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isExporting: false,
        exportStream: action.payload,
        isExportError: false,
        isExportSuccess: true,
        exportError: undefined,
      };
    case TransactionTypes.EXPORT_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isExporting: false,
        exportStream: undefined,
        isExportError: true,
        isExportSuccess: false,
        exportError: action.payload,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as transactionReducer };
