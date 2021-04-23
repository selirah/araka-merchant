import { Reducer } from 'redux';
import { ReportsState, ReportsActionTypes } from './types';
import { AuthActionTypes } from '../auth';
import { PCESTableData } from '../../interfaces';

export const initialState: ReportsState = {
  error: undefined,
  failure: false,
  loading: false,
  payouts: null,
  pces: null,
  proxypay: null,
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
  pcesdata: [],
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
      let pces: PCESTableData[] = state.pcesdata;
      action.payload.data.map((p: PCESTableData) => {
        pces.push(p);
        return pces;
      });

      return {
        ...state,
        loading: false,
        pces: action.payload,
        pcesdata: pces,
      };
    case ReportsActionTypes.GET_PCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ReportsActionTypes.GET_PROXYPAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ReportsActionTypes.GET_PROXYPAY_SUCCESS:
      return {
        ...state,
        loading: false,
        proxypay: action.payload,
      };
    case ReportsActionTypes.GET_PROXYPAY_FAILURE:
      return {
        ...state,
        loading: false,
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
      };
    case ReportsActionTypes.GET_MERCHANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ReportsActionTypes.GET_MERCHANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        merchants: action.payload,
      };
    case ReportsActionTypes.GET_MERCHANTS_FAILURE:
      return {
        ...state,
        loading: false,
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
        pcesdata: [],
      };
    default:
      return state;
  }
};

export { reducer as reportsReducer };
