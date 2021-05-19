import { Reducer } from 'redux';
import { VASProcessedState, VASProcessedTypes } from './types';
import { AuthActionTypes } from '../auth';

export const initialState: VASProcessedState = {
  error: undefined,
  exportStream: undefined,
  isExportError: false,
  isExportSuccess: false,
  isExporting: false,
  loading: false,
  vas: null,
};

const reducer: Reducer<VASProcessedState> = (state = initialState, action) => {
  switch (action.type) {
    case VASProcessedTypes.GET_VAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case VASProcessedTypes.GET_VAS_SUCCESS:
      return {
        ...state,
        vas: action.payload,
        loading: false,
      };
    case VASProcessedTypes.GET_VAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case VASProcessedTypes.CLEAR_VAS:
      return {
        ...state,
        vas: null,
      };
    case VASProcessedTypes.EXPORT_VAS_REQUEST:
      return {
        ...state,
        isExporting: true,
      };
    case VASProcessedTypes.EXPORT_VAS_SUCCESS:
      return {
        ...state,
        isExporting: false,
        exportStream: action.payload,
        isExportError: false,
        isExportSuccess: true,
        exportError: undefined,
      };
    case VASProcessedTypes.EXPORT_VAS_FAILURE:
      return {
        ...state,
        isExporting: false,
        exportStream: undefined,
        isExportError: true,
        isExportSuccess: false,
        exportError: action.payload,
      };

    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as vasReducer };
