import { Reducer } from 'redux';
import { AuthState, AuthActionTypes } from './types';

export const initialState: AuthState = {
  isAuthenticated: false,
  isSubmitting: false,
  error: {},
  singleError: '',
  success: false,
  user: undefined,
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.REQUEST_LOGIN_SUBMIT:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        singleError: '',
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload,
        isAuthenticated: true,
        success: true,
      };
    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
      };
    case AuthActionTypes.LOG_SINGLE_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        singleError: action.payload,
        success: false,
      };
    }
    case AuthActionTypes.RESET_ERROR_STATE:
      return {
        ...state,
        error: {},
        isSubmitting: false,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case AuthActionTypes.CLEAR_AUTH_STATES:
      return {
        ...state,
        success: initialState.success,
        error: initialState.error,
        isSubmitting: initialState.isSubmitting,
        singleError: initialState.singleError,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as authReducer };
