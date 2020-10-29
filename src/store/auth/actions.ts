import { action } from 'typesafe-actions';
import { Login, Error, User } from '../../interfaces';
import { AuthActionTypes } from './types';

export const loginRequest = (payload: Login) =>
  action(AuthActionTypes.REQUEST_LOGIN_SUBMIT, payload);

export const loginSuccess = (user: User) =>
  action(AuthActionTypes.LOGIN_SUCCESS, user);

export const loginError = (error: Error) =>
  action(AuthActionTypes.LOGIN_ERROR, error);

// export const registerRequest = (payload: Register) =>
//   action(AuthActionTypes.REQUEST_REGISTER_SUBMIT, payload);

// export const registerSuccess = (user: User) =>
//   action(AuthActionTypes.REGISTER_SUCCESS, user);

// export const registerError = (error: Error) =>
//   action(AuthActionTypes.REGISTER_ERROR, error);

export const resetErrorState = () => action(AuthActionTypes.RESET_ERROR_STATE);

export const logError = (error: string) =>
  action(AuthActionTypes.LOG_SINGLE_ERROR, error);

export const setUser = (user: User) => action(AuthActionTypes.SET_USER, user);

export const logout = () => action(AuthActionTypes.DESTROY_STATES);

// export const verificationRequest = (payload: Verification) =>
//   action(AuthActionTypes.VERIFY_EMAIL_REQUEST, payload);

// export const verificationSuccess = (response: VerificationResponse) =>
//   action(AuthActionTypes.VERIFY_EMAIL_SUCCESS, response);

// export const verificationError = (error: string) =>
//   action(AuthActionTypes.VERIFY_EMAIL_FAILURE, error);

// export const clearVerificationResponse = () =>
//   action(AuthActionTypes.CLEAR_VERIFICATION_RESPONSE);

// export const logVerifyError = (error: string) =>
//   action(AuthActionTypes.VERIFY_ERROR, error);

export const clearAuthState = () => action(AuthActionTypes.CLEAR_AUTH_STATES);

// export const forgottenPasswordRequest = (payload: ForgottenPassword) =>
//   action(AuthActionTypes.FORGOTTEN_PASSWORD_REQUEST, payload);

// export const forgottenPasswordSuccess = (response: any) =>
//   action(AuthActionTypes.FORGOTTEN_PASSWORD_SUCCESS, response);

// export const forgottenPasswordFailure = (error: any) =>
//   action(AuthActionTypes.FORGOTTEN_PASSWORD_FAILURE, error);

// export const resetPasswordRequest = (payload: ResetPassword) =>
//   action(AuthActionTypes.RESET_PASSWORD_REQUEST, payload);

// export const resetPasswordSuccess = (response: any) =>
//   action(AuthActionTypes.RESET_PASSWORD_SUCCESS, response);

// export const resetPasswordFailure = (error: any) =>
//   action(AuthActionTypes.RESET_PASSWORD_FAILURE, error);
