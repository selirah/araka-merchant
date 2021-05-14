import { Reducer } from 'redux';
import { ReportsState, ReportsActionTypes } from './types';
import { AuthActionTypes } from '../auth';
import { proxyPayDataTypes } from '../../helpers/constants';

export const initialState: ReportsState = {
  loading: false,
  error: undefined,
  failure: false,
  loadingSub: false,
  loadingTrx: false,
  loadingVol: false,
  loadingRev: false,
  loadingOpex: false,
  loadingEbitda: false,
  payouts: null,
  pces: null,
  proxypaySubscribers: null,
  proxypayTransactions: null,
  proxypayVolumes: null,
  proxypayRevenues: null,
  proxypayOpex: null,
  proxypayEbitda: null,
  success: false,
  isSubmitting: false,
  merchants: [],
  fee: undefined,
  feeError: undefined,
  feeLoading: false,
  exportError: undefined,
  exportStream: undefined,
  isExportError: false,
  isExportSuccess: false,
  isExporting: false,
  downloadError: undefined,
  downloadReceiptStream: undefined,
  downloadRecieptError: false,
  downloadRecieptSuccess: false,
  isRequestingDownload: false,
  errorEbitda: undefined,
  errorOpex: undefined,
  errorRev: undefined,
  errorSub: undefined,
  errorTrx: undefined,
  errorVol: undefined,
  dataType: proxyPayDataTypes.subscribers,
  isLoaded: false,
};

