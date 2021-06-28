import { Reducer } from 'redux';
import { PaymentPagesState, PaymentPagesTypes } from './types';
import { AuthActionTypes } from '../auth';

export const initialState: PaymentPagesState = {
  error: undefined,
  failure: false,
  loading: false,
  pages: [],
  success: false,
  isSubmitting: false,
  singlePage: undefined,
  pageTransactions: [],
  fee: undefined,
  feeError: undefined,
  feeLoading: false,
  providers : [],
  mobileResponse: null,
  mobilePaymentSuccess: false,
  mobilePaymentProcessing: false,
  mobilePaymentSubmit: false,
};

const reducer: Reducer<PaymentPagesState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.DESTROY_STATES:
      return initialState;

    case PaymentPagesTypes.ADD_PAYMENT_PAGE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        success: false,
        failure: false,
      };
    case PaymentPagesTypes.ADD_PAYMENT_PAGE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: {},
        pages: [action.payload, ...state.pages],
        success: true,
        failure: false,
      };
    case PaymentPagesTypes.ADD_PAYMENT_PAGE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
      };

    case PaymentPagesTypes.UPDATE_PAYMENT_PAGE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };

    case PaymentPagesTypes.UPDATE_PAYMENT_PAGE_SUCCESS:
      let pages = state.pages.slice();
      pages = pages.filter(
        (page) => page.paymentPageId !== action.payload.paymentPageId
      );
      pages.unshift(action.payload);
      return {
        ...state,
        isSubmitting: false,
        pages: pages,
        success: true,
        failure: false,
      };

    case PaymentPagesTypes.UPDATE_PAYMENT_PAGE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
      };

    case PaymentPagesTypes.DELETE_PAYMENT_PAGE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };

    case PaymentPagesTypes.DELETE_PAYMENT_PAGE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        pages: state.pages.filter(
          (page) => page.paymentPageId !== action.payload
        ),
      };

    case PaymentPagesTypes.DELETE_PAYMENT_PAGE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
      };

    case PaymentPagesTypes.GET_PAYMENT_PAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PaymentPagesTypes.GET_PAYMENT_PAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload,
      };

    case PaymentPagesTypes.GET_PAYMENT_PAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PaymentPagesTypes.PAYMENT_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PaymentPagesTypes.PAYMENT_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePage: action.payload,
      };

    case PaymentPagesTypes.PAYMENT_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PaymentPagesTypes.GET_PAGE_TRANX_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PaymentPagesTypes.GET_PAGE_TRANX_SUCCESS:
      return {
        ...state,
        loading: false,
        pageTransactions: action.payload,
      };

    case PaymentPagesTypes.GET_PAGE_TRANX_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PaymentPagesTypes.CLEAR_STATES:
      return {
        ...state,
        isSubmitting: false,
        error: undefined,
        success: false,
        failure: false,
      };
    case PaymentPagesTypes.CLEAR_PAYMENT_PAGES:
      return {
        ...state,
        pages: [],
      };
    case PaymentPagesTypes.REQUEST_FEE_REQUEST:
      return {
        ...state,
        feeError: initialState.feeError,
        feeLoading: true,
      };

    case PaymentPagesTypes.REQUEST_FEE_SUCCESS:
      return {
        ...state,
        fee: action.payload,
        feeLoading: false,
      };

    case PaymentPagesTypes.REQUEST_FEE_FAILURE:
      return {
        ...state,
        feeError: action.payload,
        feeLoading: false,
      };
    case PaymentPagesTypes.CLEAR_FEE:
      return {
        ...state,
        fee: undefined,
      };

    case PaymentPagesTypes.GET_PROVIDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        providers: action.payload,
      };

    case PaymentPagesTypes.GET_PROVIDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PaymentPagesTypes.MOBILE_PAYMENT_SUCCESS:
      return {
        ...state,
        mobilePaymentSubmit: false,
        mobileResponse: action.payload,
        mobilePaymentSuccess: true,
      };
    
    case PaymentPagesTypes.MOBILE_PAYMENT_FAILURE:
      return {
        ...state,
        mobilePaymentSubmit: false,
        error: action.payload,
        mobilePaymentSuccess: false,
      };
    default:
      return state;
  }
};

export { reducer as paymentPagesReducer };
