import { User, Error } from '../../interfaces';

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
}

export type AuthState = {
  readonly isAuthenticated: boolean;
  readonly isSubmitting: boolean;
  readonly error: Error | {};
  readonly success: boolean;
  readonly user: User | undefined;
  readonly singleError: string;
};
