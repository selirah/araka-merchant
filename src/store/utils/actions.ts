import { action } from 'typesafe-actions';
import { UtilsActionTypes } from './types';

export const changeMenu = (menu: string) =>
  action(UtilsActionTypes.SET_ACTIVE_MENU, menu);

export const changeMenuHeader = (header: string) =>
  action(UtilsActionTypes.SET_MENU_HEADER, header);
