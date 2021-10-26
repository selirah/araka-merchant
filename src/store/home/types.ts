import { OrderResponse, TransactionReport } from '../../interfaces'

export enum HomeTypes {
  IS_SUBMITTING = '@@home/IS_SUBMITTING',
  REQUEST_PAYMENT = '@@home/REQUEST_PAYMENT',
  REQUEST_PAYMENT_FAILURE = '@@home/REQUEST_PAYMENT_ERROR',
  REQUEST_PAYMENT_SUCCESS = '@@home/REQUEST_PAYMENT_SUCCESS',
  CLEAR_PAYMENT_DATA = '@@home/CLEAR_PAYMENT_DATA',
  GET_OVERVIEW_REQUEST = '@@home/GET_OVERVIEW_REQUEST',
  GET_OVERVIEW_SUCCESS = '@@home/GET_OVERVIEW_SUCCESS',
  GET_OVERVIEW_FAILURE = '@@home/GET_OVERVIEW_FAILURE',
  PAYMENT_REQUEST = '@@home/PAYMENT_REQUEST',
  PAYMENT_SUCCESS = '@@home/PAYMENT_SUCCESS',
  PAYMENT_FAILURE = '@@home/PAYMENT_FAILURE',
  MOBILE_PAYMENT_REQUEST = '@@home/MOBILE_PAYMENT_REQUEST',
  MOBILE_PAYMENT_SUCCESS = '@@home/MOBILE_PAYMENT_SUCCESS',
  MOBILE_PAYMENT_FAILURE = '@@home/MOBILE_PAYMENT_FAILURE',
  MOBILE_STATUS_REQUEST = '@@home/MOBILE_STATUS_REQUEST',
  MOBILE_STATUS_SUCCESS = '@@home/MOBILE_STATUS_SUCCESS',
  MOBILE_STATUS_FAILURE = '@@home/MOBILE_STATUS_FAILURE'
}

export type HomeState = {
  readonly isSubmitting: boolean
  readonly error: any
  readonly isPaymentSuccess: boolean
  readonly isPaymentFailure: boolean
  readonly orderResponse: OrderResponse | undefined
  readonly loading: boolean
  readonly trxReports: TransactionReport | null
  readonly submitted: boolean
  readonly mobileResponse: any
  readonly mobilePaymentSuccess: boolean
  readonly mobilePaymentProcessing: boolean
  readonly mobilePaymentSubmit: boolean
  readonly trxStatus: any
}
