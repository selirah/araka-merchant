import { Reducer } from 'redux'
import { AuthState, AuthActionTypes } from './types'

export const initialState: AuthState = {
  isAuthenticated: false,
  isSubmitting: false,
  error: {},
  singleError: '',
  success: false,
  user: undefined,
  isForgottenPassword: false,
  forgottenPasswordSuccess: false,
  forgottenPasswordError: false,
  forgottenError: undefined,
  isResettingPassword: false,
  resetError: undefined,
  resetPasswordSuccess: false,
  resetPasswordError: false
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.REQUEST_LOGIN_SUBMIT:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        singleError: ''
      }
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload,
        isAuthenticated: true,
        success: true
      }
    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false
      }
    case AuthActionTypes.LOG_SINGLE_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        singleError: action.payload,
        success: false
      }
    }
    case AuthActionTypes.RESET_ERROR_STATE:
      return {
        ...state,
        error: {},
        isSubmitting: false
      }
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }

    case AuthActionTypes.CLEAR_AUTH_STATES:
      return {
        ...state,
        success: initialState.success,
        error: initialState.error,
        isSubmitting: initialState.isSubmitting,
        singleError: initialState.singleError,
        forgottenPasswordError: false,
        forgottenPasswordSuccess: false,
        forgottenError: undefined,
        resetError: undefined,
        resetPasswordSuccess: false,
        resetPasswordError: false
      }

    case AuthActionTypes.FORGOTTEN_PASSWORD_REQUEST:
      return {
        ...state,
        isForgottenPassword: true,
        forgottenPasswordSuccess: initialState.forgottenPasswordSuccess,
        forgottenPasswordError: initialState.forgottenPasswordError,
        forgottenError: initialState.forgottenError
      }
    case AuthActionTypes.FORGOTTEN_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgottenPassword: initialState.isForgottenPassword,
        forgottenPasswordSuccess: true,
        forgottenPasswordError: initialState.forgottenPasswordError,
        forgottenError: initialState.forgottenError
      }
    case AuthActionTypes.FORGOTTEN_PASSWORD_FAILURE:
      return {
        ...state,
        isForgottenPassword: initialState.isForgottenPassword,
        forgottenPasswordSuccess: initialState.forgottenPasswordSuccess,
        forgottenPasswordError: true,
        forgottenError: action.payload
      }

    case AuthActionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isResettingPassword: true,
        resetPasswordSuccess: initialState.resetPasswordSuccess,
        resetPasswordError: initialState.resetPasswordError,
        resetError: initialState.resetError
      }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResettingPassword: initialState.isResettingPassword,
        resetPasswordSuccess: true,
        resetPasswordError: initialState.resetPasswordError,
        resetError: initialState.resetError
      }
    case AuthActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isResettingPassword: initialState.isResettingPassword,
        resetPasswordSuccess: initialState.resetPasswordSuccess,
        resetPasswordError: true,
        resetError: action.payload
      }
    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as authReducer }
