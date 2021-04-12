import { Page, TransactionHistory, Fee } from '../../interfaces';

export enum PaymentPagesTypes {
  GET_PAYMENT_PAGES_REQUEST = '@@payment-pages/GET_PAYMENT_PAGES_REQUEST',
  GET_PAYMENT_PAGES_SUCCESS = '@@payment-pages/GET_PAYMENT_PAGES_SUCCESS',
  GET_PAYMENT_PAGES_FAILURE = '@@payment-pages/GET_PAYMENT_PAGES_FAILURE',
  ADD_PAYMENT_PAGE_REQUEST = '@@payment-pages/ADD_PAYMENT_PAGE_REQUEST',
  ADD_PAYMENT_PAGE_SUCCESS = '@@payment-pages/ADD_PAYMENT_PAGE_SUCCESS',
  ADD_PAYMENT_PAGE_FAILURE = '@@payment-pages/ADD_PAYMENT_PAGE_FAILURE',
  UPDATE_PAYMENT_PAGE_REQUEST = '@@payment-pages/UPDATE_PAYMENT_PAGE_REQUEST',
  UPDATE_PAYMENT_PAGE_SUCCESS = '@@payment-pages/UPDATE_PAYMENT_PAGE_SUCCESS',
  UPDATE_PAYMENT_PAGE_FAILURE = '@@payment-pages/UPDATE_PAYMENT_PAGE_FAILURE',
  DELETE_PAYMENT_PAGE_REQUEST = '@@payment-pages/DELETE_PAYMENT_PAGE_REQUEST',
  DELETE_PAYMENT_PAGE_SUCCESS = '@@payment-pages/DELETE_PAYMENT_PAGE_SUCCESS',
  DELETE_PAYMENT_PAGE_FAILURE = '@@payment-pages/DELETE_PAYMENT_PAGE_FAILURE',
  CLEAR_STATES = '@@payment-pages/CLEAR_STATES',
  PAYMENT_PAGE_REQUEST = '@@payment-pages/PAYMENT_PAGE_REQUEST',
  PAYMENT_PAGE_SUCCESS = '@@payment-pages/PAYMENT_PAGE_SUCCESS',
  PAYMENT_PAGE_FAILURE = '@@payment-pages/PAYMENT_PAGE_FAILURE',
  GET_PAGE_TRANX_REQUEST = '@@payment-pages/GET_PAGE_TRANX_REQUEST',
  GET_PAGE_TRANX_SUCCESS = '@@payment-pages/GET_PAGE_TRANX_SUCCESS',
  GET_PAGE_TRANX_FAILURE = '@@payment-pages/GET_PAGE_TRANX_FAILURE',
  CLEAR_PAYMENT_PAGES = '@@payment-pages/CLEAR_PAYMENT_PAGES',
  REQUEST_FEE = '@@payment-pages/REQUEST_FEE',
  REQUEST_FEE_SUCCESS = '@@payment-pages/REQUEST_FEE_SUCCESS',
  REQUEST_FEE_FAILURE = '@@payment-pages/REQUEST_FEE_FAILURE',
  CLEAR_FEE = '@@payment-pages/CLEAR_FEE',
}

export type PaymentPagesState = {
  readonly pages: Page[];
  readonly loading: boolean;
  readonly isSubmitting: boolean;
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
  readonly singlePage: Page | undefined;
  readonly pageTransactions: TransactionHistory[];
  readonly fee: Fee | undefined;
  readonly feeError: any;
  readonly feeLoading: boolean;
};