const reducer: Reducer<ReportsState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    case ReportsActionTypes.GET_PCES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ReportsActionTypes.GET_PCES_SUCCESS:
      return {
        ...state,
        loading: false,
        pces: action.payload,
      };
    case ReportsActionTypes.GET_PCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_REQUEST:
      return {
        ...state,
        loadingSub: true,
        isLoaded: false,
      };
    case ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        loadingSub: false,
        proxypaySubscribers: action.payload,
        isLoaded: true,
        dataType: proxyPayDataTypes.subscribers,
      };
    case ReportsActionTypes.GET_PROXYPAY_SUBSCRIBERS_FAILURE:
      return {
        ...state,
        loadingSub: false,
        error: action.payload,
      };

    case ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loadingTrx: true,
        isLoaded: false,
      };
    case ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loadingTrx: false,
        proxypayTransactions: action.payload,
        isLoaded: true,
        dataType: proxyPayDataTypes.transactions,
      };
    case ReportsActionTypes.GET_PROXYPAY_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loadingTrx: false,
        error: action.payload,
      };

    case ReportsActionTypes.GET_PROXYPAY_VOLUMES_REQUEST:
      return {
        ...state,
        loadingVol: true,
        isLoaded: false,
      };
    case ReportsActionTypes.GET_PROXYPAY_VOLUMES_SUCCESS:
      return {
        ...state,
        loadingVol: false,
        proxypayVolumes: action.payload,
        isLoaded: true,
        dataType: proxyPayDataTypes.volumes,
      };
    case ReportsActionTypes.GET_PROXYPAY_VOLUMES_FAILURE:
      return {
        ...state,
        loadingVol: false,
        error: action.payload,
      };
    case ReportsActionTypes.GET_PROXYPAY_REVENUES_REQUEST:
      return {
        ...state,
        loadingRev: true,
        isLoaded: false,
      };
    case ReportsActionTypes.GET_PROXYPAY_REVENUES_SUCCESS:
      return {
        ...state,
        loadingRev: false,
        proxypayRevenues: action.payload,
        isLoaded: true,
        dataType: proxyPayDataTypes.revenues,
      };
    case ReportsActionTypes.GET_PROXYPAY_REVENUES_FAILURE:
      return {
        ...state,
        loadingRev: false,
        error: action.payload,
      };
    case ReportsActionTypes.GET_PROXYPAY_OPEX_REQUEST:
      return {
        ...state,
        loadingOpex: true,
        isLoaded: false,
      };
    case ReportsActionTypes.GET_PROXYPAY_OPEX_SUCCESS:
      return {
        ...state,
        loadingOpex: false,
        proxypayOpex: action.payload,
        isLoaded: true,
        dataType: proxyPayDataTypes.opex,
      };
    case ReportsActionTypes.GET_PROXYPAY_OPEX_FAILURE:
      return {
        ...state,
        loadingOpex: false,
        error: action.payload,
      };

    case ReportsActionTypes.GET_PROXYPAY_EBITDA_REQUEST:
      return {
        ...state,
        loadingEbitda: true,
        isLoaded: false,
      };
    case ReportsActionTypes.GET_PROXYPAY_EBITDA_SUCCESS:
      return {
        ...state,
        loadingEbitda: false,
        proxypayEbitda: action.payload,
        isLoaded: true,
        dataType: proxyPayDataTypes.ebitda,
      };
    case ReportsActionTypes.GET_PROXYPAY_EBITDA_FAILURE:
      return {
        ...state,
        loadingEbitda: false,
        error: action.payload,
      };

    case ReportsActionTypes.GET_PAYOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ReportsActionTypes.GET_PAYOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        payouts: action.payload,
      };
    case ReportsActionTypes.GET_PAYOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ReportsActionTypes.POST_RECORD_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case ReportsActionTypes.POST_RECORD_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: undefined,
        success: true,
        failure: false,
      };
    case ReportsActionTypes.POST_RECORD_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
      };
    case ReportsActionTypes.CLEAR_BOOLEANS:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: false,
        error: undefined,
        feeError: undefined,
        isExportError: false,
        isExportSuccess: false,
        downloadRecieptError: false,
        downloadRecieptSuccess: false,
        isLoaded: false,
        dataType: proxyPayDataTypes.subscribers,
      };
    case ReportsActionTypes.GET_MERCHANTS_REQUEST:
      return {
        ...state,
      };
    case ReportsActionTypes.GET_MERCHANTS_SUCCESS:
      return {
        ...state,
        merchants: action.payload,
      };
    case ReportsActionTypes.GET_MERCHANTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ReportsActionTypes.POST_PAYOUT_FEE_REQUEST:
      return {
        ...state,
        feeError: undefined,
        feeLoading: true,
      };

    case ReportsActionTypes.POST_PAYOUT_FEE_SUCCESS:
      return {
        ...state,
        fee: action.payload,
        feeLoading: false,
      };

    case ReportsActionTypes.POST_PAYOUT_FEE_FAILURE:
      return {
        ...state,
        feeError: action.payload,
        feeLoading: false,
      };

    case ReportsActionTypes.CLEAR_FEE:
      return {
        ...state,
        fee: undefined,
      };

    case ReportsActionTypes.EXPORT_REQUEST:
      return {
        ...state,
        isExporting: true,
      };
    case ReportsActionTypes.EXPORT_SUCCESS:
      return {
        ...state,
        isExporting: false,
        exportStream: action.payload,
        isExportError: false,
        isExportSuccess: true,
        exportError: undefined,
      };
    case ReportsActionTypes.EXPORT_FAILURE:
      return {
        ...state,
        isExporting: false,
        exportStream: undefined,
        isExportError: true,
        isExportSuccess: false,
        exportError: action.payload,
      };
    case ReportsActionTypes.DOWNLOAD_RECEIPT_REQUEST:
      return {
        ...state,
        isRequestingDownload: true,
      };

    case ReportsActionTypes.DOWNLOAD_RECEIPT_SUCCESS:
      return {
        ...state,
        isRequestingDownload: false,
        downloadReceiptStream: action.payload,
        downloadRecieptError: false,
        downloadRecieptSuccess: true,
        downloadError: undefined,
      };

    case ReportsActionTypes.DOWNLOAD_RECEIPT_FAILURE:
      return {
        ...state,
        isRequestingDownload: false,
        downloadReceiptStream: undefined,
        downloadRecieptError: true,
        downloadRecieptSuccess: false,
        downloadError: action.payload,
      };

    case ReportsActionTypes.CLEAR_DATA:
      return {
        ...state,
        proxypayEbitda: null,
        proxypayOpex: null,
        proxypayRevenues: null,
        proxypaySubscribers: null,
        proxypayTransactions: null,
        proxypayVolumes: null,
        errorEbitda: undefined,
        errorOpex: undefined,
        error: undefined,
        errorRev: undefined,
        errorSub: undefined,
        errorTrx: undefined,
        errorVol: undefined,
      };
    default:
      return state;
  }
};

export { reducer as reportsReducer };
