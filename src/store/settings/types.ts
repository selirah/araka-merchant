import { Client } from '../../interfaces';

export enum SettingsTypes {
  GET_CURRENT_USER = '@@settings/GET_CURRENT_USER',
  GET_CURRENT_USER_SUCCESS = '@@settings/GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE = '@@settings/GET_CURRENT_USER_FAILURE',
  EDIT_ACCOUNT_REQUEST = '@@settings/EDIT_ACCOUNT_REQUEST',
  EDIT_ACCOUNT_SUCCESS = '@@settings/EDIT_ACCOUNT_SUCCESS',
  EDIT_ACCOUNT_FAILURE = '@@settings/EDIT_ACCOUNT_FAILURE',
  CHANGE_PASSWORD_REQUEST = '@@settings/CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS = '@@settings/CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE = '@@settings/CHANGE_PASSWORD_FAILURE',
  CLEAR_SOME_BOOLEANS = '@@settings/CLEAR_SOME_BOOLEANS',
}

export type SettingsState = {
  readonly loading: boolean;
  readonly isSubmitting: boolean;
  readonly error: any;
  readonly client: Client | null;
  readonly editSuccess: boolean;
  readonly editFailure: boolean;
  readonly isChangingPassword: boolean;
  readonly changePasswordSuccess: boolean;
  readonly changePasswordFailure: boolean;
};
