import { Reducer } from 'redux';
import { SettingsState, SettingsTypes } from './types';
import { AuthActionTypes } from '../auth';

export const initialState: SettingsState = {
  isSubmitting: false,
  changePasswordFailure: false,
  changePasswordSuccess: false,
  client: null,
  editFailure: false,
  editSuccess: false,
  error: undefined,
  isChangingPassword: false,
  loading: false,
  createMerchantFailure: false,
  createMerchantSuccess: false,
  merchants: [],
  singleError: '',
  merchantError: undefined,
};

const reducer: Reducer<SettingsState> = (state = initialState, action) => {
  switch (action.type) {
    case SettingsTypes.EDIT_ACCOUNT_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        editFailure: false,
        editSuccess: false,
      };
    case SettingsTypes.EDIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        client: action.payload,
        editFailure: false,
        editSuccess: true,
      };
    case SettingsTypes.EDIT_ACCOUNT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        editSuccess: false,
        editFailure: true,
      };

    case SettingsTypes.GET_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case SettingsTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload,
      };
    case SettingsTypes.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SettingsTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isChangingPassword: true,
        changePasswordFailure: false,
        changePasswordSuccess: false,
        error: undefined,
      };

    case SettingsTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangingPassword: false,
        changePasswordSuccess: true,
        changePasswordFailure: false,
      };

    case SettingsTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isChangingPassword: false,
        error: action.payload,
        changePasswordSuccess: false,
        changePasswordFailure: true,
      };

    case SettingsTypes.REGISTER_MERCHANT_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        merchantError: undefined,
        singleError: '',
      };

    case SettingsTypes.REGISTER_MERCHANT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        createMerchantSuccess: true,
        createMerchantFailure: false,
        merchants: [action.payload, ...state.merchants],
      };

    case SettingsTypes.REGISTER_MERCHANT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        merchantError: action.payload,
        createMerchantFailure: true,
        createMerchantSuccess: false,
      };

    case SettingsTypes.LOG_SINGLE_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        singleError: action.payload,
        createMerchantSuccess: false,
      };
    }

    case SettingsTypes.CLEAR_SOME_BOOLEANS:
      return {
        ...state,
        changePasswordFailure: false,
        changePasswordSuccess: false,
        editFailure: false,
        editSuccess: false,
        createMerchantFailure: false,
        createMerchantSuccess: false,
        error: undefined,
        merchantError: undefined,
        singleError: '',
      };

    case AuthActionTypes.DESTROY_STATES:
      return initialState;

    default:
      return state;
  }
};

export { reducer as settingsReducer };
