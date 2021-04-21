import { action } from 'typesafe-actions';
import { SettingsTypes } from './types';
import { Client, Register, User, Error } from '../../interfaces';

export const getCurrentUser = (userId: number) =>
  action(SettingsTypes.GET_CURRENT_USER, userId);

export const getCurrentUserSuccess = (data: Client) =>
  action(SettingsTypes.GET_CURRENT_USER_SUCCESS, data);

export const getCurrentUserFailure = (error: any) =>
  action(SettingsTypes.GET_CURRENT_USER_FAILURE, error);

export const updateUserRequest = (payload: Client) =>
  action(SettingsTypes.EDIT_ACCOUNT_REQUEST, payload);

export const updateUserSuccess = (data: Client) =>
  action(SettingsTypes.EDIT_ACCOUNT_SUCCESS, data);

export const updateUserFailure = (error: any) =>
  action(SettingsTypes.EDIT_ACCOUNT_FAILURE, error);

export const clearSomeBooleans = () =>
  action(SettingsTypes.CLEAR_SOME_BOOLEANS);

export const changePasswordRequest = (payload: any) =>
  action(SettingsTypes.CHANGE_PASSWORD_REQUEST, payload);

export const changePasswordSuccess = () =>
  action(SettingsTypes.CHANGE_PASSWORD_SUCCESS);

export const changePasswordFailure = (error: any) =>
  action(SettingsTypes.CHANGE_PASSWORD_FAILURE, error);

export const createMerchantRequest = (payload: Register) =>
  action(SettingsTypes.REGISTER_MERCHANT_REQUEST, payload);

export const createMerchantSuccess = (user: User) =>
  action(SettingsTypes.REGISTER_MERCHANT_SUCCESS, user);

export const createMerchantFailure = (error: Error) =>
  action(SettingsTypes.REGISTER_MERCHANT_FAILURE, error);

export const logError = (error: string) =>
  action(SettingsTypes.LOG_SINGLE_ERROR, error);
