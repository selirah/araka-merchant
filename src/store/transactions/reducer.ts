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
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as transactionReducer };
