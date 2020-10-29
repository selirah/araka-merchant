import { User, Error } from '../../interfaces';

export enum AuthActionTypes {
  IS_SUBMITTING = '@@auth/IS_SUBMITTING',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@auth/LOGIN_ERROR',
  REQUEST_LOGIN_SUBMIT = '@@auth/REQUEST_LOGIN_SUBMIT',
  // REQUEST_REGISTER_SUBMIT = '@@auth/REQUEST_REGISTER_SUBMIT',
  // REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS',
  // REGISTER_ERROR = '@@auth/REGISTER_ERROR',
  RESET_ERROR_STATE = '@@auth/RESET_ERROR_STATE',
  LOG_SINGLE_ERROR = '@@auth/LOG_SINGLE_ERROR',
  SET_USER = '@@auth/SET_USER',
  DESTROY_STATES = '@@auth/DESTROY_STATES',
  // VERIFY_EMAIL_REQUEST = '@@auth/VERIFY_EMAIL_REQUEST',
  // VERIFY_EMAIL_SUCCESS = '@@auth/VERIFY_EMAIL_SUCCESS',
  // VERIFY_EMAIL_FAILURE = '@@auth/VERIFY_EMAIL_FAILURE',
  // CLEAR_VERIFICATION_RESPONSE = '@@auth/CLEAR_VERIFICATION_RESPONSE',
  // VERIFY_ERROR = '@@auth/VERIFY_ERROR',
  CLEAR_AUTH_STATES = '@@auth/CLEAR_AUTH_STATES',
  // FORGOTTEN_PASSWORD_REQUEST = '@@auth/FORGOTTEN_PASSWORD_REQUEST',
  // FORGOTTEN_PASSWORD_SUCCESS = '@@auth/FORGOTTEN_PASSWORD_SUCCESS',
  // FORGOTTEN_PASSWORD_FAILURE = '@@auth/FORGOTTEN_PASSWORD_FAILURE',
  // RESET_PASSWORD_REQUEST = '@@auth/RESET_PASSWORD_REQUEST',
  // RESET_PASSWORD_SUCCESS = '@@auth/RESET_PASSWORD_SUCCESS',
  // RESET_PASSWORD_FAILURE = '@@auth/RESET_PASSWORD_FAILURE',
}

export type AuthState = {
  readonly isAuthenticated: boolean;
  readonly isSubmitting: boolean;
  readonly error: Error | {};
  readonly success: boolean;
  readonly user: User | undefined;
  readonly singleError: string;
  // readonly verificationResponse: VerificationResponse | undefined;
  // readonly verifyError: string;
  // readonly isVerifying: boolean;
  // readonly isVerified: boolean;

  // readonly isForgottenPassword: boolean;
  // readonly forgottenPasswordSuccess: boolean;
  // readonly forgottenPasswordError: boolean;
  // readonly forgottenError: any;

  // readonly isResettingPassword: boolean;
  // readonly resetPasswordSuccess: boolean;
  // readonly resetPasswordError: boolean;
  // readonly resetError: any;
};
