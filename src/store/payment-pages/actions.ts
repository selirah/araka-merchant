import { action } from 'typesafe-actions';
import { PaymentPagesTypes } from './types';
import { PaymentPage, Page, TransactionHistory } from '../../interfaces';

export const addPaymentPageRequest = (payload: PaymentPage) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_REQUEST, payload);

export const addPaymentPageSuccess = (response: Page) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_SUCCESS, response);

export const addPaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_FAILURE, error);

export const updatePaymentPageRequest = (payload: PaymentPage) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_REQUEST, payload);

export const updatePaymentPageSuccess = (response: Page) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_SUCCESS, response);

export const updatePaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_FAILURE, error);

export const deletePaymentPageRequest = (payload: string) =>
  action(PaymentPagesTypes.DELETE_PAYMENT_PAGE_REQUEST, payload);

export const deletePaymentPageSuccess = (response: string) =>
  action(PaymentPagesTypes.DELETE_PAYMENT_PAGE_SUCCESS, response);

export const deletePaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.DELETE_PAYMENT_PAGE_FAILURE, error);

export const getPaymentPagesRequest = () =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_REQUEST);

export const getPaymentPagesSuccess = (response: Page[]) =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_SUCCESS, response);

export const getPaymentPagesFailure = (error: any) =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_FAILURE, error);

export const paymentPageRequest = (payload: string) =>
  action(PaymentPagesTypes.PAYMENT_PAGE_REQUEST, payload);

export const paymentPageSuccess = (response: Page) =>
  action(PaymentPagesTypes.PAYMENT_PAGE_SUCCESS, response);

export const paymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.PAYMENT_PAGE_FAILURE, error);

export const getPageTranxRequest = (pageId: number) =>
  action(PaymentPagesTypes.GET_PAGE_TRANX_REQUEST, pageId);

export const getPageTranxSuccess = (response: TransactionHistory[]) =>
  action(PaymentPagesTypes.GET_PAGE_TRANX_SUCCESS, response);

export const getPageTranxFailure = (error: any) =>
  action(PaymentPagesTypes.GET_PAGE_TRANX_FAILURE, error);

export const clearStates = () => action(PaymentPagesTypes.CLEAR_STATES);

export const clearPaymentPages = () =>
  action(PaymentPagesTypes.CLEAR_PAYMENT_PAGES);
