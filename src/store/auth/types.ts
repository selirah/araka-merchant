import { User, Error } from '../../interfaces'

export enum AuthActionTypes {
  IS_SUBMITTING = '@@auth/IS_SUBMITTING',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@auth/LOGIN_ERROR',
  REQUEST_LOGIN_SUBMIT = '@@auth/REQUEST_LOGIN_SUBMIT',
  RESET_ERROR_STATE = '@@auth/RESET_ERROR_STATE',
  LOG_SINGLE_ERROR = '@@auth/LOG_SINGLE_ERROR',
  SET_USER = '@@auth/SET_USER',
  DESTROY_STATES = '@@auth/DESTROY_STATES',
  CLEAR_AUTH_STATES = '@@auth/CLEAR_AUTH_STATES',
  FORGOTTEN_PASSWORD_REQUEST = '@@auth/FORGOTTEN_PASSWORD_REQUEST',
  FORGOTTEN_PASSWORD_SUCCESS = '@@auth/FORGOTTEN_PASSWORD_SUCCESS',
  FORGOTTEN_PASSWORD_FAILURE = '@@auth/FORGOTTEN_PASSWORD_FAILURE',
  RESET_PASSWORD_REQUEST = '@@auth/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = '@@auth/RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = '@@auth/RESET_PASSWORD_FAILURE'
}

export type AuthState = {
  readonly isAuthenticated: boolean
  readonly isSubmitting: boolean
  readonly error: Error | {}
  readonly success: boolean
  readonly user: User | undefined
  readonly singleError: string

  readonly isForgottenPassword: boolean
  readonly forgottenPasswordSuccess: boolean
  readonly forgottenPasswordError: boolean
  readonly forgottenError: any

  readonly isResettingPassword: boolean
  readonly resetPasswordSuccess: boolean
  readonly resetPasswordError: boolean
  readonly resetError: any
}
