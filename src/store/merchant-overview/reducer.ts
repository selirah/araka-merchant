import { Reducer } from 'redux';
import { MerchantsOverviewState, MerchantsOverviewTypes } from './types';
import { AuthActionTypes } from '../auth';

export const initialState: MerchantsOverviewState = {
  error: undefined,
  exportStream: undefined,
  isExportError: false,
  isExportSuccess: false,
  isExporting: false,
  loading: false,
  overviews: null,
};

const reducer: Reducer<MerchantsOverviewState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW_SUCCESS:
      return {
        ...state,
        overviews: action.payload,
        loading: false,
      };
    case MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MerchantsOverviewTypes.CLEAR_OVERVIEW:
      return {
        ...state,
        overviews: null,
      };
    case MerchantsOverviewTypes.EXPORT_OVERVIEW_REQUEST:
      return {
        ...state,
        isExporting: true,
      };
    case MerchantsOverviewTypes.EXPORT_OVERVIEW_SUCCESS:
      return {
        ...state,
        isExporting: false,
        exportStream: action.payload,
        isExportError: false,
        isExportSuccess: true,
        exportError: undefined,
      };
    case MerchantsOverviewTypes.EXPORT_OVERVIEW_FAILURE:
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

export { reducer as overviewReducer };
