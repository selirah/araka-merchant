import { action } from 'typesafe-actions';
import { PaymentPagesTypes } from './types';
import { PaymentPage } from '../../interfaces';

export const addPaymentPageRequest = (payload: PaymentPage) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_REQUEST, payload);

export const addPaymentPageSuccess = (response: PaymentPage) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_SUCCESS, response);

export const addPaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_FAILURE, error);

export const updatePaymentPageRequest = (payload: PaymentPage) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_REQUEST, payload);

export const updatePaymentPageSuccess = (response: PaymentPage) =>
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

export const getPaymentPagesSuccess = (response: PaymentPage[]) =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_SUCCESS, response);

export const getPaymentPagesFailure = (error: any) =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_FAILURE, error);

export const clearStates = () => action(PaymentPagesTypes.CLEAR_STATES);
