import { action } from 'typesafe-actions'
import {
  Login,
  Error,
  User,
  ForgottenPassword,
  ResetPassword
} from '../../interfaces'
import { AuthActionTypes } from './types'

export const loginRequest = (payload: Login) =>
  action(AuthActionTypes.REQUEST_LOGIN_SUBMIT, payload)

export const loginSuccess = (user: User) =>
  action(AuthActionTypes.LOGIN_SUCCESS, user)

export const loginError = (error: Error) =>
  action(AuthActionTypes.LOGIN_ERROR, error)

export const resetErrorState = () => action(AuthActionTypes.RESET_ERROR_STATE)

export const logError = (error: string) =>
  action(AuthActionTypes.LOG_SINGLE_ERROR, error)

export const setUser = (user: User) => action(AuthActionTypes.SET_USER, user)

export const logout = () => action(AuthActionTypes.DESTROY_STATES)

export const clearAuthState = () => action(AuthActionTypes.CLEAR_AUTH_STATES)

export const forgottenPasswordRequest = (payload: ForgottenPassword) =>
  action(AuthActionTypes.FORGOTTEN_PASSWORD_REQUEST, payload)

export const forgottenPasswordSuccess = (response: any) =>
  action(AuthActionTypes.FORGOTTEN_PASSWORD_SUCCESS, response)

export const forgottenPasswordFailure = (error: any) =>
  action(AuthActionTypes.FORGOTTEN_PASSWORD_FAILURE, error)

export const resetPasswordRequest = (payload: ResetPassword) =>
  action(AuthActionTypes.RESET_PASSWORD_REQUEST, payload)

export const resetPasswordSuccess = (response: any) =>
  action(AuthActionTypes.RESET_PASSWORD_SUCCESS, response)

export const resetPasswordFailure = (error: any) =>
  action(AuthActionTypes.RESET_PASSWORD_FAILURE, error)
