import { action } from 'typesafe-actions'
import { PaymentPagesTypes } from './types'
import { PaymentPage, Page, TransactionHistory, Fee } from '../../interfaces'

export const addPaymentPageRequest = (payload: PaymentPage) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_REQUEST, payload)

export const addPaymentPageSuccess = (response: Page) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_SUCCESS, response)

export const addPaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.ADD_PAYMENT_PAGE_FAILURE, error)

export const updatePaymentPageRequest = (payload: PaymentPage) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_REQUEST, payload)

export const updatePaymentPageSuccess = (response: Page) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_SUCCESS, response)

export const updatePaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.UPDATE_PAYMENT_PAGE_FAILURE, error)

export const deletePaymentPageRequest = (payload: string) =>
  action(PaymentPagesTypes.DELETE_PAYMENT_PAGE_REQUEST, payload)

export const deletePaymentPageSuccess = (response: string) =>
  action(PaymentPagesTypes.DELETE_PAYMENT_PAGE_SUCCESS, response)

export const deletePaymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.DELETE_PAYMENT_PAGE_FAILURE, error)

export const getPaymentPagesRequest = () =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_REQUEST)

export const getPaymentPagesSuccess = (response: Page[]) =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_SUCCESS, response)

export const getPaymentPagesFailure = (error: any) =>
  action(PaymentPagesTypes.GET_PAYMENT_PAGES_FAILURE, error)

export const paymentPageRequest = (payload: string) =>
  action(PaymentPagesTypes.PAYMENT_PAGE_REQUEST, payload)

export const paymentPageSuccess = (response: Page) =>
  action(PaymentPagesTypes.PAYMENT_PAGE_SUCCESS, response)

export const paymentPageFailure = (error: any) =>
  action(PaymentPagesTypes.PAYMENT_PAGE_FAILURE, error)

export const getPageTranxRequest = (pageId: number) =>
  action(PaymentPagesTypes.GET_PAGE_TRANX_REQUEST, pageId)

export const getPageTranxSuccess = (response: TransactionHistory[]) =>
  action(PaymentPagesTypes.GET_PAGE_TRANX_SUCCESS, response)

export const getPageTranxFailure = (error: any) =>
  action(PaymentPagesTypes.GET_PAGE_TRANX_FAILURE, error)

export const clearStates = () => action(PaymentPagesTypes.CLEAR_STATES)

export const clearPaymentPages = () =>
  action(PaymentPagesTypes.CLEAR_PAYMENT_PAGES)

export const getProvidersRequest = () =>
  action(PaymentPagesTypes.GET_PROVIDERS_REQUEST)

export const getProvidersRequest = () =>
  action(PaymentPagesTypes.GET_PROVIDERS_REQUEST);

export const postFeeRequest = (payload: any) =>
  action(PaymentPagesTypes.REQUEST_FEE_REQUEST, payload)

export const postFeeSuccess = (data: Fee) =>
  action(PaymentPagesTypes.REQUEST_FEE_SUCCESS, data)

export const postFeeFailure = (error: any) =>
  action(PaymentPagesTypes.REQUEST_FEE_FAILURE, error)

export const clearFee = () => action(PaymentPagesTypes.CLEAR_FEE)

export const getProvidersSuccess = (data: any) =>
  action(PaymentPagesTypes.GET_PROVIDERS_SUCCESS, data)

<<<<<<< HEAD
export const getProvidersFailure = (error: string) =>
  action(PaymentPagesTypes.GET_PROVIDERS_FAILURE, error)
=======
export const clearFee = () => action(PaymentPagesTypes.CLEAR_FEE);

export const getProvidersSuccess = (data: any) =>
  action(PaymentPagesTypes.GET_PROVIDERS_SUCCESS, data);

export const getProvidersFailure = (error: string) =>
  action(PaymentPagesTypes.GET_PROVIDERS_FAILURE, error);

export const mobilePaymentRequest = (payload: any) =>
  action(PaymentPagesTypes.MOBILE_PAYMENT_REQUEST, payload);

export const mobilePaymentSuccess = (data: any) =>
  action(PaymentPagesTypes.MOBILE_PAYMENT_SUCCESS, data);

export const mobilePaymentFailure = (error: string) =>
  action(PaymentPagesTypes.MOBILE_PAYMENT_FAILURE, error);

export const checkMobileStatusSuccess = (data: any) =>
  action(PaymentPagesTypes.MOBILE_STATUS_SUCCESS, data);

export const checkMobileStatusFailure = (error: string) =>
  action(PaymentPagesTypes.MOBILE_STATUS_FAILURE, error);
>>>>>>> 801cacdea0b799a3a17e92832576e16cc9edaa04
