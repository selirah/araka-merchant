import { Reducer } from 'redux'
import { HomeState, HomeTypes } from './types'
import { AuthActionTypes } from '../auth'

export const initialState: HomeState = {
  error: undefined,
  isPaymentFailure: false,
  isPaymentSuccess: false,
  isSubmitting: false,
  orderResponse: undefined,
  loading: false,
  trxReports: null,
  submitted: false,
  mobileResponse: null,
  mobilePaymentSuccess: false,
  mobilePaymentProcessing: false,
  mobilePaymentSubmit: false,
  trxStatus: null
}

const reducer: Reducer<HomeState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.DESTROY_STATES:
      return initialState

    case HomeTypes.REQUEST_PAYMENT:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        isPaymentSuccess: false,
        isPaymentFailure: false,
        orderResponse: undefined
      }
    case HomeTypes.REQUEST_PAYMENT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: {},
        isPaymentSuccess: true,
        isPaymentFailure: false,
        orderResponse: action.payload
      }
    case HomeTypes.REQUEST_PAYMENT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        isPaymentSuccess: false,
        isPaymentFailure: true,
        orderResponse: undefined,
        submitted: false
      }
    case HomeTypes.CLEAR_PAYMENT_DATA:
      return {
        ...state,
        isSubmitting: false,
        error: undefined,
        isPaymentSuccess: false,
        isPaymentFailure: false,
        orderResponse: undefined,
        trxReports: null,
        trxStatus: null,
        mobilePaymentSuccess: false,
        mobileResponse: null
      }
    case HomeTypes.GET_OVERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined
      }
    case HomeTypes.GET_OVERVIEW_SUCCESS:
      return {
        ...state,
        trxReports: action.payload,
        loading: false
      }
    case HomeTypes.GET_OVERVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case HomeTypes.PAYMENT_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: initialState.error
      }

    case HomeTypes.PAYMENT_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        submitted: true
      }

    case HomeTypes.PAYMENT_FAILURE:
      return {
        ...state,
        isSubmit: initialState.isSubmitting,
        error: action.payload,
        submitted: initialState.submitted
      }

    case HomeTypes.MOBILE_PAYMENT_REQUEST:
      return {
        ...state,
        mobilePaymentSubmit: true,
        error: undefined
      }

    case HomeTypes.MOBILE_PAYMENT_SUCCESS:
      return {
        ...state,
        mobilePaymentSubmit: false,
        mobileResponse: action.payload,
        mobilePaymentSuccess: true
      }

    case HomeTypes.MOBILE_PAYMENT_FAILURE:
      return {
        ...state,
        mobilePaymentSubmit: false,
        error: action.payload,
        mobilePaymentSuccess: false
      }

    case HomeTypes.MOBILE_STATUS_REQUEST:
      return {
        ...state,
        mobilePaymentProcessing: true,
        error: undefined
      }

    case HomeTypes.MOBILE_STATUS_SUCCESS:
      return {
        ...state,
        mobilePaymentProcessing: false,
        trxStatus: action.payload
      }

    case HomeTypes.MOBILE_STATUS_FAILURE:
      return {
        ...state,
        mobilePaymentProcessing: false,
        error: action.payload
      }

    default:
      return state
  }
}

export { reducer as homeReducer }
