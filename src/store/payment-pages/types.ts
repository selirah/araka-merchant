import { PaymentPage } from '../../interfaces';

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
}

export type PaymentPagesState = {
  readonly pages: PaymentPage[];
  readonly loading: boolean;
  readonly isSubmitting: boolean;
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
};
