import { action } from 'typesafe-actions';
import { HomeTypes } from './types';

export const setTopBarHeader = (payload: string) =>
  action(HomeTypes.TOPBAR_HEADER, payload);
